-- ─────────────────────────────────────────────────────────────────────────────
-- PRICE EXPERIMENT SETTINGS
--
-- One row holding which two price ladders are being tested and how traffic
-- splits between them. Read by api/pricing-config.js on every cold visit and
-- written by the admin panel's Pricing tab.
--
-- Run once against the project (Supabase SQL editor, or psql). Idempotent.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.app_settings (
  key         text PRIMARY KEY,
  value       jsonb NOT NULL,
  -- Bumped on every write. The browser stores the version alongside a
  -- visitor's assigned variant; when the two disagree the visitor is
  -- re-bucketed, which is what makes an admin change take effect immediately
  -- instead of only reaching people who have never been here before.
  version     bigint NOT NULL DEFAULT 1,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- No policies are defined on purpose. RLS with zero policies denies every
-- anon/authenticated request, so the table is reachable only through the
-- service-role key held by the serverless functions — the browser can read the
-- allocation via GET /api/pricing-config but can never write it.
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.bump_app_settings_version()
RETURNS trigger AS $$
BEGIN
  NEW.version := OLD.version + 1;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS app_settings_bump_version ON public.app_settings;
CREATE TRIGGER app_settings_bump_version
  BEFORE UPDATE ON public.app_settings
  FOR EACH ROW EXECUTE FUNCTION public.bump_app_settings_version();

-- Seed: everyone on control, nothing being tested yet.
INSERT INTO public.app_settings (key, value)
VALUES ('price_experiment', '{"variantA":"control","variantB":"low","split":0}'::jsonb)
ON CONFLICT (key) DO NOTHING;
