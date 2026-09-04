SYNAPSE MED — ADMIN UI
PROMPT #05 — COURSES LIST

Design the Courses List page for the SYNAPSE MED Admin Console.

The approved SYNAPSE MED Admin App Shell is immutable.

Reuse the exact approved:

- Sidebar
- Topbar
- Global Search
- Notification system
- Admin profile
- Typography
- Color system
- Surface system
- Card system
- Table system
- Button system
- Status system
- Spacing system
- Icon system

DO NOT redesign the App Shell.

==================================================
1. PRODUCT PURPOSE
==================================================

The Courses page is a content-management screen.

The Admin uses it to:

- browse courses
- search courses
- inspect course information
- access course details
- manage course content through the supported workflow
- review course-related content before publishing where applicable

The Courses page must feel like a professional medical education content-management system.

It must NOT feel like:

- a generic SaaS dashboard
- an e-commerce catalog
- a financial dashboard
- a CRM
- a marketing CMS

==================================================
2. PRODUCT SCOPE
==================================================

The Course domain contains:

- Courses
- Lectures
- Videos

The Course page must therefore establish a clear relationship between:

Course
→ Lectures
→ Video content

Do not introduce unrelated product concepts.

Do not invent:

- instructors
- subscriptions
- pricing
- revenue
- ratings
- reviews
- cohorts
- departments
- clinical rotations

unless explicitly supported by the product specification.

IMPORTANT:

The Instructor is outside the MVP platform.

Do NOT create:

- Instructor column
- Instructor avatar
- Instructor profile
- Instructor filter
- Instructor assignment
- Instructor permissions

==================================================
3. PAGE HEADER
==================================================

Breadcrumb:

Admin / Courses

Title:

Courses

Description:

Use a concise operational description.

Do not use marketing language.

Do not create unnecessary statistics in the header.

==================================================
4. PRIMARY ACTION
==================================================

If course creation is explicitly supported by the current Admin workflow:

Use:

Create Course

as the single primary action.

If course creation is NOT currently confirmed:

Do not invent the action.

Do not automatically add:

- Import Courses
- Export Courses
- Bulk Create
- Duplicate Course
- Generate Course with AI

unless explicitly specified.

==================================================
5. SEARCH
==================================================

Create a prominent course search field.

Primary purpose:

Find courses quickly.

Search should support the product-defined course search fields.

The architecture explicitly supports search over:

- Course title
- Course description

The broader platform search also covers:

- Lecture title
- Revision title

Do not create additional search categories without product support.

Placeholder:

Search courses...

==================================================
6. FILTERS
==================================================

Create a compact filter toolbar.

Only use filters explicitly supported by the product.

Potential filter:

Status

ONLY if Course status is defined in the product workflow.

Do NOT invent:

- instructor
- price
- category
- rating
- department
- enrollment
- revenue

just because these are common CMS filters.

The filter system should support:

- Filter
- Active filter indicator
- Clear filters

==================================================
7. COURSE TABLE
==================================================

The Course DataTable is the primary visual component.

Use the approved SYNAPSE MED DataTable system.

The table should feel:

- premium
- structured
- readable
- content-focused
- operational

Avoid excessive density.

==================================================
8. TABLE COLUMNS
==================================================

CRITICAL:

Do NOT invent database fields.

Only display fields supported by the actual Course model.

The conceptual structure may be:

Course identity

Approved course metadata

Approved content information

Approved lifecycle/status information

Updated information

Actions

But the exact columns must come from the actual product specification.

DO NOT automatically add:

- Revenue
- Students enrolled
- Rating
- Reviews
- Instructor
- Category
- Completion rate
- Average score

unless explicitly defined.

==================================================
9. COURSE IDENTITY CELL
==================================================

The Course identity should be the strongest cell.

Preferred structure:

Course thumbnail / visual marker

Course title

Optional secondary metadata

The title must remain highly readable.

Avoid oversized thumbnails.

The thumbnail should support recognition, not dominate the table.

==================================================
10. COURSE CONTENT SUMMARY
==================================================

If the product data exposes lecture information:

Represent the course content structure compactly.

Example:

12 Lectures

or

18 Lectures

ONLY when the actual count is available.

Do not fabricate counts.

Do not create:

"32 clinical sessions"

or other invented content concepts.

==================================================
11. VIDEO INFORMATION
==================================================

Videos belong to the Course content structure.

Do not create a separate "Video Management" module inside this screen unless explicitly defined.

Course-level UI may indicate whether video content exists.

Do not expose:

- video provider internals
- Bunny identifiers
- playback tokens
- storage metadata

The video infrastructure is implementation detail.

==================================================
12. STATUS
==================================================

Use a compact status badge ONLY if the Course lifecycle/status is explicitly defined.

Do not copy Revision lifecycle states into Courses.

IMPORTANT:

The architecture defines a specific Revision lifecycle:

Draft
Scheduled
Active
Inactive
Archived

These states belong to Revision.

Do NOT automatically assign these states to Courses.

If Course lifecycle is not explicitly defined:

Do not invent a Course lifecycle.

==================================================
13. COURSE ACTIONS
==================================================

Each row may expose a contextual action menu.

Possible actions should only come from the actual product workflow.

Potential examples:

View

Edit

Manage Content

BUT:

Only show actions that are actually supported.

Do NOT automatically add:

- Delete
- Archive
- Duplicate
- Publish
- Unpublish
- Export
- Assign Instructor

unless explicitly supported.

==================================================
14. COURSE DETAILS NAVIGATION
==================================================

Clicking the Course identity should navigate to:

Course Details

Do not open a huge modal.

Course Details will be a dedicated screen.

==================================================
15. BULK ACTIONS
==================================================

Do NOT automatically add checkboxes.

Bulk selection is allowed only if the product workflow explicitly supports bulk course operations.

If bulk operations are not defined:

No checkboxes.

==================================================
16. SUMMARY METRICS
==================================================

Do not add KPI cards simply because this is an Admin page.

If approved course-level summary metrics exist:

They may appear as a compact summary row.

Otherwise:

Start directly with:

Page Header

Search / Filters

Course Table

Do not create fake metrics such as:

128 Courses

4,289 Students

82% Completion

$52,000 Revenue

unless those values and metrics are explicitly supplied.

==================================================
17. EMPTY STATE
==================================================

Case A:

No courses exist.

Display:

No courses yet.

Provide the supported next action if course creation exists.

Case B:

Courses exist but filters return no results.

Display:

No courses match your current filters.

Provide:

Clear filters

Do not use large decorative illustrations.

==================================================
18. LOADING STATE
==================================================

Use a table skeleton.

Skeleton geometry must match:

- course identity
- metadata
- status
- action
- row height

Do not use a full-page loading spinner.

==================================================
19. ERROR STATE
==================================================

If course loading fails:

Unable to load courses.

Try again.

[ Try Again ]

Do not expose:

- API errors
- database errors
- stack traces
- internal IDs

==================================================
20. RESPONSIVE
==================================================

Desktop:

Full DataTable.

Tablet:

Maintain readable table density.

Use horizontal scrolling if necessary.

Mobile:

Sidebar becomes a drawer.

Search becomes full width.

Filters move into a filter drawer.

Do not squeeze every table column into tiny widths.

If necessary, transform the table into a compact course list.

Mobile course item:

Course identity

Primary approved status

Primary approved metadata

View action

==================================================
21. RTL
==================================================

The entire page must support Arabic RTL.

Do not hardcode left/right layout.

Use logical spacing.

Directional icons must mirror correctly.

Table actions must remain correctly positioned in RTL.

==================================================
22. VISUAL STYLE
==================================================

Maintain the approved SYNAPSE MED visual identity:

Deep Navy

White

Controlled Cyan

Muted secondary text

Subtle semantic colors

Dark elevated surfaces

Subtle borders

Clean typography

Minimal shadows

No excessive gradients.

No glassmorphism.

No neon effects.

No decorative medical illustrations.

==================================================
23. CARD SYSTEM
==================================================

Avoid Card Soup.

The course table should exist as one coherent data surface.

Do not wrap every course row inside a separate card.

Use cards only where they have a meaningful semantic purpose.

==================================================
24. CONTENT MANAGEMENT FEEL
==================================================

The page should visually communicate:

"Manage educational content"

not:

"Analyze business performance"

The most important visual object is the course/content table.

The user should be able to scan:

Course

Content

Status where supported

Actions

quickly.

==================================================
25. DATA INTEGRITY — ABSOLUTE
==================================================

The AI must never invent:

- Course names
- Course descriptions
- Lecture counts
- Video counts
- Course statuses
- Course actions
- Course metrics
- Course categories
- Instructor information

If data is unknown:

Use:

—

If data is unavailable:

Use an intentional loading/empty state.

Never convert assumptions into product requirements.

==================================================
26. PRODUCT DESIGN BOUNDARY
==================================================

The product specification determines:

WHAT exists.

The design system determines:

HOW it looks.

You are the UI designer.

You are NOT the product manager.

Do not expand the scope.

==================================================
27. OUTPUT
==================================================

Create one high-fidelity desktop Courses List screen.

Include:

- Approved App Shell
- Page Header
- Search
- Supported Filters
- Course DataTable
- Course identity
- Supported metadata
- Supported status
- Row actions
- Pagination

Also design the logical states for:

- Loading
- Empty
- Filtered empty
- Error

Do not create Course Details in this prompt.

Do not create Course Editor in this prompt.

==================================================
28. FINAL QUALITY BAR
==================================================

The result must feel:

Clinical

Precise

Premium

Content-first

Operational

Calm

Modern

Highly consistent with the approved SYNAPSE MED Admin system.

The Courses page must feel like the natural next screen after Students.

Do not introduce a new visual language.

Do not introduce new components unless they are necessary extensions of the existing Design System.