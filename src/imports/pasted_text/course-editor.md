SYNAPSE MED — ADMIN UI
PROMPT #07 — COURSE EDITOR

Design the Course Editor for the SYNAPSE MED Admin Console.

The approved SYNAPSE MED Admin App Shell is immutable.

Reuse the exact approved:

- Sidebar
- Topbar
- Typography
- Color system
- Surface system
- Button system
- Input system
- Card system
- Table/List system
- Status system
- Spacing system
- Icon system

Do NOT redesign the App Shell.

==================================================
1. PRODUCT PURPOSE
==================================================

The Course Editor is a focused content-authoring interface.

Its purpose is to allow an authorized administrator to create or edit
Course information and its supported lecture/content structure.

This screen is an EDITOR.

It is not:

- a dashboard
- an analytics page
- a student page
- a billing page
- a revision management page
- an infrastructure/video monitoring page

==================================================
2. DOMAIN STRUCTURE
==================================================

The Course domain contains:

Course
→ Lectures
→ Videos

The editor must preserve this hierarchy.

Do NOT introduce:

Sections
Modules
Chapters
Units

unless they are explicitly part of the product model.

==================================================
3. PAGE HEADER
==================================================

Breadcrumb:

Admin / Courses / Course / Edit

Title:

Edit Course

For creation mode:

Create Course

The header should include:

Back to Course

or

Back to Courses

depending on the flow.

Do not create multiple competing primary actions.

==================================================
4. SAVE MODEL
==================================================

The editor must have a clear save model.

Primary action:

Save Changes

For creation:

Create Course

Secondary action:

Cancel

The primary save action must remain visually dominant.

Do not add:

Save & Publish

Save & Duplicate

Save & Export

unless explicitly supported.

==================================================
5. UNSAVED CHANGES
==================================================

The editor must visually communicate unsaved changes.

When changes exist:

Show a subtle unsaved state.

Example:

Unsaved changes

The user should receive a confirmation before leaving the editor
if unsaved changes would be lost.

Do not use aggressive modal interruptions.

==================================================
6. COURSE INFORMATION
==================================================

Create a clear Course Information section.

Use only approved Course fields.

The architecture supports Course identity/content fields such as:

- title
- description

Only display fields explicitly supported by the actual Course model.

Do NOT invent:

- instructor
- price
- rating
- category
- department
- specialty
- enrollment target

==================================================
7. TITLE INPUT
==================================================

Create a standard text input.

Label:

Course Title

Use the approved input component.

Requirements:

- clear label
- optional helper text
- focus state
- validation state
- readable input height

Do not use placeholder text as the primary label.

==================================================
8. DESCRIPTION INPUT
==================================================

Create a multiline text area.

Label:

Description

Use the same input system.

The text area should support comfortable content editing.

Do not turn it into a huge writing environment.

The Admin is editing structured educational metadata.

==================================================
9. VALIDATION
==================================================

Validation must be clear and local.

Examples:

Required field

Invalid value

Content too long

Only show validation rules that are actually supported.

Do not invent arbitrary character limits.

Error messages must be:

short

specific

actionable

Avoid technical validation messages.

==================================================
10. LECTURE MANAGEMENT
==================================================

Create a dedicated:

Course Content

section.

Display lectures as an ordered list.

Each lecture should have:

Order

Lecture title

Video/content state if supported

Actions

The hierarchy must be visually obvious.

==================================================
11. ADD LECTURE
==================================================

If lecture creation is supported:

Provide:

Add Lecture

This should add a new lecture entry to the editor.

Do not create:

Add Module

Add Section

Add Chapter

unless explicitly supported.

==================================================
12. LECTURE EDITING
==================================================

Each lecture should expose its editable information.

At minimum:

Lecture Title

Only include additional fields if explicitly supported.

Avoid turning every lecture into a large form.

Preferred pattern:

Compact lecture row

↓

Expand/edit area

This keeps the page scalable.

==================================================
13. LECTURE ORDERING
==================================================

If lecture reordering is supported:

Provide a subtle drag handle.

The order should be visually explicit.

Use:

01
02
03
...

or equivalent ordering representation.

Do not imply drag-and-drop functionality if it is not supported.

==================================================
14. VIDEO CONTENT
==================================================

If lecture video management is supported:

Represent the video as a content resource.

The UI may expose:

Video available

Video not available

Upload / Replace video

ONLY if those actions are supported.

Do not expose infrastructure details.

Never display:

- Bunny Stream ID
- playback token
- CDN URL
- storage key
- encoding job ID

Those are implementation details.

==================================================
15. VIDEO UPLOAD
==================================================

If video upload is part of the supported workflow:

Use a dedicated upload component.

It should communicate:

- upload area
- selected file
- upload progress
- success
- failure
- retry

Do not create a generic file-management system.

The component is specifically for lecture video content.

==================================================
16. UPLOAD STATES
==================================================

Show the following states where applicable:

Default:

Upload video

Uploading:

Progress indicator

Success:

Video uploaded

Error:

Upload failed

[ Try Again ]

Do not show technical storage errors.

==================================================
17. FORM LAYOUT
==================================================

Desktop:

Use a comfortable two-column editing layout where appropriate.

Recommended:

Main column:

Course Information

Course Content

Secondary column:

Save state

Contextual metadata

Actions

However:

Do not force two columns if the content becomes cramped.

The editing surface is more important than symmetry.

==================================================
18. FORM WIDTH
==================================================

Keep text fields at readable widths.

Do not stretch text inputs across the entire viewport.

The editor should feel like a controlled professional workspace.

==================================================
19. ACTION BAR
==================================================

Provide a consistent action area.

Desktop:

Save Changes

Cancel

Mobile:

Sticky bottom action bar may be used.

The action bar must not cover important content.

==================================================
20. DANGER ACTIONS
==================================================

Do not add destructive actions unless explicitly supported.

If deletion is supported later:

It must be separated visually from save actions.

Never place:

Delete

next to:

Save

without a clear separation and confirmation flow.

==================================================
21. AUTOSAVE
==================================================

Do NOT assume autosave.

If autosave is not explicitly supported:

Use manual Save Changes.

Do not create:

Saving...

Saved automatically

unless the product workflow supports it.

==================================================
22. FORM STATES
==================================================

Every input must support:

Default

Focus

Filled

Disabled

Error

Read-only where necessary

The visual language must remain consistent.

==================================================
23. SAVE STATES
==================================================

The Save action should support:

Default

Loading

Success

Error

During saving:

Saving...

Disable duplicate submission.

After successful save:

Show a subtle success confirmation.

Do not use a giant modal.

==================================================
24. ERROR HANDLING
==================================================

If save fails:

Unable to save changes.

Try again.

Do not expose:

API errors

database errors

stack traces

internal identifiers

==================================================
25. EMPTY CONTENT
==================================================

If the course has no lectures:

Show:

No lectures yet.

If lecture creation is supported:

[ Add Lecture ]

The empty state should look like an intentional authoring state.

==================================================
26. RESPONSIVE
==================================================

Desktop:

Full editor.

Tablet:

Stack secondary column below main content where necessary.

Mobile:

Single column.

Action bar becomes sticky.

Lecture editing remains readable.

Upload component becomes full width.

Do not compress controls excessively.

==================================================
27. RTL
==================================================

The entire editor must support Arabic RTL.

Use logical spacing.

Mirror directional icons.

Do not hardcode left/right assumptions.

Text inputs must support Arabic correctly.

==================================================
28. VISUAL SYSTEM
==================================================

Maintain:

Deep Navy

White

Controlled Cyan

Muted secondary text

Dark elevated surfaces

Subtle borders

Clean typography

Minimal shadows

No excessive gradients.

No glassmorphism.

No neon glow.

==================================================
29. CARD USAGE
==================================================

Avoid Card Soup.

Use meaningful editing surfaces.

Recommended:

Course Information surface

Course Content surface

Optional Save/Status surface

Do not create a separate large card for every input.

==================================================
30. CONTENT HIERARCHY
==================================================

The editor must communicate:

COURSE
↓
LECTURES
↓
VIDEO CONTENT

The hierarchy must remain understandable even when many lectures exist.

==================================================
31. DATA INTEGRITY
==================================================

Never invent:

- fields
- validation rules
- statuses
- actions
- course metadata
- lecture metadata
- video metadata

If a field is not defined:

Do not add it.

The UI must reflect the product model exactly.

==================================================
32. PRODUCT DESIGN BOUNDARY
==================================================

The product specification determines:

WHAT can be edited.

The design system determines:

HOW editing works visually.

Do not create product functionality through UI assumptions.

==================================================
33. OUTPUT
==================================================

Create one high-fidelity desktop Course Editor screen.

Show:

- Approved App Shell
- Page header
- Course Information
- Course Content
- Lecture list
- Lecture editing pattern
- Video/content state
- Save/Cancel actions
- Validation example
- Unsaved changes state
- Responsive behavior

Do not create:

- Revision Editor
- Quiz Editor
- Student Editor
- Settings

Those are separate modules.

==================================================
34. FINAL QUALITY BAR
==================================================

The result should feel like:

A premium medical education content-authoring workspace.

It must be:

structured

focused

calm

professional

easy to edit

scalable

consistent with SYNAPSE MED

Do not make it look like a generic form builder.

Do not make it look like a CMS template.

Do not invent functionality.

The product specification determines WHAT exists.

The design system determines HOW it looks.