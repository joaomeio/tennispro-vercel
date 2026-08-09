-- ============================================================
-- 002 — Surface the full drill content
--
-- The drills/*.json source carries five sections of instructional material
-- per drill — objective, setup, instructions, coaching cues, common errors
-- and variations — but the original table stored none of it. Coaches see a
-- single paragraph and a court diagram.
--
-- This migration is ADDITIVE. No existing column is dropped or renamed, so
-- the current UI keeps working while the detail view is rebuilt.
--
-- Run in the Supabase SQL editor.
-- ============================================================

-- ── 1. Fix the type constraint ──────────────────────────────────────────────
-- The original CHECK allowed 'match play' (with a space) and omitted 'fitness'
-- and 'dropshot' entirely, while push_drills.mjs writes 'matchplay', 'fitness'
-- and 'dropshot'. Any insert of those ~95 drills would have been rejected.

ALTER TABLE public.drills DROP CONSTRAINT IF EXISTS drills_type_check;

ALTER TABLE public.drills
  ADD CONSTRAINT drills_type_check CHECK (type IN (
    'groundstrokes','serve','volley','return',
    'footwork','fitness','matchplay','dropshot'
  ));

-- ── 2. The instructional content ────────────────────────────────────────────

ALTER TABLE public.drills
  ADD COLUMN IF NOT EXISTS slug          TEXT,     -- stable authoring id, e.g. 'GW-001'
  ADD COLUMN IF NOT EXISTS category      TEXT,     -- 'Groundwork', 'Serve', …
  ADD COLUMN IF NOT EXISTS subcategory   TEXT,     -- 'Forehand', 'Slice', …
  ADD COLUMN IF NOT EXISTS objective     TEXT,     -- why the drill exists
  ADD COLUMN IF NOT EXISTS setup         TEXT,     -- court positions before the first ball
  ADD COLUMN IF NOT EXISTS instructions  TEXT[],   -- ordered steps to run it
  ADD COLUMN IF NOT EXISTS coaching_cues TEXT[],   -- what to say to the player
  ADD COLUMN IF NOT EXISTS common_errors TEXT[],   -- what to watch for
  ADD COLUMN IF NOT EXISTS variations    TEXT[],   -- ways to progress or regress it
  ADD COLUMN IF NOT EXISTS tags          TEXT[],
  ADD COLUMN IF NOT EXISTS player_count  INTEGER,
  ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMPTZ DEFAULT NOW();

-- ── 3. Stable identity ──────────────────────────────────────────────────────
-- The push script previously did delete-all-then-insert, reissuing every UUID
-- on each run. A unique slug lets it upsert instead, so drill IDs stay stable
-- and can safely be referenced later (favourites, lesson plans, session notes).

CREATE UNIQUE INDEX IF NOT EXISTS drills_slug_key ON public.drills (slug);

-- ── 4. Query indexes ────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS drills_type_level_idx ON public.drills (type, level);
CREATE INDEX IF NOT EXISTS drills_tags_idx       ON public.drills USING GIN (tags);

-- ── 5. Keep updated_at honest ───────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS drills_touch_updated_at ON public.drills;
CREATE TRIGGER drills_touch_updated_at
  BEFORE UPDATE ON public.drills
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ── 6. RLS unchanged ────────────────────────────────────────────────────────
-- Reading drills stays authenticated-only, as before.

ALTER TABLE public.drills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated users can read drills" ON public.drills;
CREATE POLICY "authenticated users can read drills"
  ON public.drills FOR SELECT
  TO authenticated
  USING (true);

-- ── 7. After running this, reseed with: node scripts/push_drills.mjs ────────
-- Legacy rows from the original seed have no slug. Once the upsert has run and
-- you've confirmed the count, clear them out with:
--
--   DELETE FROM public.drills WHERE slug IS NULL;
