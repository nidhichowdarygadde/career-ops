# User Profile Context — Nidhi Chowdary Gadde

## Your Target Roles

| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
| **AI Solutions Analyst** | Multi-agent systems, RAG, LLM evaluation, enterprise automation | Someone who designs AI workflows that can actually run in an enterprise |
| **Business Analyst / Solutions Analyst** | Requirements, AS-IS/TO-BE, stakeholders, D365, process design | Someone who turns ambiguous needs into implementation-ready designs |
| **Data Analyst** | SQL, Python, dashboards, reporting, data quality | Someone who cleans data and delivers actionable insights |
| **Business Intelligence Analyst** | Tableau, Power BI, KPI tracking, operational reporting | Someone who builds reliable reporting for business teams |
| **Graduate / Junior Analytics** | Python foundations, statistics, visualisation, curiosity | Someone with current Australian industry proof plus applied masters depth |
| **Data Scientist (entry-level)** | ML basics, PySpark, pipelines, evaluation | Someone with masters projects beyond basic coursework |

## Your Adaptive Framing

| If the role is... | Emphasize about you... | Proof point sources |
|-------------------|------------------------|---------------------|
| **Any role (default lead)** | Current Melbourne industry work: enterprise multi-agent AI, D365 automation, requirements, Australian data residency | cv-master — **AI Solutions Analyst, Centelon Solutions (ALWAYS FIRST)** |
| AI / GenAI / agents / LLM | Multi-agent architecture, RAG, HITL workflows, LLM integration options, data residency | Centelon — bullets 1, 2, 3, 5, 6 |
| Business Analyst / solutions / consulting | Functional/non-functional requirements, AS-IS/TO-BE, stakeholder translation, feasibility | Centelon — bullets 7, 8, 2, 6, 1 |
| Automation / D365 / ERP | Agent-generated application objects, maintenance workflows, process orchestration | Centelon — bullets 6, 2, 1, 7, 8 |
| Data Analyst | Requirements, integrations, knowledge sources, decision support, stakeholder reporting | Centelon first, then Phoenix, Cognizant, Research Data Analyst, ETL/NLP, Statistical Modelling |
| Data Engineer (title on Centelon: never) | SharePoint/Azure/S3/API/DevOps integrations, knowledge architecture, CI/CD connectivity | Centelon bullet 5 as supporting proof; keep Centelon title as AI Solutions Analyst; use Monash **Data Engineer (ETL & NLP)** for DE depth |
| Statistical / inferential analytics | MLE, hypothesis testing, CI/CLT, linear regression, stepwise/BIC, RMSE, R | cv-master — **Data Scientist (Statistical Modelling & Predictive Analytics)** |
| R / caret ML pipelines | Random Forest, XGBoost, SVM, RFE, cross-validation, Kaggle-style evaluation | cv-master — **Data Scientist (Statistical Modelling & Predictive Analytics)** |
| Database / SQL / Backend data | Oracle DDL/DML, 3NF modelling, constraints, migrations, SQL analytics, MongoDB, data dictionaries | cv-master — Database Developer, Cognizant |
| BI / Reporting | Dashboard delivery, KPI monitoring, accuracy improvements | cv-master — Phoenix Global, Data Visualization Engineer, KEY HIGHLIGHTS |
| Data governance / stewardship | RBAC, data residency, knowledge sources, validation rules, metadata | Centelon bullets 3-5, then Database Developer, Research Data Analyst, ETL quality |
| Graduate / Junior | Current Australian industry role first (senior voice, never intern wording), then masters projects as professional experience | Centelon, then all Monash entries |
| ML / Data Science (junior) | PySpark pipelines, fraud analytics, supervised learning, evaluation, plus current LLM/agent work | Centelon bullets 1 and 3, then Data Science Lead, ML Engineer |
| Python / Software Engineer | OOP, file I/O, Pandas/NumPy, modular application design; API/sidecar coding approaches | Centelon bullet 3, Software Engineer (Analytics), Cognizant |

## Writing Voice (MANDATORY for every CV and cover letter)

These rules beat GOLD CV examples, apply-pack defaults, and `modes/pdf.md` if they conflict.

**Senior professional, not junior.** Write as someone who already owns delivery. Lead with outcomes, scope, stakeholders, quality, and tools you have used. Do **not** invent extra years of tenure. Do **not** use junior tells on the page: "eager to learn", "seeking an opportunity to grow", "recent graduate looking to", "exposure to", "assisted with" as the main verb, "passionate about", "results-driven", "seasoned". You may state Master of Data Science as a credential, not as a student identity.

**First person in the Professional Summary.** Never write implied third person ("Brings Python experience", "Experienced data professional who delivers", "Holds a Master of..."). Write "I": "I bring Python and SQL experience...", "I have delivered...", "I work with stakeholders to...". Experience **bullets** stay pronoun-free (standard achievement bullets: "Designed...", "Led..."), not "She designed" and not "Brings...".

**No AI punctuation.** Do not use em dashes (—), en dashes (–), arrows (→), ellipsis characters (…), or decorative symbols (•, ★, | in body prose). Date ranges use a normal hyphen: `Jun 2021 - Jul 2021`. In sentences, use a comma, colon, or a new sentence instead of a dash. Contact line may keep pipes.

**At least 3 bullets per role** (Centelon is the exception: **minimum 5, default 8**). Every Professional Experience and Community Leadership entry needs **3 or more** bullets, elaborated toward the JD (reorder, compress, inject real JD vocabulary). Never leave a role on 1-2 bullets. If the CV runs over 2 pages, shorten wording first, then drop a whole role using the drop order below. Never compress a non-Centelon role below 3 bullets. Never compress Centelon below 5.

## CV Formatting (Australian ATS — MANDATORY)

**Section heading:** `Professional Experience`. Never "Work Experience".

**Every experience entry must follow this order:**

1. **Job role** | dates (same line)
2. **Company** (own line — no location on this line)
3. **Location** (own line — city, state/country only)

**Example:**
```
**Data Analyst** | Jun 2021 - Jul 2021
Phoenix Global
Visakhapatnam, India
```

**Monash entries:** List employer as `Monash University` only. Do **not** include unit codes (e.g. FIT9136), course names, or "Introduction to Python" — present as professional project work, not coursework.

**HTML/PDF layout:** Role + dates in `.job-header`; company in `.job-company`; location in `.job-location`. Never put company first.

**Section order (MANDATORY for all CVs):**
1. Header (name, contact, visa)
2. Professional Summary
3. Core Competencies
4. **Skills** (immediately after Core Competencies — never at the bottom)
5. Professional Experience
6. Community Leadership
7. Education
8. Certifications & Professional Development

**Experience ordering:** **AI Solutions Analyst, Centelon Solutions** is always the first Professional Experience entry. Then other technical and analytics roles in reverse chronological order. **New Partner Coordinator** goes in a separate **Community Leadership** section (per `cv-master`) — never mixed into Professional Experience.

## CV Tailoring Rules (CRITICAL)

**Source of truth:** Always read **`cv-master`** before generating or editing any CV (master or JD-tailored). This is the canonical experience list with full bullets and updated role titles. Do **not** use `cv.md` for application CVs unless the user explicitly asks — `cv.md` may lag behind `cv-master`. Never maintain a separate hardcoded experience list in agent output.

**`cv-master` structure notes:**
- Contact line is plain text (not a fenced code block).
- **Lead role is always Centelon Solutions** (current Australian industry experience). See the mandatory Centelon section below.
- Monash roles use upgraded titles (e.g. **Data Engineer (ETL & NLP Pipelines)**, **Research Data Analyst (Public Health Data Integration)**).
- **New Partner Coordinator** lives under **`## COMMUNITY LEADERSHIP`**, not Professional Experience — keep it separate on tailored CVs; omit entirely before trimming technical roles.

### Centelon Solutions — MANDATORY lead role (never intern on paper)

This is Nidhi's **current professional Australian industry role**. It is the most important experience on every CV, cover letter, and apply pack. Do **not** ask the user to re-explain it.

**Never write on any candidate-facing document:** intern, internship, graduate intern, vacationer, placement, "assisting", "shadowing", "exposure to", "learning", or "supporting the team" as the main verb.

**Agent-only honesty (interviews / evaluations, not the CV):** the engagement is an internship. If a recruiter directly asks about employment type, be truthful without volunteering intern language on paper. Same pattern as Phoenix: functional title on the CV, honest if probed. Do not overclaim "led the platform" or "owned architecture"; use "contributed to architecture" for the overall system, and stronger verbs for work she designed (workflows, requirements, evaluations).

**Default title (use unless the JD clearly maps to an allowed variant):** `AI Solutions Analyst`

**Allowed title variants (change the title only; bullets stay from the bank below):**

| JD type | Title to use |
|---------|----------------|
| Default, GenAI, agents, LLM, RAG, AI analyst | **AI Solutions Analyst** |
| Business Analyst, requirements, process, consulting | **Business Analyst (AI Solutions)** |
| Solutions / technical BA / enterprise analysis | **Solutions Analyst** |
| D365, ERP, intelligent automation, RPA-adjacent | **AI Automation Analyst** |
| Data Analyst / analytics (do not retitle to Data Engineer) | **AI Solutions Analyst** or **Data & AI Analyst** |
| AI Engineer JD only | **AI Engineer (Solutions)** |

**Forbidden titles for this role:** Intern, Data Engineer, Solutions Architect, AI Architect, Data Scientist. Data Engineer is a poor match (this work is agent architecture, RAG, BA, and D365 automation, not ETL/warehousing). The Monash **Data Engineer (ETL & NLP)** entry already covers DE. Solutions Architect / AI Architect is too senior for "contributing to" architecture.

**Fixed lines:**
```
**{Title from table}** | Aug 2026 - Present
Centelon Solutions
Melbourne, Australia
```

If the user later confirms a different start month, update `cv-master`, `cv.md`, and this date. Until then use **Aug 2026 - Present**.

**Placement and volume (non-negotiable):**
1. Always the **first** Professional Experience entry on every CV.
2. Master / default CVs keep **all 8 bullets** below (most detailed role on the page).
3. JD-tailored CVs keep **5 to 8 bullets**. Reorder toward the JD. Never go below 5.
4. Professional Summary, Key Highlights, and cover-letter paragraph 2 **lead with Centelon**, then Monash/India proof.
5. **Never drop this role.** If the CV is over 2 pages, drop Community Leadership and then other roles. Shorten other roles before touching Centelon.

**Full bullet bank (source of truth — reword toward the JD, do not invent metrics or tools):**

1. **Multi-agent architecture.** Contributed to the architecture of an enterprise multi-agent, multi-LLM automation platform on Smart Agile Hub, integrating agent orchestration, RAG, knowledge sources, enterprise connectors, workflow orchestration, and conversational front-end interfaces.
2. **HITL / SLA workflows.** Designed and analysed agent workflows covering human approval, rejection, rework, workflow resumption, and SLA handling, converting operational processes into executable automation with human-in-the-loop controls.
3. **LLM strategy + Australian data residency.** Evaluated LLM integration strategies, including coding harnesses versus API and sidecar approaches, weighing security, performance, cost, token usage, and Australian data-residency requirements.
4. **RBAC / governance.** Analysed RBAC and access-control architecture, including tenant administration, domain roles, custom permissions, and workflow diagnostic access, to support governed enterprise use.
5. **Enterprise knowledge and integrations.** Assessed enterprise knowledge and integration approaches across SharePoint, Azure Blob, S3, APIs, GitHub, Azure DevOps, and CI/CD pipelines for retrieval, delivery, and environment connectivity.
6. **D365 F&O automation.** Defined AI automation for Microsoft Dynamics 365 Finance and Operations, including agents that interpret design documents, generate required application objects, and support maintenance and enhancement workflows.
7. **Requirements and process design.** Translated business and technical needs into functional, non-functional, and agent-specific requirements, AS-IS and TO-BE process models, solution options, and implementation priorities.
8. **Stakeholder delivery.** Partnered with platform architects, technical leads, and domain stakeholders to evaluate architecture options, test solution feasibility, and move discovery work into implementation-ready designs.

**Which bullets to lead with:**

| JD type | Keep first (still 5-8 total) |
|---------|------------------------------|
| Default / most CVs | 1, 3, 6, 7, 8, then 2, 5, 4 |
| BA / process / consulting | 7, 8, 2, 6, 1, then 3, 4, 5 |
| AI Engineer / GenAI / LLM | 1, 3, 2, 6, 5, then 7, 8, 4 |
| D365 / ERP / automation | 6, 2, 1, 7, 8, then 3, 5, 4 |
| Data Analyst / BI | 7, 5, 8, 3, 1, then 6, 2, 4 |
| Security / governance / identity | 4, 3, 5, 1, 7, then 8, 2, 6 |
| Data Engineer JD | Keep title **AI Solutions Analyst**; lead 5, 1, 3, 6, 7. Do not retitle this role Data Engineer. |

**Keywords to inject when the JD uses them (only if true to the bank):** multi-agent, multi-LLM, RAG, human-in-the-loop, agent orchestration, Smart Agile Hub, LLM selection, coding harness, API, sidecar, token usage, Australian data residency, RBAC, tenant administration, SharePoint, Azure Blob, S3, Azure DevOps, CI/CD, Microsoft Dynamics 365, Finance and Operations, design documents, application objects, functional requirements, non-functional requirements, AS-IS, TO-BE, solution options, workflow SLA.

### Masters projects under Professional Experience

Nidhi has limited industry tenure. **Keep Monash masters work under Professional Experience**, not a separate "Projects" section, unless a JD-specific one-page CV absolutely requires trimming.

**Default: include all experience entries from `cv-master`**, including:

| Role (cv-master title) | Dates | When to drop |
|------|-------|--------------|
| **AI Solutions Analyst (Centelon Solutions)** | **Aug 2026 – Present** | **NEVER DROP. Always first. Always 5-8 bullets.** Current Australian industry role. |
| New Partner Coordinator | Feb 2026 – Present | **Community Leadership section only** — never in Professional Experience. Drop first if over page limit |
| Research Data Analyst (Public Health Data Integration) | Feb 2025 – Jun 2025 | Keep for research, public-sector, health, governance, or social-impact JDs |
| Data Science Lead (Real-Time Fraud Analytics) | Jul 2024 – Nov 2024 | Keep for data engineering, PySpark, streaming, fraud, or scale JDs |
| Machine Learning Engineer (Project Lead) | Jul 2024 – Nov 2024 | Keep for ML, modelling, or Python-heavy JDs; merge bullets with fraud entry only if space-critical |
| Data Visualization Engineer | Jul 2024 – Nov 2024 | Keep for BI, Tableau, Power BI, visualisation, or stakeholder reporting JDs |
| **Data Engineer (ETL & NLP Pipelines)** | **Mar 2024 – May 2024** | **Keep for Data Analyst, Graduate, data quality, ETL, Python, SQL, NLP/text, or geospatial JDs.** Drop only after Aug 2023 Software Engineer/Database entries when space is tight |
| **Data Scientist (Statistical Modelling & Predictive Analytics)** | **Mar 2024 – May 2024** | **Keep for statistics, regression, hypothesis testing, R, inferential analytics, or modelling JDs.** Pair with Data Engineer entry; drop only after Aug 2023 roles when space is tight |
| **Software Engineer (Analytics & Data Applications)** | **Aug 2023 – Oct 2023** | **Keep for most Data Analyst / Graduate / Python / BI roles.** Drop only for senior roles where space is tight |
| **Database Developer** | **Aug 2023 – Oct 2023** | **Keep for SQL, Oracle, database design, data governance, metadata, data engineering, or analytics JDs.** Drop only after Software Engineer when space is tight — never drop both Aug 2023 roles for SQL-heavy JDs |
| Program Analyst (Cognizant) | Jan 2022 – May 2022 | Keep for SQL, enterprise, or testing JDs |
| Data Analyst (Phoenix Global) | Jun 2021 – Jul 2021 | Keep for BI, Tableau, Power BI, or dashboard JDs |

### Software Engineer (Analytics & Data Applications) entry — always tailor, rarely drop

**Title (fixed):** Software Engineer (Analytics & Data Applications)

**Organisation line:** Monash University / Melbourne, Australia (no unit codes or course names)

**Keywords to inject when JD mentions:** Python, Pandas, NumPy, Matplotlib, data wrangling, data visualisation, CSV, statistical summary, object-oriented programming, algorithms, property/real estate analytics.

**Best bullets to lead with (keep at least 3; pick the JD-closest three or more):**
1. Property investment tool — **118,000+ Melbourne sales records**, Pandas/NumPy/Matplotlib, histograms, sales trends
2. OOP retail advisor — file persistence, business rules, validation, exception handling
3. Custom algorithms — sorting, search, modular Python (only if JD mentions algorithms or CS fundamentals)

**Never invent:** game development as professional industry experience; claim production deployment beyond academic scope.

### Data Engineer (ETL & NLP Pipelines) entry — always tailor, rarely drop

**Title (fixed):** Data Engineer (ETL & NLP Pipelines)

**Organisation line:** Monash University / Melbourne, Australia (no unit codes, course names, or “FIT5196”)

**Keywords to inject when JD mentions:** data wrangling, data cleansing, data quality, ETL, missing data, imputation, outlier detection, EDA, regex, semi-structured data, XML, JSON, NLP, text preprocessing, tokenisation, NLTK, language detection, stemming, PMI/collocation, sparse vectors, pandas, scikit-learn, linear regression, NetworkX, Dijkstra, geospatial, Haversine, Box-Cox, normalisation, standardisation, feature engineering.

**All five themes must survive tailoring** (reorder and compress wording; do not omit a theme entirely):

1. **Operational data cleansing** — food-delivery orders, EDA, geospatial plots, NetworkX Dijkstra distances on road graph
2. **Quality fixes + imputation** — dates, coordinates, menu/time rules, branch assignment; Haversine + branch-specific linear regression for missing branch, distance, delivery_fee
3. **Semi-structured extraction** — regex/XML trademark records → 6,750+ JSON; date/country normalisation, missing-value rules
4. **NLP preprocessing** — 80,000+ YouTube comments; dedup, langdetect, tokenisation, PMI bigrams, Porter stemming, sparse count vectors
5. **Feature reshaping** — MinMax, standardisation, log, Box-Cox on suburb demographics for regression-ready features

**When trimming bullets (5 → 4 or 4 → 3):** Merge (1)+(2) into one cleansing/imputation bullet. **Stop at 3 bullets.** Do not merge further. If still over length, drop a less relevant *role*, not more bullets.

**Pair with:** Software Engineer (Analytics) or Database Developer (SQL quality) when JD stresses analytics stack breadth — do not drop ETL/NLP + both Aug 2023 roles for generic Data Analyst JDs.

### Data Scientist (Statistical Modelling & Predictive Analytics) entry — always tailor, rarely drop

**Title (fixed):** Data Scientist (Statistical Modelling & Predictive Analytics)

**Organisation line:** Monash University / Melbourne, Australia (no unit codes, course names, or “FIT5197”)

**Keywords to inject when JD mentions:** statistical modelling, inferential statistics, MLE, hypothesis testing, confidence intervals, CLT, linear regression, stepwise regression, BIC, RMSE, R², Monte Carlo simulation, R, caret, cross-validation, Random Forest, XGBoost, SVM, feature selection, RFE, classification, Kaggle.

**All five themes must survive tailoring** (reorder and compress wording; do not omit a theme entirely):

1. **Inferential statistics** — MLE, CI sample-size design, CLT, hypothesis tests (goodness-of-fit, business claims)
2. **Monte Carlo simulation** — inverse-transform sampling, CDF/quantile derivation, 99,999-draw validation
3. **Linear regression** — MLR on ~600-row survey, R² 0.775, p < 0.01 screening, BIC stepwise, two-predictor rMSE search
4. **Regression ML pipeline** — RF vs XGBoost, 10-fold CV, validation RMSE 8.10, Kaggle export
5. **Classification pipeline** — one-hot encoding, RFE, KNN/SVM/RF/GBM benchmark, SVM deployment (5-class)

**When trimming bullets (5 → 4 or 4 → 3):** Merge (1)+(2) into one inferential/simulation bullet. **Stop at 3 bullets.** Do not merge further. If still over length, drop a less relevant *role*, not more bullets.

**Pair with:** Data Engineer (ETL & NLP Pipelines) for analytics breadth; Machine Learning Engineer (Project Lead) for supervised-learning JDs — do not drop Statistical Modelling + ETL/NLP for generic Data Analyst JDs.

### Database Developer entry — always tailor, rarely drop

**Title (fixed):** Database Developer

**Organisation line:** Monash University / Melbourne, Australia (no unit codes, course names, or “Introduction to Databases”)

**Keywords to inject when JD mentions:** SQL, Oracle, PostgreSQL, database design, data modelling, ER diagram, normalisation, 3NF, DDL, DML, schema, constraints, foreign keys, transactions, migrations, relational algebra, aggregations, subqueries, JSON, MongoDB, NoSQL, data integrity, clinic/operational data.

**All four highlights must survive tailoring** (reorder and compress wording; do not omit themes):

1. **Design pipeline** — requirements → Crow’s-foot ERD → UNF–3NF normalisation → logical model (Oracle Data Modeler)
2. **Oracle implementation** — 13+ tables, PK/FK, CHECK, surrogate keys, bridge/associative entities, column comments, visits/prescribing/services/billing
3. **Operational SQL** — hand-coded DDL/DML, sequences, transactional booking/reschedule/cancel, live ALTER (M:N emergency contacts, appointment counts, nurse training structure)
4. **Query & hybrid storage** — relational algebra, multi-table analytics, JSON_OBJECT/JSON_ARRAYAGG, MongoDB insert/find/update on nested documents

**When trimming (4 → 3):** Merge (1)+(2) into one design/deploy bullet; keep (3) and (4) as the other two. **Never go below 3 bullets.** If still over length, drop a less relevant *role*.

**Pair with Cognizant** when JD stresses enterprise SQL — Cognizant first for industry tenure, Database Developer for design depth.

### JD-tailored PDF flow

When customising for a job description (`modes/pdf.md`):

1. Read **`cv-master`** + this file + JD (never skip `cv-master`)
2. Rewrite **Professional Summary** in **first person** ("I bring...", "I have delivered...") with JD keywords. Pull metrics and bullets from `cv-master`, not memory. No em dashes or en dashes in summary, bullets, or cover letter.
3. **Reorder and elaborate bullets within each role** toward the JD. Keep **at least 3 bullets** on every role, and **5-8 bullets on Centelon**. Do not drop **Centelon**, **Data Scientist (Statistical Modelling)**, **Data Engineer (ETL & NLP)**, **Database Developer**, or **Software Engineer (Analytics)** unless the CV exceeds 2 pages after shortening wording — and even then, **never drop Centelon**.
4. If trimming for length: shorten bullets first, then reduce bullets per role only as far as **3** (Centelon only as far as **5**). Then drop the least relevant **whole role**. Never leave 1-2 bullets. Drop order: Community Leadership (New Partner Coordinator) → Research Data Analyst (if non-research JD) → ML Engineer entry → **never drop both** Aug 2023 Database + Software Engineer entries before ETL/NLP or industry roles. **Never drop Centelon.** For stats/regression/R JDs, never drop Statistical Modelling before ETL/NLP; for SQL/Data Analyst/wrangling JDs, follow the same drop order while keeping Centelon first.
5. Write HTML from `templates/cv-template.html`; output to `output/cv-nidhi-chowdary-gadde-{company-slug}-{YYYY-MM-DD}.pdf`
6. Master (non-tailored) PDF: use full **`cv-master`** content → `output/cv-nidhi-chowdary-gadde-master-{YYYY-MM-DD}.pdf`

**Output location (MANDATORY):** Put every tailored CV and cover letter **directly in `output/`** (flat). Do **not** create a new folder per job, and do **not** copy packs into Job Applications subfolders. Nidhi picks files up by sorting `output/` on date modified.

Naming:
- CV: `output/cv-nidhi-chowdary-gadde-{company-slug}-{YYYY-MM-DD}.pdf` (matching `.md` / `.html` beside it if needed)
- Cover letter: `output/cover-letter-{company-slug}-{YYYY-MM-DD}.docx` (matching `.md` beside it)
- If two roles at the same company on the same day, add a short role slug: `{company-slug}-{role-slug}`

## Employment Gap & Role Flexibility (agent-only context)

- **Priority:** Avoid a long post-masters gap — harder to explain and harder to land analytics roles. Willing to consider **adjacent** roles (e.g. coordinator, ops, reporting-heavy contracts) if they provide **paid tenure**, professional references, and skills that do not block a return to data/BI.
- **When evaluating "stretch" roles:** Score north-star lower but do not auto-discard if comp/location/visa work and there is a credible **pivot narrative** (Excel/Power BI, ticketing, SLAs, stakeholder comms). Flag trade-offs explicitly; suggest a short recruiter call to validate reality vs wishlist.
- **Current professional role (MUST be on every CV):** **AI Solutions Analyst, Centelon Solutions, Melbourne** (Aug 2026 - Present). Lead role. Never labelled intern. Full rules in the Centelon section above.
- **Current work (do NOT put on cv.md or tailored CVs):** Casual **retail sales assistant at Zara** (Melbourne). Use only for agent context and transferable-skill framing in evaluations/interview prep.
- **Zara → transferable skills (not on resume):** fast-paced customer service, handling objections, upselling within process, accuracy under pressure, rostered shift reliability, teamwork on busy floors, following brand/compliance standards, reading customer needs quickly — maps to client-facing ops, SLA-driven queues, and professional communication in coordinator roles.
- **Comms preference (May 2026):** Recovering from wisdom teeth extraction — prefer **email only** for ~3–4 days; defer recruiter calls until **next week** when able to speak comfortably.

## Your Exit Narrative

Currently delivering enterprise AI solution analysis in Melbourne at Centelon Solutions (multi-agent automation, D365, requirements, Australian data residency), backed by a Master of Data Science (Monash, Sep 2025) and applied analytics depth in Python, SQL, and visualisation. Targeting AI solutions, business analysis, and data/analytics roles where technical design and stakeholder translation both matter.

## Your Cross-cutting Advantage

**Research-to-reporting pipeline:** comfortable with messy public datasets, statistical summaries, and visuals that non-technical stakeholders can act on — not just notebook exploration.

## Your Comp Targets

- Target: **AUD 80K–100K + super** (see `config/profile.yml`)
- **Hard floor: AUD 80K+ base + super** — this is not just a preference; higher income directly strengthens 189/190 permanent residency applications (points test + income threshold). Part-time roles only qualify if actual annual earnings meet this bar.
- Frame by **AI Solutions Analyst / Business Analyst / Data Analyst** titles, not generic "IT"
- Melbourne market; full work rights on subclass 485 until August 2028

## Visa Strategy Context

- Currently on **subclass 485** (Graduate visa), valid to **Aug 2028**
- Planning to apply for **189 (Skilled Independent)** or **190 (State Nominated)** permanent residency
- Higher salary strengthens the application — roles paying AUD 80K+ base plus super are strongly preferred
- Penalise part-time roles unless they meet the income threshold on actual annual earnings (not just FTE equivalent)
- **Exception:** If the pipeline is dry and strong-fit roles are scarce, a below-threshold role with genuine skill alignment can be kept as a stepping stone — flag it clearly but don't auto-discard

## Your Location Policy

- **Preferred:** Melbourne, hybrid or on-site
- **Visa:** Subclass 485, full work rights — state clearly in CV header/contact block
- **Remote:** Open within Australia for strong-fit roles
- **Scoring:** Do not penalise hybrid Melbourne roles; penalise only if JD requires relocation outside Australia without sponsorship path
