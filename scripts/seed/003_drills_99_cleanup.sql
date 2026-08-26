-- ============================================================
-- 003 — Final step: remove the superseded original seed
--
-- Run ONLY after every part above has completed.
--
-- The inserts above key on slug. Rows from the original seed have slug NULL,
-- so nothing overwrote them and they are still present — roughly 253 thin rows
-- with no instructions, cues or variations, sitting alongside the 280 new ones.
-- Leaving them means the library shows duplicates.
-- ============================================================

-- Check first — expect 280 with a slug, ~253 without.
SELECT count(*) FILTER (WHERE slug IS NOT NULL) AS new_rows,
       count(*) FILTER (WHERE slug IS NULL)     AS legacy_rows,
       count(*)                                 AS total
FROM public.drills;

-- Then remove the legacy rows.
DELETE FROM public.drills WHERE slug IS NULL;

-- Confirm: 280 rows, all with content.
SELECT count(*) AS total,
       count(instructions) AS with_instructions,
       count(coaching_cues) AS with_cues
FROM public.drills;
