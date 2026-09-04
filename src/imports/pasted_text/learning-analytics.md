SYNAPSE MED ADMIN CONSOLE
ANALYTICS
SCREEN 26 — LEARNING ANALYTICS

==================================================
EXECUTION CONTEXT
==================================================

Location:

Admin Console
→ Sidebar
→ Analytics
→ Learning

This screen belongs to the existing SYNAPSE MED Admin Console.

Reuse the approved:

- App Shell
- Sidebar
- Topbar
- Typography
- Color tokens
- Cards
- Charts
- Filters
- Tables
- Tooltips
- Spacing
- Buttons

Do NOT redesign the navigation.

Do NOT create a generic analytics template.

The screen must be populated with the sample dataset below.

==================================================
1. PURPOSE
==================================================

Learning Analytics provides administrators with a high-level view
of learner activity and learning outcomes.

The screen should help answer:

- How many learners are actively learning?
- How many courses are being completed?
- How are quiz attempts progressing?
- Which courses have the highest completion volume?
- How does learning activity change over time?

Do NOT show medical performance or clinical outcomes.

==================================================
2. FILTER BAR
==================================================

Date Range:

01 Mar 2026 — 31 Mar 2026

Controls:

Date Range

Course

Revision

Student Status

Default:

All Courses
All Revisions
Active Students

Primary filter action:

Apply

Secondary:

Reset

==================================================
3. KPI CARDS
==================================================

Card 01:

Active Learners

1,082

Card 02:

Course Completions

324

Card 03:

Quiz Attempts

1,864

Card 04:

Average Quiz Score

82%

IMPORTANT:

82% is sample UI data only.

Do not infer or calculate additional metrics.

==================================================
4. CHART — ACTIVE LEARNERS
==================================================

Title:

Active Learners

Sample weekly data:

Week 1:
246

Week 2:
271

Week 3:
283

Week 4:
282

Use a line/area visualization consistent with the existing
analytics design language.

Do not use a decorative graph.

==================================================
5. CHART — COURSE COMPLETIONS
==================================================

Title:

Course Completions

Week 1:
68

Week 2:
79

Week 3:
84

Week 4:
93

Show clear axis labels.

==================================================
6. COURSE PERFORMANCE TABLE
==================================================

Title:

Course Learning Summary

Rows:

Advanced Cardiology
Active Learners: 312
Completions: 96
Quiz Attempts: 482

Emergency Medicine Essentials
Active Learners: 274
Completions: 78
Quiz Attempts: 396

Internal Medicine Review
Active Learners: 221
Completions: 64
Quiz Attempts: 341

Clinical Pharmacology
Active Learners: 156
Completions: 51
Quiz Attempts: 287

Neurology Board Review
Active Learners: 119
Completions: 35
Quiz Attempts: 358

Columns:

Course

Active Learners

Completions

Quiz Attempts

Actions

==================================================
7. ACTION
==================================================

Course row:

View Course Analytics

Only use this action if the application has a corresponding
destination.

==================================================
8. EMPTY STATE
==================================================

If no analytics data exists:

No learning data is available for the selected period.

[ Reset Filters ]

Do not show fake charts with zero-filled data.

==================================================
9. ERROR
==================================================

Unable to load learning analytics.

[ Try Again ]

==================================================
10. LOADING
==================================================

Use:

KPI skeletons

Chart skeletons

Table skeleton rows

Keep:

Sidebar

Topbar

Page Header

visible.

==================================================
11. RESPONSIVE
==================================================

Desktop:

Two-column analytics layout.

Tablet:

Charts stack.

Mobile:

Single-column.

Course table becomes stacked cards.

Do not make charts unreadable.

==================================================
12. RTL
==================================================

Support Arabic RTL.

Charts must preserve readable numerical axes.

Emails/technical IDs remain LTR where applicable.

==================================================
13. VISUAL RULES
==================================================

Analytics should feel:

Clear
Professional
Data-focused
Quiet

Avoid:

3D charts
Heavy gradients
Glassmorphism
Excessive shadows
Huge numbers
Decorative illustrations

==================================================
14. OUTPUT
==================================================

Generate a populated high-fidelity desktop screen.

The screen must visibly contain:

- Filter bar
- 4 KPI cards
- 2 charts
- Course Learning Summary table
- 5 populated course rows

Do not leave analytics sections empty.