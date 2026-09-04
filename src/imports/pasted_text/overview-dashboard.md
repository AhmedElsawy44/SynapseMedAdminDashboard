# SYNAPSE MED — ADMIN UI

## Prompt #02 — Overview Dashboard

Design the Overview Dashboard for the SYNAPSE MED Admin Console.

IMPORTANT:

The SYNAPSE MED Admin App Shell from the previously approved design is the immutable visual reference.

Reuse the existing:

* Sidebar
* Topbar
* Global Search
* Notification button
* Admin profile
* Navigation
* Typography
* Color system
* Surface system
* Icon system
* Spacing system
* Border system
* Radius system

Do NOT redesign the App Shell.

This prompt is specifically for the Overview Dashboard content.

---

# 1. PRODUCT ROLE

The Overview page is the administrative starting point.

Its purpose is to give an administrator a concise understanding of:

* platform activity
* learning activity
* course performance
* recent operational activity
* important actions

The page should support fast scanning.

It should NOT become an infrastructure monitoring dashboard.

It should NOT become a financial dashboard unless financial metrics are explicitly provided by the product specification.

It should NOT become a generic SaaS analytics template.

---

# 2. VISUAL REFERENCE

Use the approved SYNAPSE MED Admin App Shell as the primary visual reference.

Preserve:

Deep Navy
+
White
+
Controlled Cyan
+
Dark Elevated Surfaces
+
Clean Typography
+
Subtle Borders
+
Minimal Shadows

The Overview must look like the same product as the App Shell.

---

# 3. PAGE HEADER

Create:

Breadcrumb:

Admin / Overview

Page title:

Overview

Description:

A concise description explaining that this page summarizes platform activity and learning operations.

Do not invent marketing copy.

The page header must remain compact.

Place the primary Overview action only if it is explicitly supported by the product specification.

Do NOT automatically add:

* Export Report
* New Cohort
* Create Report
* Invite User
* Revenue
* AI Assistant

These are not allowed unless explicitly specified.

---

# 4. KPI SECTION

Create a horizontal KPI section below the page header.

Desktop:

4 KPI cards maximum.

Tablet:

2 columns.

Mobile:

1 column or horizontally scrollable cards where appropriate.

Each KPI card should contain:

* small label
* primary value
* optional contextual comparison
* optional small icon
* optional trend

However:

DO NOT INVENT KPI TYPES.

DO NOT INVENT METRICS.

DO NOT INVENT NUMBERS.

DO NOT invent values such as:

4,289 students

76.4 score

99.99% uptime

1,204 active sessions

unless those exact values are supplied by the product data.

If the product specification does not define a metric yet, visually reserve the KPI component using:

—

or

Sample value

Do not present fictional production data as real.

---

# 5. KPI VISUAL STYLE

KPI cards should follow the approved card system.

Surface:

Dark elevated navy

Radius:

12px

Padding:

24px

Hierarchy:

Label
↓
Large value
↓
Context

Use cyan only for:

* positive trend
* active state
* accent icon
* important interactive element

Do not make entire KPI cards cyan.

Do not use rainbow KPI cards.

---

# 6. MAIN ANALYTICS SECTION

Create a large primary analytics card.

Purpose:

Visualize an approved platform or learning activity trend.

The chart must use only the data concept explicitly defined by the product specification.

If the exact metric is not yet available to the model, use a neutral chart placeholder.

Do not invent:

* revenue
* conversion
* clinical rotations
* cohorts
* server load
* uptime
* database synchronization
* infrastructure health

---

# 7. CHART STYLE

Use a restrained SYNAPSE MED chart style.

Preferred:

* cyan primary data
* muted secondary data
* dark navy background
* subtle grid
* readable labels
* minimal axis decoration

Avoid:

* rainbow charts
* 3D charts
* excessive gradients
* glowing neon charts
* decorative chart effects

The chart must communicate information, not decoration.

---

# 8. TIME FILTER

If the product specification supports time-based analytics, provide a compact filter.

Example structure:

7D
30D
90D

Only include periods explicitly supported by the product specification.

If time ranges are not defined, do not invent them.

Use a segmented control or compact filter style consistent with the existing UI.

---

# 9. RECENT ACTIVITY

Create a secondary card titled:

Recent Activity

This section represents recent administrative/product activity.

Examples of activity categories may include:

* course activity
* revision activity
* quiz activity
* certificate activity
* access activity
* notification activity

ONLY use categories that exist in the actual product specification.

Do not create infrastructure alerts.

Do not create fictional system alerts.

Do not create fake server incidents.

Each activity item may contain:

* icon
* activity title
* short description
* timestamp
* optional status

Keep descriptions concise.

---

# 10. ACTIVITY VISUAL STYLE

Use a vertical activity list.

Each row:

Icon
+
Activity content
+
Timestamp

Use subtle separators.

Do not turn the activity feed into a chat interface.

Do not use excessive colors.

Icons should remain consistent with the global line-icon system.

---

# 11. COURSE PERFORMANCE

Create a larger content section for course-related performance.

This section should use the existing SYNAPSE MED table system.

Possible table structure:

Course

[approved student/enrollment metric]

[approved progress/performance metric]

Status

Updated

ONLY display columns supported by the product specification.

Do not invent additional business metrics.

---

# 12. TABLE VISUAL STYLE

Use:

Dark elevated surface

Subtle border

Clear header

Comfortable row height

Muted secondary text

White primary text

Cyan for interactive elements

Compact semantic status badges

Row hover state

Right-side action menu where required

Avoid dense enterprise-table styling.

The table should feel premium and readable.

---

# 13. QUICK ACTIONS

Create a compact Quick Actions section only for actions that are explicitly defined in the product workflow.

Potential examples:

Create Course

Create Revision

Create Quiz

Create Coupon

Send Notification

BUT:

Only display actions that actually exist in the documented product flow.

Do not add actions simply because they are common in Admin dashboards.

Use:

ONE primary action

remaining actions as secondary/ghost actions.

---

# 14. INFORMATION HIERARCHY

The Overview must be scannable in this order:

1. Page identity
2. Key platform metrics
3. Main activity trend
4. Important recent activity
5. Course/content performance
6. Available administrative actions

The administrator should understand the state of the platform within a few seconds.

---

# 15. RESPONSIVE LAYOUT

Desktop:

Sidebar remains expanded.

KPI cards:

4-column layout where space allows.

Main content:

Primary analytics area + secondary activity area.

Course table:

Full width.

Tablet:

Sidebar collapses.

KPI cards become 2 columns.

Analytics sections stack when necessary.

Mobile:

Sidebar becomes drawer.

KPI cards become single column or horizontal scroll.

Analytics becomes full width.

Activity becomes full width.

Tables must remain readable.

Do not shrink table typography to unusable sizes.

Use horizontal scrolling or an intentional mobile representation when necessary.

---

# 16. EMPTY STATE

Every data section must have an intentional empty state.

Examples:

No recent activity

No course data available

No analytics data available

The empty state must explain:

What is empty

Why it may be empty

What the administrator can do next

Do not use random illustrations.

Keep the empty state visually aligned with the SYNAPSE MED brand.

---

# 17. LOADING STATE

Use skeleton loading.

Skeletons should reproduce the actual component geometry.

Create loading states for:

* KPI cards
* chart
* activity list
* course table

Avoid using one giant page spinner.

---

# 18. ERROR STATE

If a dashboard section fails:

Show:

Something went wrong

Unable to load this information.

[ Try Again ]

Do not expose technical API/database errors.

Do not fail the entire page if only one section cannot load.

---

# 19. DATA INTEGRITY — CRITICAL

The AI is responsible for visual design.

The AI is NOT responsible for inventing product data.

NEVER invent:

* metrics
* numbers
* entities
* workflows
* business concepts
* navigation
* roles
* permissions
* analytics categories
* system monitoring features

If the specification does not define something:

Use a neutral placeholder.

Do not guess.

---

# 20. CONTENT INTEGRITY

Do not generate random realistic-looking production data.

Do not use fictional names such as:

Dr. Reynolds

Ahmed

John Smith

unless those names are explicitly supplied as design content.

Do not create fake courses such as:

Neuroanatomy 204

Pathology Midterm

unless supplied by the product data.

The UI should demonstrate the structure, not fabricate the product database.

---

# 21. BRAND CONSTRAINTS

Do not introduce:

* purple
* bright green
* orange
* pink
* rainbow charts
* excessive red
* gradients as a primary visual language

Semantic colors may appear only when necessary for:

* success
* warning
* error

and must remain restrained.

---

# 22. MEDICAL IDENTITY

Medical identity should remain subtle.

Do not decorate every card with:

* neurons
* DNA
* hearts
* ECGs
* medical illustrations

The SYNAPSE MED logo and visual language already communicate the medical/neurological identity.

The Admin Dashboard should feel clinical through:

* precision
* hierarchy
* typography
* controlled cyan
* clean data visualization

---

# 23. COMPONENT REUSE

Use the previously approved components.

Do not redesign:

* Sidebar
* Topbar
* Search
* Profile
* Notification
* Buttons
* Cards
* Status badges
* Tables

The Overview should demonstrate how these components work together.

---

# 24. OUTPUT

Generate a high-fidelity desktop-first Overview Dashboard.

Show one complete desktop screen.

The screen must include:

* approved App Shell
* Overview page header
* KPI section
* primary analytics section
* recent activity
* course performance
* quick actions where supported

Also ensure the layout can logically adapt to tablet and mobile.

Do not create additional screens unless explicitly requested.

---

# 25. FINAL QUALITY BAR

The final design should feel like:

A premium medical education operations dashboard.

It should NOT feel like:

A generic SaaS admin template.

It should NOT feel like:

A server monitoring dashboard.

It should NOT feel like:

A financial analytics dashboard.

It should NOT feel like:

A cyberpunk medical interface.

The design should be:

Calm
Precise
Clinical
Modern
Premium
Data-driven
Consistent

Most importantly:

Use the product specification to determine WHAT exists.

Use the design system to determine HOW it looks.
