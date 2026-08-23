# Business Analyst Interview Q&A — Honest Prep
**Nidhi Chowdary Gadde · Aligned to cv-ba-retained.pdf · June 2026**

> Every answer below matches your current resume. No inflated metrics. Lead with Monash for depth; use Phoenix/Cognizant for industry context.

---

## 1. Opening

**Q: Tell me about yourself.**

**A:** I'm Nidhi, a Business Analyst based in Melbourne with a Master of Data Science from Monash. My strongest work is project delivery — integrating public-health datasets, building stakeholder dashboards, designing databases from business requirements, and leading a fraud analytics project across five million transactions. Before Monash, I worked at Phoenix Global and Cognizant doing SQL, Python, and Tableau analytics in enterprise team settings. I'm looking for BA roles where I gather requirements, improve reporting quality, and translate data into decisions people trust.

**Q: Why Business Analyst?**

**A:** I enjoy the bridge between business questions and delivered solutions — clarifying what people need, documenting it, and making sure the final report, dashboard, or system actually answers the question. My data background helps me validate outputs in SQL and BI tools instead of guessing.

**Q: Why should we hire you?**

**A:** I'm early-career as a BA by title, but I have substantive project proof at Monash — requirements, data quality, dashboards, documentation, and team leadership on fraud analytics. I also have real industry experience with SQL, Python, and Tableau. I document clearly, learn domains quickly, and communicate to non-technical audiences.

**Q: What's your weakness?**

**A:** I can go deep on data quality because I want reporting to be trusted. I'm learning to timebox discovery and agree what's good enough for this sprint with stakeholders before doing extra analysis.

**Q: Day rate / salary expectations?**

**A:** I'm flexible depending on scope and responsibility. What range did you have in mind for this role? I'm open to a fair rate that matches the work I'll own.

---

## 2. Core BA

**Q: What does a Business Analyst do?**

**A:** A BA connects business problems to solutions — eliciting requirements, documenting processes and rules, defining acceptance criteria, working with developers and testers, and ensuring the outcome solves the real need. I also translate between technical and non-technical stakeholders.

**Q: BA vs Data Analyst?**

**A:** A Data Analyst focuses on analysing data and producing insights. A BA owns the broader problem — who is affected, what the process should be, what the solution must do, and whether delivery matches intent. I use data skills to support requirements and validate outcomes.

**Q: Walk me through requirements gathering.**

**A:** (1) Identify stakeholders — who decides, uses, builds. (2) Clarify the business problem — what decision is broken? (3) Document AS-IS process and data sources. (4) Define TO-BE outcomes and success metrics. (5) Write functional, non-functional, and data requirements. (6) Validate with walkthroughs and sign-off. (7) Support build, UAT, and changes. Example: on my public-health project I aligned research stakeholders on data requirements and validation rules before building dashboards.

**Q: Conflicting stakeholders?**

**A:** I restate each ask in outcome language and bring people to one conversation. If conflict remains, I present options with impact and document the decision and approver.

**Q: Acceptance criteria — example?**

**A:** For a reporting story: dashboard shows agreed metric for defined date range; data refreshes on schedule; filters match spec; totals reconcile to source SQL within agreed tolerance; access restricted to defined roles.

**Q: MoSCoW prioritisation?**

**A:** Must have / Should have / Could have / Won't have this release — prioritised with sponsor on business impact and dependencies.

**Q: UAT support?**

**A:** UAT scripts from acceptance criteria, business testers, test data, defect logging with reproduction steps, triage with dev/QA, retest and sign-off.

**Q: AS-IS / TO-BE documentation?**

**A:** Interview process owners, draft flows, validate, note pain points, design TO-BE with automation or new data flows. On my database project I used ER diagrams and data dictionaries the same way — make rules visible.

---

## 3. Technical

**Q: INNER vs LEFT JOIN?**

**A:** INNER JOIN returns only matching rows from both tables. LEFT JOIN keeps all rows from the left table and matches from the right; non-matches are NULL. I use LEFT JOIN when I need a full master list even without matches — e.g. all customers including those with no orders this month.

**Q: Dashboard doesn't match finance — what do you do?**

**A:** Align definitions (date range, filters, gross vs net); compare row counts and keys; check join duplication; review nulls and excluded statuses; run reconciliation SQL side by side; fix metric definition or ETL rule and document it. At Phoenix I applied cleaning and validation checks so dashboard inputs were more consistent.

**Q: What is normalisation / 3NF?**

**A:** Organising data to reduce redundancy and update anomalies. 3NF removes transitive dependencies — non-key fields depend only on the key. I applied this in my Oracle database project across clinical, operational, and billing domains.

**Q: How do you define a KPI?**

**A:** Measurable value tied to a business objective, with owner, formula, data source, refresh frequency, and target. Weak: "customer happiness." Strong: "% tickets resolved within 24 hours from ServiceNow, reviewed weekly by Ops Manager."

**Q: Executive vs analyst dashboards?**

**A:** Executives: few metrics, trends, RAG status — "are we on track?" Analysts: drill-down, filters, exports — "why did this move?"

**Q: Agile experience?**

**A:** At Cognizant I worked in agile delivery cycles with Jira for task tracking and coordination with developers. At Monash I tracked milestones and documentation on team projects.

**Q: SQL level?**

**A:** Strong intermediate — joins, aggregations, subqueries, reporting queries, documentation of query logic. Not production DBA level.

**Q: Tableau / Python level?**

**A:** Tableau for interactive dashboards (Phoenix and Monash viz work). Python for analysis, cleaning, and structured summaries (Phoenix, Cognizant, Monash).

---

## 4. Industry Roles (Honest)

### Phoenix Global — Data Analyst (Jun–Jul 2021)

**Q: Describe this role.**

**A:** Short early-career industry role. I developed Tableau dashboards and Python analyses for operational reporting and internal reviews, did exploratory analysis on business datasets, applied cleaning and validation checks, and worked with the analytics team to turn business questions into visual reports. If probed on scope: it was internship-style in duration and depth, though the title was Data Analyst.

**Q: What tools?**

**A:** Tableau and Python primarily.

**Q: What did you not do there?**

**A:** I did not own enterprise KPI programmes end-to-end or present to executive leadership. It was team-based analytics delivery at junior scope.

### Cognizant — Program Analyst (Jan–May 2022)

**Q: Describe this role.**

**A:** I authored SQL for extraction, reporting, and database operations on large operational datasets, ran Python analysis with structured summaries for team review, documented query logic and outputs for traceability, and worked in agile cycles with Jira alongside developers.

**Q: Did you lead agile?**

**A:** No — I participated in agile delivery and task tracking; I did not run ceremonies or own backlog prioritisation.

---

## 5. Monash Projects (Go Deep Here)

### Public Health Data Integration (Feb–Jun 2025)

**Q: Describe the project.**

**A:** Integrated ABS, NDIS, Victorian education, and health data to analyse autism prevalence and demographics. I defined data requirements with research stakeholders, built validation rules for heterogeneous datasets, and delivered dashboards on prevalence and trends that supported published research and policy recommendations.

**Q: Hardest part?**

**A:** Different formats, linkage keys, and definitions across agencies — solved with a validation framework and documented merge rules.

**Q: How did you validate dashboards?**

**A:** Reconciliation counts, research team review, sense-checks against known demographic patterns.

### Data Visualization Engineer (Jul–Nov 2024)

**Q: Describe the project.**

**A:** Built Tableau and R Shiny dashboards for public-health and urban development data. Merged mental-health datasets, surfaced policy-relevant trends, and designed drill-down views for non-technical audiences across 2014–2023 data.

**Q: Chart choice?**

**A:** Match visual to question — trend = line, composition = stacked bar, geography = choropleth; clear labels and accessible colour choices.

### Fraud Analytics Lead (Jul–Nov 2024)

**Q: Describe the project.**

**A:** Led a cross-functional team delivering fraud monitoring on five million-plus e-commerce transactions — from requirements through stakeholder review, with documentation standards and milestone tracking.

**Q: Precision vs recall (simple)?**

**A:** Precision = of flagged transactions, how many are truly fraud. Recall = of all fraud, how much we catch. Higher recall can mean more false positives — bad customer experience. The business chooses the threshold.

**Q: Non-technical summary?**

**A:** We monitored suspicious behaviour at scale while tracking trade-offs between catching fraud and blocking legitimate customers.

### Database Developer (Aug–Oct 2023)

**Q: Describe the project.**

**A:** Translated business requirements into Oracle 12c design — ER modelling, 3NF, constraints, SQL reporting, JSON export, data dictionaries and relationship diagrams for clinical, operational, and billing domains.

**Q: Example business rule in schema?**

**A:** Scheduling constraints, cancellation logic, CHECK constraints on valid dates, referential integrity so reports don't double-count.

---

## 6. Behavioral (STAR)

**Q: Most impactful project?**

**A:** Public health integration OR fraud lead — use full project answer from Section 5 with Situation, Task, Action, Result.

**Q: Difficult stakeholder / teamwork?**

**A:** Multidisciplinary research stakeholders on public-health project — aligned on shared research questions and validation rules before debating visuals.

**Q: Leadership?**

**A:** Fraud analytics — coordinated milestones, documentation standards, cross-functional delivery on five million transactions.

**Q: Mistake?**

**A:** On a project, wrong assumption in data merge early on — fixed with validation rules and peer review; now I validate definitions before building outputs.

**Q: Learn something quickly?**

**A:** Fraud and public-health domains were new — glossary with stakeholders, small prototypes early, document assumptions.

---

## 7. Tricky Questions

**Q: Limited industry tenure?**

**A:** True — Phoenix and Cognizant were short early roles. My depth is Monash project delivery; industry gave me SQL, Python, Tableau, and enterprise team rhythm.

**Q: Monash = coursework?**

**A:** Graduate project work with real datasets, stakeholder outputs, and team delivery — present it as professional project experience, not casual assignments.

**Q: Are you technical enough?**

**A:** Yes for a data-heavy BA — SQL, Python, Tableau, documentation. I'm not a solution architect; I ensure what's built matches what was asked.

---

## 8. Questions To Ask Them

1. What does success look like in the first 30 days?
2. Who are the main stakeholders day to day?
3. Reporting/analytics BA or systems/process change BA?
4. Will I partner with a senior BA or own a workstream?
5. What's the biggest requirement ambiguity right now?

---

## 9. Cheat Sheet

**Lead with:** Monash — public health, fraud lead, database, visualisation  
**Industry:** Phoenix (Tableau/Python) · Cognizant (SQL/Python/Jira)  
**Numbers you can defend:** 5M+ transactions · multidisciplinary stakeholders · validation frameworks · 3NF schema · published research support  
**Close:** "I'm interested — what are the next steps?"
