# profile/

Your master cover letter, plus the tailored CVs and letters that `generate-apply-pack.mjs`
uses as style references when it writes a new application.

Your CV itself is **not** here — `cv.md` in the project root is the single source of truth
for that, and both the master CV build and every tailored resume read from it.

Everything in here except this README is gitignored — these documents contain your name,
phone number, and full work history, so they stay on your machine.

## Layout

| Path | Purpose |
|------|---------|
| `cover-letter-master.md` | Master cover letter (optional). |
| `cv-samples/` | Tailored CVs used as gold references per archetype. |
| `cover-letter-samples/` | Tailored cover letters used as gold references per archetype. |

## Archetype mapping

`generate-apply-pack.mjs` picks a gold sample based on the archetype it scores a job into
(`PATHS.gold` and `PATHS.goldCover`). To point an archetype at a different sample, add the
file here and update those two maps.

Generated applications are written to `output/`, never here.
