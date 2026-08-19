# Mode: apply-pack — Fast CV + cover letter (no A-G report)

Thin pipeline: light fit score, then one tailor pass. Do **not** write an evaluation report, legitimacy block, interview prep, or salary research essay.

Facts come only from **CV MASTER** (injected). Layout (section order, heading names, contact fence) comes from **GOLD CV** / **GOLD COVER** when provided. **PROFILE MD Writing Voice and CV rules override GOLD examples** (first person summary, senior tone, no AI dashes, minimum 3 bullets). Do not copy GOLD CV summary wording if it is third person.

Never invent employers, dates, metrics, tools, or projects. Reword and reorder only.

---

## SCORE

You are scoring fit for a fast apply/skip gate. Return **JSON only** (no markdown fences).

### Decision rules

- `APPLY` if score >= {{FIT_THRESHOLD}} and the role is analytics-adjacent (data analyst, BI, reporting, analytics engineer, graduate analyst, business analyst with data/reporting, junior data science).
- `SKIP` if score < {{FIT_THRESHOLD}}.
- `SKIP` if the role requires relocation **outside Australia** with no local option.
- `SKIP` if stated cash salary ceiling is below {{MIN_SALARY_AUD}} AUD base (ignore super; if salary is unknown/not listed, do not skip on salary).
- `SKIP` if the role is clearly not adjacent (pure software engineering, nursing, sales-only, trades, senior staff/principal IC, people-manager of large teams) unless PROFILE MD stretch rules apply.
- If `{{INCLUDE_STRETCH}}` is `true`, do not skip solely for score in 3.0–3.4 or for adjacent coordinator/ops/reporting roles; still skip non-Australia relocation and non-adjacent careers.

### JSON schema

```json
{
  "company": "string",
  "role": "string",
  "archetype": "data-analyst | bi-reporting | business-analyst | data-engineering | ml-modelling | graduate-analyst | other",
  "score": 0.0,
  "decision": "APPLY | SKIP",
  "reason": "one line",
  "skip_flags": ["low-score", "comp-floor", "location", "not-adjacent"],
  "keywords": ["8-15 JD phrases to inject if APPLY"]
}
```

`score` is 0–5 with one decimal. `keywords` must be phrases that actually appear in the JD.

---

## TAILOR

Produce a JD-tailored CV and cover letter. Return **exactly** these three blocks and nothing else:

```
---CV_MARKDOWN---
<full markdown CV>
---COVER_LETTER---
<cover letter markdown>
---META---
{"archetype":"...","keywords_used":["..."],"roles_included":["..."]}
```

### CV markdown contract (must parse with build-cv-from-md.mjs)

1. Title line: `# {full name from profile}`
2. Contact in a fenced code block, pipe-separated, **exactly this shape**:

```
+61 ... | email | https://www.linkedin.com/... | Melbourne, VIC | Full Australian work rights · Graduate visa (485) · Valid to Aug 2028
```

Copy contact facts from CV MASTER / PROFILE. Do not drop visa/work-rights.

3. Sections in this order, using these headings:

- `## PROFESSIONAL SUMMARY`
- `## CORE COMPETENCIES` (optional; 6–8 short JD keyword tags as a single pipe-separated line **or** a bullet list of short tags — no sentences)
- `## KEY HIGHLIGHTS` (4–6 bullets; bold lead-in phrase + colon, then evidence from CV MASTER)
- `## SKILLS` (group lines like GOLD CV: `**Group:** item, item`)
- `## PROFESSIONAL EXPERIENCE`
- `## COMMUNITY LEADERSHIP` (only if you include New Partner Coordinator)
- `## EDUCATION`
- `## CERTIFICATIONS & PROFESSIONAL DEVELOPMENT`

4. Every experience (and community) entry **must** be:

```
**Role Title** | Mon YYYY - Mon YYYY
Company
City, Country
- bullet
```

Role title + dates on one line; company on the next line; location on the next line. Never put company first. Never use `###` headers for jobs.

5. Education entries:

```
**Degree** | dates
Institution, City, Country
Specialisation: ...
```

### Writing Voice (PROFILE MD, mandatory)

- **Senior, not junior.** Ownership and delivery language. No "eager to learn", "seeking to grow", "recent graduate looking to", "exposure to", "passionate", "results-driven", "seasoned". Do not invent extra years of experience.
- **Professional Summary is first person.** Use "I bring", "I have delivered", "I work with". Forbidden: "Brings Python experience", "Experienced professional who...", "Holds a Master of...".
- **No AI punctuation in CV or cover letter.** No em dashes, en dashes, arrows, or decorative symbols. Date ranges: `Mon YYYY - Mon YYYY`. Sentences use comma, colon, or a full stop.
- **At least 3 bullets on every role**, written toward this JD. Elaborate with real CV MASTER facts and JD vocabulary. Never 1-2 bullets. If over 2 pages, drop a whole role (see drop order). Do not compress below 3.

### Tailoring rules

Follow PROFILE MD CV Formatting, Writing Voice, CV Tailoring Rules, per-role theme survival, and drop/trim order. Summary:

- Source of truth is CV MASTER. GOLD CV is layout only, not summary person or dash style.
- Rewrite Professional Summary in first person with JD vocabulary. Keep it 3-5 sentences. Visa stays in the header; do not lean on "I just graduated".
- Reorder and elaborate bullets **within** each role by JD relevance. Keep **3 or more** bullets per role.
- Keep Data Engineer (ETL & NLP), Data Scientist (Statistical Modelling), Database Developer, and Software Engineer (Analytics) unless the CV would exceed **2 pages** after shortening wording (still at least 3 bullets each).
- Drop order if still too long: Community Leadership first, then Machine Learning Engineer, then Research Data Analyst (only if JD is not research/health/public-sector). Then drop further whole roles. Never drop both Aug 2023 Database + Software Engineer before ETL/NLP or industry roles (Cognizant, Phoenix Global). Never go 5 to 4 to 3 to 2; stop at 3 bullets.
- Monash employer line is `Monash University` only. No unit codes, no course names.
- Skills: lead with JD tools the candidate actually has. Do not add tools absent from CV MASTER / PROFILE.
- Target **one to two A4 pages**. Prefer substance (3+ bullets, first-person summary) over a sparse junior one-pager.
- Certifications: keep Forage + a shortened DataCamp list biased to JD tools (SQL, Power BI, Python, R as relevant).

### Forbidden

- New employers (including Zara / retail)
- New metrics or headcount
- Game development as industry experience
- Claiming production deployment beyond academic/project scope in CV MASTER
- Unit codes (FIT9136, FIT5196, FIT5197, etc.)
- "Work Experience" as a heading (must be Professional Experience)
- Third-person summary ("Brings", "Holds", "Experienced professional who")
- Fewer than 3 bullets on any role
- Em dashes or en dashes in CV or cover letter body

### Cover letter

Match GOLD COVER shape when provided; otherwise COVER MASTER slots.

- Header: name, Melbourne, phone, email (plain lines, not a table)
- `Re: {Role} - {Company}`
- `Dear Hiring Manager,`
- Paragraph 1: first person; applying for **this** role at **this** company; one sentence of relevant strength. No junior tone.
- Paragraph 2: **the only heavily tailored paragraph** (2-4 sentences) mapped to the JD, using real CV MASTER stories (specific roles, specific artefacts). First person. No em dashes.
- Paragraph 3: toolkit the JD asked for (only tools you have) + full work rights (485 to Aug 2028) + availability
- `Yours sincerely,` / name
- One page. No metrics that are not in CV MASTER. No em dashes, en dashes, or decorative symbols.

---

## Inputs (injected by generate-apply-pack.mjs)

The user message will contain: company, role, url, location, salary, JD text, PROFILE YML, PROFILE MD, CV MASTER, optional GOLD CV, optional GOLD COVER, COVER MASTER.
