SYNAPSE MED ADMIN CONSOLE
CERTIFICATES
SCREEN 19 — CERTIFICATE LIST

==================================================
EXECUTION CONTEXT
==================================================

Location:

Admin Console
→ Sidebar
→ Certificates

Entry point:

Sidebar → Certificates

Use the existing SYNAPSE MED Admin App Shell.

Reuse:

- Sidebar
- Topbar
- Typography
- Colors
- DataTable
- Status badges
- Buttons
- Search
- Filters
- Pagination
- Modal
- Spacing
- Icons

Do NOT redesign the App Shell.

This is a production-like populated screen.

Do NOT create an empty wireframe.

Do NOT use lorem ipsum.

==================================================
1. PRODUCT PURPOSE
==================================================

The Certificates page allows administrators to inspect certificates
issued to students after supported educational completion.

The page must communicate:

Who received the certificate?

Which course is it associated with?

When was it issued?

What is its current state?

Can it be verified?

This is an administrative certificate-management screen.

It is NOT:

- Student Progress
- Course Analytics
- Billing
- Access Management

==================================================
2. SAMPLE DATA
==================================================

CERTIFICATE 01

Certificate:
CERT-2026-000184

Student:
Ahmed Hassan

Email:
ahmed.hassan@example.com

Course:
Advanced Cardiology

Issued:
18 Mar 2026

Status:
Issued


CERTIFICATE 02

Certificate:
CERT-2026-000185

Student:
Mariam Adel

Email:
mariam.adel@example.com

Course:
Emergency Medicine Essentials

Issued:
20 Mar 2026

Status:
Issued


CERTIFICATE 03

Certificate:
CERT-2026-000186

Student:
Omar Khaled

Email:
omar.khaled@example.com

Course:
Internal Medicine Review

Issued:
21 Mar 2026

Status:
Issued


CERTIFICATE 04

Certificate:
CERT-2026-000187

Student:
Sara Mohamed

Email:
sara.mohamed@example.com

Course:
Clinical Pharmacology

Issued:
22 Mar 2026

Status:
Issued


CERTIFICATE 05

Certificate:
CERT-2026-000188

Student:
Youssef Ali

Email:
youssef.ali@example.com

Course:
Neurology Board Review

Issued:
25 Mar 2026

Status:
Revoked

==================================================
3. PAGE HEADER
==================================================

Breadcrumb:

Admin / Certificates

Title:

Certificates

Description:

Review and manage issued learning certificates.

==================================================
4. SUMMARY CARDS
==================================================

Show:

Total Certificates
5

Issued
4

Revoked
1

Latest Issued
25 Mar 2026

Do not invent:

completion rate

student ranking

course performance

revenue

==================================================
5. SEARCH
==================================================

Placeholder:

Search certificate, student, or course...

==================================================
6. FILTERS
==================================================

Status:

All
Issued
Revoked

Course:

All Courses
Advanced Cardiology
Emergency Medicine Essentials
Internal Medicine Review
Clinical Pharmacology
Neurology Board Review

==================================================
7. TABLE
==================================================

Columns:

Certificate

Student

Course

Issued

Status

Actions

==================================================
8. CERTIFICATE CELL
==================================================

Primary:

CERT-2026-000184

Secondary:

Certificate

The certificate identifier should be visually easy to copy.

==================================================
9. STUDENT CELL
==================================================

Primary:

Ahmed Hassan

Secondary:

ahmed.hassan@example.com

Use existing identity pattern.

==================================================
10. STATUS
==================================================

Issued:

Positive semantic treatment

Revoked:

Muted destructive semantic treatment

Do not use excessive colors.

==================================================
11. ACTIONS
==================================================

Issued:

View

Verify

Revoked:

View

Verify

Only include actions supported by the actual workflow.

==================================================
12. PAGINATION
==================================================

Show:

Showing 1–5 of 5 certificates

Use the approved pagination component.

==================================================
13. EMPTY STATE
==================================================

No certificates:

No certificates have been issued yet.

Filtered:

No certificates match your current filters.

[ Clear Filters ]

==================================================
14. LOADING
==================================================

Use table skeletons.

Keep App Shell visible.

==================================================
15. ERROR
==================================================

Unable to load certificates.

[ Try Again ]

==================================================
16. RESPONSIVE
==================================================

Desktop:

Full table.

Tablet:

Readable table with horizontal scrolling if necessary.

Mobile:

Stack certificate records.

Show:

Certificate ID

Student

Course

Status

Action

==================================================
17. RTL
==================================================

Support Arabic RTL.

Certificate IDs remain LTR.

Emails remain LTR.

Dates remain readable.

==================================================
18. OUTPUT
==================================================

Generate a high-fidelity populated desktop screen.

The screen MUST visibly contain:

5 certificate records

4 summary cards

Search

Filters

Table

Statuses

Actions

Pagination

Do not leave the primary content empty.