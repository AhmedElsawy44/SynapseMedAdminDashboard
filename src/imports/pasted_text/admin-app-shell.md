# SYNAPSE MED — ADMIN UI

## Prompt #01 — App Shell

You are designing the foundational App Shell for the SYNAPSE MED Admin Dashboard.

This is the first production-level UI screen in the Admin Dashboard.

The App Shell will be reused across every authenticated Admin screen, so consistency and component discipline are more important than visual experimentation.

Use the provided SYNAPSE MED logo and existing SYNAPSE MED learner UI as visual references.

Do NOT redesign the brand.

Do NOT create a new visual identity.

Do NOT invent new navigation items.

---

# 1. PRODUCT CONTEXT

SYNAPSE MED is a medical education platform.

The Admin Dashboard is used by administrators to operate and manage the platform, including:

* Students
* Courses
* Revisions
* Quizzes
* Access
* Coupons
* Certificates
* Notifications
* Analytics
* Audit Logs
* Settings

The Admin interface must feel like a natural extension of the existing SYNAPSE MED learner product.

The learner application is learning-focused.

The Admin Dashboard is operational and data-focused.

Preserve the same visual DNA while adapting the information architecture for professional administration.

---

# 2. DESIGN OBJECTIVE

Create a premium medical education administration interface that feels:

* Professional
* Clinical
* Intelligent
* Calm
* Precise
* Modern
* Premium
* Trustworthy
* Scalable

Avoid the appearance of:

* Generic SaaS templates
* Bootstrap admin dashboards
* Cyberpunk interfaces
* Gaming dashboards
* Excessive neon
* Excessive glassmorphism
* Excessive gradients
* Generic medical illustrations

The interface should feel like premium medical infrastructure.

---

# 3. BRAND REFERENCE

Use the provided SYNAPSE MED logo exactly as supplied.

The logo contains the SYNAPSE MED visual concept based around:

* The S form
* Neural / synapse symbolism
* Play / video symbolism
* Medical education

The brand reference also establishes:

SYNAPSE MED

LEARN • CONNECT • HEAL

Do not:

* redraw the logo
* distort the logo
* change its proportions
* create a new logo
* replace it with a generic medical symbol
* create a different wordmark

The logo must remain recognizable and consistent with the provided reference.

---

# 4. COLOR SYSTEM

Use the established SYNAPSE MED visual language.

Primary environment:

Deep Navy

#071225

Surface:

#101A2B

Elevated Surface:

#151F32

Primary Accent:

#35E0DF

Accent Hover:

#52E8E7

Primary Text:

#F4F7FA

Secondary Text:

#A9B5C7

Subtle Border:

rgba(255,255,255,0.08)

The interface should remain predominantly dark navy.

Use cyan selectively for:

* Active navigation
* Primary buttons
* Interactive elements
* Focus states
* Progress
* Important accents
* Selected states

Do NOT make every card cyan.

Do NOT use large neon cyan backgrounds.

Do NOT introduce random colors.

Semantic colors may be used only when required:

Success
Warning
Error
Info

Keep semantic colors restrained.

---

# 5. GLOBAL VISUAL RATIO

Aim for approximately:

70% dark navy / dark surfaces

20% white and muted typography

10% cyan/teal accents

The visual result must feel calm and premium, not neon.

---

# 6. APP SHELL STRUCTURE

Create a desktop Admin App Shell with:

1. Left Sidebar
2. Topbar
3. Main Content Area

Overall structure:

SIDEBAR
+
TOPBAR
+
PAGE CONTENT

The App Shell itself must be reusable.

Do not design the Overview content inside this prompt.

Only create the shell and representative empty page content.

---

# 7. DESKTOP DIMENSIONS

Use a professional desktop web layout.

Recommended:

Sidebar:
256px wide

Topbar:
72px high

Main content:
remaining viewport width

Page content padding:
32px

Use a maximum content width when appropriate.

Do not make the interface feel stretched across extremely wide screens.

---

# 8. SIDEBAR

Create a dark navy vertical sidebar.

Width:

256px

The sidebar must remain visually stable across all Admin pages.

At the top:

SYNAPSE MED logo

Under the logo, a small contextual label:

ADMIN CONSOLE

Do not use the full learner tagline as the main navigation label.

---

# 9. SIDEBAR NAVIGATION

Use exactly this information architecture:

MAIN

Overview

Students

Courses

Revisions

Quizzes

Access

Coupons

Certificates

Notifications

---

INSIGHTS

Analytics

Audit Logs

---

SYSTEM

Settings

Do not add:

* Revenue
* Billing
* AI Assistant
* Support
* CRM
* Marketing
* Teams
* Reports

unless explicitly requested later.

Do not invent navigation.

---

# 10. SIDEBAR ICONS

Use one consistent modern line-icon family.

Icons should be visually lightweight.

Suggested semantic mapping:

Overview → dashboard/grid icon

Students → users icon

Courses → book icon

Revisions → refresh/cycle icon

Quizzes → clipboard/check icon

Access → lock/key icon

Coupons → tag icon

Certificates → award/certificate icon

Notifications → bell icon

Analytics → chart icon

Audit Logs → shield/document icon

Settings → gear icon

Do not use emoji icons.

Do not mix icon families.

Do not use filled icons next to thin line icons.

---

# 11. SIDEBAR DEFAULT STATE

Default navigation items should use:

* muted white/gray text
* muted line icons
* transparent or near-transparent background

The sidebar should remain visually quiet.

---

# 12. SIDEBAR HOVER STATE

On hover:

* slightly elevated surface
* clearer text
* subtle icon emphasis

Do not use a large bright cyan background.

Do not create excessive glow.

---

# 13. SIDEBAR ACTIVE STATE

Create a clear active state.

Example:

Overview active

The active item should use:

* elevated dark surface
* cyan icon
* white/cyan text
* subtle cyan accent indicator

The active state must be obvious but elegant.

Avoid a large solid cyan rectangle.

---

# 14. SIDEBAR DIVIDERS

Use subtle dividers between:

MAIN

INSIGHTS

SYSTEM

Dividers should be extremely subtle.

They should organize the navigation without visually dominating it.

---

# 15. SIDEBAR BOTTOM AREA

At the bottom of the sidebar create:

Admin profile area

Example:

Ahmed Admin

Super Admin

with:

* circular avatar
* name
* role
* dropdown indicator

Use a subtle elevated surface.

The profile area must feel like part of the navigation system, not a floating unrelated card.

Also provide:

Collapse

control.

---

# 16. COLLAPSED SIDEBAR

Create a collapsed state:

Width:

72px

Show:

* logo mark
* navigation icons
* profile avatar
* collapse/expand control

Hide text labels.

Use tooltips when hovering over icons.

Do not distort or replace the logo.

---

# 17. TOPBAR

Create a 72px topbar.

Keep it minimal.

Left side:

* current page context
* optional breadcrumb
* page title

Center / flexible area:

Global Search

Right side:

* Notifications
* Admin profile

Do not overload the topbar.

---

# 18. GLOBAL SEARCH

Create a professional global search field.

Placeholder:

Search students, courses, revisions...

Include a keyboard shortcut hint:

Ctrl / K

The search should visually communicate that it can search across the platform.

Do not add unsupported search categories as visible UI.

Use:

* dark/elevated surface
* subtle border
* search icon
* muted placeholder
* readable keyboard shortcut

---

# 19. NOTIFICATION BUTTON

Create a notification bell button.

Use a small unread badge when notifications exist.

Example:

Bell icon

3

The badge should be compact.

Do not use a large red notification circle.

The notification UI should remain consistent with the dark navy / cyan identity.

---

# 20. ADMIN PROFILE

Topbar profile:

Ahmed Admin

Super Admin

Avatar

Chevron

Clicking it should visually suggest a dropdown menu.

The dropdown should contain only reasonable account-level actions:

Profile

Security

Sessions

Sign out

Do not add unrelated settings here.

---

# 21. MAIN CONTENT AREA

Create a neutral representative content area.

Do NOT design the complete Overview dashboard.

Instead show:

Breadcrumb

Page title:

Overview

A small subtitle:

Platform overview

Then leave enough structured space to demonstrate how page content will sit inside the shell.

The purpose is to demonstrate the App Shell.

---

# 22. RESPONSIVE BEHAVIOR

Desktop:

Expanded sidebar

Tablet:

Collapsed sidebar

Mobile:

Sidebar becomes a drawer

Topbar adapts to smaller widths.

Do not compress the entire desktop navigation into a tiny mobile sidebar.

On mobile:

* logo remains visible
* menu button opens navigation drawer
* search becomes compact
* notification remains accessible
* profile remains accessible

---

# 23. RTL READINESS

The system must support Arabic RTL later.

Do not hardcode directional layout assumptions.

Navigation, spacing, breadcrumbs, and directional icons should be capable of mirroring correctly.

The current design may be shown in LTR English.

Do not create a separate Arabic visual system.

---

# 24. COMPONENT DISCIPLINE

Treat these as reusable system components:

* Sidebar
* SidebarSection
* SidebarItem
* SidebarDivider
* SidebarProfile
* Topbar
* Breadcrumb
* GlobalSearch
* NotificationButton
* ProfileMenu
* CollapseButton

Do not create one-off versions of these components.

---

# 25. STATES

Show or define the following states where appropriate:

Sidebar:

* Default
* Hover
* Active
* Collapsed

Search:

* Default
* Focus
* Filled

Notification:

* No unread
* Has unread

Profile:

* Closed
* Open

Responsive:

* Desktop
* Tablet
* Mobile

---

# 26. SPACING

Use an 8px-based spacing system.

Preferred values:

4
8
12
16
24
32
48

Maintain consistent vertical rhythm.

Do not randomly change spacing between components.

---

# 27. CORNERS

Use:

6px for small controls

8px for standard controls

12px for cards and major surfaces

16px for large overlays/modals when needed

Do not use excessive pill shapes.

Pill shapes should be reserved for statuses and compact controls.

---

# 28. TYPOGRAPHY

Use the established SYNAPSE MED typography direction.

The brand reference uses a clean modern sans-serif style, with Montserrat identified for the brand headings/tagline.

For the Admin UI, maintain the same modern geometric feel and strong readability.

Hierarchy:

Page title:
28–32px / Bold

Section title:
18–20px / Semibold

Navigation:
14px / Medium

Body:
14px / Regular

Metadata:
12–13px

Do not use decorative fonts.

---

# 29. VISUAL DECORATION

Use the SYNAPSE MED neural/synapse visual language only as subtle decoration.

Possible placement:

* very subtle sidebar background pattern
* tiny brand accent near the logo
* minimal decorative node/line detail

Do not place neurons behind every component.

Do not turn the Admin Dashboard into a sci-fi interface.

---

# 30. ACCESSIBILITY

Maintain:

* clear text contrast
* visible focus states
* sufficiently large click targets
* readable labels
* non-color-only status communication

Do not rely only on color to communicate important states.

---

# 31. DO NOT INVENT

This rule is mandatory.

Do NOT invent:

* new features
* new pages
* new navigation
* new metrics
* new business workflows
* new filters
* new roles
* new entities
* new analytics
* new buttons

Only use functionality explicitly defined by the specification.

---

# 32. DO NOT CHANGE THE DESIGN SYSTEM

Do not introduce:

* new primary colors
* new typography systems
* new icon families
* new radius systems
* new shadows
* new card styles
* new sidebar styles
* new navigation patterns

The App Shell must establish the visual foundation for all future screens.

---

# 33. OUTPUT REQUIREMENT

Create a high-fidelity desktop-first Admin App Shell.

Show:

1. Expanded Sidebar
2. Topbar
3. Global Search
4. Notification state
5. Admin Profile
6. Active navigation state
7. Representative content area
8. Collapsed Sidebar state
9. Responsive/mobile navigation behavior if the tool supports multiple frames

The result should look like a real production-ready product interface, not a generic concept shot.

Prioritize:

Consistency
Hierarchy
Usability
Brand continuity
Component reuse

over decorative effects.

---

# 34. FINAL DESIGN DIRECTION

The final interface should communicate:

SYNAPSE MED

Medical education

Professional administration

Clinical precision

Intelligent technology

Trust

The visual formula is:

DEEP NAVY
+
WHITE
+
CONTROLLED CYAN
+
CLEAN TYPOGRAPHY
+
SUBTLE SYNAPSE DETAILS
+
PRECISE INFORMATION HIERARCHY

The result must feel like one coherent SYNAPSE MED product.
