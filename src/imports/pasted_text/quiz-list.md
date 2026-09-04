SYNAPSE MED — ADMIN UI
PROMPT #09 — QUIZ LIST

Design the Quiz List page for the SYNAPSE MED Admin Console.

The approved SYNAPSE MED Admin App Shell is immutable.

Reuse the exact approved SYNAPSE MED Design System:

- Sidebar
- Topbar
- Typography
- Color system
- Surface system
- Card system
- Button system
- DataTable system
- Status system
- Spacing system
- Icon system

DO NOT redesign the App Shell.

==================================================
1. PRODUCT PURPOSE
==================================================

The Quiz page is an educational assessment-management interface.

Its purpose is to allow authorized administrators to:

- browse quizzes
- locate quizzes
- understand which lecture a quiz belongs to
- inspect quiz configuration
- open quiz details
- access supported quiz-management actions

The page must feel like an educational content-management tool.

It is NOT:

- a student analytics dashboard
- a leaderboard
- a performance analytics dashboard
- an LMS marketing page

==================================================
2. QUIZ DOMAIN
==================================================

The Quiz domain contains:

Quiz
→ Questions
→ Attempts
→ Scoring

A Quiz is associated with a Lecture.

The UI must preserve this relationship.

Do not make Quiz appear as an independent unrelated object.

==================================================
3. PAGE HEADER
==================================================

Breadcrumb:

Admin / Quizzes

Title:

Quizzes

Subtitle:

Use concise operational copy.

Do not use marketing language.

==================================================
4. PRIMARY ACTION
==================================================

If quiz creation is supported:

Primary CTA:

Create Quiz

If creation is not confirmed:

Do not invent the CTA.

Do not automatically add:

- Import Quiz
- Export Quiz
- Generate Quiz with AI
- Duplicate Quiz

unless explicitly supported.

==================================================
5. SEARCH
==================================================

Create a prominent search field.

Placeholder:

Search quizzes...

Search should use only supported Quiz information.

Do not invent search fields.

==================================================
6. FILTERS
==================================================

Only include filters supported by the product model.

The Quiz is associated with a Lecture.

If lecture-based filtering is supported:

Filter by Lecture

may be used.

Do not invent:

- difficulty
- instructor
- category
- department
- student performance
- rating

unless explicitly defined.

==================================================
7. SUMMARY METRICS
==================================================

Do NOT automatically add KPI cards.

Do not invent:

Total Attempts

Average Score

Pass Rate

Completion Rate

unless these are explicitly available as approved Quiz-level metrics.

The list should remain content-first.

==================================================
8. QUIZ TABLE
==================================================

Use the approved SYNAPSE MED DataTable.

The table should prioritize:

Quiz identity

Lecture relationship

Approved quiz configuration

Approved status if one exists

Actions

==================================================
9. TABLE COLUMNS
==================================================

Only use fields supported by the Quiz model.

Potential conceptual structure:

Quiz

Lecture

Questions

Passing Score

Max Attempts

Actions

BUT:

Do not display a field unless it exists in the actual data contract.

Do not invent question counts or settings.

==================================================
10. QUIZ IDENTITY
==================================================

The Quiz title/name is the strongest element.

Secondary information may show:

Parent Lecture

if available.

The relationship should be easy to understand.

==================================================
11. QUESTION COUNT
==================================================

If question count is available:

Show it as compact metadata.

Example:

10 Questions

Do not fabricate the number.

Do not transform question count into an analytics metric.

==================================================
12. PASSING SCORE
==================================================

The Quiz system supports a passing score.

If the actual value is available:

Display it clearly.

Example:

Passing: 70%

Do not invent a default value.

Do not use a progress bar.

This is a configuration value, not student performance.

==================================================
13. MAX ATTEMPTS
==================================================

If max attempts is supported and available:

Display it compactly.

Example:

Max Attempts: 2

Do not invent the value.

Do not display unlimited unless explicitly represented by the product.

==================================================
14. QUIZ STATUS
==================================================

Do not invent a Quiz lifecycle.

If the Quiz model has no approved lifecycle:

Do not add:

Draft

Published

Archived

Active

Inactive

just because these are common in CMS systems.

If a status exists in the actual product specification:

Reuse the global status system.

==================================================
15. ROW ACTIONS
==================================================

Only expose supported actions.

Possible examples:

View

Edit

Manage Questions

View Attempts

BUT:

Do not automatically add all of them.

Only expose actions actually supported by the product workflow.

==================================================
16. BULK SELECTION
==================================================

Do not add checkboxes automatically.

Bulk operations require explicit product support.

==================================================
17. EMPTY STATE
==================================================

No quizzes:

No quizzes yet.

If quiz creation is supported:

[ Create Quiz ]

Filtered:

No quizzes match your current filters.

[ Clear Filters ]

Keep the empty state compact.

==================================================
18. LOADING STATE
==================================================

Use table skeletons.

Represent:

Quiz

Lecture

Configuration

Actions

Do not use a giant spinner.

==================================================
19. ERROR STATE
==================================================

Unable to load quizzes.

[ Try Again ]

Never expose technical errors.

==================================================
20. RESPONSIVE
==================================================

Desktop:

Full table.

Tablet:

Maintain readable data density.

Mobile:

Transform each quiz into a compact list item.

Show:

Quiz

Lecture

Primary configuration

Primary action

Do not squeeze all columns into mobile.

==================================================
21. RTL
==================================================

Support Arabic RTL.

Use logical spacing.

Mirror directional icons.

Maintain readable numeric values.

==================================================
22. VISUAL SYSTEM
==================================================

Maintain:

Deep Navy

White

Controlled Cyan

Muted text

Subtle semantic colors

Dark elevated surfaces

Subtle borders

Minimal shadows

No excessive gradients.

No glassmorphism.

No neon.

==================================================
23. DATA INTEGRITY
==================================================

Never invent:

- Quiz names
- Lecture names
- Question counts
- Passing scores
- Max attempts
- Statuses
- Attempts
- Scores
- Actions

If unknown:

Use —

==================================================
24. OUTPUT
==================================================

Create one high-fidelity desktop Quiz List screen.

Show:

- Approved App Shell
- Page Header
- Search
- Supported Filters
- Quiz DataTable
- Lecture relationship
- Supported configuration
- Actions
- Pagination
- Loading
- Empty
- Error

Do not create Quiz Editor in this prompt.

Do not create Attempts screen in this prompt.

==================================================
25. FINAL QUALITY BAR
==================================================

The page must feel:

Educational

Precise

Structured

Professional

Data-first

Consistent with SYNAPSE MED.

Do not make it resemble a generic survey builder.

Do not make it resemble a student-facing quiz screen.

This is an ADMIN management interface.