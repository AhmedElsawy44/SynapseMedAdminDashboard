SYNAPSE MED — ADMIN UI
PROMPT #06 — COURSE DETAILS

Design the Course Details page for the SYNAPSE MED Admin Console.

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

The Course Details page allows an authorized administrator to inspect
and manage the structure of one educational Course.

The Course domain contains:

Course
├── Lectures
└── Videos

The page should make this hierarchy immediately understandable.

The primary focus is:

Course information
+
Course content structure
+
Lecture management
+
Video/content state

This is a CONTENT MANAGEMENT interface.

It is NOT:

- an analytics page
- a student progress page
- a billing page
- a learning analytics page
- a video infrastructure dashboard

==================================================
2. CRITICAL DOMAIN SEPARATION
==================================================

The architecture separates:

COURSE DOMAIN

- Courses
- Lectures
- Videos

from:

LEARNING DOMAIN

- Progress
- Completion
- Unlocking

Therefore:

DO NOT display student learning progress on this page
unless the product specification explicitly requires it.

Course Details describes the CONTENT.

Student Details describes the STUDENT'S learning state.

Do not mix these domains.

==================================================
3. PAGE HEADER
==================================================

Breadcrumb:

Admin / Courses / Course

Page title:

Course title

Secondary information:

Only approved course metadata.

Provide:

Back to Courses

Use the existing secondary navigation style.

==================================================
4. COURSE HEADER
==================================================

Create a premium but compact Course Header.

Possible structure:

Course thumbnail / visual marker

Course title

Course description or approved summary

Approved metadata

Supported status

Actions

The title should be the strongest visual element.

Do not create an oversized hero section.

This is an Admin interface, not a marketing landing page.

==================================================
5. COURSE DESCRIPTION
==================================================

If course description exists:

Display it in a readable content block.

Avoid showing a huge wall of text.

If the description is long:

Use progressive disclosure such as:

Read more

Do not invent course copy.

==================================================
6. COURSE ACTIONS
==================================================

Only show actions supported by the actual product workflow.

Potential actions:

Edit Course

Manage Content

BUT:

Do not automatically add:

- Publish
- Unpublish
- Archive
- Duplicate
- Delete
- Export
- Assign Instructor

unless explicitly supported.

IMPORTANT:

Revision lifecycle states belong to Revision.

Do NOT apply:

Draft
Scheduled
Active
Inactive
Archived

to Course unless Course lifecycle is explicitly defined.

==================================================
7. CONTENT STRUCTURE
==================================================

The primary content area should present the course's lecture structure.

Visual hierarchy:

COURSE

↓
LECTURES

↓
LECTURE ITEMS

↓
VIDEO CONTENT

Each lecture should be clearly distinguishable.

The interface must make the content hierarchy obvious without excessive decoration.

==================================================
8. LECTURE LIST
==================================================

Create a dedicated lecture management surface.

Each lecture row may include:

Lecture number/order

Lecture title

Approved metadata

Video/content indicator

Available actions

Only show fields supported by the actual data model.

Do not invent:

- lecture duration
- completion rate
- students watched
- average watch time
- quiz score

unless explicitly available.

==================================================
9. LECTURE ORDER
==================================================

Lecture ordering is part of the learning/content structure.

If the product workflow supports reordering:

Provide a clear drag/reorder affordance.

The reorder control must be subtle.

Do not make every row look draggable unless reordering is actually supported.

If reordering is not confirmed:

Do not add drag-and-drop.

==================================================
10. ADD LECTURE
==================================================

Only show:

Add Lecture

if the Admin workflow explicitly supports lecture creation.

If supported:

Make it the primary content-management action.

Do not add:

Add Section

Add Module

Add Chapter

Add Lesson

unless those concepts exist in the product model.

The defined Course structure uses:

Course → Lectures → Videos.

==================================================
11. VIDEO CONTENT
==================================================

Videos belong to Lectures.

Represent video presence/state using a compact UI element.

Example conceptual pattern:

Video

Available

or

No video

ONLY when the underlying data supports such a state.

Do not expose technical infrastructure.

Never display:

- Bunny Stream ID
- playback token
- CDN URL
- storage key
- encoding job ID
- infrastructure status

These are implementation details.

==================================================
12. VIDEO PREVIEW
==================================================

If a preview is supported by the product:

Use a compact video preview.

Do not automatically place a large video player on the Course Details page.

The Course Details page is primarily structural.

If video editing/uploading exists:

That belongs to the appropriate Course/Lecture editor workflow.

==================================================
13. LECTURE ACTIONS
==================================================

Only show supported actions.

Potential examples:

View

Edit

Manage Video

BUT:

Do not invent actions.

Do not automatically add:

- Duplicate
- Delete
- Move
- Archive
- Publish

unless supported.

If destructive actions are supported:

They must be visually separated from normal actions.

==================================================
14. CONTENT EMPTY STATE
==================================================

If the course contains no lectures:

Show:

No lectures yet.

If lecture creation is supported:

Show:

Add Lecture

Do not use a large illustration.

The empty state should feel like an intentional content-management state.

==================================================
15. COURSE WITH MANY LECTURES
==================================================

The interface must scale to courses with many lectures.

Avoid huge cards.

Use:

compact rows

clear numbering

consistent vertical rhythm

section headers

If necessary:

internal scrolling

pagination

or progressive loading

But only introduce pagination if supported by the product interaction.

==================================================
16. COURSE METADATA
==================================================

Only show approved Course fields.

Do not invent:

- instructor
- specialty
- department
- price
- rating
- reviews
- enrollment count
- revenue
- completion rate

unless explicitly defined.

==================================================
17. CONTENT STATUS
==================================================

Do not invent Course publishing states.

If a status exists in the Course data model:

Represent it using the existing status component.

If no Course status exists:

Do not create one.

Do not borrow Revision lifecycle states.

Revision has its own lifecycle:

Draft
Scheduled
Active
Inactive
Archived

These belong to Revision.

==================================================
18. EDITING BOUNDARY
==================================================

Course Details is NOT Course Editor.

Do not turn the page into a huge editable form.

The page should primarily:

INSPECT
+
NAVIGATE
+
MANAGE STRUCTURE

Detailed editing belongs to:

Course Editor

which will be designed separately.

==================================================
19. CARD SYSTEM
==================================================

Avoid Card Soup.

Recommended structure:

One Course Header surface

One main Content Structure surface

Optional compact metadata surface

Do not wrap every lecture in a separate large card.

Use rows for repeated lecture content.

==================================================
20. TABLE / LIST STYLE
==================================================

Lecture rows should reuse the established DataTable/list principles:

- clear hierarchy
- readable typography
- subtle separators
- hover state
- consistent row height
- action menu
- restrained icons

Do not introduce a new table style.

==================================================
21. LOADING STATE
==================================================

Create skeleton states for:

Course header

Course metadata

Lecture list

Lecture actions

Do not use a full-page spinner.

==================================================
22. ERROR STATE
==================================================

If course information fails:

Unable to load course.

[ Try Again ]

If lecture content fails independently:

Unable to load lectures.

[ Try Again ]

Do not expose technical errors.

Do not destroy the entire page because one section failed.

==================================================
23. RESPONSIVE
==================================================

Desktop:

Course header

Main lecture/content area

Comfortable content width

Tablet:

Stack secondary metadata below the header.

Mobile:

Course header becomes compact.

Lecture rows transform into mobile-friendly list items.

Actions remain accessible.

Do not squeeze multiple metadata columns into tiny widths.

==================================================
24. RTL
==================================================

The entire page must support Arabic RTL.

Use logical spacing.

Mirror directional icons.

Do not hardcode left/right positioning.

Lecture numbering must remain visually clear in both directions.

==================================================
25. VISUAL IDENTITY
==================================================

Maintain the approved SYNAPSE MED visual language:

Deep Navy
White
Controlled Cyan
Muted gray
Subtle semantic colors

Dark elevated surfaces

Subtle borders

Clean typography

Minimal shadows

No excessive glow.

No glassmorphism.

No decorative medical illustrations.

==================================================
26. DATA INTEGRITY
==================================================

ABSOLUTE RULE:

Never invent:

- Course title
- Description
- Lecture title
- Lecture count
- Video count
- Video duration
- Status
- Actions
- Metadata
- Infrastructure information

If unknown:

Use —

If unavailable:

Use loading/empty/error states.

==================================================
27. DOMAIN INTEGRITY
==================================================

The UI must preserve this conceptual boundary:

Course
→ Lectures
→ Videos

Learning
→ Progress
→ Completion
→ Unlocking

Access
→ Course / Revision access

Revision
→ Availability / lifecycle

Do not merge these into one giant Course object UI.

==================================================
28. OUTPUT
==================================================

Create one high-fidelity desktop Course Details screen.

Show:

- Approved App Shell
- Course header
- Course identity
- Supported metadata
- Course content structure
- Lecture list
- Video/content indicators
- Supported actions
- Empty state behavior
- Loading/error behavior

Do NOT create:

- Course Editor
- Revision Details
- Student Progress
- Analytics
- Access Management

Those will be separate screens.

==================================================
29. FINAL QUALITY BAR
==================================================

The result must feel like:

A premium medical education CONTENT MANAGEMENT system.

It should communicate:

STRUCTURE
+
CONTROL
+
CLARITY
+
EDUCATIONAL CONTENT

The page must feel like the natural next step after Courses List.

Do not introduce a new visual language.

Do not invent product functionality.

The product specification determines WHAT exists.

The design system determines HOW it looks.