SYNAPSE MED ADMIN CONSOLE
REVISION MANAGEMENT
SCREEN 08A — REVISION LIST

==================================================
EXECUTION CONTEXT
==================================================

This screen belongs to the existing SYNAPSE MED Admin Console.

Use the already approved:

- Sidebar
- Topbar
- Typography
- Color system
- Button system
- Input system
- DataTable
- Status badges
- Cards
- Spacing
- Icons
- Modal
- Dropdown
- Pagination

Do NOT redesign the App Shell.

This is a production-like UI.

DO NOT create a wireframe.

DO NOT leave the main content empty.

DO NOT use lorem ipsum.

DO NOT use generic placeholder rows.

Populate the interface with the provided sample dataset below.

==================================================
1. SCREEN PURPOSE
==================================================

The administrator uses this screen to manage Course Revisions.

The screen must immediately communicate:

1. Which Course the Revision belongs to
2. Which Revision this is
3. Current lifecycle state
4. Availability period
5. What action is currently available

The primary UX concept is REVISION LIFECYCLE.

==================================================
2. REVISION LIFECYCLE
==================================================

Use ONLY these lifecycle states:

Draft
Scheduled
Active
Inactive
Archived

Do not invent additional states.

==================================================
3. SAMPLE DATA
==================================================

Use the following realistic sample data.

COURSE 01

Course:
Advanced Cardiology

Revision:
Cardiology — 2026 Update

Status:
Active

Available From:
01 Mar 2026
09:00

Available Until:
31 Aug 2026
23:59

Lectures:
24

COURSE 02

Course:
Emergency Medicine Essentials

Revision:
Emergency Medicine — Spring 2026

Status:
Scheduled

Available From:
15 Apr 2026
09:00

Available Until:
15 Oct 2026
23:59

Lectures:
18

COURSE 03

Course:
Internal Medicine Review

Revision:
Internal Medicine — Draft v2

Status:
Draft

Available From:
—

Available Until:
—

Lectures:
31

COURSE 04

Course:
Clinical Pharmacology

Revision:
Pharmacology — Previous Version

Status:
Inactive

Available From:
01 Sep 2025
09:00

Available Until:
28 Feb 2026
23:59

Lectures:
20

COURSE 05

Course:
Neurology Board Review

Revision:
Neurology — Archived 2025

Status:
Archived

Available From:
01 Jan 2025
09:00

Available Until:
31 Dec 2025
23:59

Lectures:
27

COURSE 06

Course:
Pediatrics Essentials

Revision:
Pediatrics — Summer 2026

Status:
Scheduled

Available From:
01 Jun 2026
09:00

Available Until:
30 Nov 2026
23:59

Lectures:
22

==================================================
4. PAGE HEADER
==================================================

Breadcrumb:

Admin / Revisions

Title:

Revisions

Subtitle:

Manage course revisions, availability windows, and lifecycle states.

Primary action:

Create Revision

Place the CTA on the right side of the header in LTR.

Mirror correctly in RTL.

==================================================
5. SUMMARY AREA
==================================================

Display FOUR compact summary cards.

Use the sample dataset.

Card 01:

Total Revisions
6

Card 02:

Active
1

Card 03:

Scheduled
2

Card 04:

Draft
1

These cards are secondary.

The Revision table remains the primary content.

Do NOT add revenue or student analytics.

==================================================
6. SEARCH
==================================================

Search field:

Search revisions...

Search should visually support searching by:

Revision title

Course title

Do not create additional search categories.

==================================================
7. FILTERS
==================================================

Filters:

Status

Course

Availability

Status values:

All
Draft
Scheduled
Active
Inactive
Archived

Course examples:

All Courses
Advanced Cardiology
Emergency Medicine Essentials
Internal Medicine Review
Clinical Pharmacology
Neurology Board Review
Pediatrics Essentials

Availability options:

All

Currently Available

Upcoming

Expired

Only use these availability categories if the backend supports
equivalent filtering.

==================================================
8. TABLE
==================================================

Use the SYNAPSE MED DataTable.

Columns:

Revision

Course

Status

Available From

Available Until

Lectures

Actions

==================================================
9. REVISION CELL
==================================================

Show:

Revision title

Example:

Cardiology — 2026 Update

Secondary:

Revision

Do not repeat unnecessary IDs.

==================================================
10. COURSE CELL
==================================================

Show:

Advanced Cardiology

The Course name should visually connect the Revision to its parent.

==================================================
11. STATUS CELL
==================================================

Use the established semantic status component.

Active:

Strong but controlled positive state.

Scheduled:

Information/attention state.

Draft:

Neutral state.

Inactive:

Muted state.

Archived:

Subdued state.

Do not use neon colors.

==================================================
12. AVAILABILITY
==================================================

Show exact dates.

For Draft:

—

For Scheduled:

15 Apr 2026
09:00

For Active:

01 Mar 2026
09:00

Do not replace dates with vague phrases.

==================================================
13. ACTIONS
==================================================

Every row has a contextual menu.

For ACTIVE:

View
Edit
Deactivate

For SCHEDULED:

View
Edit
Activate

For DRAFT:

View
Edit
Schedule

For INACTIVE:

View
Edit
Activate
Archive

For ARCHIVED:

View

IMPORTANT:

These actions represent the intended lifecycle interaction.

If the actual backend permissions differ, permissions take precedence.

Do not show impossible transitions.

==================================================
14. LIFECYCLE INTERACTION
==================================================

When selecting a lifecycle action:

Open a confirmation modal.

Example:

Deactivate Revision?

You are about to deactivate:

Cardiology — 2026 Update

This may affect availability for students who currently have access.

Buttons:

Cancel

Deactivate Revision

Use the existing modal system.

Do not use destructive styling for normal Edit/View actions.

==================================================
15. PAGINATION
==================================================

Show:

Showing 1–6 of 6 revisions

Pagination component must remain visible.

Use realistic behavior even though the sample dataset has six records.

==================================================
16. EMPTY STATE
==================================================

If no revisions exist:

No revisions yet.

[ Create Revision ]

If filters produce no result:

No revisions match your current filters.

[ Clear Filters ]

==================================================
17. LOADING
==================================================

Show skeleton rows using the actual table geometry.

Do NOT replace the entire page with a spinner.

==================================================
18. ERROR
==================================================

Show:

Unable to load revisions.

[ Try Again ]

Keep the App Shell visible.

==================================================
19. RESPONSIVE
==================================================

Desktop:

Full table.

Tablet:

Horizontal table scroll if required.

Mobile:

Transform rows into stacked revision cards.

Each item must show:

Revision

Course

Status

Availability

Primary action

Do not shrink the table into unreadable text.

==================================================
20. RTL
==================================================

Support Arabic RTL.

The table and cards must mirror logically.

Dates remain readable.

Directional icons mirror.

==================================================
21. VISUAL RULES
==================================================

Do not introduce a new visual language.

Use:

Deep Navy
White
Controlled Cyan
Muted Gray
Restrained semantic colors

No excessive gradients.

No glassmorphism.

No giant shadows.

No decorative illustrations.

==================================================
22. FINAL OUTPUT
==================================================

Generate a high-fidelity production-like desktop screen.

The final screen MUST visibly contain:

- Sidebar
- Topbar
- Page header
- 4 summary cards
- Search
- Filters
- 6 populated revision rows
- Lifecycle statuses
- Availability dates
- Row actions
- Pagination

Do not generate an empty dashboard.

Do not generate placeholder content.

Do not use lorem ipsum.