SYNAPSE MED ADMIN CONSOLE
NOTIFICATIONS
SCREEN 22 — NOTIFICATIONS LIST

==================================================
LOCATION
==================================================

Admin Console
→ Sidebar
→ Notifications

==================================================
PURPOSE
==================================================

Manage administrative notifications supported by the product.

The screen should communicate:

Notification

Audience / Recipient

Type

Status

Created

Available actions

Do not turn this into a marketing campaign dashboard.

==================================================
SAMPLE DATA
==================================================

NOTIFICATION 01

Title:
New Cardiology Revision Available

Recipient:
All students with Cardiology access

Type:
Course Update

Status:
Sent

Created:
18 Mar 2026


NOTIFICATION 02

Title:
Emergency Medicine Revision Scheduled

Recipient:
Emergency Medicine learners

Type:
Course Update

Status:
Scheduled

Created:
20 Mar 2026


NOTIFICATION 03

Title:
Certificate Available

Recipient:
Ahmed Hassan

Type:
Certificate

Status:
Sent

Created:
18 Mar 2026


NOTIFICATION 04

Title:
Course Access Granted

Recipient:
Mariam Adel

Type:
Access

Status:
Sent

Created:
14 Mar 2026


NOTIFICATION 05

Title:
Internal Medicine Content Update

Recipient:
Internal Medicine learners

Type:
Course Update

Status:
Draft

Created:
22 Mar 2026

==================================================
PAGE HEADER
==================================================

Title:

Notifications

Description:

Manage system notifications and supported learner communications.

Primary:

Create Notification

==================================================
SUMMARY
==================================================

Total:

5

Sent:

3

Scheduled:

1

Draft:

1

==================================================
SEARCH
==================================================

Search notifications...

==================================================
FILTERS
==================================================

Status:

All
Draft
Scheduled
Sent

Type:

All
Course Update
Certificate
Access

==================================================
TABLE
==================================================

Columns:

Notification

Recipient

Type

Status

Created

Actions

==================================================
ACTIONS
==================================================

Draft:

Edit
Delete

Scheduled:

View
Edit
Cancel

Sent:

View

Only use Delete if supported.

==================================================
EMPTY
==================================================

No notifications yet.

[ Create Notification ]

==================================================
OUTPUT
==================================================

Create a fully populated desktop screen.

Show all five sample notifications.SYNAPSE MED ADMIN CONSOLE
NOTIFICATIONS
SCREEN 23 — NOTIFICATION DETAILS

==================================================
LOCATION
==================================================

Admin
→ Notifications
→ Notification Details

==================================================
SAMPLE RECORD
==================================================

Title:

New Cardiology Revision Available

Recipient:

All students with Cardiology access

Type:

Course Update

Status:

Sent

Created:

18 Mar 2026

Message:

A new Cardiology revision is now available for learners
with access to the course.

==================================================
HEADER
==================================================

Title:

New Cardiology Revision Available

Status:

Sent

Actions:

View

Back

==================================================
CONTENT
==================================================

Section:

Notification Information

Title

Recipient

Type

Status

Created

==================================================
MESSAGE
==================================================

Display the actual sample message in a readable content surface.

Do not turn it into an editable form.

==================================================
DELIVERY
==================================================

If delivery information is actually available:

Show supported delivery state.

Do not invent:

Open Rate

Click Rate

Delivery Percentage

Email Analytics

unless explicitly supported.

==================================================
OUTPUT
==================================================

Populate every section.

No blank cards.SYNAPSE MED ADMIN CONSOLE
NOTIFICATIONS
SCREEN 24 — NOTIFICATION COMPOSER

==================================================
LOCATION
==================================================

Admin
→ Notifications
→ Create Notification

==================================================
PURPOSE
==================================================

Create a supported administrative notification.

This is a structured authoring form.

==================================================
SAMPLE DATA
==================================================

Title:

New Cardiology Revision Available

Recipient:

Students with access to Advanced Cardiology

Type:

Course Update

Message:

A new Cardiology revision is now available for learners
with access to the course.

Status:

Draft

==================================================
FORM
==================================================

SECTION 01

Notification Information

Title

Recipient

Type

Message

==================================================
TYPE
==================================================

Use only supported notification types.

Example:

Course Update

Certificate

Access

Do not invent:

Marketing

Promotion

Advertisement

Newsletter

unless supported.

==================================================
RECIPIENT
==================================================

Use a controlled recipient selector.

The selector should make audience scope clear.

Do not accidentally make a global notification look like
a single-student notification.

==================================================
MESSAGE
==================================================

Use the established Textarea component.

Do not create a rich text editor unless required.

==================================================
PREVIEW
==================================================

Provide a compact notification preview.

Preview should show:

Title

Recipient context

Message

Do not create a separate phone mockup.

==================================================
ACTIONS
==================================================

Save Draft

Cancel

If sending/scheduling is supported:

Schedule / Send

Otherwise do not invent these actions.

==================================================
UNSAVED
==================================================

Unsaved Changes

Discard Changes confirmation.

==================================================
OUTPUT
==================================================

Generate a populated production-like desktop editor.

No empty form fields.

Use the supplied sample data.