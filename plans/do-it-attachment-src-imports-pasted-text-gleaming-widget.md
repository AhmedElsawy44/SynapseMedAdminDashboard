# Plan: SYNAPSE MED Admin App Shell

## Context

The user wants to build a production-quality Admin Dashboard App Shell for SYNAPSE MED, a medical education platform. The brief is in `src/imports/pasted_text/admin-app-shell.md`. This is the foundational shell — sidebar, topbar, content area — to be reused across all authenticated admin screens. No custom guidelines exist yet; the project is a fresh scaffold.

---

## Approach

Build the entire App Shell in `src/app/App.tsx` as a single self-contained React component file. Split into focused sub-components defined in the same file for clarity and reuse discipline. Use Tailwind CSS throughout. Apply brand tokens via inline Tailwind arbitrary values where CSS variables are not yet defined (since theme.css uses generic defaults, not SYNAPSE MED colors).

---

## Color Tokens to Use (via Tailwind arbitrary values)

| Role | Value |
|---|---|
| Background (deepest) | `#071225` |
| Surface | `#101A2B` |
| Elevated surface | `#151F32` |
| Accent cyan | `#35E0DF` |
| Accent hover | `#52E8E7` |
| Primary text | `#F4F7FA` |
| Secondary text | `#A9B5C7` |
| Subtle border | `rgba(255,255,255,0.08)` |

---

## Typography

Add to `src/styles/fonts.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
```

Apply `font-family: 'Montserrat', sans-serif` to the shell root.

---

## Update `src/styles/theme.css`

Update CSS variables to SYNAPSE MED dark-navy values (preserve all token names and `@theme inline` block):
- `--background: #071225`
- `--foreground: #F4F7FA`
- `--card: #101A2B`
- `--border: rgba(255,255,255,0.08)`
- `--primary: #35E0DF`
- `--muted-foreground: #A9B5C7`
- `--sidebar: #071225`
- etc.

---

## Component Structure (all in App.tsx)

```
App
├── Sidebar (256px / 72px collapsed, drawer on mobile)
│   ├── SidebarHeader (logo + "ADMIN CONSOLE" label)
│   ├── SidebarSection (label + list of SidebarItems)
│   │   ├── MAIN: Overview, Students, Courses, Revisions, Quizzes, Access, Coupons, Certificates, Notifications
│   │   ├── INSIGHTS: Analytics, Audit Logs
│   │   └── SYSTEM: Settings
│   ├── SidebarDivider (between sections)
│   └── SidebarProfile (Ahmed Admin / Super Admin + chevron + collapse button)
├── MainArea (flex-col, takes remaining width)
│   ├── Topbar (72px, h-18)
│   │   ├── Left: page title / breadcrumb
│   │   ├── Center: GlobalSearch
│   │   └── Right: NotificationButton + ProfileMenu
│   └── PageContent (padding 32px, representative placeholder)
```

---

## Key Implementation Details

### Sidebar
- `useState` for `collapsed` (boolean) and `activeItem` (string, default "Overview")
- Collapsed width: `w-[72px]`, expanded: `w-[256px]`, transition with CSS transition on width
- Logo: SVG text mark "SYNAPSE MED" in Montserrat bold + cyan accent dot/mark to suggest neural/synapse identity; "ADMIN CONSOLE" label below in small caps, muted
- Collapsed: show only icon column, hide text; logo collapses to "S" mark
- Hover state: `hover:bg-white/5` + text brighten
- Active state: `bg-white/8` elevated surface, cyan icon color, white text, 2px left cyan border indicator
- SidebarProfile at bottom: fixed to bottom of sidebar, sticky, shows avatar initials "AA", name, role, chevron
- CollapseButton: a small chevron/arrow icon at the very bottom of profile area

### Topbar
- `h-[72px]` sticky, `bg-[#101A2B]`, border-bottom subtle
- Left: hamburger (mobile only) + breadcrumb ("Admin Console / Overview") + page title "Overview"
- Center: GlobalSearch - dark elevated input, search icon left, "Ctrl K" hint right, placeholder "Search students, courses, revisions..."
- Right: NotificationButton (Bell + badge "3") + ProfileMenu (avatar + "Ahmed Admin" + "Super Admin" + chevron)

### ProfileMenu (dropdown)
- `useState` for open/closed
- Dropdown items: Profile, Security, Sessions, Sign out
- Uses absolute positioning, elevated surface, subtle border, rounded-xl

### Mobile
- On `md` breakpoint and below: sidebar becomes a drawer overlay (translate-x-0 / -translate-x-full)
- Overlay backdrop when drawer open
- Topbar shows hamburger to toggle drawer

### Content Area
- `bg-[#071225]`, `p-8`
- Shows: Breadcrumb trail, Page title "Overview" (28-32px bold), subtitle "Platform overview" (muted), then a placeholder grid of 4 stat card outlines and a content area skeleton to demonstrate the shell

### Lucide Icons used
```
LayoutDashboard, Users, BookOpen, RefreshCw, ClipboardCheck,
Lock, Tag, Award, Bell, BarChart2, Shield, Settings,
Search, ChevronRight, ChevronDown, ChevronLeft,
Menu, X, PanelLeftClose, PanelLeftOpen
```

### RTL readiness
- Use `dir` attribute on root, `start`/`end` logical properties via Tailwind `ps-`, `pe-` where possible
- Avoid hardcoded `left:`/`right:` inline styles; use `ltr:` and `rtl:` Tailwind variants for directional icons (chevrons)

---

## Files to Modify

1. **`src/app/App.tsx`** — full App Shell implementation (primary deliverable)
2. **`src/styles/fonts.css`** — add Montserrat Google Fonts import
3. **`src/styles/theme.css`** — update CSS variables to SYNAPSE MED dark-navy palette (preserve token names and `@theme inline` block)

---

## Verification

- Run the dev server and visually confirm:
  - Sidebar expands/collapses on click
  - Active nav item shows cyan accent + elevated state
  - Hover states are subtle, not neon
  - Topbar search, notification badge, and profile dropdown work
  - Mobile: sidebar drawer opens/closes via hamburger
  - Color ratios: ~70% dark navy, ~20% text, ~10% cyan
  - Typography hierarchy: page title large/bold, nav 14px medium, meta 12px
