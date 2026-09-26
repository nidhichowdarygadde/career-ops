# profile/

Your master CV and cover letter, plus the tailored versions that `generate-apply-pack.mjs`
uses as style references when it writes a new application.

Everything in here except this README is gitignored — these documents contain your name,
phone number, and full work history, so they stay on your machine.

## Layout

| Path | Purpose |
|------|---------|
| `cv-master.md` | Master CV. Falls back to root `cv.md` if absent. |
| `cover-letter-master.md` | Master cover letter (optional). |
| `cv-samples/` | Tailored CVs used as gold references per archetype. |
| `cover-letter-samples/` | Tailored cover letters used as gold references per archetype. |

## Archetype mapping

`generate-apply-pack.mjs` picks a gold sample based on the archetype it scores a job into
(`PATHS.gold` and `PATHS.goldCover`). To point an archetype at a different sample, add the
file here and update those two maps.

Generated applications are written to `output/`, never here.
