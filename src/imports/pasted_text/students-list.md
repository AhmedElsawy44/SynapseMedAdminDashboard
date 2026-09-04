# SYNAPSE MED — ADMIN UI

## Prompt #03 — Students List

Design the Students List page for the SYNAPSE MED Admin Console.

The previously approved SYNAPSE MED Admin App Shell is immutable.

Reuse the approved:

* Sidebar
* Topbar
* Global Search
* Notification system
* Admin profile
* Typography
* Color system
* Surface system
* Button system
* Card system
* Table system
* Status system
* Spacing system
* Icon system

Do NOT redesign the App Shell.

---

# 1. PRODUCT PURPOSE

The Students page is an administrative data-management screen.

Its purpose is to allow authorized administrators to:

* browse students
* search students
* filter students
* inspect student information
* access the student details page
* perform only actions explicitly supported by the product workflow

This is a DATA-FIRST screen.

The interface must prioritize:

clarity

searchability

scannability

accuracy

efficient administration

over decorative visuals.

---

# 2. PAGE HEADER

Use the standard SYNAPSE MED page-header pattern.

Breadcrumb:

Admin / Students

Title:

Students

Subtitle:

Use a concise description explaining that administrators can manage and review student accounts.

Do not create marketing copy.

Do not add unsupported actions.

---

# 3. PRIMARY ACTION

Do NOT automatically add:

Create Student

Invite Student

Import Students

Export Students

Bulk Upload

unless those actions are explicitly defined in the product specification.

If no primary student-creation workflow is defined:

There should be NO artificial primary CTA.

The page should instead prioritize:

Search

Filter

Browse

View Details

---

# 4. SEARCH

Create a prominent student search field.

Purpose:

Find students quickly.

Use the approved search component style.

The search should support the identifiers actually supported by the product data model.

Possible examples may include:

name

email

student identifier

BUT:

Do not assume all of these exist.

Only display search hints for fields explicitly supported by the product specification.

Placeholder should remain concise.

Example:

Search students...

---

# 5. FILTER SYSTEM

Create a compact filter toolbar.

The filter system must use ONLY filters defined by the product specification.

Do not invent filters simply because they are common in admin dashboards.

Potential categories may include:

status

access

course

certificate

activity

BUT these must only be rendered if they exist in the actual data/workflow.

Use:

* filter button
* selected filter chips
* clear filters action
* optional filter drawer on smaller screens

Do not create a filter for unsupported data.

---

# 6. FILTER UX

Default state:

Search field

Filter button

Optional sort control

When filters are active:

Show compact filter indicators.

Example:

Status: Active

Course: [selected]

Provide:

Clear all

Do not make filters visually dominant.

The student table remains the primary content.

---

# 7. OPTIONAL SUMMARY AREA

If approved student metrics exist in the product specification, they may be displayed as compact summary cards.

Examples could include:

Total Students

Active Students

Inactive Students

BUT:

Do not invent metrics.

Do not invent numbers.

Do not display infrastructure statistics.

Do not display revenue.

Do not display uptime.

Do not display engagement scores unless explicitly defined.

If no approved summary metrics exist:

Do not create empty KPI cards just to fill space.

---

# 8. TABLE

The Students table is the primary component of this page.

Use the approved SYNAPSE MED DataTable system.

The table must feel:

* premium
* readable
* calm
* information-dense but not cramped

Use:

dark elevated surface

subtle borders

clear header

comfortable rows

hover state

status badges

row actions

pagination

---

# 9. TABLE COLUMNS

CRITICAL:

Do not invent table columns.

Only display fields explicitly defined by the Student data model.

The table may use the following conceptual structure:

Student identity

Approved student attributes

Approved status

Approved relevant activity/access information

Updated / relevant date

Actions

But the exact visible columns must come from the actual product specification.

Do NOT automatically add:

* Revenue
* Lifetime Value
* Engagement Score
* Conversion Rate
* Clinical Rotation
* Cohort
* Server Status
* Last IP
* Device
* Location

unless explicitly defined.

---

# 10. STUDENT IDENTITY CELL

If supported by the data model, represent the student identity using:

Avatar

Student name

Secondary identifier

The identity cell should be visually stronger than metadata.

Example structure:

[Avatar]

Student Name

secondary information

Do not create fake names in the final production-style design.

If sample data is required for visualization, clearly distinguish it as sample content.

---

# 11. STATUS

If student status exists in the product specification:

Use a compact status badge.

Examples:

Active

Inactive

Suspended

Pending

ONLY use statuses explicitly defined by the product.

Do not invent additional lifecycle states.

Status colors must remain restrained.

---

# 12. ROW ACTIONS

Each student row may have an action menu.

Possible actions:

View

Edit

Manage Access

View Certificates

BUT:

Only include actions explicitly supported by the product workflow.

Do not invent:

Delete

Impersonate

Reset Password

Export

Send Email

Suspend

unless those actions are explicitly defined.

If only View Details is supported:

Use a simple row navigation or "View" action.

---

# 13. ROW INTERACTION

Preferred behavior:

Hover:

subtle surface highlight

Click:

navigate to Student Details

Do not create overly animated rows.

Do not make the entire row look like a button.

The interaction should feel like a professional administrative table.

---

# 14. TABLE DENSITY

Target:

64–72px row height.

Comfortable horizontal spacing.

Readable typography.

Do not create extremely dense enterprise tables.

Do not reduce typography below readable sizes simply to fit more columns.

If too many approved fields exist:

Use horizontal scrolling or progressive detail patterns.

Do not squeeze everything into tiny cells.

---

# 15. SORTING

Only provide sorting for fields where sorting is supported.

Do not add sorting arrows to every column automatically.

The UI should make sortable columns visually distinguishable.

---

# 16. PAGINATION

Use a standard pagination component.

Show:

current page

page navigation

total/result information only if supported by the product data

page-size selector only if supported

Do not overload the pagination area.

---

# 17. LOADING STATE

Create a skeleton table.

Skeleton should reproduce:

* header geometry
* row geometry
* avatar geometry where relevant
* status geometry
* action geometry

Do not use a giant spinner over the entire page.

---

# 18. EMPTY STATE

Create an intentional empty state.

Case 1:

No students exist.

Message:

No students yet.

Case 2:

Students exist but filters return nothing.

Message:

No students match your current filters.

Provide:

Clear filters

where applicable.

Do not use a large decorative illustration.

Keep the empty state aligned with SYNAPSE MED.

---

# 19. ERROR STATE

If student data fails to load:

Display:

Unable to load students.

Try again.

[ Try Again ]

Do not expose:

API errors

database errors

stack traces

technical identifiers

---

# 20. BULK SELECTION

Do NOT automatically add checkboxes.

Only use row selection if bulk actions are explicitly supported by the product workflow.

If bulk actions are not defined:

Do not add selection checkboxes simply because admin tables commonly have them.

---

# 21. EXPORT

Do NOT add Export.

Do not assume administrators need CSV/PDF/Excel export.

Export must only exist if explicitly supported by the product specification.

---

# 22. RESPONSIVE BEHAVIOR

Desktop:

Full DataTable

Search/filter toolbar

Comfortable column spacing

Tablet:

Collapsed sidebar

Table remains readable

Use horizontal scrolling if required.

Mobile:

Sidebar becomes drawer.

Search becomes full width.

Filters move into a drawer.

The table should transform intentionally.

Do NOT shrink every column until the content becomes unreadable.

If necessary, use a mobile student-list representation with:

Student identity

Primary status

Primary relevant information

View action

Only include fields explicitly supported.

---

# 23. RTL READINESS

The Students page must be RTL-ready.

Use logical layout rules.

Do not hardcode:

left/right spacing

directional icons

action positioning

The same component system must support English LTR and Arabic RTL.

---

# 24. VISUAL HIERARCHY

Priority:

1. Page title
2. Search
3. Filters
4. Student identity
5. Important student status/information
6. Row action
7. Pagination

The table must visually dominate the page.

Do not surround the page with unnecessary cards.

Avoid "card soup."

---

# 25. CARD USAGE

Do not place the entire table inside multiple nested cards.

Use one clear data surface.

Cards may be used for:

approved summary metrics

filter drawer

detail previews

but not as decorative containers.

---

# 26. COLOR RULE

Maintain the established SYNAPSE MED ratio.

Dark Navy:

primary environment

White:

primary information

Muted Gray:

secondary information

Cyan:

interaction and active states

Semantic colors:

only when necessary

Do not introduce new accent colors.

---

# 27. ICONOGRAPHY

Use the same line-icon family as the approved App Shell.

Use icons only where they improve comprehension.

Do not add decorative icons to every table column.

Do not use emoji.

---

# 28. MOTION

Use subtle interaction only.

Allowed:

hover transition

filter drawer transition

dropdown transition

skeleton shimmer

Do not use:

large animations

parallax

neon effects

excessive motion

---

# 29. DATA INTEGRITY — ABSOLUTE RULE

The AI must NOT invent:

student fields

student statuses

student metrics

student actions

student workflows

student roles

student permissions

student business concepts

If a field is not explicitly defined:

Do not display it.

If a value is unknown:

Use a neutral placeholder.

Never turn assumptions into product requirements.

---

# 30. PRODUCT DESIGN VS UI DESIGN

You are acting as the UI designer.

You are NOT the product manager.

The product specification determines:

WHAT exists.

The design system determines:

HOW it looks.

Do not expand the product scope.

---

# 31. OUTPUT

Create one high-fidelity desktop Students List screen using the approved SYNAPSE MED Admin App Shell.

Show:

* Sidebar
* Topbar
* Page header
* Search
* Filters
* Students DataTable
* Approved status treatment
* Row interaction
* Pagination

Also show the component behavior needed for:

* Loading
* Empty
* Error
* Filtered results

Do not create Student Details in this prompt.

Student Details will be a separate screen.

---

# 32. FINAL QUALITY BAR

The result should feel like:

A premium medical education administration system.

It should be:

precise

calm

scannable

professional

data-first

brand-consistent

reusable

Do not optimize for visual novelty.

Optimize for a consistent production-ready design system.
