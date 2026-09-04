SYNAPSE MED ADMIN CONSOLE
ACCESS MANAGEMENT
SCREEN 12 — ACCESS LIST

==================================================
EXECUTION CONTEXT
==================================================

This screen is located at:

Admin Console
→ Sidebar
→ Access

Entry point:

Sidebar → Access

The screen is part of the existing SYNAPSE MED Admin Console.

Reuse the approved:

- Sidebar
- Topbar
- Typography
- Colors
- Cards
- DataTable
- Buttons
- Inputs
- Status badges
- Dropdowns
- Modals
- Pagination
- Spacing
- Icons

Do NOT redesign the App Shell.

This must be a populated production-like screen.

DO NOT create an empty wireframe.

DO NOT use lorem ipsum.

DO NOT use generic names such as John Doe.

Use the exact sample dataset below.

==================================================
1. PRODUCT PURPOSE
==================================================

The Access screen allows administrators to inspect student access
to educational content.

An Access record can relate a Student to:

- Course
- Revision

The screen must answer:

WHO has access?

WHAT do they have access to?

WHAT TYPE of access is it?

WHEN was it granted?

WHAT is the current access state?

This is an ACCESS MANAGEMENT screen.

It is NOT:

- Billing
- Payments
- Revenue
- Subscription management
- Student progress analytics

==================================================
2. SAMPLE DATA
==================================================

ACCESS 01

Student:
Ahmed Hassan

Email:
ahmed.hassan@example.com

Target:
Advanced Cardiology

Target Type:
Course

Revision:
—

Status:
Active

Granted:
12 Mar 2026


ACCESS 02

Student:
Mariam Adel

Email:
mariam.adel@example.com

Target:
Cardiology — 2026 Update

Target Type:
Revision

Course:
Advanced Cardiology

Status:
Active

Granted:
14 Mar 2026


ACCESS 03

Student:
Omar Khaled

Email:
omar.khaled@example.com

Target:
Emergency Medicine Essentials

Target Type:
Course

Revision:
—

Status:
Active

Granted:
18 Mar 2026


ACCESS 04

Student:
Sara Mohamed

Email:
sara.mohamed@example.com

Target:
Emergency Medicine — Spring 2026

Target Type:
Revision

Course:
Emergency Medicine Essentials

Status:
Active

Granted:
20 Mar 2026


ACCESS 05

Student:
Youssef Ali

Email:
youssef.ali@example.com

Target:
Internal Medicine Review

Target Type:
Course

Revision:
—

Status:
Revoked

Granted:
05 Feb 2026


ACCESS 06

Student:
Nour Ibrahim

Email:
nour.ibrahim@example.com

Target:
Neurology — Archived 2025

Target Type:
Revision

Course:
Neurology Board Review

Status:
Inactive

Granted:
11 Jan 2025

==================================================
3. PAGE HEADER
==================================================

Breadcrumb:

Admin / Access

Title:

Access

Description:

Manage student access to courses and revisions.

Primary action:

Grant Access

==================================================
4. SUMMARY CARDS
==================================================

Display four compact cards.

Total Access Records:

6

Active:

4

Revision Access:

3

Course Access:

3

Do not add:

Revenue

Payments

Subscriptions

==================================================
5. SEARCH
==================================================

Search:

Search students, courses, or revisions...

Use one unified search field.

Do not add unnecessary advanced search UI.

==================================================
6. FILTERS
==================================================

Status:

All
Active
Inactive
Revoked

Target Type:

All
Course
Revision

Course:

All Courses
Advanced Cardiology
Emergency Medicine Essentials
Internal Medicine Review
Neurology Board Review

==================================================
7. TABLE
==================================================

Columns:

Student

Target

Type

Status

Granted

Actions

==================================================
8. STUDENT CELL
==================================================

Show:

Ahmed Hassan

Secondary:

ahmed.hassan@example.com

Use the existing avatar/identity pattern.

==================================================
9. TARGET CELL
==================================================

For Course access:

Advanced Cardiology

For Revision access:

Cardiology — 2026 Update

Secondary:

Advanced Cardiology

Only show the Course as secondary information
when the target is a Revision.

==================================================
10. TYPE
==================================================

Use compact semantic badge:

Course

or

Revision

Do not use two unrelated visual styles.

==================================================
11. STATUS
==================================================

Use the global status system.

Active:

Positive semantic treatment

Inactive:

Muted

Revoked:

Destructive/subdued semantic treatment

==================================================
12. ACTIONS
==================================================

For Active:

View

Revoke Access

For Inactive:

View

For Revoked:

View

Do not automatically provide:

Edit Access

Transfer

Extend

unless explicitly supported.

==================================================
13. GRANT ACCESS
==================================================

Primary CTA:

Grant Access

Clicking opens the Grant Access workflow.

Do not open a giant modal.

Use a dedicated drawer/page if the existing product flow supports it.

==================================================
14. EMPTY STATE
==================================================

No records:

No access records yet.

[ Grant Access ]

Filtered:

No access records match your filters.

[ Clear Filters ]

==================================================
15. LOADING
==================================================

Show populated table skeletons.

Keep:

Sidebar

Topbar

Page Header

visible.

==================================================
16. ERROR
==================================================

Unable to load access records.

[ Try Again ]

==================================================
17. RESPONSIVE
==================================================

Desktop:

Full DataTable.

Tablet:

Scrollable table.

Mobile:

Stack each record.

Show:

Student

Target

Type

Status

Action

==================================================
18. RTL
==================================================

Support Arabic RTL.

Mirror:

Navigation

Action menus

Directional icons

Table alignment where appropriate.

Keep email and technical identifiers LTR.

==================================================
19. VISUAL RULES
==================================================

Maintain the SYNAPSE MED identity.

No:

Payment dashboards

Revenue charts

Subscription cards

Large decorative illustrations

Excessive gradients

Glassmorphism

==================================================
20. OUTPUT
==================================================

Generate a populated high-fidelity desktop screen.

The final screen MUST show:

6 access records

4 summary cards

Search

Filters

Table

Statuses

Actions

Pagination

Use the supplied dataset.

Do NOT leave the table empty.