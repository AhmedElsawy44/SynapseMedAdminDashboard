import React, { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, Users, BookOpen, RefreshCw, ClipboardCheck,
  Lock, Tag, Award, Bell, BarChart2, Shield, Settings,
  Search, ChevronRight, ChevronDown, ChevronLeft,
  Menu, X, User, LogOut, Key, Monitor, Smartphone,
  SlidersHorizontal, ArrowUpDown, ArrowUp, ArrowDown,
  MoreHorizontal, Eye, AlertCircle, Clock,
  Plus, FileText, Send, ExternalLink,
  Settings2, List, Play,
  GripVertical, Upload, Check,
} from "lucide-react";
import synapseLogo from "@/imports/Synapse_med_Logo.png";

// ─── Brand colors ─────────────────────────────────────────────────────────────
const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Active:     { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Inactive:   { color: "#A9B5C7", bg: "rgba(169,181,199,0.1)" },
  Suspended:  { color: "#fbbf24", bg: "rgba(251,191,36,0.1)"  },
  Pending:    { color: "#60a5fa", bg: "rgba(96,165,250,0.1)"  },
  Published:  { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Draft:      { color: "#A9B5C7", bg: "rgba(169,181,199,0.1)" },
  Scheduled:  { color: "#60a5fa", bg: "rgba(96,165,250,0.1)"  },
  "In Review":{ color: "#60a5fa", bg: "rgba(96,165,250,0.1)"  },
  Archived:   { color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  Granted:    { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Expired:    { color: "#fbbf24", bg: "rgba(251,191,36,0.1)"  },
  Revoked:    { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
  Passed:     { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Failed:     { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const CHART_DATA: Record<string, { period: string; enrollments: number }[]> = {
  "7D":  [
    { period: "Mon", enrollments: 4  }, { period: "Tue", enrollments: 7  },
    { period: "Wed", enrollments: 5  }, { period: "Thu", enrollments: 9  },
    { period: "Fri", enrollments: 12 }, { period: "Sat", enrollments: 3  },
    { period: "Sun", enrollments: 6  },
  ],
  "30D": [
    { period: "W1", enrollments: 18 }, { period: "W2", enrollments: 27 },
    { period: "W3", enrollments: 22 }, { period: "W4", enrollments: 31 },
  ],
  "90D": [
    { period: "Mo 1", enrollments: 42 },
    { period: "Mo 2", enrollments: 58 },
    { period: "Mo 3", enrollments: 51 },
  ],
};

const ACTIVITY_ITEMS = [
  { icon: BookOpen,       title: "Course content updated",        desc: "A course was updated and republished.",          time: "2 min ago"  },
  { icon: RefreshCw,      title: "Revision submitted for review", desc: "A new revision is awaiting approval.",           time: "14 min ago" },
  { icon: ClipboardCheck, title: "Quiz results processed",        desc: "Quiz answers were graded and recorded.",         time: "1 hr ago"   },
  { icon: Award,          title: "Certificate issued",            desc: "A certificate was generated for a student.",    time: "2 hrs ago"  },
  { icon: Lock,           title: "Access request received",       desc: "A student has requested course access.",        time: "3 hrs ago"  },
  { icon: Bell,           title: "Notification delivered",        desc: "A scheduled notification was sent to students.", time: "5 hrs ago"  },
];

const COURSE_ROWS = [
  { status: "Published",  updated: "Aug 20, 2026" },
  { status: "In Review",  updated: "Aug 18, 2026" },
  { status: "Published",  updated: "Aug 15, 2026" },
  { status: "Draft",      updated: "Aug 10, 2026" },
  { status: "Archived",   updated: "Jul 30, 2026" },
];

const ALL_STUDENTS = [
  { id: "SM-0041", name: "Sarah Al-Rashidi", email: "s.alrashidi@med.edu", status: "Active",    enrolled: "Jan 12, 2024" },
  { id: "SM-0042", name: "Mohammed Khalid",  email: "m.khalid@med.edu",    status: "Active",    enrolled: "Feb 3, 2024"  },
  { id: "SM-0043", name: "Fatima Hassan",    email: "f.hassan@med.edu",    status: "Inactive",  enrolled: "Dec 5, 2023"  },
  { id: "SM-0044", name: "Omar Siddiqui",    email: "o.siddiqui@med.edu",  status: "Pending",   enrolled: "Mar 1, 2024"  },
  { id: "SM-0045", name: "Layla Nasser",     email: "l.nasser@med.edu",    status: "Active",    enrolled: "Nov 20, 2023" },
  { id: "SM-0046", name: "Ahmed Yousef",     email: "a.yousef@med.edu",    status: "Suspended", enrolled: "Oct 8, 2023"  },
  { id: "SM-0047", name: "Noor Ibrahim",     email: "n.ibrahim@med.edu",   status: "Active",    enrolled: "Apr 15, 2024" },
  { id: "SM-0048", name: "Khalid Mansour",   email: "k.mansour@med.edu",   status: "Inactive",  enrolled: "Sep 12, 2023" },
  { id: "SM-0049", name: "Rania El-Sayed",   email: "r.elsayed@med.edu",   status: "Active",    enrolled: "May 2, 2024"  },
  { id: "SM-0050", name: "Yousef Al-Farsi",  email: "y.alfarsi@med.edu",   status: "Pending",   enrolled: "Jun 7, 2024"  },
  { id: "SM-0051", name: "Mona Salah",       email: "m.salah@med.edu",     status: "Active",    enrolled: "Jul 19, 2024" },
  { id: "SM-0052", name: "Tariq Al-Hamdan",  email: "t.alhamdan@med.edu",  status: "Inactive",  enrolled: "Aug 3, 2024"  },
];

const NAV_SECTIONS = [
  { label: "MAIN", items: [
    { id: "Overview",      icon: LayoutDashboard },
    { id: "Students",      icon: Users           },
    { id: "Courses",       icon: BookOpen        },
    { id: "Revisions",     icon: RefreshCw       },
    { id: "Quizzes",       icon: ClipboardCheck  },
    { id: "Access",        icon: Lock            },
    { id: "Coupons",       icon: Tag             },
    { id: "Certificates",  icon: Award           },
    { id: "Notifications", icon: Bell            },
  ]},
  { label: "INSIGHTS", items: [
    { id: "Analytics",  icon: BarChart2 },
    { id: "Audit Logs", icon: Shield    },
  ]},
  { label: "SYSTEM", items: [{ id: "Settings", icon: Settings }] },
];

// ─── Shared primitives ────────────────────────────────────────────────────────
function SynapseLogo({ size = 36 }: { size?: number }) {
  return <img src={synapseLogo} alt="SYNAPSE MED" width={size} height={size} style={{ objectFit: "contain", flexShrink: 0 }} />;
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { color: C.muted, bg: "rgba(169,181,199,0.1)" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}33`, fontSize: 12, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function Avatar({ name, size = 34 }: { name: string; size?: number }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `hsl(${hue},40%,20%)`, border: `1.5px solid hsl(${hue},40%,32%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.33, fontWeight: 700, color: `hsl(${hue},60%,72%)` }}>{initials}</span>
    </div>
  );
}

function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: "0.01em" }}>{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <div style={{ padding: "32px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 13, color: "rgba(169,181,199,0.45)", fontStyle: "italic" }}>{message}</div>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value?: React.ReactNode }) {
  const isPlaceholder = value === undefined || value === null || value === "";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, padding: "12px 20px", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(169,181,199,0.5)", letterSpacing: "0.08em" }}>{label.toUpperCase()}</span>
      <span style={{ fontSize: 13, color: isPlaceholder ? "rgba(169,181,199,0.4)" : C.text, fontStyle: isPlaceholder ? "italic" : "normal" }}>
        {isPlaceholder ? "—" : value}
      </span>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function SidebarItem({ id, icon: Icon, active, collapsed, onClick }: { id: string; icon: React.ElementType; active: boolean; collapsed: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} title={collapsed ? id : undefined} aria-current={active ? "page" : undefined}
      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: collapsed ? "10px 0" : "9px 12px", justifyContent: collapsed ? "center" : "flex-start", borderRadius: 8, border: "none", cursor: "pointer", position: "relative", background: active ? C.elevated : hov ? "rgba(255,255,255,0.04)" : "transparent", transition: "background 0.15s", textAlign: "left", fontFamily: "inherit" }}>
      {active && <span style={{ position: "absolute", insetInlineStart: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, borderRadius: 2, background: C.cyan }} />}
      <Icon size={17} style={{ color: active ? C.cyan : hov ? C.text : C.muted, flexShrink: 0, transition: "color 0.15s" }} />
      {!collapsed && <span style={{ fontSize: 14, fontWeight: active ? 600 : 500, color: active ? C.text : hov ? C.text : C.muted, whiteSpace: "nowrap", transition: "color 0.15s" }}>{id}</span>}
    </button>
  );
}

function SidebarDivider() { return <div style={{ height: 1, background: C.border, margin: "8px 0" }} />; }

function SidebarSection({ label, items, active, collapsed, onSelect }: { label: string; items: { id: string; icon: React.ElementType }[]; active: string; collapsed: boolean; onSelect: (id: string) => void }) {
  return (
    <div>
      {!collapsed && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(169,181,199,0.45)", padding: "0 12px", marginBottom: 4, marginTop: 4 }}>{label}</div>}
      {items.map((item) => <SidebarItem key={item.id} id={item.id} icon={item.icon} active={active === item.id} collapsed={collapsed} onClick={() => onSelect(item.id)} />)}
    </div>
  );
}

function SidebarProfile({ collapsed, onToggleCollapse }: { collapsed: boolean; onToggleCollapse: () => void }) {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, padding: collapsed ? "12px 8px" : "12px", display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "space-between", background: C.elevated }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden", minWidth: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.cyan}22, ${C.cyan}55)`, border: `1.5px solid ${C.cyan}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.cyan }}>AA</span>
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden", minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ahmed Admin</div>
            <div style={{ fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>Super Admin</div>
          </div>
        )}
      </div>
      <button onClick={onToggleCollapse} title={collapsed ? "Expand" : "Collapse"}
        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, cursor: "pointer", color: C.muted, padding: "5px 6px", borderRadius: 6, display: "flex", alignItems: "center", flexShrink: 0 }}>
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
}

function Sidebar({ collapsed, onToggleCollapse, active, onSelect, mobileOpen, onCloseMobile }: { collapsed: boolean; onToggleCollapse: () => void; active: string; onSelect: (id: string) => void; mobileOpen: boolean; onCloseMobile: () => void }) {
  const width = collapsed ? 72 : 256;
  return (
    <>
      {mobileOpen && <div onClick={onCloseMobile} style={{ position: "fixed", inset: 0, background: "rgba(7,18,37,0.75)", zIndex: 40 }} className="lg:hidden" />}
      <aside style={{ width, background: C.bg, borderInlineEnd: `1px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "fixed", insetInlineStart: 0, top: 0, zIndex: 50, transition: "width 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden" }} className={mobileOpen ? "" : "max-lg:-translate-x-full"}>
        <div style={{ height: 72, display: "flex", alignItems: "center", padding: collapsed ? "0" : "0 16px", justifyContent: collapsed ? "center" : "flex-start", borderBottom: `1px solid ${C.border}`, flexShrink: 0, gap: 10, position: "relative" }}>
          {collapsed ? <SynapseLogo size={38} /> : (<><SynapseLogo size={42} /><div><div style={{ fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "0.05em", lineHeight: 1.25 }}>SYNAPSE MED</div><div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", color: C.cyan, opacity: 0.75, lineHeight: 1, marginTop: 3 }}>ADMIN CONSOLE</div></div></>)}
          {mobileOpen && <button onClick={onCloseMobile} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: C.muted, padding: 4, display: "flex" }} className="lg:hidden"><X size={18} /></button>}
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column" }}>
          {NAV_SECTIONS.map((section, i) => (
            <div key={section.label}>
              {i > 0 && <SidebarDivider />}
              <SidebarSection label={section.label} items={section.items} active={active} collapsed={collapsed} onSelect={(id) => { onSelect(id); onCloseMobile(); }} />
            </div>
          ))}
        </nav>
        <SidebarProfile collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      </aside>
    </>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function GlobalSearch() {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", maxWidth: 440, width: "100%" }}>
      <Search size={15} style={{ position: "absolute", insetInlineStart: 12, color: focused ? C.muted : "rgba(169,181,199,0.4)", pointerEvents: "none", zIndex: 1 }} />
      <input type="text" placeholder="Search students, courses, revisions..." onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${focused ? C.cyan + "66" : C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 76, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat', sans-serif", transition: "border-color 0.15s" }} />
      <div style={{ position: "absolute", insetInlineEnd: 10, pointerEvents: "none" }}>
        <kbd style={{ fontSize: 10, fontWeight: 600, color: "rgba(169,181,199,0.45)", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "2px 5px", fontFamily: "'Montserrat', sans-serif", whiteSpace: "nowrap" }}>Ctrl K</kbd>
      </div>
    </div>
  );
}

function NotificationButton() {
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", width: 40, height: 40, borderRadius: 8, background: hov ? C.elevated : "transparent", border: `1px solid ${hov ? C.border : "transparent"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", flexShrink: 0 }} aria-label="Notifications">
      <Bell size={18} style={{ color: hov ? C.text : C.muted }} />
      <span style={{ position: "absolute", top: 6, insetInlineEnd: 6, width: 16, height: 16, borderRadius: "50%", background: C.cyan, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: C.bg }}>3</span>
    </button>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const items = [{ label: "Profile", icon: User }, { label: "Security", icon: Key }, { label: "Sessions", icon: Monitor }, { label: "Sign out", icon: LogOut, danger: true }];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 8, background: open ? C.elevated : "transparent", border: `1px solid ${open ? C.border : "transparent"}`, borderRadius: 8, padding: "5px 10px 5px 6px", cursor: "pointer", transition: "background 0.15s", fontFamily: "inherit" }} aria-expanded={open} aria-haspopup="menu">
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${C.cyan}22, ${C.cyan}55)`, border: `1.5px solid ${C.cyan}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.cyan }}>AA</span>
        </div>
        <div style={{ textAlign: "start" }} className="hidden sm:block">
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>Ahmed Admin</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.2 }}>Super Admin</div>
        </div>
        <ChevronDown size={14} style={{ color: C.muted, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
      </button>
      {open && (
        <div role="menu" style={{ position: "absolute", insetInlineEnd: 0, top: "calc(100% + 8px)", width: 192, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 12, padding: "6px", zIndex: 100, boxShadow: "0 16px 48px rgba(0,0,0,0.45)" }}>
          {items.map((item) => (
            <button key={item.label} role="menuitem"
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = item.danger ? "rgba(224,85,85,0.1)" : "rgba(255,255,255,0.05)";
                b.querySelectorAll("[data-icon],[data-label]").forEach((el) => {
                  (el as HTMLElement).style.color = item.danger ? "#e05555" : C.text;
                });
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "transparent";
                b.querySelectorAll("[data-icon],[data-label]").forEach((el) => {
                  (el as HTMLElement).style.color = item.danger ? "rgba(224,85,85,0.65)" : C.muted;
                });
              }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", textAlign: "start", fontFamily: "inherit", transition: "background 0.12s" }}>
              <item.icon data-icon size={15} style={{ color: item.danger ? "rgba(224,85,85,0.65)" : C.muted }} />
              <span data-label style={{ fontSize: 13, fontWeight: 500, color: item.danger ? "rgba(224,85,85,0.65)" : C.muted }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Topbar({ active, onOpenMobile }: { active: string; onOpenMobile: () => void }) {
  return (
    <header style={{ height: 72, minHeight: 72, background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 16, position: "sticky", top: 0, zIndex: 30, fontFamily: "'Montserrat', sans-serif", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onOpenMobile} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.muted, padding: 4, display: "flex" }} className="lg:hidden"><Menu size={20} /></button>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <span style={{ fontSize: 11, color: "rgba(169,181,199,0.6)" }}>Admin Console</span>
            <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.3)" }} />
            <span style={{ fontSize: 11, color: "rgba(169,181,199,0.6)" }}>{active}</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{active}</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }} className="hidden md:flex"><GlobalSearch /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginInlineStart: "auto" }} className="md:ms-0">
        <NotificationButton />
        <ProfileMenu />
      </div>
    </header>
  );
}

// ─── Overview page ────────────────────────────────────────────────────────────
function KPICard({ label, icon: Icon, note }: { label: string; icon: React.ElementType; note?: string }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.muted }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.cyan}12`, border: `1px solid ${C.cyan}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={15} style={{ color: C.cyan, opacity: 0.8 }} />
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: C.text, lineHeight: 1, marginBottom: 8, letterSpacing: "-0.02em" }}>—</div>
      <div style={{ fontSize: 12, color: "rgba(169,181,199,0.45)", fontStyle: "italic" }}>{note ?? "No data yet"}</div>
    </div>
  );
}

function SvgAreaChart({ data }: { data: { period: string; enrollments: number }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const VW = 560;
  const VH = 180;
  const PAD = { top: 12, right: 8, bottom: 28, left: 34 };
  const iW = VW - PAD.left - PAD.right;
  const iH = VH - PAD.top - PAD.bottom;
  const maxVal = Math.max(...data.map((d) => d.enrollments), 1);
  const yMax   = Math.ceil(maxVal * 1.15 / 5) * 5;
  const xOf    = (i: number) => PAD.left + (data.length < 2 ? iW / 2 : (i / (data.length - 1)) * iW);
  const yOf    = (v: number) => PAD.top + iH - (v / yMax) * iH;

  const pts: [number, number][] = data.map((d, i) => [xOf(i), yOf(d.enrollments)]);

  function makePath(ps: [number, number][]) {
    if (ps.length === 0) return "";
    if (ps.length === 1) return `M ${ps[0][0]} ${ps[0][1]}`;
    return ps.map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = ps[i - 1];
      const cpx = (px + x) / 2;
      return `C ${cpx} ${py}, ${cpx} ${y}, ${x} ${y}`;
    }).join(" ");
  }

  const linePath = makePath(pts);
  const areaPath = pts.length >= 2
    ? `${linePath} L ${pts[pts.length - 1][0]} ${PAD.top + iH} L ${pts[0][0]} ${PAD.top + iH} Z`
    : "";

  const yTicks = [0, Math.round(yMax / 2), yMax];
  const gradId = "svgAreaGrad";

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: "100%", height: VH, display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={C.cyan} stopOpacity={0.18} />
            <stop offset="100%" stopColor={C.cyan} stopOpacity={0}    />
          </linearGradient>
        </defs>

        {/* Grid */}
        {yTicks.map((t) => (
          <line key={t} x1={PAD.left} y1={yOf(t)} x2={VW - PAD.right} y2={yOf(t)}
            stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        ))}

        {/* Y labels */}
        {yTicks.map((t) => (
          <text key={t} x={PAD.left - 5} y={yOf(t)} textAnchor="end" dominantBaseline="middle"
            fontSize={10} fill={C.muted} fontFamily="'Montserrat',sans-serif">{t}</text>
        ))}

        {/* Area + line */}
        {areaPath && <path d={areaPath} fill={`url(#${gradId})`} />}
        {linePath && <path d={linePath} fill="none" stroke={C.cyan} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}

        {/* X labels */}
        {data.map((d, i) => (
          <text key={i} x={xOf(i)} y={PAD.top + iH + 16} textAnchor="middle"
            fontSize={10} fill={C.muted} fontFamily="'Montserrat',sans-serif">{d.period}</text>
        ))}

        {/* Hover hit areas + dots */}
        {pts.map(([x, y], i) => (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "default" }}>
            <rect x={x - (iW / (data.length * 2))} y={PAD.top} width={iW / data.length} height={iH} fill="transparent" />
            <circle cx={x} cy={y} r={hovered === i ? 5 : 3.5}
              fill={hovered === i ? C.cyan : C.bg}
              stroke={C.cyan} strokeWidth={2}
              style={{ transition: "r 0.1s" }} />
          </g>
        ))}

        {/* Tooltip */}
        {hovered !== null && (() => {
          const [tx, ty] = pts[hovered];
          const val = data[hovered].enrollments;
          const lbl = data[hovered].period;
          const bW = 68; const bH = 34; const bX = Math.min(Math.max(tx - bW / 2, PAD.left), VW - PAD.right - bW); const bY = ty - bH - 8;
          return (
            <g>
              <rect x={bX} y={bY} width={bW} height={bH} rx={5} fill={C.elevated} stroke={C.border} strokeWidth={1} />
              <text x={bX + bW / 2} y={bY + 11} textAnchor="middle" fontSize={9} fill={C.muted} fontFamily="'Montserrat',sans-serif">{lbl}</text>
              <text x={bX + bW / 2} y={bY + 25} textAnchor="middle" fontSize={12} fill={C.cyan} fontFamily="'Montserrat',sans-serif" fontWeight={700}>{val}</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

function AnalyticsCard() {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D">("30D");
  const data = CHART_DATA[period];
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "22px", display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Enrollment Activity</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>New enrollments per period — <span style={{ fontStyle: "italic", opacity: 0.7 }}>sample data</span></div>
        </div>
        <div style={{ display: "flex", gap: 2, background: C.elevated, borderRadius: 8, padding: 3, border: `1px solid ${C.border}` }}>
          {(["7D","30D","90D"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: "4px 12px", borderRadius: 6, border: "none", background: period === p ? C.cyan + "20" : "transparent", color: period === p ? C.cyan : C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{p}</button>
          ))}
        </div>
      </div>
      <SvgAreaChart data={data} />
    </div>
  );
}

function ActivityCard() {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "22px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Recent Activity</div>
        <button style={{ fontSize: 12, color: C.cyan, fontWeight: 500, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View all</button>
      </div>
      {ACTIVITY_ITEMS.map((item, i) => {
        const Icon = item.icon; const isLast = i === ACTIVITY_ITEMS.length - 1;
        return (
          <div key={i} style={{ display: "flex", gap: 12, paddingBottom: isLast ? 0 : 14, marginBottom: isLast ? 0 : 14, borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <Icon size={14} style={{ color: C.muted }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4, marginBottom: 4 }}>{item.desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={10} style={{ color: "rgba(169,181,199,0.4)" }} />
                <span style={{ fontSize: 11, color: "rgba(169,181,199,0.45)" }}>{item.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CoursePerformanceCard() {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Course Performance</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Published and in-progress course content</div>
        </div>
        <button style={{ fontSize: 12, color: C.cyan, fontWeight: 500, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View all</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ height: 40 }}>
              {["Course","Status","Last Updated"].map((h) => <th key={h} style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>)}
              <th style={{ width: 48 }} />
            </tr>
          </thead>
          <tbody>
            {COURSE_ROWS.map((row, i) => {
              const [hov, setHov] = useState(false);
              return (
                <tr key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ borderTop: `1px solid ${C.border}`, background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", height: 60 }}>
                  <td style={{ padding: "0 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 7, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><BookOpen size={14} style={{ color: "rgba(169,181,199,0.4)" }} /></div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span>
                    </div>
                  </td>
                  <td style={{ padding: "0 20px" }}><StatusBadge status={row.status} /></td>
                  <td style={{ padding: "0 20px" }}><span style={{ fontSize: 13, color: C.muted }}>{row.updated}</span></td>
                  <td style={{ padding: "0 20px", textAlign: "end" }}>
                    <button style={{ width: 30, height: 30, borderRadius: 6, background: "transparent", border: "1px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted }}
                      onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = C.elevated; b.style.borderColor = C.border; }}
                      onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.borderColor = "transparent"; }}>
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuickActions() {
  const secondary = [
    { label: "Create Revision",      icon: RefreshCw       },
    { label: "Create Quiz",          icon: ClipboardCheck  },
    { label: "Create Coupon",        icon: Tag             },
    { label: "Send Notification",    icon: Send            },
  ];
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, letterSpacing: "0.04em", marginBottom: 14 }}>QUICK ACTIONS</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.cyan}55`, background: `${C.cyan}18`, color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${C.cyan}28`; b.style.borderColor = `${C.cyan}88`; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${C.cyan}18`; b.style.borderColor = `${C.cyan}55`; }}>
          <Plus size={14} />Create Course
        </button>
        {secondary.map(({ label, icon: Icon }) => (
          <button key={label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>
    </div>
  );
}

function OverviewPage() {
  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>Overview</span>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: C.text, margin: "0 0 6px", letterSpacing: "-0.01em" }}>Overview</h1>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>A summary of platform activity and learning operations.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="max-lg:grid-cols-2 max-sm:grid-cols-1">
        <KPICard label="Total Students"      icon={Users}    note="Awaiting data"   />
        <KPICard label="Active Courses"      icon={BookOpen} note="Awaiting data"   />
        <KPICard label="Certificates Issued" icon={Award}    note="This period"     />
        <KPICard label="Pending Access"      icon={Lock}     note="Awaiting review" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" }} className="max-lg:grid-cols-1">
        <AnalyticsCard />
        <ActivityCard />
      </div>
      <CoursePerformanceCard />
      <QuickActions />
    </main>
  );
}

// ─── Student Details page ─────────────────────────────────────────────────────
function LearningProgressRow({ row }: { row: { state: string } }) {
  const [hov, setHov] = useState(false);
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderTop: `1px solid ${C.border}`, background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", height: 60 }}>
      <td style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <BookOpen size={13} style={{ color: "rgba(169,181,199,0.4)" }} />
          </div>
          <span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span>
        </div>
      </td>
      <td style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 80, height: 4, borderRadius: 2, background: C.elevated, overflow: "hidden" }}>
            <div style={{ height: "100%", width: row.state === "In Progress" ? "40%" : "0%", background: C.cyan, borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 12, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span>
        </div>
      </td>
      <td style={{ padding: "0 20px" }}><span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span></td>
      <td style={{ padding: "0 20px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 8px", borderRadius: 20, background: row.state === "In Progress" ? `${C.cyan}18` : "rgba(169,181,199,0.08)", border: `1px solid ${row.state === "In Progress" ? C.cyan + "44" : C.border}`, fontSize: 12, fontWeight: 600, color: row.state === "In Progress" ? C.cyan : C.muted, whiteSpace: "nowrap" }}>
          {row.state}
        </span>
      </td>
    </tr>
  );
}

function QuizAttemptRow({ row }: { row: { result: string } }) {
  const [hov, setHov] = useState(false);
  const cfg = STATUS_CONFIG[row.result];
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderTop: `1px solid ${C.border}`, background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", height: 60 }}>
      <td style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ClipboardCheck size={12} style={{ color: "rgba(169,181,199,0.4)" }} />
          </div>
          <span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span>
        </div>
      </td>
      <td style={{ padding: "0 20px" }}><span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span></td>
      <td style={{ padding: "0 20px" }}><span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span></td>
      <td style={{ padding: "0 20px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}33`, fontSize: 12, fontWeight: 600, color: cfg.color }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color }} />{row.result}
        </span>
      </td>
      <td style={{ padding: "0 20px" }}><span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span></td>
    </tr>
  );
}

function CertificateRow() {
  const [hov, setHov] = useState(false);
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderTop: `1px solid ${C.border}`, background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", height: 60 }}>
      <td style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Award size={12} style={{ color: "rgba(169,181,199,0.4)" }} />
          </div>
          <span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span>
        </div>
      </td>
      <td style={{ padding: "0 20px" }}><span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span></td>
      <td style={{ padding: "0 20px" }}><span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span></td>
      <td style={{ padding: "0 20px", textAlign: "end" }}>
        <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.cyan; b.style.borderColor = `${C.cyan}44`; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
          <ExternalLink size={12} />View
        </button>
      </td>
    </tr>
  );
}

function StudentDetailsPage({ student, onBack }: { student: typeof ALL_STUDENTS[0]; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"learning" | "quizzes" | "certificates">("learning");

  const tabs: { id: "learning" | "quizzes" | "certificates"; label: string; icon: React.ElementType }[] = [
    { id: "learning",      label: "Learning",      icon: BookOpen        },
    { id: "quizzes",       label: "Quizzes",       icon: ClipboardCheck  },
    { id: "certificates",  label: "Certificates",  icon: Award           },
  ];

  // Access placeholder rows (structure only, no invented data)
  const accessRows = [
    { type: "Course",   status: "Granted" },
    { type: "Revision", status: "Granted" },
    { type: "Course",   status: "Expired" },
  ];

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Breadcrumb + back */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <button onClick={onBack} style={{ fontSize: 12, color: C.muted, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.text)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.muted)}>
            Students
          </button>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>Student Details</span>
        </div>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s, border-color 0.15s" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
          <ChevronLeft size={14} />
          Back to Students
        </button>
      </div>

      {/* Profile header */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, flexWrap: "wrap" }}>
          <Avatar name={student.name} size={56} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.01em" }}>{student.name}</h1>
              <StatusBadge status={student.status} />
            </div>
            <div style={{ display: "flex", align: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: C.muted }}>{student.email}</span>
              <span style={{ fontSize: 12, color: "rgba(169,181,199,0.5)", fontFamily: "monospace", letterSpacing: "0.04em" }}>{student.id}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ textAlign: "end" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(169,181,199,0.45)", letterSpacing: "0.08em", marginBottom: 2 }}>ENROLLED</div>
              <div style={{ fontSize: 13, color: C.muted }}>{student.enrolled}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }} className="max-lg:grid-cols-1">

        {/* ── Main column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, alignSelf: "flex-start" }}>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 16px", borderRadius: 7, border: "none", background: activeTab === id ? C.elevated : "transparent", color: activeTab === id ? C.text : C.muted, fontSize: 13, fontWeight: activeTab === id ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                <Icon size={14} style={{ color: activeTab === id ? C.cyan : "inherit" }} />
                {label}
              </button>
            ))}
          </div>

          {/* Learning tab */}
          {activeTab === "learning" && (
            <SectionCard title="Learning Progress">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
                  <thead>
                    <tr style={{ height: 40 }}>
                      {["Course", "Progress", "Lectures", "State"].map((h) => (
                        <th key={h} style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.06em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[{ state: "In Progress" }, { state: "Not Started" }].map((row, i) => (
                      <LearningProgressRow key={i} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {/* Quizzes tab */}
          {activeTab === "quizzes" && (
            <SectionCard title="Quiz Activity">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 460 }}>
                  <thead>
                    <tr style={{ height: 40 }}>
                      {["Quiz", "Attempt", "Score", "Result", "Date"].map((h) => (
                        <th key={h} style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.06em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[{ result: "Passed" }, { result: "Failed" }, { result: "Passed" }].map((row, i) => (
                      <QuizAttemptRow key={i} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {/* Certificates tab */}
          {activeTab === "certificates" && (
            <SectionCard title="Certificates">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
                  <thead>
                    <tr style={{ height: 40 }}>
                      {["Certificate", "Course", "Issued", ""].map((h, i) => (
                        <th key={i} style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.06em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1].map((i) => (
                      <CertificateRow key={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}
        </div>

        {/* ── Right column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Identity */}
          <SectionCard title="Identity & Academic Info">
            <FieldRow label="Full Name"     value={student.name}     />
            <FieldRow label="Email"         value={student.email}    />
            <FieldRow label="Phone"         value="+20 101 458 9921" />
            <FieldRow label="University"    value="Faculty of Medicine (Kasr Al-Ainy)" />
            <FieldRow label="Academic Year" value="Year 4 - Clinical" />
            <FieldRow label="Student ID"    value={student.id}       />
            <div style={{ padding: "12px 20px" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(169,181,199,0.45)", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>STATUS</span>
              <StatusBadge status={student.status} />
            </div>
            <FieldRow label="Enrolled"      value={student.enrolled} />
          </SectionCard>

          {/* Active Hardware Sessions (3-Device Concurrency Backend Policy) */}
          <SectionCard title="Active Devices (2 / 3 Limit)">
            <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Monitor size={15} style={{ color: C.cyan }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Chrome on Windows</div>
                    <div style={{ fontSize: 10, color: C.muted }}>Cairo, Egypt • Active Now</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>CURRENT</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Smartphone size={15} style={{ color: C.muted }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Synapse Med iOS App</div>
                    <div style={{ fontSize: 10, color: C.muted }}>iPhone 15 • 2 hrs ago</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, color: C.muted }}>Device 2/3</span>
              </div>
            </div>
          </SectionCard>

          {/* Access */}
          <SectionCard title="Access">
            {accessRows.length === 0 ? (
              <EmptySection message="No active access grants." />
            ) : (
              <div>
                {accessRows.map((row, i) => {
                  const cfg = STATUS_CONFIG[row.status];
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: i < accessRows.length - 1 ? `1px solid ${C.border}` : "none", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {row.type === "Course" ? <BookOpen size={12} style={{ color: "rgba(169,181,199,0.4)" }} /> : <RefreshCw size={12} style={{ color: "rgba(169,181,199,0.4)" }} />}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 1 }}>{row.type}</div>
                          <div style={{ fontSize: 11, color: "rgba(169,181,199,0.4)", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>—</div>
                        </div>
                      </div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 7px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}33`, fontSize: 11, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap", flexShrink: 0 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: cfg.color }} />
                        {row.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>

        </div>
      </div>
    </main>
  );
}

// ─── Students list page ───────────────────────────────────────────────────────
type PageState = "loaded" | "loading" | "empty" | "error" | "filtered-empty";

function RowActionMenu({ studentName, onView }: { studentName: string; onView: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ width: 32, height: 32, borderRadius: 6, background: open ? C.elevated : "transparent", border: `1px solid ${open ? C.border : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted, transition: "background 0.12s" }}
        aria-label={`Actions for ${studentName}`}>
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineEnd: 0, top: "calc(100% + 4px)", width: 152, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "5px", zIndex: 80, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          <button onClick={() => { setOpen(false); onView(); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 7, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, color: C.muted, textAlign: "start" }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.05)"; b.style.color = C.text; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = C.muted; }}>
            <Eye size={14} />View details
          </button>
        </div>
      )}
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr>
      <td style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 68 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.elevated, flexShrink: 0 }} />
          <div>
            <div style={{ width: 120, height: 11, borderRadius: 4, background: C.elevated, marginBottom: 7 }} />
            <div style={{ width: 160, height: 9, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
          </div>
        </div>
      </td>
      {[70, 60, 80].map((w, i) => (
        <td key={i} style={{ padding: "0 16px" }}><div style={{ width: w, height: i === 1 ? 22 : 9, borderRadius: i === 1 ? 12 : 4, background: C.elevated }} /></td>
      ))}
      <td style={{ padding: "0 16px" }}><div style={{ width: 32, height: 32, borderRadius: 6, background: C.elevated }} /></td>
    </tr>
  );
}

function StudentRow({ student, isLast, onView }: { student: typeof ALL_STUDENTS[0]; isLast: boolean; onView: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}`, background: hov ? "rgba(255,255,255,0.025)" : "transparent", transition: "background 0.12s", height: 68 }}>
      <td style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name={student.name} size={34} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{student.name}</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.3 }}>{student.email}</div>
          </div>
        </div>
      </td>
      <td style={{ padding: "0 16px" }}><span style={{ fontSize: 12, color: C.muted, fontFamily: "monospace", letterSpacing: "0.03em" }}>{student.id}</span></td>
      <td style={{ padding: "0 16px" }}><StatusBadge status={student.status} /></td>
      <td style={{ padding: "0 16px" }}><span style={{ fontSize: 13, color: C.muted }}>{student.enrolled}</span></td>
      <td style={{ padding: "0 16px", textAlign: "end" }}><RowActionMenu studentName={student.name} onView={onView} /></td>
    </tr>
  );
}

function NavBtn({ onClick, disabled, icon }: { onClick: () => void; disabled: boolean; icon: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: disabled ? "rgba(169,181,199,0.25)" : C.muted, display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
      {icon}
    </button>
  );
}

function StudentsPage({ onViewStudent }: { onViewStudent: (id: string) => void }) {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filterOpen, setFilterOpen]     = useState(false);
  const [sortDir, setSortDir]           = useState<"asc" | "desc" | null>(null);
  const [page, setPage]                 = useState(1);
  const [previewState, setPreviewState] = useState<PageState>("loaded");
  const [searchFocused, setSearchFocused] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const PER_PAGE = 8;

  useEffect(() => {
    function h(e: MouseEvent) { if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  let students = ALL_STUDENTS;
  if (previewState === "loaded") {
    if (search.trim()) { const q = search.toLowerCase(); students = students.filter((s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)); }
    if (statusFilter) students = students.filter((s) => s.status === statusFilter);
    if (sortDir === "asc")  students = [...students].sort((a, b) => a.enrolled.localeCompare(b.enrolled));
    if (sortDir === "desc") students = [...students].sort((a, b) => b.enrolled.localeCompare(a.enrolled));
  }

  const totalPages = Math.max(1, Math.ceil(students.length / PER_PAGE));
  const paginated  = students.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasFilters = !!statusFilter || search.trim() !== "";
  const isEmpty    = previewState === "empty" || (previewState === "loaded" && students.length === 0 && !hasFilters);
  const isFiltered = previewState === "filtered-empty" || (previewState === "loaded" && students.length === 0 && hasFilters);
  const statuses   = ["Active", "Inactive", "Suspended", "Pending"];
  function clearFilters() { setSearch(""); setStatusFilter(null); setPage(1); }

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>Students</span>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: C.text, margin: "0 0 6px", letterSpacing: "-0.01em" }}>Students</h1>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Review and manage student accounts registered on the platform.</p>
      </div>

      {/* State preview bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "10px 14px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", marginInlineEnd: 4 }}>PREVIEW STATE</span>
        {(["loaded","loading","empty","error","filtered-empty"] as PageState[]).map((s) => (
          <button key={s} onClick={() => { setPreviewState(s); setPage(1); }}
            style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${previewState === s ? C.cyan + "66" : C.border}`, background: previewState === s ? C.cyan + "15" : "transparent", color: previewState === s ? C.cyan : C.muted, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", letterSpacing: "0.03em" }}>
            {s}
          </button>
        ))}
      </div>

      {/* Search + filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 360 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.muted : "rgba(169,181,199,0.4)", pointerEvents: "none", zIndex: 1 }} />
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} placeholder="Search students..."
            style={{ width: "100%", height: 38, background: C.surface, border: `1px solid ${searchFocused ? C.cyan + "55" : C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat', sans-serif", transition: "border-color 0.15s" }} />
        </div>
        <div ref={filterRef} style={{ position: "relative" }}>
          <button onClick={() => setFilterOpen(!filterOpen)}
            style={{ height: 38, padding: "0 14px", display: "flex", alignItems: "center", gap: 7, background: statusFilter ? C.cyan + "15" : C.surface, border: `1px solid ${statusFilter ? C.cyan + "66" : C.border}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, color: statusFilter ? C.cyan : C.muted, transition: "all 0.15s" }}>
            <SlidersHorizontal size={14} />Filter
            {statusFilter && <span style={{ fontSize: 11, background: C.cyan, color: C.bg, borderRadius: 10, padding: "1px 6px", fontWeight: 700 }}>1</span>}
          </button>
          {filterOpen && (
            <div style={{ position: "absolute", insetInlineStart: 0, top: "calc(100% + 6px)", width: 200, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px", zIndex: 50, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.5)", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 6 }}>STATUS</div>
              {statuses.map((s) => {
                const cfg = STATUS_CONFIG[s]; const isSel = statusFilter === s;
                return (
                  <button key={s} onClick={() => { setStatusFilter(isSel ? null : s); setPage(1); setFilterOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 7, border: "none", background: isSel ? cfg.bg : "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "start", fontSize: 13, fontWeight: isSel ? 600 : 500, color: isSel ? cfg.color : C.muted, transition: "background 0.1s" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />{s}
                    {isSel && <span style={{ marginInlineStart: "auto", fontSize: 11, color: cfg.color }}>✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {statusFilter && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 12px", background: STATUS_CONFIG[statusFilter].bg, border: `1px solid ${STATUS_CONFIG[statusFilter].color}44`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: STATUS_CONFIG[statusFilter].color }}>
            Status: {statusFilter}
            <button onClick={() => { setStatusFilter(null); setPage(1); }} style={{ background: "transparent", border: "none", cursor: "pointer", color: STATUS_CONFIG[statusFilter].color, display: "flex", padding: 0, marginInlineStart: 2 }}><X size={12} /></button>
          </div>
        )}
        {hasFilters && (
          <button onClick={clearFilters} style={{ height: 38, padding: "0 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 500, color: C.muted }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.text)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.muted)}>
            Clear all
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        {previewState === "loading" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}`, height: 44 }}>
              {["Student","Student ID","Status","Enrolled",""].map((h, i) => <th key={i} style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>{h}</th>)}
            </tr></thead>
            <tbody>{Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}</tbody>
          </table>
        )}
        {previewState === "error" && (
          <div style={{ padding: "64px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
            <AlertCircle size={28} style={{ color: "#e05555", opacity: 0.7 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Unable to load students</div>
            <div style={{ fontSize: 13, color: C.muted }}>Something went wrong while fetching student data.</div>
            <button style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.text, fontFamily: "inherit" }}>
              <RefreshCw size={14} style={{ color: C.cyan }} />Try again
            </button>
          </div>
        )}
        {isEmpty && (
          <div style={{ padding: "64px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
            <Users size={28} style={{ color: C.muted, opacity: 0.4 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>No students yet</div>
            <div style={{ fontSize: 13, color: C.muted }}>Student accounts will appear here once they are registered.</div>
          </div>
        )}
        {isFiltered && (
          <div style={{ padding: "64px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
            <Search size={26} style={{ color: C.muted, opacity: 0.4 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>No students match your current filters</div>
            <div style={{ fontSize: 13, color: C.muted }}>Try adjusting your search or filter criteria.</div>
            <button onClick={clearFilters} style={{ marginTop: 8, padding: "7px 16px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, color: C.text, fontFamily: "inherit" }}>Clear filters</button>
          </div>
        )}
        {previewState === "loaded" && students.length > 0 && (
          <>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}`, height: 44 }}>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>Student</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>Student ID</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>Status</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>
                      <button onClick={() => setSortDir((d) => d === null ? "asc" : d === "asc" ? "desc" : null)}
                        style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer", color: sortDir ? C.text : C.muted, fontFamily: "inherit", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", padding: 0 }}>
                        Enrolled
                        {sortDir === null && <ArrowUpDown size={12} style={{ opacity: 0.5 }} />}
                        {sortDir === "asc"  && <ArrowUp   size={12} style={{ color: C.cyan }} />}
                        {sortDir === "desc" && <ArrowDown  size={12} style={{ color: C.cyan }} />}
                      </button>
                    </th>
                    <th style={{ padding: "0 16px", width: 48 }} />
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((s, i) => <StudentRow key={s.id} student={s} isLast={i === paginated.length - 1} onView={() => onViewStudent(s.id)} />)}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 12, color: C.muted }}>Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, students.length)} of {students.length} students</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <NavBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} icon={<ChevronLeft size={14} />} />
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${page === i + 1 ? C.cyan + "66" : C.border}`, background: page === i + 1 ? C.cyan + "15" : "transparent", color: page === i + 1 ? C.cyan : C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                    {i + 1}
                  </button>
                ))}
                <NavBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} icon={<ChevronRight size={14} />} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// ─── Courses list page ────────────────────────────────────────────────────────
const COURSE_ROWS_DATA = [
  { status: "Published", updated: "Aug 22, 2026" },
  { status: "Draft",     updated: "Aug 19, 2026" },
  { status: "Published", updated: "Aug 17, 2026" },
  { status: "Draft",     updated: "Aug 12, 2026" },
  { status: "Published", updated: "Aug 8, 2026"  },
  { status: "Published", updated: "Jul 29, 2026" },
  { status: "Draft",     updated: "Jul 25, 2026" },
  { status: "Published", updated: "Jul 20, 2026" },
];

const COURSE_STATUSES = ["Published", "Draft"];

type RevisionStatus = "Draft" | "Scheduled" | "Active" | "Inactive" | "Archived";

interface RevisionRecord {
  id: string;
  title: string;
  course: string;
  status: RevisionStatus;
  availableFrom: string | null;
  availableUntil: string | null;
  lectureCount: number;
}

const REVISION_RECORDS: RevisionRecord[] = [
  { id: "rev-001", title: "Cardiology — 2026 Update",         course: "Advanced Cardiology",          status: "Active",    availableFrom: "01 Mar 2026, 09:00", availableUntil: "31 Aug 2026, 23:59", lectureCount: 24 },
  { id: "rev-002", title: "Emergency Medicine — Spring 2026",  course: "Emergency Medicine Essentials", status: "Scheduled", availableFrom: "15 Apr 2026, 09:00", availableUntil: "15 Oct 2026, 23:59", lectureCount: 18 },
  { id: "rev-003", title: "Internal Medicine — Draft v2",      course: "Internal Medicine Review",      status: "Draft",     availableFrom: null,                  availableUntil: null,                 lectureCount: 31 },
  { id: "rev-004", title: "Pharmacology — Previous Version",   course: "Clinical Pharmacology",         status: "Inactive",  availableFrom: "01 Sep 2025, 09:00", availableUntil: "28 Feb 2026, 23:59", lectureCount: 20 },
  { id: "rev-005", title: "Neurology — Archived 2025",         course: "Neurology Board Review",        status: "Archived",  availableFrom: "01 Jan 2025, 09:00", availableUntil: "31 Dec 2025, 23:59", lectureCount: 27 },
  { id: "rev-006", title: "Pediatrics — Summer 2026",          course: "Pediatrics Essentials",         status: "Scheduled", availableFrom: "01 Jun 2026, 09:00", availableUntil: "30 Nov 2026, 23:59", lectureCount: 22 },
];

const REVISION_STATUSES: RevisionStatus[] = ["Draft", "Scheduled", "Active", "Inactive", "Archived"];

// ─── Access data ───────────────────────────────────────────────────────────────
type AccessStatus     = "Active" | "Inactive" | "Revoked";
type AccessTargetType = "Course" | "Revision";

interface AccessRecord {
  id:           string;
  studentName:  string;
  studentEmail: string;
  target:       string;
  targetType:   AccessTargetType;
  course:       string | null;
  status:       AccessStatus;
  granted:      string;
  grantSource?: string;
}

const ACCESS_RECORDS: AccessRecord[] = [
  { id: "acc-001", studentName: "Ahmed Hassan",  studentEmail: "ahmed.hassan@example.com",  target: "Advanced Cardiology",              targetType: "Course",   course: null,                            status: "Active",   granted: "12 Mar 2026" },
  { id: "acc-002", studentName: "Mariam Adel",   studentEmail: "mariam.adel@example.com",   target: "Cardiology — 2026 Update",         targetType: "Revision", course: "Advanced Cardiology",           status: "Active",   granted: "14 Mar 2026", grantSource: "Coupon Redemption" },
  { id: "acc-003", studentName: "Omar Khaled",   studentEmail: "omar.khaled@example.com",   target: "Emergency Medicine Essentials",    targetType: "Course",   course: null,                            status: "Active",   granted: "18 Mar 2026" },
  { id: "acc-004", studentName: "Sara Mohamed",  studentEmail: "sara.mohamed@example.com",  target: "Emergency Medicine — Spring 2026", targetType: "Revision", course: "Emergency Medicine Essentials", status: "Active",   granted: "20 Mar 2026" },
  { id: "acc-005", studentName: "Youssef Ali",   studentEmail: "youssef.ali@example.com",   target: "Internal Medicine Review",         targetType: "Course",   course: null,                            status: "Revoked",  granted: "05 Feb 2026" },
  { id: "acc-006", studentName: "Nour Ibrahim",  studentEmail: "nour.ibrahim@example.com",  target: "Neurology — Archived 2025",        targetType: "Revision", course: "Neurology Board Review",        status: "Inactive", granted: "11 Jan 2025" },
];

// ─── Quiz data ────────────────────────────────────────────────────────────────
const QUIZ_ROWS_DATA = [
  { questionCount: 10, passingScore: 70, maxAttempts: 3 },
  { questionCount: 8,  passingScore: 75, maxAttempts: 2 },
  { questionCount: 12, passingScore: 80, maxAttempts: 2 },
  { questionCount: 5,  passingScore: 60, maxAttempts: 3 },
  { questionCount: 15, passingScore: 85, maxAttempts: 1 },
  { questionCount: 9,  passingScore: 70, maxAttempts: 2 },
  { questionCount: 7,  passingScore: 75, maxAttempts: 3 },
  { questionCount: 11, passingScore: 80, maxAttempts: 2 },
];

const QUIZ_ATTEMPTS_DATA: {
  studentId: string; attemptNum: number; score: number; result: "Passed" | "Failed"; date: string;
}[] = [
  { studentId: "SM-0041", attemptNum: 1, score: 92, result: "Passed", date: "Aug 20, 2026" },
  { studentId: "SM-0042", attemptNum: 1, score: 58, result: "Failed",  date: "Aug 19, 2026" },
  { studentId: "SM-0042", attemptNum: 2, score: 74, result: "Passed", date: "Aug 20, 2026" },
  { studentId: "SM-0043", attemptNum: 1, score: 81, result: "Passed", date: "Aug 18, 2026" },
  { studentId: "SM-0044", attemptNum: 1, score: 45, result: "Failed",  date: "Aug 17, 2026" },
  { studentId: "SM-0045", attemptNum: 1, score: 88, result: "Passed", date: "Aug 16, 2026" },
  { studentId: "SM-0047", attemptNum: 1, score: 62, result: "Failed",  date: "Aug 15, 2026" },
  { studentId: "SM-0047", attemptNum: 2, score: 79, result: "Passed", date: "Aug 17, 2026" },
  { studentId: "SM-0049", attemptNum: 1, score: 91, result: "Passed", date: "Aug 14, 2026" },
  { studentId: "SM-0050", attemptNum: 1, score: 53, result: "Failed",  date: "Aug 13, 2026" },
];

function CourseIdentityCell({ index }: { index: number }) {
  const hues = [200, 170, 220, 185, 210, 195, 175, 215];
  const hue = hues[index % hues.length];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 38, height: 38, borderRadius: 8, background: `hsla(${hue},60%,18%,1)`, border: `1px solid hsla(${hue},50%,30%,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <BookOpen size={16} style={{ color: `hsla(${hue},70%,60%,0.7)` }} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(244,247,250,0.35)", fontStyle: "italic", lineHeight: 1.3, marginBottom: 2 }}>—</div>
        <div style={{ fontSize: 12, color: "rgba(169,181,199,0.3)", fontStyle: "italic" }}>—</div>
      </div>
    </div>
  );
}

function CourseSkeletonRow() {
  return (
    <tr>
      <td style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 68 }}>
          <div style={{ width: 38, height: 38, borderRadius: 8, background: C.elevated, flexShrink: 0 }} />
          <div>
            <div style={{ width: 140, height: 11, borderRadius: 4, background: C.elevated, marginBottom: 7 }} />
            <div style={{ width: 100, height: 9, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
          </div>
        </div>
      </td>
      <td style={{ padding: "0 16px" }}><div style={{ width: 52, height: 9, borderRadius: 4, background: C.elevated }} /></td>
      <td style={{ padding: "0 16px" }}><div style={{ width: 64, height: 22, borderRadius: 12, background: C.elevated }} /></td>
      <td style={{ padding: "0 16px" }}><div style={{ width: 80, height: 9, borderRadius: 4, background: C.elevated }} /></td>
      <td style={{ padding: "0 16px" }}><div style={{ width: 32, height: 32, borderRadius: 6, background: C.elevated }} /></td>
    </tr>
  );
}

function CourseRowActionMenu({ index, onView }: { index: number; onView: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const actions = [
    { label: "View",           icon: Eye,      cb: onView   },
    { label: "Manage Content", icon: FileText, cb: () => {} },
  ];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ width: 32, height: 32, borderRadius: 6, background: open ? C.elevated : "transparent", border: `1px solid ${open ? C.border : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted, transition: "background 0.12s" }}
        aria-label={`Actions for course ${index + 1}`}>
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineEnd: 0, top: "calc(100% + 4px)", width: 168, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "5px", zIndex: 80, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          {actions.map((a) => (
            <button key={a.label} onClick={() => { setOpen(false); a.cb(); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 7, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, color: C.muted, textAlign: "start", transition: "background 0.1s, color 0.1s" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.05)"; b.style.color = C.text; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = C.muted; }}>
              <a.icon size={14} />{a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CoursesPage({ onViewCourse }: { onViewCourse: (index: number) => void }) {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filterOpen, setFilterOpen]     = useState(false);
  const [sortDir, setSortDir]           = useState<"asc" | "desc" | null>(null);
  const [page, setPage]                 = useState(1);
  const [previewState, setPreviewState] = useState<PageState>("loaded");
  const [searchFocused, setSearchFocused] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const PER_PAGE = 8;

  useEffect(() => {
    function h(e: MouseEvent) { if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  let rows = COURSE_ROWS_DATA;
  if (previewState === "loaded") {
    if (statusFilter) rows = rows.filter((r) => r.status === statusFilter);
    if (sortDir === "asc")  rows = [...rows].sort((a, b) => a.updated.localeCompare(b.updated));
    if (sortDir === "desc") rows = [...rows].sort((a, b) => b.updated.localeCompare(a.updated));
  }

  const totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const paginated  = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasFilters = !!statusFilter || search.trim() !== "";
  const isEmpty    = previewState === "empty" || (previewState === "loaded" && rows.length === 0 && !hasFilters);
  const isFiltered = previewState === "filtered-empty" || (previewState === "loaded" && rows.length === 0 && hasFilters);

  function clearFilters() { setSearch(""); setStatusFilter(null); setPage(1); }

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0 }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
            <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
            <span style={{ fontSize: 12, color: C.cyan }}>Courses</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: C.text, margin: "0 0 6px", letterSpacing: "-0.01em" }}>Courses</h1>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Manage and review educational course content on the platform.</p>
        </div>
        <button
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, border: `1px solid ${C.cyan}55`, background: `${C.cyan}18`, color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s, border-color 0.15s", flexShrink: 0, marginTop: 28 }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${C.cyan}28`; b.style.borderColor = `${C.cyan}88`; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${C.cyan}18`; b.style.borderColor = `${C.cyan}55`; }}>
          <Plus size={14} />Create Course
        </button>
      </div>

      {/* Preview state switcher */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "10px 14px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", marginInlineEnd: 4 }}>PREVIEW STATE</span>
        {(["loaded","loading","empty","error","filtered-empty"] as PageState[]).map((s) => (
          <button key={s} onClick={() => { setPreviewState(s); setPage(1); }}
            style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${previewState === s ? C.cyan + "66" : C.border}`, background: previewState === s ? C.cyan + "15" : "transparent", color: previewState === s ? C.cyan : C.muted, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", letterSpacing: "0.03em" }}>
            {s}
          </button>
        ))}
      </div>

      {/* Search + filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 360 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.muted : "rgba(169,181,199,0.4)", pointerEvents: "none", zIndex: 1 }} />
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} placeholder="Search courses..."
            style={{ width: "100%", height: 38, background: C.surface, border: `1px solid ${searchFocused ? C.cyan + "55" : C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat', sans-serif", transition: "border-color 0.15s" }} />
        </div>

        <div ref={filterRef} style={{ position: "relative" }}>
          <button onClick={() => setFilterOpen(!filterOpen)}
            style={{ height: 38, padding: "0 14px", display: "flex", alignItems: "center", gap: 7, background: statusFilter ? C.cyan + "15" : C.surface, border: `1px solid ${statusFilter ? C.cyan + "66" : C.border}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, color: statusFilter ? C.cyan : C.muted, transition: "all 0.15s" }}>
            <SlidersHorizontal size={14} />Filter
            {statusFilter && <span style={{ fontSize: 11, background: C.cyan, color: C.bg, borderRadius: 10, padding: "1px 6px", fontWeight: 700 }}>1</span>}
          </button>
          {filterOpen && (
            <div style={{ position: "absolute", insetInlineStart: 0, top: "calc(100% + 6px)", width: 180, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px", zIndex: 50, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.5)", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 6 }}>STATUS</div>
              {COURSE_STATUSES.map((s) => {
                const cfg = STATUS_CONFIG[s]; const isSel = statusFilter === s;
                return (
                  <button key={s} onClick={() => { setStatusFilter(isSel ? null : s); setPage(1); setFilterOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 7, border: "none", background: isSel ? cfg.bg : "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "start", fontSize: 13, fontWeight: isSel ? 600 : 500, color: isSel ? cfg.color : C.muted, transition: "background 0.1s" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />{s}
                    {isSel && <span style={{ marginInlineStart: "auto", fontSize: 11, color: cfg.color }}>✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {statusFilter && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 12px", background: STATUS_CONFIG[statusFilter].bg, border: `1px solid ${STATUS_CONFIG[statusFilter].color}44`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: STATUS_CONFIG[statusFilter].color }}>
            Status: {statusFilter}
            <button onClick={() => { setStatusFilter(null); setPage(1); }} style={{ background: "transparent", border: "none", cursor: "pointer", color: STATUS_CONFIG[statusFilter].color, display: "flex", padding: 0, marginInlineStart: 2 }}><X size={12} /></button>
          </div>
        )}
        {hasFilters && (
          <button onClick={clearFilters} style={{ height: 38, padding: "0 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 500, color: C.muted, transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.text)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.muted)}>
            Clear all
          </button>
        )}
      </div>

      {/* Table surface */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>

        {/* Loading */}
        {previewState === "loading" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.border}`, height: 44 }}>
              {["Course","Lectures","Status","Updated",""].map((h, i) => <th key={i} style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>{h}</th>)}
            </tr></thead>
            <tbody>{Array.from({ length: 6 }).map((_, i) => <CourseSkeletonRow key={i} />)}</tbody>
          </table>
        )}

        {/* Error */}
        {previewState === "error" && (
          <div style={{ padding: "64px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
            <AlertCircle size={28} style={{ color: "#e05555", opacity: 0.7 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Unable to load courses</div>
            <div style={{ fontSize: 13, color: C.muted }}>Something went wrong while fetching course data.</div>
            <button style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.text, fontFamily: "inherit" }}>
              <RefreshCw size={14} style={{ color: C.cyan }} />Try again
            </button>
          </div>
        )}

        {/* Empty — no courses */}
        {isEmpty && (
          <div style={{ padding: "64px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
            <BookOpen size={28} style={{ color: C.muted, opacity: 0.4 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>No courses yet</div>
            <div style={{ fontSize: 13, color: C.muted }}>Course content will appear here once courses are created.</div>
            <button style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", background: `${C.cyan}18`, border: `1px solid ${C.cyan}55`, borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.cyan, fontFamily: "inherit" }}>
              <Plus size={14} />Create Course
            </button>
          </div>
        )}

        {/* Filtered empty */}
        {isFiltered && (
          <div style={{ padding: "64px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
            <Search size={26} style={{ color: C.muted, opacity: 0.4 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>No courses match your current filters</div>
            <div style={{ fontSize: 13, color: C.muted }}>Try adjusting your search or filter criteria.</div>
            <button onClick={clearFilters} style={{ marginTop: 8, padding: "7px 16px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, color: C.text, fontFamily: "inherit" }}>Clear filters</button>
          </div>
        )}

        {/* Loaded table */}
        {previewState === "loaded" && rows.length > 0 && (
          <>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 580 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}`, height: 44 }}>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>Course</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>Lectures</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>Status</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>
                      <button onClick={() => setSortDir((d) => d === null ? "desc" : d === "desc" ? "asc" : null)}
                        style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer", color: sortDir ? C.text : C.muted, fontFamily: "inherit", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", padding: 0, transition: "color 0.15s" }}>
                        Updated
                        {sortDir === null && <ArrowUpDown size={12} style={{ opacity: 0.5 }} />}
                        {sortDir === "asc"  && <ArrowUp   size={12} style={{ color: C.cyan }} />}
                        {sortDir === "desc" && <ArrowDown  size={12} style={{ color: C.cyan }} />}
                      </button>
                    </th>
                    <th style={{ padding: "0 16px", width: 48 }} />
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((row, i) => {
                    const globalIndex = (page - 1) * PER_PAGE + i;
                    return <CourseTableRow key={globalIndex} row={row} index={globalIndex} isLast={i === paginated.length - 1} onView={() => onViewCourse(globalIndex)} />;
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 12, color: C.muted }}>
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, rows.length)} of {rows.length} courses
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <NavBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} icon={<ChevronLeft size={14} />} />
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${page === i + 1 ? C.cyan + "66" : C.border}`, background: page === i + 1 ? C.cyan + "15" : "transparent", color: page === i + 1 ? C.cyan : C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                    {i + 1}
                  </button>
                ))}
                <NavBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} icon={<ChevronRight size={14} />} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function CourseTableRow({ row, index, isLast, onView }: { row: typeof COURSE_ROWS_DATA[0]; index: number; isLast: boolean; onView: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}`, background: hov ? "rgba(255,255,255,0.025)" : "transparent", transition: "background 0.12s", height: 68, cursor: "default" }}>
      <td style={{ padding: "0 16px" }}><CourseIdentityCell index={index} /></td>
      <td style={{ padding: "0 16px" }}><span style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic" }}>—</span></td>
      <td style={{ padding: "0 16px" }}><StatusBadge status={row.status} /></td>
      <td style={{ padding: "0 16px" }}><span style={{ fontSize: 13, color: C.muted }}>{row.updated}</span></td>
      <td style={{ padding: "0 16px", textAlign: "end" }}><CourseRowActionMenu index={index} onView={onView} /></td>
    </tr>
  );
}

// ─── Course Details page ───────────────────────────────────────────────────────
const LECTURE_ROWS = [
  { video: true  },
  { video: true  },
  { video: false },
  { video: true  },
  { video: false },
  { video: true  },
  { video: true  },
];

type LectureState = "loaded" | "loading" | "empty" | "error";

function LectureRowActionMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const items = [
    { label: "View",         icon: Eye      },
    { label: "Edit",         icon: FileText },
    { label: "Manage Video", icon: Play     },
  ];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ width: 28, height: 28, borderRadius: 6, background: open ? C.elevated : "transparent", border: `1px solid ${open ? C.border : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted, transition: "background 0.12s" }}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineEnd: 0, top: "calc(100% + 4px)", width: 160, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "5px", zIndex: 80, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          {items.map((a) => (
            <button key={a.label} onClick={() => setOpen(false)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 7, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, color: C.muted, textAlign: "start", transition: "background 0.1s, color 0.1s" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.05)"; b.style.color = C.text; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = C.muted; }}>
              <a.icon size={14} />{a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LectureSkeletonRow({ isLast }: { isLast: boolean }) {
  return (
    <tr style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}`, height: 60 }}>
      <td style={{ padding: "0 16px", width: 52 }}><div style={{ width: 24, height: 9, borderRadius: 4, background: C.elevated }} /></td>
      <td style={{ padding: "0 16px" }}><div style={{ width: 160, height: 10, borderRadius: 4, background: C.elevated }} /></td>
      <td style={{ padding: "0 16px" }}><div style={{ width: 72, height: 20, borderRadius: 10, background: C.elevated }} /></td>
      <td style={{ padding: "0 16px", width: 48 }}><div style={{ width: 28, height: 28, borderRadius: 6, background: C.elevated }} /></td>
    </tr>
  );
}

function LectureRow({ lec, index, isLast }: { lec: typeof LECTURE_ROWS[0]; index: number; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}`, background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", height: 60 }}>
      <td style={{ padding: "0 16px", width: 52 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, fontVariantNumeric: "tabular-nums" }}>{num}</span>
      </td>
      <td style={{ padding: "0 16px" }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(244,247,250,0.35)", fontStyle: "italic" }}>—</span>
      </td>
      <td style={{ padding: "0 16px" }}>
        {lec.video ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 10, padding: "3px 8px" }}>
            <Play size={10} />Video
          </span>
        ) : (
          <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(169,181,199,0.35)", fontStyle: "italic" }}>No video</span>
        )}
      </td>
      <td style={{ padding: "0 16px", textAlign: "end" }}>
        <LectureRowActionMenu />
      </td>
    </tr>
  );
}

function CourseDetailsPage({ courseIndex, courseRow, onBack, onEdit }: {
  courseIndex: number;
  courseRow: typeof COURSE_ROWS_DATA[0];
  onBack: () => void;
  onEdit: () => void;
}) {
  const [lectureState, setLectureState] = useState<LectureState>("loaded");
  const hue = [200, 170, 220, 185, 210, 195, 175, 215][courseIndex % 8];

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0 }}>

      {/* Breadcrumb + back */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <button onClick={onBack} style={{ fontSize: 12, color: C.muted, background: "transparent", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.text)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.muted)}>
            Courses
          </button>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>Course Details</span>
        </div>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: "inherit", transition: "all 0.15s" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
          <ChevronLeft size={14} />Back to Courses
        </button>
      </div>

      {/* Course header surface */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 28px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: `hsla(${hue},60%,14%,1)`, border: `1px solid hsla(${hue},50%,28%,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <BookOpen size={24} style={{ color: `hsla(${hue},70%,58%,0.7)` }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "rgba(244,247,250,0.3)", fontStyle: "italic", margin: 0, letterSpacing: "-0.01em" }}>—</h1>
              <StatusBadge status={courseRow.status} />
            </div>
            <p style={{ fontSize: 13, color: "rgba(169,181,199,0.35)", fontStyle: "italic", margin: "0 0 4px", lineHeight: 1.6 }}>—</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: C.muted }}>Updated <span style={{ color: C.text }}>{courseRow.updated}</span></span>
              <span style={{ fontSize: 12, color: "rgba(169,181,199,0.35)", fontStyle: "italic" }}>— lectures</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={onEdit} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.muted, fontFamily: "inherit", transition: "all 0.15s" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
              <FileText size={13} />Edit Course
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, background: `${C.cyan}18`, border: `1px solid ${C.cyan}55`, cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.cyan, fontFamily: "inherit", transition: "background 0.15s, border-color 0.15s" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${C.cyan}28`; b.style.borderColor = `${C.cyan}88`; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${C.cyan}18`; b.style.borderColor = `${C.cyan}55`; }}>
              <Settings2 size={13} />Manage Content
            </button>
          </div>
        </div>
      </div>

      {/* Body: lectures (main) + metadata (aside) */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* Lectures surface */}
        <div style={{ flex: "1 1 480px", minWidth: 0 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${C.border}`, gap: 10, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <List size={15} style={{ color: C.muted }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Lectures</span>
                <span style={{ fontSize: 11, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "2px 8px", color: C.muted, fontWeight: 600 }}>
                  {lectureState === "loaded" ? LECTURE_ROWS.length : "—"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {(["loaded","loading","empty","error"] as LectureState[]).map((s) => (
                  <button key={s} onClick={() => setLectureState(s)}
                    style={{ padding: "3px 8px", borderRadius: 5, border: `1px solid ${lectureState === s ? C.cyan + "55" : C.border}`, background: lectureState === s ? C.cyan + "12" : "transparent", color: lectureState === s ? C.cyan : C.muted, fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.03em" }}>
                    {s}
                  </button>
                ))}
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 7, background: `${C.cyan}15`, border: `1px solid ${C.cyan}44`, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.cyan, fontFamily: "inherit", transition: "background 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${C.cyan}25`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${C.cyan}15`)}>
                  <Plus size={12} />Add Lecture
                </button>
              </div>
            </div>

            {lectureState === "loading" && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>{[0,1,2,3,4].map((i) => <LectureSkeletonRow key={i} isLast={i === 4} />)}</tbody>
              </table>
            )}

            {lectureState === "empty" && (
              <div style={{ padding: "56px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
                <List size={26} style={{ color: C.muted, opacity: 0.35 }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>No lectures yet</div>
                <div style={{ fontSize: 12, color: C.muted }}>Add the first lecture to start building the course structure.</div>
                <button style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", background: `${C.cyan}15`, border: `1px solid ${C.cyan}44`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.cyan, fontFamily: "inherit" }}>
                  <Plus size={12} />Add Lecture
                </button>
              </div>
            )}

            {lectureState === "error" && (
              <div style={{ padding: "56px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
                <AlertCircle size={26} style={{ color: "#e05555", opacity: 0.65 }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Unable to load lectures</div>
                <div style={{ fontSize: 12, color: C.muted }}>Something went wrong while fetching lecture data.</div>
                <button style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.text, fontFamily: "inherit" }}>
                  <RefreshCw size={12} style={{ color: C.cyan }} />Try again
                </button>
              </div>
            )}

            {lectureState === "loaded" && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}`, height: 40 }}>
                    <th style={{ padding: "0 16px", width: 52, textAlign: "start", fontWeight: 600, fontSize: 10, color: C.muted, letterSpacing: "0.08em" }}>#</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 10, color: C.muted, letterSpacing: "0.08em" }}>Lecture</th>
                    <th style={{ padding: "0 16px", textAlign: "start", fontWeight: 600, fontSize: 10, color: C.muted, letterSpacing: "0.08em" }}>Video</th>
                    <th style={{ padding: "0 16px", width: 48 }} />
                  </tr>
                </thead>
                <tbody>
                  {LECTURE_ROWS.map((lec, i) => (
                    <LectureRow key={i} lec={lec} index={i} isLast={i === LECTURE_ROWS.length - 1} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Metadata aside */}
        <div style={{ flex: "0 0 260px", minWidth: 220 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em" }}>COURSE INFORMATION</span>
            </div>
            <FieldRow label="Status"   value={<StatusBadge status={courseRow.status} />} />
            <FieldRow label="Lectures" value={undefined} />
            <FieldRow label="Updated"  value={courseRow.updated} />
            <FieldRow label="Created"  value={undefined} />
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Course Editor page ────────────────────────────────────────────────────────
type SaveState = "idle" | "saving" | "saved" | "error";
type UploadState = "idle" | "uploading" | "success" | "error";

function FormField({ label, required, error, helperText, children }: {
  label: string; required?: boolean; error?: string; helperText?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em" }}>
        {label.toUpperCase()}
        {required && <span style={{ color: C.cyan, marginInlineStart: 3 }}>*</span>}
      </label>
      {children}
      {error    && <span style={{ fontSize: 11, color: "#e05555", marginTop: 2 }}>{error}</span>}
      {!error && helperText && <span style={{ fontSize: 11, color: "rgba(169,181,199,0.45)" }}>{helperText}</span>}
    </div>
  );
}

function EditorInput({ value, onChange, placeholder, hasError, disabled }: {
  value: string; onChange: (v: string) => void; placeholder?: string; hasError?: boolean; disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${hasError ? "#e05555" : focused ? `${C.cyan}66` : C.border}`, borderRadius: 8, paddingInline: 14, fontSize: 14, color: disabled ? C.muted : C.text, outline: "none", fontFamily: "'Montserrat', sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }} />
  );
}

function EditorTextarea({ value, onChange, placeholder, rows = 5 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ width: "100%", background: C.elevated, border: `1px solid ${focused ? `${C.cyan}66` : C.border}`, borderRadius: 8, padding: 14, fontSize: 14, color: C.text, outline: "none", fontFamily: "'Montserrat', sans-serif", transition: "border-color 0.15s", resize: "vertical", minHeight: 100, lineHeight: 1.7, boxSizing: "border-box" }} />
  );
}

function VideoUploadArea() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress]       = useState(0);
  const [dragOver, setDragOver]       = useState(false);

  function startUpload() {
    if (uploadState === "uploading") return;
    setUploadState("uploading"); setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        clearInterval(iv); setProgress(100);
        setUploadState(Math.random() > 0.15 ? "success" : "error");
      } else { setProgress(Math.round(p)); }
    }, 280);
  }

  if (uploadState === "uploading") return (
    <div style={{ padding: "16px 14px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Upload size={14} style={{ color: C.cyan }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Uploading...</span>
        <span style={{ fontSize: 12, color: C.muted, marginInlineStart: "auto" }}>{progress}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: C.cyan, borderRadius: 2, transition: "width 0.28s" }} />
      </div>
    </div>
  );

  if (uploadState === "success") return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: C.elevated, border: "1px solid rgba(74,222,128,0.22)", borderRadius: 8 }}>
      <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(74,222,128,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Check size={14} style={{ color: "#4ade80" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#4ade80" }}>Video uploaded</div>
        <div style={{ fontSize: 11, color: C.muted }}>Video has been attached to this lecture.</div>
      </div>
      <button onClick={() => setUploadState("idle")} style={{ fontSize: 11, fontWeight: 600, color: C.muted, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Replace</button>
    </div>
  );

  if (uploadState === "error") return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: C.elevated, border: "1px solid rgba(224,85,85,0.28)", borderRadius: 8 }}>
      <AlertCircle size={18} style={{ color: "#e05555", flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#e05555" }}>Upload failed</div>
        <div style={{ fontSize: 11, color: C.muted }}>Something went wrong. Please try again.</div>
      </div>
      <button onClick={() => setUploadState("idle")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6, background: C.elevated, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.text, fontFamily: "inherit" }}>
        <RefreshCw size={11} />Try again
      </button>
    </div>
  );

  return (
    <div onClick={startUpload}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); startUpload(); }}
      style={{ padding: "24px 16px", background: dragOver ? `${C.cyan}08` : C.elevated, border: `1px dashed ${dragOver ? C.cyan : C.border}`, borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", transition: "all 0.15s", textAlign: "center" }}>
      <Upload size={20} style={{ color: dragOver ? C.cyan : C.muted, opacity: dragOver ? 1 : 0.45 }} />
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Upload video</div>
      <div style={{ fontSize: 11, color: C.muted }}>Drag and drop or click to select a video file</div>
      <span style={{ marginTop: 4, padding: "5px 12px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 600, color: C.muted }}>Select file</span>
    </div>
  );
}

function LectureEditorRow({ lec, index, isLast, titleValue, onTitleChange, expanded, onToggle }: {
  lec: typeof LECTURE_ROWS[0]; index: number; isLast: boolean;
  titleValue: string; onTitleChange: (v: string) => void;
  expanded: boolean; onToggle: () => void;
}) {
  const [hov, setHov] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  return (
    <div style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
      {/* Collapsed header row */}
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onToggle}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: expanded ? `${C.cyan}07` : hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", cursor: "pointer" }}>
        <GripVertical size={14} style={{ color: "rgba(169,181,199,0.25)", flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, minWidth: 22, fontVariantNumeric: "tabular-nums" }}>{num}</span>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: titleValue ? C.text : "rgba(244,247,250,0.28)", fontStyle: titleValue ? "normal" : "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {titleValue || "—"}
        </span>
        {lec.video ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.14)", borderRadius: 10, padding: "2px 7px", flexShrink: 0 }}>
            <Play size={9} />Video
          </span>
        ) : (
          <span style={{ fontSize: 11, color: "rgba(169,181,199,0.3)", fontStyle: "italic", flexShrink: 0 }}>No video</span>
        )}
        <ChevronDown size={13} style={{ color: C.muted, flexShrink: 0, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </div>

      {/* Expanded edit area */}
      {expanded && (
        <div style={{ padding: "18px 20px 22px", background: `${C.cyan}04`, borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <FormField label="Lecture Title" required>
              <EditorInput value={titleValue} onChange={onTitleChange} placeholder="Enter lecture title..." />
            </FormField>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 10 }}>VIDEO</div>
              {lec.video ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Play size={14} style={{ color: "#4ade80" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#4ade80" }}>Video available</div>
                    <div style={{ fontSize: 11, color: C.muted }}>Video content is attached to this lecture.</div>
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 7, background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: "inherit", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
                    onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
                    <Upload size={12} />Replace
                  </button>
                </div>
              ) : (
                <VideoUploadArea />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseEditorPage({ courseIndex, courseRow, onBack }: {
  courseIndex: number;
  courseRow: typeof COURSE_ROWS_DATA[0];
  onBack: () => void;
}) {
  const hue = [200, 170, 220, 185, 210, 195, 175, 215][courseIndex % 8];
  const [title, setTitle]               = useState("");
  const [description, setDescription]  = useState("");
  const [lectureEdits, setLectureEdits] = useState<Record<number, string>>({});
  const [expandedLecture, setExpandedLecture] = useState<number | null>(0);
  const [saveState, setSaveState]       = useState<SaveState>("idle");
  const [saveAttempted, setSaveAttempted] = useState(false);

  const isDirty    = title !== "" || description !== "" || Object.keys(lectureEdits).length > 0;
  const titleError = saveAttempted && title === "" ? "Course title is required." : undefined;

  function handleSave() {
    setSaveAttempted(true);
    if (title === "") return;
    setSaveState("saving");
    setTimeout(() => { setSaveState("saved"); setTimeout(() => setSaveState("idle"), 2000); }, 1400);
  }

  function setLectureTitle(i: number, v: string) {
    setLectureEdits((prev) => ({ ...prev, [i]: v }));
  }

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0 }}>

      {/* Breadcrumb + back */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.3)" }} />
          <span style={{ fontSize: 12, color: C.muted }}>Courses</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.3)" }} />
          <span style={{ fontSize: 12, color: C.muted }}>Course Details</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.3)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>Edit</span>
        </div>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: "inherit", transition: "all 0.15s" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
          <ChevronLeft size={14} />Back to Course
        </button>
      </div>

      {/* Page title */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: `hsla(${hue},60%,14%,1)`, border: `1px solid hsla(${hue},50%,28%,0.4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={16} style={{ color: `hsla(${hue},70%,58%,0.7)` }} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.01em" }}>Edit Course</h1>
          {isDirty && (
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(245,158,11,0.9)", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 10, padding: "2px 9px" }}>
              Unsaved changes
            </span>
          )}
        </div>
        <p style={{ fontSize: 13, color: C.muted, margin: 0, paddingInlineStart: 48 }}>Update course information and manage content structure.</p>
      </div>

      {/* Two-column body */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* ── Main column ─────────────────────────────────────────── */}
        <div style={{ flex: "1 1 500px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Course Information surface */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Course Information</span>
            </div>
            <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 22 }}>
              <FormField label="Course Title" required error={titleError} helperText={!titleError ? "The name students will see for this course." : undefined}>
                <EditorInput value={title} onChange={setTitle} placeholder="Enter course title..." hasError={!!titleError} />
              </FormField>
              <FormField label="Description" helperText="Describe the course content and what students will learn.">
                <EditorTextarea value={description} onChange={setDescription} placeholder="Enter course description..." rows={5} />
              </FormField>
            </div>
          </div>

          {/* Course Content surface */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${C.border}`, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <List size={15} style={{ color: C.muted }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Course Content</span>
                <span style={{ fontSize: 11, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "2px 8px", color: C.muted, fontWeight: 600 }}>{LECTURE_ROWS.length} lectures</span>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 7, background: `${C.cyan}15`, border: `1px solid ${C.cyan}44`, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.cyan, fontFamily: "inherit", transition: "background 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${C.cyan}25`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${C.cyan}15`)}>
                <Plus size={12} />Add Lecture
              </button>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(169,181,199,0.4)", letterSpacing: "0.05em", padding: "9px 16px 9px 50px", borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1fr 80px 28px", gap: 10 }}>
              <span>LECTURE</span><span>VIDEO</span><span />
            </div>
            {LECTURE_ROWS.map((lec, i) => (
              <LectureEditorRow key={i} lec={lec} index={i} isLast={i === LECTURE_ROWS.length - 1}
                titleValue={lectureEdits[i] ?? ""}
                onTitleChange={(v) => setLectureTitle(i, v)}
                expanded={expandedLecture === i}
                onToggle={() => setExpandedLecture(expandedLecture === i ? null : i)} />
            ))}
          </div>

        </div>

        {/* ── Secondary column ─────────────────────────────────────── */}
        <div style={{ flex: "0 0 260px", minWidth: 220, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Save surface */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", marginBottom: 16 }}>ACTIONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={handleSave} disabled={saveState === "saving"}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 16px", borderRadius: 8, background: saveState === "saved" ? "rgba(74,222,128,0.15)" : `${C.cyan}20`, border: `1px solid ${saveState === "saved" ? "rgba(74,222,128,0.4)" : C.cyan + "66"}`, cursor: saveState === "saving" ? "default" : "pointer", fontSize: 13, fontWeight: 700, color: saveState === "saved" ? "#4ade80" : C.cyan, fontFamily: "inherit", transition: "all 0.2s", opacity: saveState === "saving" ? 0.7 : 1 }}>
                {saveState === "saving" && <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} />}
                {saveState === "saved"  && <Check size={13} />}
                {saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved" : "Save Changes"}
              </button>
              <button onClick={onBack}
                style={{ padding: "9px 16px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.muted, fontFamily: "inherit", transition: "all 0.15s" }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
                Cancel
              </button>
            </div>
            {saveState === "error" && (
              <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(224,85,85,0.08)", border: "1px solid rgba(224,85,85,0.25)", borderRadius: 8, fontSize: 12, color: "#e05555" }}>
                Unable to save changes. Please try again.
              </div>
            )}
          </div>

          {/* Course info aside */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em" }}>COURSE DETAILS</span>
            </div>
            <FieldRow label="Status"   value={<StatusBadge status={courseRow.status} />} />
            <FieldRow label="Lectures" value={String(LECTURE_ROWS.length)} />
            <FieldRow label="Updated"  value={courseRow.updated} />
          </div>

        </div>
      </div>
    </main>
  );
}

// ─── Revisions — shared ────────────────────────────────────────────────────────
const LIFECYCLE_ORDER: RevisionStatus[] = ["Draft", "Scheduled", "Active", "Inactive", "Archived"];

const REVISION_ACTIONS: Record<RevisionStatus, { label: string; nextStatus?: RevisionStatus; danger?: boolean }[]> = {
  Active:    [{ label: "View" }, { label: "Edit" }, { label: "Deactivate", nextStatus: "Inactive", danger: true }],
  Scheduled: [{ label: "View" }, { label: "Edit" }, { label: "Activate",   nextStatus: "Active" }],
  Draft:     [{ label: "View" }, { label: "Edit" }, { label: "Schedule",   nextStatus: "Scheduled" }],
  Inactive:  [{ label: "View" }, { label: "Edit" }, { label: "Activate",   nextStatus: "Active" }, { label: "Archive", nextStatus: "Archived", danger: true }],
  Archived:  [{ label: "View" }],
};

const TRANSITION_MESSAGES: Record<string, string> = {
  Deactivate: "This may affect availability for students who currently have access.",
  Archive:    "Archived revisions cannot be directly reactivated.",
  Activate:   "It will become available to students within the configured window.",
  Schedule:   "It will be queued for activation at the configured start time.",
};

function ConfirmationModal({ title, body, confirmLabel, onConfirm, onCancel, danger }: {
  title: string; body: string; confirmLabel: string;
  onConfirm: () => void; onCancel: () => void; danger?: boolean;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onCancel} style={{ position: "absolute", inset: 0, background: "rgba(7,18,37,0.8)" }} />
      <div style={{ position: "relative", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, width: "90%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>{title}</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 24 }}>{body}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "8px 18px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: "8px 18px", borderRadius: 7, border: "none", background: danger ? "#ef4444" : C.cyan, color: danger ? "#fff" : C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function RevisionLifecycleTimeline({ currentStatus }: { currentStatus: RevisionStatus }) {
  const currentIdx = LIFECYCLE_ORDER.indexOf(currentStatus);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {LIFECYCLE_ORDER.map((s, i) => {
        const isPast    = i < currentIdx;
        const isCurrent = i === currentIdx;
        const dotColor  = isCurrent ? C.cyan : isPast ? "rgba(74,222,128,0.55)" : "rgba(169,181,199,0.18)";
        const lineColor = isPast ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.06)";
        return (
          <div key={s} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 22, flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: isCurrent ? `${C.cyan}18` : "transparent", border: `2px solid ${dotColor}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, boxShadow: isCurrent ? `0 0 0 4px ${C.cyan}12` : "none", flexShrink: 0 }}>
                {isPast    && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(74,222,128,0.6)" }} />}
                {isCurrent && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.cyan }} />}
              </div>
              {i < LIFECYCLE_ORDER.length - 1 && <div style={{ width: 2, height: 26, background: lineColor, marginTop: 2 }} />}
            </div>
            <div style={{ paddingTop: 4, paddingBottom: i < LIFECYCLE_ORDER.length - 1 ? 0 : 0 }}>
              <span style={{ fontSize: 13, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? C.cyan : isPast ? "rgba(74,222,128,0.65)" : "rgba(169,181,199,0.4)" }}>
                {s}
              </span>
              {isCurrent && <span style={{ marginInlineStart: 8, fontSize: 11, color: C.cyan, background: `${C.cyan}14`, border: `1px solid ${C.cyan}33`, borderRadius: 4, padding: "1px 6px" }}>Current</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Revisions page (08A) ──────────────────────────────────────────────────────
const COURSE_HUE: Record<string, number> = {
  "Advanced Cardiology": 195, "Emergency Medicine Essentials": 185,
  "Internal Medicine Review": 175, "Clinical Pharmacology": 210,
  "Neurology Board Review": 220, "Pediatrics Essentials": 168,
};

function RevisionIdentityCell({ rec }: { rec: RevisionRecord }) {
  const hue = COURSE_HUE[rec.course] ?? 200;
  const dimmed = rec.status === "Archived" || rec.status === "Inactive";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: `hsla(${hue},50%,16%,1)`, border: `1px solid hsla(${hue},45%,28%,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: dimmed ? 0.6 : 1 }}>
        <RefreshCw size={15} style={{ color: `hsla(${hue},65%,58%,${dimmed ? "0.5" : "0.85"})` }} />
      </div>
      <div style={{ opacity: dimmed ? 0.65 : 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 2 }}>{rec.title}</div>
        <div style={{ fontSize: 11, color: C.muted }}>Revision</div>
      </div>
    </div>
  );
}

function RevisionDateDisplay({ date, status, field }: { date: string | null; status: RevisionStatus; field: "from" | "until" }) {
  if (!date) return <span style={{ fontSize: 13, color: "rgba(169,181,199,0.3)", fontStyle: "italic" }}>—</span>;
  const [datePart, timePart] = date.split(", ");
  const dimmed = status === "Archived" || status === "Inactive";
  const highlighted = status === "Scheduled" && field === "from";
  return (
    <div>
      <div style={{ fontSize: 13, color: dimmed ? "rgba(169,181,199,0.45)" : highlighted ? "#60a5fa" : C.text, fontWeight: highlighted ? 500 : 400 }}>{datePart}</div>
      {timePart && <div style={{ fontSize: 11, color: dimmed ? "rgba(169,181,199,0.28)" : "rgba(169,181,199,0.5)", marginTop: 2 }}>{timePart}</div>}
    </div>
  );
}

function RevisionActionsMenu({ rec, onView, onEdit, onTransitionRequest }: {
  rec: RevisionRecord;
  onView: () => void;
  onEdit: () => void;
  onTransitionRequest: (label: string, next: RevisionStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const actions = REVISION_ACTIONS[rec.status];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: open ? C.elevated : "transparent", cursor: "pointer", color: C.muted, transition: "all 0.15s", fontFamily: "inherit" }}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineEnd: 0, top: 36, zIndex: 30, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 182, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
          {actions.map((action, i) => {
            const isTransition = !!action.nextStatus;
            const needsDivider = isTransition && i > 0;
            return (
              <React.Fragment key={action.label}>
                {needsDivider && <div style={{ height: 1, background: C.border, margin: "4px 0" }} />}
                <button
                  onClick={() => { setOpen(false); if (action.label === "View") onView(); else if (action.label === "Edit") onEdit(); else if (action.nextStatus) onTransitionRequest(action.label, action.nextStatus); }}
                  style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: action.danger ? "#f87171" : isTransition ? C.cyan : C.muted, fontSize: 13, fontWeight: isTransition ? 500 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  {action.label === "View" && <Eye size={13} />}
                  {action.label === "Edit" && <Settings2 size={13} />}
                  {(action.label === "Activate" || action.label === "Schedule") && <Play size={12} />}
                  {action.label === "Deactivate" && <Clock size={13} />}
                  {action.label === "Archive" && <FileText size={13} />}
                  {action.label}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RevisionSkeletonRow() {
  return (
    <tr>
      {[220, 160, 90, 110, 110, 50, 40].map((w, i) => (
        <td key={i} style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ height: 12, width: w, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
        </td>
      ))}
    </tr>
  );
}

function RevisionTableRow({ rec, isLast, onView, onEdit, onTransitionRequest }: {
  rec: RevisionRecord; isLast: boolean;
  onView: () => void; onEdit: () => void;
  onTransitionRequest: (label: string, next: RevisionStatus) => void;
}) {
  const [hov, setHov] = useState(false);
  const dimmed = rec.status === "Archived" || rec.status === "Inactive";
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s" }}>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <RevisionIdentityCell rec={rec} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, minWidth: 160 }}>
        <span style={{ fontSize: 13, color: dimmed ? "rgba(169,181,199,0.45)" : C.muted }}>{rec.course}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <StatusBadge status={rec.status} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, minWidth: 128 }}>
        <RevisionDateDisplay date={rec.availableFrom} status={rec.status} field="from" />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, minWidth: 128 }}>
        <RevisionDateDisplay date={rec.availableUntil} status={rec.status} field="until" />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: dimmed ? "rgba(169,181,199,0.45)" : C.muted, fontVariantNumeric: "tabular-nums" }}>{rec.lectureCount}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <RevisionActionsMenu rec={rec} onView={onView} onEdit={onEdit} onTransitionRequest={onTransitionRequest} />
      </td>
    </tr>
  );
}

// ─── 08A — Revisions List ──────────────────────────────────────────────────────
function RevisionsPage({ rows, onTransition, onView, onEdit }: {
  rows: RevisionRecord[];
  onTransition: (idx: number, next: RevisionStatus) => void;
  onView: (idx: number) => void;
  onEdit: (idx: number) => void;
}) {
  const [search, setSearch]               = useState("");
  const [statusFilter, setStatusFilter]   = useState<RevisionStatus | "All">("All");
  const [courseFilter, setCourseFilter]   = useState("All Courses");
  const [page, setPage]                   = useState(1);
  const [searchFocused, setSearchFocused] = useState(false);
  const [courseDropOpen, setCourseDropOpen] = useState(false);
  const courseDropRef = useRef<HTMLDivElement>(null);
  const [pendingTx, setPendingTx] = useState<{ idx: number; label: string; next: RevisionStatus } | null>(null);
  const PER_PAGE = 10;

  useEffect(() => {
    if (!courseDropOpen) return;
    function h(e: MouseEvent) { if (courseDropRef.current && !courseDropRef.current.contains(e.target as Node)) setCourseDropOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [courseDropOpen]);

  const COURSES = ["All Courses", ...Array.from(new Set(REVISION_RECORDS.map((r) => r.course)))];

  const totalCount     = rows.length;
  const activeCount    = rows.filter((r) => r.status === "Active").length;
  const scheduledCount = rows.filter((r) => r.status === "Scheduled").length;
  const draftCount     = rows.filter((r) => r.status === "Draft").length;

  const filtered = rows.filter((r) => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (courseFilter !== "All Courses" && r.course !== courseFilter) return false;
    const q = search.toLowerCase();
    if (q && !r.title.toLowerCase().includes(q) && !r.course.toLowerCase().includes(q)) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const pendingRec = pendingTx ? rows[pendingTx.idx] : null;

  const SUMMARY_CARDS = [
    { label: "Total Revisions", value: totalCount,     color: C.text },
    { label: "Active",          value: activeCount,    color: "#4ade80" },
    { label: "Scheduled",       value: scheduledCount, color: "#60a5fa" },
    { label: "Draft",           value: draftCount,     color: C.muted },
  ];

  const COL_HEADERS = ["Revision", "Course", "Status", "Available From", "Available Until", "Lectures", ""];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {pendingTx && pendingRec && (
        <ConfirmationModal
          title={`${pendingTx.label} Revision?`}
          body={`You are about to ${pendingTx.label.toLowerCase()}:\n\n${pendingRec.title}\n\n${TRANSITION_MESSAGES[pendingTx.label] ?? ""}`}
          confirmLabel={`${pendingTx.label} Revision`}
          danger={REVISION_ACTIONS[pendingRec.status].find((a) => a.label === pendingTx!.label)?.danger}
          onConfirm={() => { onTransition(pendingTx!.idx, pendingTx!.next); setPendingTx(null); }}
          onCancel={() => setPendingTx(null)}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span><ChevronRight size={12} style={{ opacity: 0.5 }} /><span style={{ color: C.text }}>Revisions</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Revisions</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>Manage course revisions, availability windows, and lifecycle states.</p>
          </div>
          <button onClick={() => onEdit(-1)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, whiteSpace: "nowrap" }}>
            <Plus size={14} />Create Revision
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {SUMMARY_CARDS.map((c) => (
          <div key={c.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.text : C.muted, pointerEvents: "none", transition: "color 0.15s" }} />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            placeholder="Search revisions..."
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${searchFocused ? C.cyan + "55" : C.border}`, borderRadius: 8, paddingInlineStart: 34, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }} />
        </div>

        {/* Course dropdown */}
        <div ref={courseDropRef} style={{ position: "relative" }}>
          <button onClick={() => setCourseDropOpen(!courseDropOpen)}
            style={{ display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 12px", borderRadius: 8, border: `1px solid ${courseFilter !== "All Courses" ? C.cyan + "55" : C.border}`, background: courseFilter !== "All Courses" ? C.cyan + "12" : C.elevated, color: courseFilter !== "All Courses" ? C.cyan : C.muted, fontSize: 13, fontWeight: courseFilter !== "All Courses" ? 600 : 400, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            <BookOpen size={12} />{courseFilter === "All Courses" ? "Course" : courseFilter}
            <ChevronDown size={12} style={{ transform: courseDropOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
          </button>
          {courseDropOpen && (
            <div style={{ position: "absolute", top: 42, insetInlineStart: 0, zIndex: 20, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 230, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
              {COURSES.map((c) => (
                <button key={c} onClick={() => { setCourseFilter(c); setCourseDropOpen(false); setPage(1); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: c === courseFilter ? "rgba(53,224,223,0.07)" : "transparent", color: c === courseFilter ? C.cyan : C.muted, fontSize: 13, fontWeight: c === courseFilter ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <span style={{ width: 14, flexShrink: 0 }}>{c === courseFilter && <Check size={12} />}</span>{c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status chips */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {(["All", "Draft", "Scheduled", "Active", "Inactive", "Archived"] as const).map((s) => {
            const isActive = statusFilter === s;
            const cfg = s !== "All" ? STATUS_CONFIG[s] : null;
            return (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${isActive && cfg ? cfg.color + "55" : C.border}`, background: isActive && cfg ? cfg.bg : isActive ? "rgba(255,255,255,0.05)" : "transparent", color: isActive && cfg ? cfg.color : isActive ? C.text : C.muted, fontSize: 12, fontWeight: isActive ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
            <thead>
              <tr style={{ background: C.elevated }}>
                {COL_HEADERS.map((h, i) => (
                  <th key={i} style={{ padding: "11px 16px", textAlign: "start", fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.6)", letterSpacing: "0.07em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: "48px 20px", textAlign: "center" }}>
                    {statusFilter !== "All" || courseFilter !== "All Courses" || search ? (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No revisions match your current filters.</div>
                        <button onClick={() => { setStatusFilter("All"); setCourseFilter("All Courses"); setSearch(""); }} style={{ fontSize: 13, color: C.cyan, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Clear Filters</button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No revisions yet.</div>
                        <button onClick={() => onEdit(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          <Plus size={13} />Create Revision
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )}
              {paged.map((rec, i) => {
                const globalIdx = REVISION_RECORDS.findIndex((r) => r.id === rec.id);
                return (
                  <RevisionTableRow key={rec.id} rec={rec} isLast={i === paged.length - 1}
                    onView={() => onView(globalIdx)}
                    onEdit={() => onEdit(globalIdx)}
                    onTransitionRequest={(label, next) => setPendingTx({ idx: globalIdx, label, next })}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: `1px solid ${C.border}`, gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: C.muted }}>
            {filtered.length === 0 ? "0 revisions" : `${(page-1)*PER_PAGE+1}–${Math.min(page*PER_PAGE,filtered.length)} of ${filtered.length} revision${filtered.length !== 1 ? "s" : ""}`}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1} style={{ display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:page===1?"rgba(169,181,199,0.25)":C.muted,cursor:page===1?"default":"pointer",fontFamily:"inherit" }}><ChevronLeft size={14}/></button>
            {Array.from({length:totalPages},(_,i)=>i+1).map((n)=>(
              <button key={n} onClick={()=>setPage(n)} style={{ display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:6,border:`1px solid ${n===page?C.cyan+"55":C.border}`,background:n===page?C.cyan+"18":"transparent",color:n===page?C.cyan:C.muted,fontSize:12,fontWeight:n===page?700:400,cursor:"pointer",fontFamily:"inherit" }}>{n}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages} style={{ display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:page===totalPages?"rgba(169,181,199,0.25)":C.muted,cursor:page===totalPages?"default":"pointer",fontFamily:"inherit" }}><ChevronRight size={14}/></button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── 08B — Revision Details ────────────────────────────────────────────────────
function RevisionDetailsPage({ revIdx, rows, onTransition, onBack, onEdit }: {
  revIdx: number; rows: RevisionRecord[];
  onTransition: (idx: number, next: RevisionStatus) => void;
  onBack: () => void; onEdit: () => void;
}) {
  const rec = rows[revIdx];
  const [pendingTx, setPendingTx] = useState<{ label: string; next: RevisionStatus } | null>(null);
  const actions = REVISION_ACTIONS[rec.status].filter((a) => a.label !== "View");
  const hue = COURSE_HUE[rec.course] ?? 200;

  const DETAIL_FIELDS = [
    { label: "Revision Title",  value: rec.title },
    { label: "Course",          value: rec.course },
    { label: "Status",          value: <StatusBadge status={rec.status} /> },
    { label: "Available From",  value: rec.availableFrom ?? "—" },
    { label: "Available Until", value: rec.availableUntil ?? "—" },
    { label: "Lectures",        value: String(rec.lectureCount) },
    { label: "Revision ID",     value: rec.id },
  ];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {pendingTx && (
        <ConfirmationModal
          title={`${pendingTx.label} Revision?`}
          body={`You are about to ${pendingTx.label.toLowerCase()}:\n\n${rec.title}\n\n${TRANSITION_MESSAGES[pendingTx.label] ?? ""}`}
          confirmLabel={`${pendingTx.label} Revision`}
          danger={REVISION_ACTIONS[rec.status].find((a) => a.label === pendingTx!.label)?.danger}
          onConfirm={() => { onTransition(revIdx, pendingTx!.next); setPendingTx(null); }}
          onCancel={() => setPendingTx(null)}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Revisions</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>{rec.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `hsla(${hue},50%,14%,1)`, border: `1px solid hsla(${hue},45%,26%,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <RefreshCw size={18} style={{ color: `hsla(${hue},65%,60%,0.9)` }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>{rec.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                <StatusBadge status={rec.status} />
                <span style={{ fontSize: 12, color: C.muted }}>{rec.course}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {actions.map((action) => {
              const isEdit = action.label === "Edit";
              const isDanger = action.danger;
              return (
                <button key={action.label}
                  onClick={() => { if (isEdit) onEdit(); else if (action.nextStatus) setPendingTx({ label: action.label, next: action.nextStatus }); }}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: `1px solid ${isEdit ? C.border : isDanger ? "rgba(239,68,68,0.35)" : C.cyan + "44"}`, background: isEdit ? "transparent" : isDanger ? "rgba(239,68,68,0.08)" : C.cyan + "12", color: isEdit ? C.muted : isDanger ? "#f87171" : C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {isEdit && <Settings2 size={13} />}
                  {action.label === "Activate" && <Play size={12} />}
                  {action.label === "Deactivate" && <Clock size={13} />}
                  {action.label === "Schedule" && <Clock size={13} />}
                  {action.label === "Archive" && <FileText size={13} />}
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Body — 2-column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Overview card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Revision Overview</span>
            </div>
            <div style={{ padding: "4px 0" }}>
              {DETAIL_FIELDS.map(({ label, value }) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, padding: "12px 20px", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 13, color: C.text }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Content</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 20, padding: "3px 10px" }}>
                <List size={11} style={{ color: C.muted }} />
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{rec.lectureCount} Lectures</span>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: C.elevated, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `rgba(53,224,223,0.08)`, border: `1px solid ${C.cyan}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <List size={18} style={{ color: C.cyan }} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{rec.lectureCount}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Lectures included in this revision</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {Array.from({ length: Math.min(rec.lectureCount, LECTURE_ROWS.length) }, (_, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: C.elevated, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <span style={{ width: 22, fontSize: 11, color: "rgba(169,181,199,0.4)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 12, color: "rgba(244,247,250,0.35)", fontStyle: "italic", flex: 1 }}>—</span>
                    {LECTURE_ROWS[i].video && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: "2px 6px", flexShrink: 0 }}>
                        <Play size={9} />Video
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {rec.lectureCount > LECTURE_ROWS.length && (
                <div style={{ marginTop: 10, padding: "10px 12px", textAlign: "center", borderRadius: 8, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.015)" }}>
                  <span style={{ fontSize: 12, color: "rgba(169,181,199,0.5)", fontStyle: "italic" }}>
                    +{rec.lectureCount - LECTURE_ROWS.length} more lectures in this revision
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Lifecycle card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Lifecycle</span>
            </div>
            <div style={{ padding: "18px" }}>
              <RevisionLifecycleTimeline currentStatus={rec.status} />
            </div>
          </div>

          {/* Access Impact card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Access Impact</span>
            </div>
            <div style={{ padding: "18px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(53,224,223,0.08)", border: `1px solid ${C.cyan}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Lock size={13} style={{ color: C.cyan }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>Student Availability</div>
                  <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                    {rec.status === "Active"
                      ? "This revision is currently available to enrolled students."
                      : rec.status === "Scheduled"
                        ? "This revision is scheduled and will become available at the configured start time."
                        : rec.status === "Draft"
                          ? "This revision is a draft and is not yet visible to students."
                          : rec.status === "Inactive"
                            ? "This revision is inactive. Students no longer have access."
                            : "This revision is archived and cannot be reactivated directly."}
                  </div>
                </div>
              </div>
              {rec.availableFrom && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: C.muted }}>From</span>
                    <span style={{ fontSize: 12, color: C.text }}>{rec.availableFrom}</span>
                  </div>
                  {rec.availableUntil && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: C.muted }}>Until</span>
                      <span style={{ fontSize: 12, color: C.text }}>{rec.availableUntil}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── 08C — Revision Editor ─────────────────────────────────────────────────────
function RevisionEditorPage({ revIdx, rows, onSave, onBack }: {
  revIdx: number | null;
  rows: RevisionRecord[];
  onSave: (idx: number | null, updates: Partial<RevisionRecord>) => void;
  onBack: () => void;
}) {
  const isNew = revIdx === null;
  const src   = revIdx !== null ? rows[revIdx] : null;

  const [title,       setTitle]       = useState(src?.title       ?? "");
  const [course,      setCourse]      = useState(src?.course      ?? "");
  const [availFrom,   setAvailFrom]   = useState(src?.availableFrom  ?? "");
  const [availUntil,  setAvailUntil]  = useState(src?.availableUntil ?? "");
  const [saveState,   setSaveState]   = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [dirty,       setDirty]       = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [courseDropOpen, setCourseDropOpen] = useState(false);
  const courseDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!courseDropOpen) return;
    function h(e: MouseEvent) { if (courseDropRef.current && !courseDropRef.current.contains(e.target as Node)) setCourseDropOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [courseDropOpen]);

  function markDirty() { if (!dirty) setDirty(true); if (saveState === "saved") setSaveState("idle"); }

  function handleSave() {
    if (!title.trim() || !course.trim()) return;
    setSaveState("saving");
    setTimeout(() => {
      onSave(revIdx, { title: title.trim(), course, availableFrom: availFrom || null, availableUntil: availUntil || null });
      setSaveState("saved");
      setDirty(false);
    }, 700);
  }

  function handleBack() {
    if (dirty) { setDiscardOpen(true); } else { onBack(); }
  }

  const COURSES = Array.from(new Set(REVISION_RECORDS.map((r) => r.course)));
  const currentStatus: RevisionStatus = src?.status ?? "Draft";

  const titleErr   = saveState !== "idle" && !title.trim();
  const courseErr  = saveState !== "idle" && !course.trim();
  const dateErr    = availFrom && availUntil && availFrom >= availUntil;

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {discardOpen && (
        <ConfirmationModal
          title="Discard Changes?"
          body="You have unsaved changes. If you leave now, your changes will be lost."
          confirmLabel="Discard Changes"
          danger
          onConfirm={() => { setDiscardOpen(false); onBack(); }}
          onCancel={() => setDiscardOpen(false)}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <button onClick={handleBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Revisions</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          {!isNew && src && <><button onClick={handleBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>{src.title}</button><ChevronRight size={12} style={{ opacity: 0.5 }} /></>}
          <span style={{ color: C.text }}>{isNew ? "Create Revision" : "Edit Revision"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>{isNew ? "Create Revision" : "Edit Revision"}</h1>
            {dirty && saveState !== "saved" && <p style={{ fontSize: 12, color: C.muted, margin: "5px 0 0" }}>Unsaved changes</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={handleBack} style={{ padding: "8px 18px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={handleSave} disabled={saveState === "saving" || (!dirty && !isNew)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 7, border: "none", background: saveState === "saved" ? "#22c55e" : saveState === "error" ? "#ef4444" : C.cyan, color: saveState === "saved" || saveState === "error" ? "#fff" : C.bg, fontSize: 13, fontWeight: 700, cursor: saveState === "saving" ? "wait" : "pointer", fontFamily: "inherit", opacity: saveState === "saving" || (!dirty && !isNew) ? 0.7 : 1, transition: "background 0.2s" }}>
              {saveState === "saving" && <><Clock size={13} />Saving...</>}
              {saveState === "saved"  && <><Check size={13} />Saved</>}
              {saveState === "error"  && "Save Failed"}
              {(saveState === "idle") && (isNew ? "Create Revision" : "Save Changes")}
            </button>
          </div>
        </div>
      </div>

      {/* Body — 2-column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Revision Details</span>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Course selector */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Course <span style={{ color: "#f87171" }}>*</span></label>
                <div ref={courseDropRef} style={{ position: "relative" }}>
                  <button onClick={() => setCourseDropOpen(!courseDropOpen)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${courseErr ? "#ef444460" : courseDropOpen ? C.cyan + "55" : C.border}`, background: C.elevated, color: course ? C.text : C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", boxSizing: "border-box" }}>
                    <span>{course || "Select a course..."}</span>
                    <ChevronDown size={13} style={{ transform: courseDropOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s", color: C.muted, flexShrink: 0 }} />
                  </button>
                  {courseDropOpen && (
                    <div style={{ position: "absolute", top: 44, insetInlineStart: 0, zIndex: 20, width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                      {COURSES.map((c) => (
                        <button key={c} onClick={() => { setCourse(c); setCourseDropOpen(false); markDirty(); }}
                          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", borderRadius: 6, border: "none", background: c === course ? "rgba(53,224,223,0.07)" : "transparent", color: c === course ? C.cyan : C.muted, fontSize: 13, fontWeight: c === course ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                          <span style={{ width: 14, flexShrink: 0 }}>{c === course && <Check size={12} />}</span>{c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {courseErr && <div style={{ fontSize: 11, color: "#f87171", marginTop: 4 }}>Course is required.</div>}
              </div>

              {/* Revision Title */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Revision Title <span style={{ color: "#f87171" }}>*</span></label>
                <input value={title} onChange={(e) => { setTitle(e.target.value); markDirty(); }}
                  placeholder="e.g. Cardiology — 2026 Update"
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${titleErr ? "#ef444460" : C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box", transition: "border-color 0.15s" }} />
                {titleErr && <div style={{ fontSize: 11, color: "#f87171", marginTop: 4 }}>Revision title is required.</div>}
              </div>

              {/* Date range */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Available From</label>
                  <input value={availFrom} onChange={(e) => { setAvailFrom(e.target.value); markDirty(); }}
                    placeholder="DD Mon YYYY, HH:MM"
                    style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${dateErr ? "#ef444460" : C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Available Until</label>
                  <input value={availUntil} onChange={(e) => { setAvailUntil(e.target.value); markDirty(); }}
                    placeholder="DD Mon YYYY, HH:MM"
                    style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${dateErr ? "#ef444460" : C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box" }} />
                </div>
              </div>
              {dateErr && <div style={{ fontSize: 11, color: "#f87171", marginTop: -12 }}>Available Until must be after Available From.</div>}
              <div style={{ fontSize: 12, color: "rgba(169,181,199,0.45)", lineHeight: 1.5 }}>
                Leave blank for Draft revisions without a scheduled window. Dates define when enrolled students can access this revision.
              </div>
            </div>
          </div>

          {/* Error save state */}
          {saveState === "error" && (
            <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
              <AlertCircle size={15} style={{ color: "#f87171", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#f87171" }}>Unable to save revision. Please try again.</span>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Lifecycle</span>
            </div>
            <div style={{ padding: "18px" }}>
              <RevisionLifecycleTimeline currentStatus={currentStatus} />
              <div style={{ marginTop: 14, padding: "10px 12px", background: C.elevated, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
                  {currentStatus === "Draft"     && "Save this revision, then use Schedule to queue it for activation."}
                  {currentStatus === "Scheduled" && "This revision is queued. Use Activate when ready to release."}
                  {currentStatus === "Active"    && "This revision is live. Changes will take effect immediately after saving."}
                  {currentStatus === "Inactive"  && "This revision is inactive. You can reactivate or archive it from the list."}
                  {currentStatus === "Archived"  && "Archived revisions are read-only and cannot be directly reactivated."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Quiz List page ────────────────────────────────────────────────────────────
function QuizIdentityCell({ index }: { index: number }) {
  const hues = [195, 215, 175, 205, 185, 220, 168, 200];
  const hue = hues[index % hues.length];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: `hsla(${hue},55%,16%,1)`, border: `1px solid hsla(${hue},50%,28%,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <ClipboardCheck size={15} style={{ color: `hsla(${hue},65%,58%,0.8)` }} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(244,247,250,0.35)", fontStyle: "italic", marginBottom: 2 }}>—</div>
        <div style={{ fontSize: 11, color: "rgba(169,181,199,0.35)", fontStyle: "italic" }}>Lecture: —</div>
      </div>
    </div>
  );
}

function QuizListSkeletonRow() {
  return (
    <tr>
      {[200, 140, 80, 90, 90, 60].map((w, i) => (
        <td key={i} style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ height: 12, width: w, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
        </td>
      ))}
    </tr>
  );
}

function QuizTableRow({ row, index, isLast, onViewAttempts, onEdit }: {
  row: typeof QUIZ_ROWS_DATA[0]; index: number; isLast: boolean;
  onViewAttempts: () => void; onEdit: () => void;
}) {
  const [hov, setHov] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    function h(e: MouseEvent) { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s" }}>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <QuizIdentityCell index={index} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: C.text }}>{row.questionCount}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: C.text }}>{row.passingScore}%</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: C.text }}>{row.maxAttempts}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <div ref={menuRef} style={{ position: "relative" }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: menuOpen ? C.elevated : "transparent", cursor: "pointer", color: C.muted, fontFamily: "inherit" }}>
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div style={{ position: "absolute", insetInlineEnd: 0, top: 36, zIndex: 30, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 160, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
              {[
                { label: "View Attempts", icon: Eye,       cb: onViewAttempts },
                { label: "Edit",          icon: Settings2,  cb: onEdit         },
              ].map(({ label, icon: Icon, cb }) => (
                <button key={label} onClick={() => { setMenuOpen(false); cb(); }}
                  style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <Icon size={13} />{label}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function QuizListPage({ onViewAttempts, onEdit }: { onViewAttempts: (i: number) => void; onEdit: (i: number) => void }) {
  const [search, setSearch]             = useState("");
  const [page, setPage]                 = useState(1);
  const [pageState, setPageState]       = useState<PageState>("loaded");
  const [searchFocused, setSearchFocused] = useState(false);
  const PER_PAGE = 8;

  const rows = pageState === "loaded" ? QUIZ_ROWS_DATA : [];
  const totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const paged = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span><ChevronRight size={12} style={{ opacity: 0.5 }} /><span style={{ color: C.text }}>Quizzes</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Quizzes</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>Manage assessment configuration and review attempts.</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
            <Plus size={14} />Create Quiz
          </button>
        </div>
      </div>

      {/* Search + state toggles */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.text : C.muted, pointerEvents: "none", transition: "color 0.15s" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            placeholder="Search quizzes..."
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${searchFocused ? `${C.cyan}55` : C.border}`, borderRadius: 8, paddingInlineStart: 34, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {(["loaded","loading","empty","error"] as PageState[]).map((s) => (
            <button key={s} onClick={() => setPageState(s)}
              style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${pageState === s ? C.cyan + "55" : C.border}`, background: pageState === s ? C.cyan + "14" : "transparent", color: pageState === s ? C.cyan : C.muted, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{s}</button>
          ))}
        </div>
      </div>

      {pageState === "error" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 36, textAlign: "center" }}>
          <AlertCircle size={22} style={{ color: "#f87171", marginBottom: 10 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>Unable to load quizzes.</div>
          <button onClick={() => setPageState("loaded")} style={{ fontSize: 13, color: C.cyan, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Try Again</button>
        </div>
      )}

      {pageState !== "error" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: C.elevated }}>
                  {["Quiz", "Questions", "Passing Score", "Max Attempts", ""].map((h, i) => (
                    <th key={i} style={{ padding: "11px 16px", textAlign: "start", fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.6)", letterSpacing: "0.07em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageState === "loading" && [0,1,2,3,4].map((i) => <QuizListSkeletonRow key={i} />)}
                {(pageState === "empty" || (pageState === "loaded" && rows.length === 0)) && (
                  <tr><td colSpan={5} style={{ padding: "48px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No quizzes yet.</div>
                    <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      <Plus size={13} />Create Quiz
                    </button>
                  </td></tr>
                )}
                {pageState === "loaded" && paged.map((row, i) => (
                  <QuizTableRow key={i} row={row} index={(page - 1) * PER_PAGE + i} isLast={i === paged.length - 1}
                    onViewAttempts={() => onViewAttempts((page - 1) * PER_PAGE + i)}
                    onEdit={() => onEdit((page - 1) * PER_PAGE + i)} />
                ))}
              </tbody>
            </table>
          </div>
          {pageState === "loaded" && rows.length > PER_PAGE && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 12, color: C.muted }}>{(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE,rows.length)} of {rows.length} quizzes</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}
                  style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: page===1?"rgba(169,181,199,0.25)":C.muted, cursor: page===1?"default":"pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}><ChevronLeft size={14}/></button>
                {Array.from({length:totalPages},(_,i)=>i+1).map((n)=>(
                  <button key={n} onClick={()=>setPage(n)}
                    style={{ width:30,height:30,borderRadius:6,border:`1px solid ${n===page?C.cyan+"55":C.border}`,background:n===page?C.cyan+"18":"transparent",color:n===page?C.cyan:C.muted,fontSize:12,fontWeight:n===page?700:400,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>{n}</button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages}
                  style={{ width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:page===totalPages?"rgba(169,181,199,0.25)":C.muted,cursor:page===totalPages?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}><ChevronRight size={14}/></button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

// ─── Quiz Editor page ──────────────────────────────────────────────────────────
type QuizQType = "Multiple Answer" | "True / False";
interface QuizOpt { id: string; text: string; isCorrect: boolean }
interface QuizQ   { id: string; type: QuizQType; text: string; options: QuizOpt[]; expanded: boolean; hasError: boolean }

function makeDefaultOptions(): QuizOpt[] {
  return [
    { id: "a", text: "", isCorrect: false },
    { id: "b", text: "", isCorrect: false },
    { id: "c", text: "", isCorrect: false },
    { id: "d", text: "", isCorrect: false },
  ];
}

function makeTFOptions(correctIsTrue: boolean): QuizOpt[] {
  return [
    { id: "t", text: "True",  isCorrect: correctIsTrue  },
    { id: "f", text: "False", isCorrect: !correctIsTrue },
  ];
}

function makeInitialQuestions(): QuizQ[] {
  return [
    { id: "q1", type: "Multiple Answer", text: "", options: makeDefaultOptions(), expanded: false, hasError: false },
    { id: "q2", type: "True / False",    text: "", options: makeTFOptions(true),  expanded: false, hasError: false },
    { id: "q3", type: "Multiple Answer", text: "", options: makeDefaultOptions(), expanded: false, hasError: false },
  ];
}

function QuizAnswerOptionRow({ opt, qtype, onTextChange, onCorrectToggle, onRemove, isOnly }: {
  opt: QuizOpt; qtype: QuizQType; onTextChange: (v: string) => void;
  onCorrectToggle: () => void; onRemove: () => void; isOnly: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isTF = qtype === "True / False";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <button onClick={onCorrectToggle} title={opt.isCorrect ? "Correct answer" : "Mark as correct"}
        style={{ width: 20, height: 20, borderRadius: qtype === "Multiple Answer" ? 4 : "50%", border: `2px solid ${opt.isCorrect ? "#4ade80" : C.border}`, background: opt.isCorrect ? "rgba(74,222,128,0.18)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.15s" }}>
        {opt.isCorrect && <Check size={10} style={{ color: "#4ade80" }} />}
      </button>
      {isTF ? (
        <span style={{ flex: 1, fontSize: 13, color: opt.isCorrect ? "#4ade80" : C.muted, fontWeight: opt.isCorrect ? 600 : 400, padding: "8px 12px", background: C.bg, borderRadius: 6, border: `1px solid ${C.border}` }}>{opt.text}</span>
      ) : (
        <input value={opt.text} onChange={(e) => onTextChange(e.target.value)} placeholder="Answer option"
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, height: 36, background: C.bg, border: `1px solid ${focused ? `${C.cyan}55` : opt.isCorrect ? "rgba(74,222,128,0.3)" : C.border}`, borderRadius: 6, paddingInline: 10, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }} />
      )}
      {!isTF && (
        <button onClick={onRemove} disabled={isOnly}
          style={{ width: 24, height: 24, borderRadius: 4, border: "none", background: "transparent", color: isOnly ? "rgba(169,181,199,0.2)" : "rgba(169,181,199,0.45)", cursor: isOnly ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <X size={12} />
        </button>
      )}
    </div>
  );
}

function QuizQuestionRow({ q, idx, total, onChange, onRemove, onToggle }: {
  q: QuizQ; idx: number; total: number;
  onChange: (updated: QuizQ) => void;
  onRemove: () => void;
  onToggle: () => void;
}) {
  const [focused, setFocused] = useState(false);

  function setType(type: QuizQType) {
    const opts = type === "True / False" ? makeTFOptions(true) : makeDefaultOptions();
    onChange({ ...q, type, options: opts });
  }
  function setOptionText(id: string, text: string) {
    onChange({ ...q, options: q.options.map((o) => o.id === id ? { ...o, text } : o) });
  }
  function toggleCorrect(id: string) {
    const opts = q.type === "True / False"
      ? q.options.map((o) => ({ ...o, isCorrect: o.id === id }))
      : q.options.map((o) => o.id === id ? { ...o, isCorrect: !o.isCorrect } : o);
    onChange({ ...q, options: opts });
  }
  function addOption() {
    const ids = ["a","b","c","d","e","f"];
    const newId = ids[q.options.length] ?? String(q.options.length);
    onChange({ ...q, options: [...q.options, { id: newId, text: "", isCorrect: false }] });
  }
  function removeOption(id: string) {
    if (q.options.length <= 2) return;
    onChange({ ...q, options: q.options.filter((o) => o.id !== id) });
  }

  return (
    <div style={{ background: C.bg, border: `1px solid ${q.expanded ? `${C.cyan}33` : C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
      {/* Row header */}
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer", userSelect: "none" }}>
        <GripVertical size={14} style={{ color: "rgba(169,181,199,0.3)", flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, minWidth: 26 }}>{String(idx + 1).padStart(2, "0")}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: q.text ? C.text : "rgba(169,181,199,0.4)", fontStyle: q.text ? "normal" : "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {q.text || "Question text…"}
          </div>
        </div>
        <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.muted, whiteSpace: "nowrap", flexShrink: 0 }}>{q.type}</span>
        <ChevronDown size={14} style={{ color: C.muted, flexShrink: 0, transition: "transform 0.15s", transform: q.expanded ? "rotate(180deg)" : "rotate(0deg)" }} />
      </div>

      {/* Expanded editor */}
      {q.expanded && (
        <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>
          {/* Type selector */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12, marginTop: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.5)", letterSpacing: "0.06em", alignSelf: "center", marginInlineEnd: 4 }}>TYPE</span>
            {(["Multiple Answer", "True / False"] as QuizQType[]).map((t) => (
              <button key={t} onClick={() => setType(t)}
                style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${q.type === t ? C.cyan + "55" : C.border}`, background: q.type === t ? C.cyan + "14" : "transparent", color: q.type === t ? C.cyan : C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{t}</button>
            ))}
          </div>

          {/* Question text */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.5)", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>QUESTION</label>
            <textarea value={q.text} onChange={(e) => onChange({ ...q, text: e.target.value })} placeholder="Enter question text"
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              style={{ width: "100%", background: C.elevated, border: `1px solid ${focused ? `${C.cyan}55` : C.border}`, borderRadius: 8, padding: 10, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "vertical", minHeight: 68, lineHeight: 1.6, boxSizing: "border-box" }} />
            {q.hasError && !q.text && <span style={{ fontSize: 11, color: "#e05555" }}>Question text is required.</span>}
          </div>

          {/* Answer options */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.5)", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>ANSWERS — select correct</label>
            {q.options.map((opt) => (
              <QuizAnswerOptionRow key={opt.id} opt={opt} qtype={q.type}
                onTextChange={(v) => setOptionText(opt.id, v)}
                onCorrectToggle={() => toggleCorrect(opt.id)}
                onRemove={() => removeOption(opt.id)}
                isOnly={q.options.length <= 2} />
            ))}
            {q.type === "Multiple Answer" && q.options.length < 6 && (
              <button onClick={addOption} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, background: "transparent", border: `1px dashed ${C.border}`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>
                <Plus size={11} />Add option
              </button>
            )}
          </div>

          {/* Delete question */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <button onClick={onRemove} style={{ fontSize: 12, color: "#f87171", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", opacity: total <= 1 ? 0.3 : 1 }} disabled={total <= 1}>
              Remove question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizEditorPage({ quizIndex, onBack }: { quizIndex: number; onBack: () => void }) {
  const row = QUIZ_ROWS_DATA[quizIndex % QUIZ_ROWS_DATA.length];
  const [passingScore, setPassingScore] = useState(String(row.passingScore));
  const [maxAttempts, setMaxAttempts]   = useState(String(row.maxAttempts));
  const [timeLimit, setTimeLimit]       = useState("45");
  const [questions, setQuestions]       = useState<QuizQ[]>(makeInitialQuestions);
  const [saveState, setSaveState]       = useState<SaveState>("idle");
  const [isDirty, setIsDirty]           = useState(false);
  const [psFocused, setPsFocused]       = useState(false);
  const [maFocused, setMaFocused]       = useState(false);
  const [tlFocused, setTlFocused]       = useState(false);
  const [psError, setPsError]           = useState("");
  const [maError, setMaError]           = useState("");

  function markDirty() { setIsDirty(true); setSaveState("idle"); }

  function updateQuestion(id: string, updated: QuizQ) {
    setQuestions((prev) => prev.map((q) => q.id === id ? updated : q));
    markDirty();
  }
  function removeQuestion(id: string) {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    markDirty();
  }
  function addQuestion() {
    const newQ: QuizQ = { id: `q${Date.now()}`, type: "Multiple Answer", text: "", options: makeDefaultOptions(), expanded: true, hasError: false };
    setQuestions((prev) => [...prev, newQ]);
    markDirty();
  }
  function toggleExpand(id: string) {
    setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, expanded: !q.expanded } : q));
  }

  function validate() {
    let ok = true;
    const ps = Number(passingScore);
    if (!passingScore || isNaN(ps) || ps < 0 || ps > 100) { setPsError("Enter a value between 0 and 100."); ok = false; } else setPsError("");
    const ma = Number(maxAttempts);
    if (!maxAttempts || isNaN(ma) || ma < 1) { setMaError("Enter at least 1."); ok = false; } else setMaError("");
    const withErrors = questions.map((q) => ({ ...q, hasError: !q.text.trim() }));
    setQuestions(withErrors);
    if (withErrors.some((q) => q.hasError)) ok = false;
    return ok;
  }

  function handleSave() {
    if (!validate()) return;
    setSaveState("saving");
    setTimeout(() => { setSaveState("saved"); setIsDirty(false); }, 1200);
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span><ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span>Quizzes</span><ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span>Quiz</span><ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Edit</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <ChevronLeft size={13} />Back
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>Edit Quiz</h1>
          {isDirty && <span style={{ fontSize: 11, color: "#fbbf24", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 6, padding: "3px 8px" }}>Unsaved changes</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Main column */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Configuration */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Quiz Configuration</span>
            </div>
            <div style={{ padding: 20, display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em" }}>
                  PASSING SCORE <span style={{ color: C.cyan }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input value={passingScore} onChange={(e) => { setPassingScore(e.target.value); markDirty(); }}
                    onFocus={() => setPsFocused(true)} onBlur={() => setPsFocused(false)}
                    type="number" min={0} max={100} placeholder="e.g. 70"
                    style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${psError ? "#e05555" : psFocused ? `${C.cyan}55` : C.border}`, borderRadius: 8, paddingInline: "12px 36px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box" }} />
                  <span style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.muted }}>%</span>
                </div>
                {psError && <span style={{ fontSize: 11, color: "#e05555" }}>{psError}</span>}
                {!psError && <span style={{ fontSize: 11, color: "rgba(169,181,199,0.4)" }}>Minimum % to pass</span>}
              </div>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em" }}>
                  MAX ATTEMPTS <span style={{ color: C.cyan }}>*</span>
                </label>
                <input value={maxAttempts} onChange={(e) => { setMaxAttempts(e.target.value); markDirty(); }}
                  onFocus={() => setMaFocused(true)} onBlur={() => setMaFocused(false)}
                  type="number" min={1} placeholder="e.g. 3"
                  style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${maError ? "#e05555" : maFocused ? `${C.cyan}55` : C.border}`, borderRadius: 8, paddingInline: 12, fontSize: 14, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box" }} />
                {maError && <span style={{ fontSize: 11, color: "#e05555" }}>{maError}</span>}
                {!maError && <span style={{ fontSize: 11, color: "rgba(169,181,199,0.4)" }}>Total allowed attempts</span>}
              </div>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em" }}>
                  TIME LIMIT (MINUTES) <span style={{ color: C.cyan }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input value={timeLimit} onChange={(e) => { setTimeLimit(e.target.value); markDirty(); }}
                    onFocus={() => setTlFocused(true)} onBlur={() => setTlFocused(false)}
                    type="number" min={1} placeholder="e.g. 45"
                    style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${tlFocused ? `${C.cyan}55` : C.border}`, borderRadius: 8, paddingInline: "12px 36px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box" }} />
                  <span style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.muted }}>min</span>
                </div>
                <span style={{ fontSize: 11, color: "rgba(169,181,199,0.4)" }}>Duration allowed per attempt</span>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Questions</span>
                <span style={{ fontSize: 12, color: C.muted, marginInlineStart: 8 }}>{questions.length} question{questions.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              {questions.length === 0 && (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: 13, color: "rgba(169,181,199,0.4)", fontStyle: "italic", marginBottom: 12 }}>No questions yet.</div>
                  <button onClick={addQuestion} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    <Plus size={13} />Add Question
                  </button>
                </div>
              )}
              {questions.map((q, i) => (
                <QuizQuestionRow key={q.id} q={q} idx={i} total={questions.length}
                  onChange={(updated) => updateQuestion(q.id, updated)}
                  onRemove={() => removeQuestion(q.id)}
                  onToggle={() => toggleExpand(q.id)} />
              ))}
              {questions.length > 0 && (
                <button onClick={addQuestion} style={{ display: "flex", alignItems: "center", gap: 7, width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px dashed ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginTop: 4, justifyContent: "center", transition: "border-color 0.15s, color 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.cyan; (e.currentTarget as HTMLButtonElement).style.borderColor = C.cyan + "44"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.muted; (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; }}>
                  <Plus size={14} />Add Question
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ flex: "0 0 220px", minWidth: 180 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", position: "sticky", top: 0 }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em" }}>SAVE</span>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {saveState === "error" && (
                <div style={{ fontSize: 12, color: "#e05555", padding: "8px 10px", background: "rgba(248,113,113,0.08)", borderRadius: 6, border: "1px solid rgba(248,113,113,0.15)" }}>
                  Unable to save quiz. Try again.
                </div>
              )}
              {saveState === "saved" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4ade80" }}>
                  <Check size={13} />Changes saved.
                </div>
              )}
              <button onClick={handleSave} disabled={saveState === "saving"}
                style={{ width: "100%", height: 38, borderRadius: 8, border: "none", background: saveState === "saving" ? "rgba(53,224,223,0.6)" : C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: saveState === "saving" ? "default" : "pointer", fontFamily: "inherit" }}>
                {saveState === "saving" ? "Saving…" : "Save Changes"}
              </button>
              <button onClick={onBack}
                style={{ width: "100%", height: 38, borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Quiz Attempts page ────────────────────────────────────────────────────────
function QuizAttemptSkeletonRow() {
  return (
    <tr>
      {[180, 80, 70, 80, 110, 60].map((w, i) => (
        <td key={i} style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ height: 12, width: w, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
        </td>
      ))}
    </tr>
  );
}

function QuizAttemptTableRow({ attempt, student, isLast }: {
  attempt: typeof QUIZ_ATTEMPTS_DATA[0];
  student: typeof ALL_STUDENTS[0] | undefined;
  isLast: boolean;
}) {
  const [hov, setHov] = useState(false);
  const scoreCfg = attempt.result === "Passed"
    ? { color: "#4ade80", bg: "rgba(74,222,128,0.08)" }
    : { color: "#f87171", bg: "rgba(248,113,113,0.08)" };

  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s" }}>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        {student ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name={student.name} size={30} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{student.name}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{student.id}</div>
            </div>
          </div>
        ) : (
          <span style={{ fontSize: 13, color: "rgba(169,181,199,0.35)", fontStyle: "italic" }}>—</span>
        )}
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: C.text }}>Attempt {attempt.attemptNum}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: scoreCfg.color }}>{attempt.score}%</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <StatusBadge status={attempt.result} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: C.muted }}>{attempt.date}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 12, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.15s" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.cyan; b.style.borderColor = C.cyan + "44"; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
          <Eye size={12} />View Attempt
        </button>
      </td>
    </tr>
  );
}

function QuizAttemptsPage({ quizIndex, onBack }: { quizIndex: number; onBack: () => void }) {
  const row = QUIZ_ROWS_DATA[quizIndex % QUIZ_ROWS_DATA.length];
  const [search, setSearch]             = useState("");
  const [resultFilter, setResultFilter] = useState<"All" | "Passed" | "Failed">("All");
  const [page, setPage]                 = useState(1);
  const [pageState, setPageState]       = useState<PageState>("loaded");
  const [searchFocused, setSearchFocused] = useState(false);
  const PER_PAGE = 8;

  const filtered = pageState === "loaded" ? QUIZ_ATTEMPTS_DATA.filter((a) => {
    if (resultFilter !== "All" && a.result !== resultFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const student = ALL_STUDENTS.find((s) => s.id === a.studentId);
      if (!student) return false;
      if (!student.name.toLowerCase().includes(q) && !student.id.toLowerCase().includes(q)) return false;
    }
    return true;
  }) : [];

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasFilters = resultFilter !== "All" || search.trim() !== "";

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span><ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span>Quizzes</span><ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span>Quiz</span><ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Attempts</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <ChevronLeft size={13} />Back
          </button>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Quiz Attempts</h1>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Lecture: —</div>
          </div>
        </div>
      </div>

      {/* Quiz context strip */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Quiz",         value: "—",                    italic: true  },
          { label: "Passing Score",value: `${row.passingScore}%`, italic: false },
          { label: "Max Attempts", value: String(row.maxAttempts), italic: false },
          { label: "Questions",    value: String(row.questionCount), italic: false },
        ].map(({ label, value, italic }) => (
          <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 16px", display: "flex", flexDirection: "column", gap: 3, minWidth: 120 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.5)", letterSpacing: "0.08em" }}>{label.toUpperCase()}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: italic ? "rgba(244,247,250,0.35)" : C.text, fontStyle: italic ? "italic" : "normal" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.text : C.muted, pointerEvents: "none", transition: "color 0.15s" }} />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            placeholder="Search by student name or ID…"
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${searchFocused ? `${C.cyan}55` : C.border}`, borderRadius: 8, paddingInlineStart: 34, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {(["All", "Passed", "Failed"] as const).map((s) => {
            const cfg = s !== "All" ? STATUS_CONFIG[s] : null;
            return (
              <button key={s} onClick={() => { setResultFilter(s); setPage(1); }}
                style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${resultFilter === s && cfg ? cfg.color + "55" : C.border}`, background: resultFilter === s && cfg ? cfg.bg : resultFilter === s ? "rgba(255,255,255,0.05)" : "transparent", color: resultFilter === s && cfg ? cfg.color : resultFilter === s ? C.text : C.muted, fontSize: 12, fontWeight: resultFilter === s ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{s}</button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {(["loaded","loading","empty","error"] as PageState[]).map((s) => (
            <button key={s} onClick={() => setPageState(s)}
              style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${pageState === s ? C.cyan + "55" : C.border}`, background: pageState === s ? C.cyan + "14" : "transparent", color: pageState === s ? C.cyan : C.muted, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{s}</button>
          ))}
        </div>
      </div>

      {pageState === "error" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 36, textAlign: "center" }}>
          <AlertCircle size={22} style={{ color: "#f87171", marginBottom: 10 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>Unable to load attempts.</div>
          <button onClick={() => setPageState("loaded")} style={{ fontSize: 13, color: C.cyan, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Try Again</button>
        </div>
      )}

      {pageState !== "error" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
              <thead>
                <tr style={{ background: C.elevated }}>
                  {["Student", "Attempt", "Score", "Result", "Date", ""].map((h, i) => (
                    <th key={i} style={{ padding: "11px 16px", textAlign: "start", fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.6)", letterSpacing: "0.07em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageState === "loading" && [0,1,2,3,4].map((i) => <QuizAttemptSkeletonRow key={i} />)}
                {(pageState === "empty" || (pageState === "loaded" && filtered.length === 0)) && (
                  <tr><td colSpan={6} style={{ padding: "48px 20px", textAlign: "center" }}>
                    {hasFilters ? (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No attempts match your current filters.</div>
                        <button onClick={() => { setResultFilter("All"); setSearch(""); }} style={{ fontSize: 13, color: C.cyan, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Clear Filters</button>
                      </div>
                    ) : (
                      <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic" }}>No attempts yet.</div>
                    )}
                  </td></tr>
                )}
                {pageState === "loaded" && paged.map((attempt, i) => {
                  const student = ALL_STUDENTS.find((s) => s.id === attempt.studentId);
                  return <QuizAttemptTableRow key={`${attempt.studentId}-${attempt.attemptNum}`} attempt={attempt} student={student} isLast={i === paged.length - 1} />;
                })}
              </tbody>
            </table>
          </div>

          {pageState === "loaded" && filtered.length > PER_PAGE && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 12, color: C.muted }}>{(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length} attempts</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}
                  style={{ width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:page===1?"rgba(169,181,199,0.25)":C.muted,cursor:page===1?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}><ChevronLeft size={14}/></button>
                {Array.from({length:totalPages},(_,i)=>i+1).map((n)=>(
                  <button key={n} onClick={()=>setPage(n)}
                    style={{ width:30,height:30,borderRadius:6,border:`1px solid ${n===page?C.cyan+"55":C.border}`,background:n===page?C.cyan+"18":"transparent",color:n===page?C.cyan:C.muted,fontSize:12,fontWeight:n===page?700:400,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>{n}</button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages}
                  style={{ width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:page===totalPages?"rgba(169,181,199,0.25)":C.muted,cursor:page===totalPages?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}><ChevronRight size={14}/></button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

// ─── Access Management ─────────────────────────────────────────────────────────
function studentInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function AccessAvatar({ name, size = 32 }: { name: string; size?: number }) {
  const hue = (name.charCodeAt(0) * 37 + name.charCodeAt(1) * 11) % 360;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `hsla(${hue},45%,22%,1)`, border: `1px solid hsla(${hue},40%,32%,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.38, fontWeight: 700, color: `hsla(${hue},65%,70%,0.9)`, lineHeight: 1 }}>{studentInitials(name)}</span>
    </div>
  );
}

function AccessTypeBadge({ type }: { type: AccessTargetType }) {
  const isCourse = type === "Course";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: isCourse ? C.cyan : "#818cf8", background: isCourse ? `${C.cyan}12` : "rgba(129,140,248,0.1)", border: `1px solid ${isCourse ? C.cyan + "33" : "rgba(129,140,248,0.25)"}`, borderRadius: 20, padding: "3px 8px", whiteSpace: "nowrap" }}>
      {isCourse ? <BookOpen size={10} /> : <RefreshCw size={10} />}
      {type}
    </span>
  );
}

function AccessStudentCell({ name, email, dimmed }: { name: string; email: string; dimmed?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: dimmed ? 0.6 : 1 }}>
      <AccessAvatar name={name} size={34} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{name}</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{email}</div>
      </div>
    </div>
  );
}

function AccessTargetCell({ rec }: { rec: AccessRecord }) {
  const hue = rec.targetType === "Course" ? 195 : 215;
  const dimmed = rec.status !== "Active";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: dimmed ? 0.65 : 1 }}>
      <div style={{ width: 32, height: 32, borderRadius: 7, background: `hsla(${hue},50%,15%,1)`, border: `1px solid hsla(${hue},45%,26%,0.55)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {rec.targetType === "Course" ? <BookOpen size={13} style={{ color: `hsla(${hue},65%,60%,0.85)` }} /> : <RefreshCw size={13} style={{ color: `hsla(${hue},65%,60%,0.85)` }} />}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{rec.target}</div>
        {rec.targetType === "Revision" && rec.course && (
          <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{rec.course}</div>
        )}
      </div>
    </div>
  );
}

function AccessActionsMenu({ rec, onView, onRevoke }: {
  rec: AccessRecord; onView: () => void; onRevoke: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: open ? C.elevated : "transparent", cursor: "pointer", color: C.muted, transition: "all 0.15s", fontFamily: "inherit" }}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineEnd: 0, top: 36, zIndex: 30, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 160, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
          <button onClick={() => { setOpen(false); onView(); }}
            style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
            <Eye size={13} />View
          </button>
          {rec.status === "Active" && (
            <>
              <div style={{ height: 1, background: C.border, margin: "4px 0" }} />
              <button onClick={() => { setOpen(false); onRevoke(); }}
                style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#f87171", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                <X size={13} />Revoke Access
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function AccessSkeletonRow() {
  return (
    <tr>
      {[200, 200, 80, 80, 100, 40].map((w, i) => (
        <td key={i} style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ height: 12, width: w, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
        </td>
      ))}
    </tr>
  );
}

function AccessTableRow({ rec, isLast, onView, onRevoke }: {
  rec: AccessRecord; isLast: boolean; onView: () => void; onRevoke: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s" }}>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <AccessStudentCell name={rec.studentName} email={rec.studentEmail} dimmed={rec.status !== "Active"} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, minWidth: 200 }}>
        <AccessTargetCell rec={rec} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <AccessTypeBadge type={rec.targetType} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <StatusBadge status={rec.status} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: rec.status === "Revoked" ? "rgba(169,181,199,0.45)" : C.muted }}>{rec.granted}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <AccessActionsMenu rec={rec} onView={onView} onRevoke={onRevoke} />
      </td>
    </tr>
  );
}

// ─── Screen 12 — Access List ───────────────────────────────────────────────────
function AccessPage({ rows, onRevoke, onView, onGrant }: {
  rows: AccessRecord[];
  onRevoke: (id: string) => void;
  onView: (id: string) => void;
  onGrant: () => void;
}) {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<AccessStatus | "All">("All");
  const [typeFilter, setTypeFilter]     = useState<AccessTargetType | "All">("All");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [searchFocused, setSearchFocused] = useState(false);
  const [typeDropOpen, setTypeDropOpen]   = useState(false);
  const [courseDropOpen, setCourseDropOpen] = useState(false);
  const typeDropRef   = useRef<HTMLDivElement>(null);
  const courseDropRef = useRef<HTMLDivElement>(null);
  const [pendingRevoke, setPendingRevoke] = useState<AccessRecord | null>(null);
  const [revokeReason, setRevokeReason]   = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    if (!typeDropOpen) return;
    function h(e: MouseEvent) { if (typeDropRef.current && !typeDropRef.current.contains(e.target as Node)) setTypeDropOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [typeDropOpen]);

  useEffect(() => {
    if (!courseDropOpen) return;
    function h(e: MouseEvent) { if (courseDropRef.current && !courseDropRef.current.contains(e.target as Node)) setCourseDropOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [courseDropOpen]);

  const COURSES = ["All Courses", "Advanced Cardiology", "Emergency Medicine Essentials", "Internal Medicine Review", "Neurology Board Review"];

  const totalCount    = rows.length;
  const activeCount   = rows.filter((r) => r.status === "Active").length;
  const revisionCount = rows.filter((r) => r.targetType === "Revision").length;
  const courseCount   = rows.filter((r) => r.targetType === "Course").length;

  const filtered = rows.filter((r) => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (typeFilter !== "All" && r.targetType !== typeFilter) return false;
    if (courseFilter !== "All Courses") {
      if (r.targetType === "Course" && r.target !== courseFilter) return false;
      if (r.targetType === "Revision" && r.course !== courseFilter) return false;
    }
    const q = search.toLowerCase();
    if (q && !r.studentName.toLowerCase().includes(q) && !r.target.toLowerCase().includes(q) && !r.studentEmail.toLowerCase().includes(q)) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasFilters = statusFilter !== "All" || typeFilter !== "All" || courseFilter !== "All Courses" || !!search;

  const SUMMARY_CARDS = [
    { label: "Total Records",    value: totalCount,    color: C.text },
    { label: "Active",           value: activeCount,   color: "#4ade80" },
    { label: "Revision Access",  value: revisionCount, color: "#818cf8" },
    { label: "Course Access",    value: courseCount,   color: C.cyan   },
  ];

  const COL_HEADERS = ["Student", "Target", "Type", "Status", "Granted", ""];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {pendingRevoke && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,18,37,0.85)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.surface, border: "1px solid rgba(248,113,113,0.3)", borderRadius: 14, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertCircle size={20} style={{ color: "#f87171" }} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Revoke Access</div>
                <div style={{ fontSize: 12, color: C.muted }}>Audit compliance requires an explicit reason.</div>
              </div>
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: 12, fontSize: 13, color: "#fca5a5" }}>
                You are about to revoke access for <strong>{pendingRevoke.studentName}</strong> to <strong>{pendingRevoke.target}</strong>. The student will immediately lose access.
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Reason for Revocation <span style={{ color: "#f87171" }}>*</span>
                </label>
                <textarea
                  rows={3}
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder="E.g., Payment dispute, course completion expired, or student request."
                  style={{ width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, outline: "none", resize: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: `1px solid ${C.border}`, background: C.surface }}>
              <button
                onClick={() => { setPendingRevoke(null); setRevokeReason(""); }}
                style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!revokeReason.trim()) return;
                  onRevoke(pendingRevoke.id);
                  setPendingRevoke(null);
                  setRevokeReason("");
                }}
                disabled={!revokeReason.trim()}
                style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#f87171", color: "#ffffff", fontSize: 13, fontWeight: 700, cursor: !revokeReason.trim() ? "default" : "pointer", opacity: !revokeReason.trim() ? 0.5 : 1 }}
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span><ChevronRight size={12} style={{ opacity: 0.5 }} /><span style={{ color: C.text }}>Access</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Access</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>Manage student access to courses and revisions.</p>
          </div>
          <button onClick={onGrant} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
            <Plus size={14} />Grant Access
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {SUMMARY_CARDS.map((c) => (
          <div key={c.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.text : C.muted, pointerEvents: "none" }} />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            placeholder="Search students, courses, or revisions..."
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${searchFocused ? C.cyan + "55" : C.border}`, borderRadius: 8, paddingInlineStart: 34, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box", transition: "border-color 0.15s" }} />
        </div>

        {/* Target Type dropdown */}
        <div ref={typeDropRef} style={{ position: "relative" }}>
          <button onClick={() => setTypeDropOpen(!typeDropOpen)}
            style={{ display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 12px", borderRadius: 8, border: `1px solid ${typeFilter !== "All" ? C.cyan + "55" : C.border}`, background: typeFilter !== "All" ? C.cyan + "12" : C.elevated, color: typeFilter !== "All" ? C.cyan : C.muted, fontSize: 13, fontWeight: typeFilter !== "All" ? 600 : 400, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            <Lock size={12} />{typeFilter === "All" ? "Type" : typeFilter}
            <ChevronDown size={12} style={{ transform: typeDropOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
          </button>
          {typeDropOpen && (
            <div style={{ position: "absolute", top: 42, insetInlineStart: 0, zIndex: 20, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 160, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
              {(["All", "Course", "Revision"] as const).map((t) => (
                <button key={t} onClick={() => { setTypeFilter(t); setTypeDropOpen(false); setPage(1); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: t === typeFilter ? "rgba(53,224,223,0.07)" : "transparent", color: t === typeFilter ? C.cyan : C.muted, fontSize: 13, fontWeight: t === typeFilter ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <span style={{ width: 14, flexShrink: 0 }}>{t === typeFilter && <Check size={12} />}</span>{t === "All" ? "All Types" : t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Course dropdown */}
        <div ref={courseDropRef} style={{ position: "relative" }}>
          <button onClick={() => setCourseDropOpen(!courseDropOpen)}
            style={{ display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 12px", borderRadius: 8, border: `1px solid ${courseFilter !== "All Courses" ? C.cyan + "55" : C.border}`, background: courseFilter !== "All Courses" ? C.cyan + "12" : C.elevated, color: courseFilter !== "All Courses" ? C.cyan : C.muted, fontSize: 13, fontWeight: courseFilter !== "All Courses" ? 600 : 400, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            <BookOpen size={12} />{courseFilter === "All Courses" ? "Course" : courseFilter}
            <ChevronDown size={12} style={{ transform: courseDropOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
          </button>
          {courseDropOpen && (
            <div style={{ position: "absolute", top: 42, insetInlineStart: 0, zIndex: 20, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 240, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
              {COURSES.map((c) => (
                <button key={c} onClick={() => { setCourseFilter(c); setCourseDropOpen(false); setPage(1); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: c === courseFilter ? "rgba(53,224,223,0.07)" : "transparent", color: c === courseFilter ? C.cyan : C.muted, fontSize: 13, fontWeight: c === courseFilter ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <span style={{ width: 14, flexShrink: 0 }}>{c === courseFilter && <Check size={12} />}</span>{c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status chips */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {(["All", "Active", "Inactive", "Revoked"] as const).map((s) => {
            const isActive = statusFilter === s;
            const cfg = s !== "All" ? STATUS_CONFIG[s] : null;
            return (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${isActive && cfg ? cfg.color + "55" : C.border}`, background: isActive && cfg ? cfg.bg : isActive ? "rgba(255,255,255,0.05)" : "transparent", color: isActive && cfg ? cfg.color : isActive ? C.text : C.muted, fontSize: 12, fontWeight: isActive ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr style={{ background: C.elevated }}>
                {COL_HEADERS.map((h, i) => (
                  <th key={i} style={{ padding: "11px 16px", textAlign: "start", fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.6)", letterSpacing: "0.07em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: "48px 20px", textAlign: "center" }}>
                    {hasFilters ? (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No access records match your filters.</div>
                        <button onClick={() => { setStatusFilter("All"); setTypeFilter("All"); setCourseFilter("All Courses"); setSearch(""); }} style={{ fontSize: 13, color: C.cyan, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Clear Filters</button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No access records yet.</div>
                        <button onClick={onGrant} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          <Plus size={13} />Grant Access
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )}
              {paged.map((rec, i) => (
                <AccessTableRow key={rec.id} rec={rec} isLast={i === paged.length - 1}
                  onView={() => onView(rec.id)}
                  onRevoke={() => setPendingRevoke(rec)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: `1px solid ${C.border}`, gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: C.muted }}>
            {filtered.length === 0 ? "0 records" : `${(page-1)*PER_PAGE+1}–${Math.min(page*PER_PAGE,filtered.length)} of ${filtered.length} record${filtered.length !== 1 ? "s" : ""}`}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1} style={{ display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:page===1?"rgba(169,181,199,0.25)":C.muted,cursor:page===1?"default":"pointer",fontFamily:"inherit" }}><ChevronLeft size={14}/></button>
            {Array.from({length:totalPages},(_,i)=>i+1).map((n)=>(
              <button key={n} onClick={()=>setPage(n)} style={{ display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:6,border:`1px solid ${n===page?C.cyan+"55":C.border}`,background:n===page?C.cyan+"18":"transparent",color:n===page?C.cyan:C.muted,fontSize:12,fontWeight:n===page?700:400,cursor:"pointer",fontFamily:"inherit" }}>{n}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages} style={{ display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:page===totalPages?"rgba(169,181,199,0.25)":C.muted,cursor:page===totalPages?"default":"pointer",fontFamily:"inherit" }}><ChevronRight size={14}/></button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Screen 13 — Access Details ────────────────────────────────────────────────
function AccessDetailsPage({ accId, rows, onRevoke, onBack }: {
  accId: string; rows: AccessRecord[];
  onRevoke: (id: string) => void; onBack: () => void;
}) {
  const rec = rows.find((r) => r.id === accId)!;
  const [pendingRevoke, setPendingRevoke] = useState(false);

  const OVERVIEW_FIELDS = [
    { label: "Student",       value: rec.studentName },
    { label: "Email",         value: rec.studentEmail },
    { label: "Access Target", value: rec.target },
    { label: "Target Type",   value: <AccessTypeBadge type={rec.targetType} /> },
    ...(rec.targetType === "Revision" && rec.course ? [{ label: "Course", value: rec.course }] : []),
    { label: "Status",        value: <StatusBadge status={rec.status} /> },
    { label: "Granted",       value: rec.granted },
    ...(rec.grantSource ? [{ label: "Source", value: rec.grantSource }] : []),
  ];

  const timelineEntries: { date: string; label: string; current?: boolean; revoked?: boolean }[] = [
    { date: rec.granted, label: "Access Granted" },
    ...(rec.status === "Active"   ? [{ date: "", label: "Active",  current: true }] : []),
    ...(rec.status === "Revoked"  ? [{ date: "", label: "Revoked", revoked: true }] : []),
    ...(rec.status === "Inactive" ? [{ date: "", label: "Inactive" }] : []),
  ];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {pendingRevoke && (
        <ConfirmationModal
          title="Revoke Access?"
          body={`You are about to revoke access for:\n\n${rec.studentName}\n\nAccess: ${rec.target}\n\nThe student will immediately lose access to this content.`}
          confirmLabel="Revoke Access"
          danger
          onConfirm={() => { onRevoke(rec.id); setPendingRevoke(false); }}
          onCancel={() => setPendingRevoke(false)}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8, flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Access</button>
          <ChevronRight size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
          <span style={{ color: "rgba(169,181,199,0.7)" }}>{rec.studentName}</span>
          <ChevronRight size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
          <span style={{ color: C.text }}>{rec.target}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Access Details</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <span style={{ fontSize: 14, color: C.muted, fontWeight: 500 }}>{rec.studentName}</span>
              <StatusBadge status={rec.status} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              <ChevronLeft size={13} />Back to Access
            </button>
            {rec.status === "Active" && (
              <button onClick={() => setPendingRevoke(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.08)", color: "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <X size={13} />Revoke Access
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Body — 2-column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>

        {/* Left: Access Overview */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Access Overview</span>
          </div>
          <div>
            {OVERVIEW_FIELDS.map(({ label, value }) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, padding: "13px 20px", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, color: C.text }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Student Context */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Student</span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <AccessAvatar name={rec.studentName} size={42} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{rec.studentName}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{rec.studentEmail}</div>
                </div>
              </div>
              <div style={{ padding: "10px 12px", background: C.elevated, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
                  This record reflects access granted to this student. No clinical, progress, or billing data is shown here.
                </div>
              </div>
            </div>
          </div>

          {/* Access Timeline */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Access Timeline</span>
            </div>
            <div style={{ padding: "18px" }}>
              {timelineEntries.map((entry, i) => {
                const isLast = i === timelineEntries.length - 1;
                const dotColor = entry.current ? C.cyan : entry.revoked ? "#f87171" : "rgba(74,222,128,0.6)";
                const labelColor = entry.current ? C.cyan : entry.revoked ? "#f87171" : C.text;
                return (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: entry.current ? `${C.cyan}18` : "transparent", border: `2px solid ${dotColor}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, boxShadow: entry.current ? `0 0 0 4px ${C.cyan}12` : "none" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor }} />
                      </div>
                      {!isLast && <div style={{ width: 2, height: 28, background: "rgba(255,255,255,0.06)", marginTop: 2 }} />}
                    </div>
                    <div style={{ paddingTop: 3, paddingBottom: isLast ? 0 : 10 }}>
                      {entry.date && <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{entry.date}</div>}
                      <div style={{ fontSize: 13, fontWeight: entry.current || entry.revoked ? 700 : 500, color: labelColor }}>
                        {entry.label}
                        {entry.current && <span style={{ marginInlineStart: 8, fontSize: 10, color: C.cyan, background: `${C.cyan}14`, border: `1px solid ${C.cyan}33`, borderRadius: 4, padding: "1px 6px" }}>Current</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Screen 14 — Grant Access ──────────────────────────────────────────────────
function GrantAccessPage({ onSuccess, onBack }: {
  onSuccess: (rec: Omit<AccessRecord, "id">) => void; onBack: () => void;
}) {
  const ALL_COURSE_NAMES = ["Advanced Cardiology", "Emergency Medicine Essentials", "Internal Medicine Review", "Clinical Pharmacology", "Neurology Board Review", "Pediatrics Essentials"];
  const STUDENTS_LIST = [
    { name: "Ahmed Hassan",  email: "ahmed.hassan@example.com" },
    { name: "Mariam Adel",  email: "mariam.adel@example.com" },
    { name: "Omar Khaled",  email: "omar.khaled@example.com" },
    { name: "Sara Mohamed", email: "sara.mohamed@example.com" },
    { name: "Youssef Ali",  email: "youssef.ali@example.com" },
    { name: "Nour Ibrahim", email: "nour.ibrahim@example.com" },
  ];

  const [studentSearch, setStudentSearch] = useState("Ahmed Hassan");
  const [selectedStudent, setSelectedStudent] = useState(STUDENTS_LIST[0]);
  const [studentDropOpen, setStudentDropOpen] = useState(false);
  const studentDropRef = useRef<HTMLDivElement>(null);

  const [targetType, setTargetType] = useState<AccessTargetType>("Course");
  const [selectedCourse, setSelectedCourse] = useState("Advanced Cardiology");
  const [courseDropOpen, setCourseDropOpen] = useState(false);
  const courseDropRef = useRef<HTMLDivElement>(null);

  const [selectedRevision, setSelectedRevision] = useState("");
  const [revisionDropOpen, setRevisionDropOpen] = useState(false);
  const revisionDropRef = useRef<HTMLDivElement>(null);

  const [saveState, setSaveState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!studentDropOpen) return;
    function h(e: MouseEvent) { if (studentDropRef.current && !studentDropRef.current.contains(e.target as Node)) setStudentDropOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [studentDropOpen]);
  useEffect(() => {
    if (!courseDropOpen) return;
    function h(e: MouseEvent) { if (courseDropRef.current && !courseDropRef.current.contains(e.target as Node)) setCourseDropOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [courseDropOpen]);
  useEffect(() => {
    if (!revisionDropOpen) return;
    function h(e: MouseEvent) { if (revisionDropRef.current && !revisionDropRef.current.contains(e.target as Node)) setRevisionDropOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [revisionDropOpen]);

  const filteredStudents = STUDENTS_LIST.filter((s) =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const availableRevisions = REVISION_RECORDS.filter((r) => r.course === selectedCourse && r.status !== "Archived");

  const targetDisplay = targetType === "Course" ? selectedCourse : selectedRevision;
  const isValid = !!selectedStudent && !!selectedCourse && (targetType === "Course" || !!selectedRevision);

  function handleGrant() {
    if (!isValid) return;
    setSaveState("submitting");
    setTimeout(() => {
      const now = new Date();
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const dateStr = `${String(now.getDate()).padStart(2,"0")} ${months[now.getMonth()]} ${now.getFullYear()}`;
      onSuccess({
        studentName:  selectedStudent.name,
        studentEmail: selectedStudent.email,
        target:       targetType === "Course" ? selectedCourse : selectedRevision,
        targetType,
        course:       targetType === "Revision" ? selectedCourse : null,
        status:       "Active",
        granted:      dateStr,
      });
      setSaveState("success");
    }, 800);
  }

  if (saveState === "success") {
    return (
      <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Check size={24} style={{ color: "#4ade80" }} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>Access granted successfully.</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 24, lineHeight: 1.6 }}>
            {selectedStudent.name} now has access to {targetDisplay}.
          </div>
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <ChevronLeft size={13} />Back to Access
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Access</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Grant Access</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Grant Access</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>Assign educational content access to a student.</p>
          </div>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <ChevronLeft size={13} />Cancel
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Student section */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Student</span>
            </div>
            <div style={{ padding: "20px" }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Student <span style={{ color: "#f87171" }}>*</span></label>
              <div ref={studentDropRef} style={{ position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <Search size={13} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: C.muted, pointerEvents: "none" }} />
                  <input
                    value={studentSearch}
                    onChange={(e) => { setStudentSearch(e.target.value); setStudentDropOpen(true); }}
                    onFocus={() => setStudentDropOpen(true)}
                    placeholder="Search students..."
                    style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, paddingInlineStart: 34, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", boxSizing: "border-box" }}
                  />
                </div>
                {studentDropOpen && filteredStudents.length > 0 && (
                  <div style={{ position: "absolute", top: 44, insetInlineStart: 0, zIndex: 20, width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                    {filteredStudents.map((s) => (
                      <button key={s.email} onClick={() => { setSelectedStudent(s); setStudentSearch(s.name); setStudentDropOpen(false); }}
                        style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 6, border: "none", background: s.email === selectedStudent?.email ? "rgba(53,224,223,0.07)" : "transparent", color: C.text, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                        <AccessAvatar name={s.name} size={28} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: s.email === selectedStudent?.email ? C.cyan : C.text }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>{s.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selectedStudent && (
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: C.elevated, borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <AccessAvatar name={selectedStudent.name} size={36} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{selectedStudent.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{selectedStudent.email}</div>
                  </div>
                  <div style={{ marginInlineStart: "auto" }}>
                    <span style={{ fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 4, padding: "2px 7px", fontWeight: 600 }}>Selected</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Access Target section */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Access Target</span>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Target Type */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>Target Type <span style={{ color: "#f87171" }}>*</span></label>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["Course", "Revision"] as const).map((t) => (
                    <button key={t} onClick={() => { setTargetType(t); setSelectedRevision(""); }}
                      style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, border: `1px solid ${targetType === t ? C.cyan + "55" : C.border}`, background: targetType === t ? C.cyan + "12" : C.elevated, color: targetType === t ? C.cyan : C.muted, fontSize: 13, fontWeight: targetType === t ? 700 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                      {t === "Course" ? <BookOpen size={13} /> : <RefreshCw size={13} />}
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course selector */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Course <span style={{ color: "#f87171" }}>*</span></label>
                <div ref={courseDropRef} style={{ position: "relative" }}>
                  <button onClick={() => setCourseDropOpen(!courseDropOpen)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${courseDropOpen ? C.cyan + "55" : C.border}`, background: C.elevated, color: selectedCourse ? C.text : C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", boxSizing: "border-box" }}>
                    <span>{selectedCourse || "Select a course..."}</span>
                    <ChevronDown size={13} style={{ transform: courseDropOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s", color: C.muted, flexShrink: 0 }} />
                  </button>
                  {courseDropOpen && (
                    <div style={{ position: "absolute", top: 44, insetInlineStart: 0, zIndex: 20, width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                      {ALL_COURSE_NAMES.map((c) => (
                        <button key={c} onClick={() => { setSelectedCourse(c); setCourseDropOpen(false); setSelectedRevision(""); }}
                          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", borderRadius: 6, border: "none", background: c === selectedCourse ? "rgba(53,224,223,0.07)" : "transparent", color: c === selectedCourse ? C.cyan : C.muted, fontSize: 13, fontWeight: c === selectedCourse ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                          <span style={{ width: 14, flexShrink: 0 }}>{c === selectedCourse && <Check size={12} />}</span>{c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Revision selector (only when Revision type) */}
              {targetType === "Revision" && (
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Revision <span style={{ color: "#f87171" }}>*</span></label>
                  <div ref={revisionDropRef} style={{ position: "relative" }}>
                    <button onClick={() => setRevisionDropOpen(!revisionDropOpen)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${revisionDropOpen ? C.cyan + "55" : C.border}`, background: C.elevated, color: selectedRevision ? C.text : C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", boxSizing: "border-box" }}>
                      <span>{selectedRevision || "Select a revision..."}</span>
                      <ChevronDown size={13} style={{ transform: revisionDropOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s", color: C.muted, flexShrink: 0 }} />
                    </button>
                    {revisionDropOpen && (
                      <div style={{ position: "absolute", top: 44, insetInlineStart: 0, zIndex: 20, width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
                        {availableRevisions.length === 0 ? (
                          <div style={{ padding: "12px 16px", fontSize: 13, color: "rgba(169,181,199,0.45)", fontStyle: "italic" }}>No active revisions for this course.</div>
                        ) : availableRevisions.map((r) => (
                          <button key={r.id} onClick={() => { setSelectedRevision(r.title); setRevisionDropOpen(false); }}
                            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", borderRadius: 6, border: "none", background: r.title === selectedRevision ? "rgba(53,224,223,0.07)" : "transparent", color: r.title === selectedRevision ? C.cyan : C.muted, fontSize: 13, fontWeight: r.title === selectedRevision ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                            <span style={{ width: 14, flexShrink: 0 }}>{r.title === selectedRevision && <Check size={12} />}</span>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500 }}>{r.title}</div>
                              <div style={{ fontSize: 11, color: "rgba(169,181,199,0.5)" }}><StatusBadge status={r.status} /></div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error state */}
          {saveState === "error" && (
            <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
              <AlertCircle size={15} style={{ color: "#f87171", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#f87171" }}>Unable to grant access. Please try again.</span>
            </div>
          )}
        </div>

        {/* Review sidebar */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" }}>Review</span>
          </div>
          <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { label: "Student", value: selectedStudent?.name || "—", sub: selectedStudent?.email },
              { label: "Target",  value: targetDisplay || "—" },
              { label: "Type",    value: targetType },
            ].map(({ label, value, sub }, i, arr) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.04em" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: value === "—" ? "rgba(169,181,199,0.35)" : C.text, fontStyle: value === "—" ? "italic" : "normal" }}>{value}</span>
                {sub && <span style={{ fontSize: 11, color: C.muted }}>{sub}</span>}
              </div>
            ))}
            <button onClick={handleGrant} disabled={!isValid || saveState === "submitting"}
              style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", padding: "10px 0", borderRadius: 8, border: "none", background: isValid ? C.cyan : "rgba(53,224,223,0.2)", color: isValid ? C.bg : "rgba(53,224,223,0.4)", fontSize: 13, fontWeight: 700, cursor: isValid && saveState !== "submitting" ? "pointer" : "default", fontFamily: "inherit", transition: "all 0.15s" }}>
              {saveState === "submitting" ? <><Clock size={13} />Granting...</> : <><Check size={13} />Grant Access</>}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
import CouponsPage from "./CouponsPage";
import CouponEditorPage from "./CouponEditorPage";
import CouponRedemptionsPage from "./CouponRedemptionsPage";
import AnalyticsPage from "./AnalyticsPage";
import { NotificationsListPage, NotificationDetailsPage, NotificationComposerPage } from "./NotificationsPage";
import CertificatesPage from "./CertificatesPage";
import AuditLogsPage from "./AuditLogsPage";
import SettingsPage from "./SettingsPage";

export default function App() {
  const [collapsed, setCollapsed]           = useState(false);
  const [active, setActive]                 = useState("Overview");
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
  const [editingCourse, setEditingCourse]             = useState(false);
  const [selectedQuizIndex, setSelectedQuizIndex]     = useState<number | null>(null);
  const [quizSubView, setQuizSubView]                 = useState<"attempts" | "editor" | null>(null);

  // Revision state
  const [revisionRows, setRevisionRows]             = useState<RevisionRecord[]>([...REVISION_RECORDS]);
  const [selectedRevisionIdx, setSelectedRevisionIdx] = useState<number | null>(null);
  const [revisionSubView, setRevisionSubView]         = useState<"details" | "editor" | null>(null);

  // Access state
  const [accessRows, setAccessRows]             = useState<AccessRecord[]>([...ACCESS_RECORDS]);
  const [selectedAccessId, setSelectedAccessId] = useState<string | null>(null);
  const [accessSubView, setAccessSubView]       = useState<"details" | "grant" | null>(null);

  // Coupon state
  const [couponSubView, setCouponSubView] = useState<"editor" | "redemptions" | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<{ code: string; target: string; type: string; status: string; used: number; limit: number } | null>(null);

  // Notification state
  const [notifSubView, setNotifSubView]     = useState<"details" | "composer" | null>(null);
  const [selectedNotifId, setSelectedNotifId] = useState<string | null>(null);

  const sidebarWidth = collapsed ? 72 : 256;

  const selectedStudent = selectedStudentId
    ? ALL_STUDENTS.find((s) => s.id === selectedStudentId) ?? null
    : null;

  function updateRevisionRow(idx: number, updates: Partial<RevisionRecord>) {
    setRevisionRows((prev) => prev.map((r, i) => i === idx ? { ...r, ...updates } : r));
  }

  function handleNavSelect(id: string) {
    setActive(id);
    setSelectedStudentId(null);
    setSelectedCourseIndex(null);
    setEditingCourse(false);
    setSelectedQuizIndex(null);
    setQuizSubView(null);
    setSelectedRevisionIdx(null);
    setRevisionSubView(null);
    setSelectedAccessId(null);
    setAccessSubView(null);
    setCouponSubView(null);
    setSelectedCoupon(null);
    setNotifSubView(null);
    setSelectedNotifId(null);
  }

  function renderPage() {
    if (active === "Students" && selectedStudent) {
      return <StudentDetailsPage student={selectedStudent} onBack={() => setSelectedStudentId(null)} />;
    }
    if (active === "Students") {
      return <StudentsPage onViewStudent={(id) => setSelectedStudentId(id)} />;
    }
    if (active === "Courses" && selectedCourseIndex !== null && editingCourse) {
      return (
        <CourseEditorPage
          courseIndex={selectedCourseIndex}
          courseRow={COURSE_ROWS_DATA[selectedCourseIndex % COURSE_ROWS_DATA.length]}
          onBack={() => setEditingCourse(false)}
        />
      );
    }
    if (active === "Courses" && selectedCourseIndex !== null) {
      return (
        <CourseDetailsPage
          courseIndex={selectedCourseIndex}
          courseRow={COURSE_ROWS_DATA[selectedCourseIndex % COURSE_ROWS_DATA.length]}
          onBack={() => setSelectedCourseIndex(null)}
          onEdit={() => setEditingCourse(true)}
        />
      );
    }
    if (active === "Courses") {
      return <CoursesPage onViewCourse={(i) => setSelectedCourseIndex(i)} />;
    }

    // Revision routing
    if (active === "Revisions" && selectedRevisionIdx !== null && revisionSubView === "editor") {
      return (
        <RevisionEditorPage
          revIdx={selectedRevisionIdx}
          rows={revisionRows}
          onSave={(idx, updates) => { if (idx !== null) updateRevisionRow(idx, updates); setRevisionSubView("details"); }}
          onBack={() => setRevisionSubView(selectedRevisionIdx !== null ? "details" : null)}
        />
      );
    }
    if (active === "Revisions" && revisionSubView === "editor" && selectedRevisionIdx === null) {
      return (
        <RevisionEditorPage
          revIdx={null}
          rows={revisionRows}
          onSave={(_idx, _updates) => { setRevisionSubView(null); }}
          onBack={() => setRevisionSubView(null)}
        />
      );
    }
    if (active === "Revisions" && selectedRevisionIdx !== null && revisionSubView === "details") {
      return (
        <RevisionDetailsPage
          revIdx={selectedRevisionIdx}
          rows={revisionRows}
          onTransition={(idx, next) => updateRevisionRow(idx, { status: next })}
          onBack={() => { setSelectedRevisionIdx(null); setRevisionSubView(null); }}
          onEdit={() => setRevisionSubView("editor")}
        />
      );
    }
    if (active === "Revisions") {
      return (
        <RevisionsPage
          rows={revisionRows}
          onTransition={(idx, next) => updateRevisionRow(idx, { status: next })}
          onView={(idx) => { setSelectedRevisionIdx(idx); setRevisionSubView("details"); }}
          onEdit={(idx) => {
            if (idx === -1) { setSelectedRevisionIdx(null); setRevisionSubView("editor"); }
            else { setSelectedRevisionIdx(idx); setRevisionSubView("editor"); }
          }}
        />
      );
    }

    // Access routing
    if (active === "Access" && selectedAccessId && accessSubView === "details") {
      return (
        <AccessDetailsPage
          accId={selectedAccessId}
          rows={accessRows}
          onRevoke={(id) => {
            setAccessRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "Revoked" as AccessStatus } : r));
            setSelectedAccessId(null);
            setAccessSubView(null);
          }}
          onBack={() => { setSelectedAccessId(null); setAccessSubView(null); }}
        />
      );
    }
    if (active === "Access" && accessSubView === "grant") {
      return (
        <GrantAccessPage
          onSuccess={(rec) => {
            const newRec: AccessRecord = { ...rec, id: `acc-${Date.now()}` };
            setAccessRows((prev) => [newRec, ...prev]);
            setAccessSubView(null);
          }}
          onBack={() => setAccessSubView(null)}
        />
      );
    }
    if (active === "Access") {
      return (
        <AccessPage
          rows={accessRows}
          onRevoke={(id) => setAccessRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "Revoked" as AccessStatus } : r))}
          onView={(id) => { setSelectedAccessId(id); setAccessSubView("details"); }}
          onGrant={() => setAccessSubView("grant")}
        />
      );
    }

    if (active === "Coupons" && couponSubView === "redemptions" && selectedCoupon) {
      return (
        <CouponRedemptionsPage
          coupon={selectedCoupon}
          onBack={() => { setCouponSubView(null); setSelectedCoupon(null); }}
        />
      );
    }
    if (active === "Coupons" && couponSubView === "editor") {
      return (
        <CouponEditorPage
          onBack={() => setCouponSubView(null)}
          onSave={() => setCouponSubView(null)}
        />
      );
    }
    if (active === "Coupons") {
      return (
        <CouponsPage
          onCreate={() => setCouponSubView("editor")}
          onViewRedemptions={(c) => { setSelectedCoupon(c); setCouponSubView("redemptions"); }}
        />
      );
    }

    if (active === "Quizzes" && selectedQuizIndex !== null && quizSubView === "editor") {
      return <QuizEditorPage quizIndex={selectedQuizIndex} onBack={() => setQuizSubView(null)} />;
    }
    if (active === "Quizzes" && selectedQuizIndex !== null && quizSubView === "attempts") {
      return <QuizAttemptsPage quizIndex={selectedQuizIndex} onBack={() => { setSelectedQuizIndex(null); setQuizSubView(null); }} />;
    }
    if (active === "Quizzes") {
      return (
        <QuizListPage
          onViewAttempts={(i) => { setSelectedQuizIndex(i); setQuizSubView("attempts"); }}
          onEdit={(i) => { setSelectedQuizIndex(i); setQuizSubView("editor"); }}
        />
      );
    }
    if (active === "Notifications" && notifSubView === "details" && selectedNotifId) {
      return (
        <NotificationDetailsPage
          notifId={selectedNotifId}
          onBack={() => { setNotifSubView(null); setSelectedNotifId(null); }}
        />
      );
    }
    if (active === "Notifications" && notifSubView === "composer") {
      return (
        <NotificationComposerPage
          onBack={() => setNotifSubView(null)}
          onSave={() => setNotifSubView(null)}
        />
      );
    }
    if (active === "Notifications") {
      return (
        <NotificationsListPage
          onCreate={() => setNotifSubView("composer")}
          onView={(id) => { setSelectedNotifId(id); setNotifSubView("details"); }}
          onEdit={(id) => { setSelectedNotifId(id); setNotifSubView("composer"); }}
        />
      );
    }

    if (active === "Analytics") {
      return <AnalyticsPage />;
    }
    if (active === "Certificates") {
      return <CertificatesPage />;
    }
    if (active === "Audit Logs") {
      return <AuditLogsPage />;
    }
    if (active === "Settings") {
      return <SettingsPage />;
    }
    return <OverviewPage />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Montserrat', sans-serif", overflow: "hidden", color: C.text }}>
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} active={active} onSelect={handleNavSelect} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", marginInlineStart: sidebarWidth, transition: "margin-inline-start 0.22s cubic-bezier(0.4,0,0.2,1)" }} className="max-lg:!ms-0">
        <Topbar active={active} onOpenMobile={() => setMobileOpen(true)} />
        {renderPage()}
      </div>
    </div>
  );
}
