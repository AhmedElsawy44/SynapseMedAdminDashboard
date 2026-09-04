import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight, Plus, Bell, Search, Eye, Pencil, Trash2,
  X, CalendarClock, BookOpen, Award, ShieldCheck,
  MoreHorizontal, FileText, Users, AlignLeft,
} from "lucide-react";

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifStatus = "Sent" | "Scheduled" | "Draft";
type NotifType   = "Course Update" | "Certificate" | "Access";

interface NotifRecord {
  id:        string;
  title:     string;
  recipient: string;
  type:      NotifType;
  status:    NotifStatus;
  created:   string;
  message:   string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEED_RECORDS: NotifRecord[] = [
  { id: "ntf-001", title: "New Cardiology Revision Available",     recipient: "All students with Cardiology access", type: "Course Update", status: "Sent",      created: "18 Mar 2026", message: "A new Cardiology revision is now available for learners with access to the course." },
  { id: "ntf-002", title: "Emergency Medicine Revision Scheduled", recipient: "Emergency Medicine learners",         type: "Course Update", status: "Scheduled",  created: "20 Mar 2026", message: "An upcoming Emergency Medicine revision has been scheduled. You will be notified when it goes live." },
  { id: "ntf-003", title: "Certificate Available",                 recipient: "Ahmed Hassan",                        type: "Certificate",   status: "Sent",      created: "18 Mar 2026", message: "Your course certificate is now available. You can download it from your profile." },
  { id: "ntf-004", title: "Course Access Granted",                 recipient: "Mariam Adel",                         type: "Access",        status: "Sent",      created: "14 Mar 2026", message: "Access to Advanced Cardiology has been granted to your account." },
  { id: "ntf-005", title: "Internal Medicine Content Update",      recipient: "Internal Medicine learners",          type: "Course Update", status: "Draft",     created: "22 Mar 2026", message: "New content has been added to the Internal Medicine module. Review the updated material at your earliest convenience." },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<NotifStatus, { color: string; bg: string }> = {
  Sent:      { color: "#4ade80",               bg: "rgba(74,222,128,0.10)"  },
  Scheduled: { color: C.cyan,                  bg: `${C.cyan}12`            },
  Draft:     { color: "rgba(169,181,199,0.7)", bg: "rgba(169,181,199,0.08)" },
};

const TYPE_CFG: Record<NotifType, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  "Course Update": { color: C.cyan,    bg: `${C.cyan}10`,            border: `${C.cyan}33`,           icon: BookOpen    },
  "Certificate":   { color: "#fbbf24", bg: "rgba(251,191,36,0.10)",  border: "rgba(251,191,36,0.28)", icon: Award       },
  "Access":        { color: "#818cf8", bg: "rgba(129,140,248,0.10)", border: "rgba(129,140,248,0.25)", icon: ShieldCheck },
};

const NOTIF_TYPES: NotifType[] = ["Course Update", "Certificate", "Access"];

const RECIPIENT_OPTIONS = [
  "All students with Cardiology access",
  "Emergency Medicine learners",
  "Internal Medicine learners",
  "Neurology learners",
  "All active students",
  "Ahmed Hassan",
  "Mariam Adel",
  "Omar Khaled",
  "Sara Mohamed",
];

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function NotifStatusBadge({ status }: { status: NotifStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}55`, fontSize: 12, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function NotifTypeBadge({ type }: { type: NotifType }) {
  const cfg = TYPE_CFG[type];
  const Icon = cfg.icon;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`, fontSize: 11, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap" }}>
      <Icon size={10} />{type}
    </span>
  );
}

// ─── Actions menu ─────────────────────────────────────────────────────────────

function NotifActionsMenu({
  notif, onView, onEdit, onDelete, onCancel,
}: {
  notif: NotifRecord;
  onView:   () => void;
  onEdit:   () => void;
  onDelete: () => void;
  onCancel: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  type Item = { label: string; icon: React.ElementType; cb: () => void; danger?: boolean };
  const items: Item[] = [];

  if (notif.status === "Sent") {
    items.push({ label: "View", icon: Eye, cb: onView });
  }
  if (notif.status === "Scheduled") {
    items.push({ label: "View",   icon: Eye,          cb: onView });
    items.push({ label: "Edit",   icon: Pencil,        cb: onEdit });
    items.push({ label: "Cancel", icon: X,             cb: onCancel, danger: true });
  }
  if (notif.status === "Draft") {
    items.push({ label: "Edit",   icon: Pencil,        cb: onEdit });
    items.push({ label: "Delete", icon: Trash2,        cb: onDelete, danger: true });
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 6, border: `1px solid ${open ? C.border : "transparent"}`, background: open ? C.elevated : "transparent", cursor: "pointer", color: C.muted, fontFamily: "inherit" }}
        aria-label={`Actions for ${notif.title}`}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineEnd: 0, top: 36, zIndex: 50, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 148, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          {items.map(({ label, icon: Icon, cb, danger }) => (
            <button key={label}
              onClick={() => { setOpen(false); cb(); }}
              style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: danger ? "#f87171" : C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "background 0.1s, color 0.1s" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = danger ? "rgba(248,113,113,0.08)" : "rgba(255,255,255,0.05)"; if (!danger) b.style.color = C.text; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = danger ? "#f87171" : C.muted; }}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Table row ────────────────────────────────────────────────────────────────

function NotifTableRow({
  notif, isLast, onView, onEdit, onDelete, onCancel,
}: {
  notif: NotifRecord; isLast: boolean;
  onView: () => void; onEdit: () => void; onDelete: () => void; onCancel: () => void;
}) {
  const [hov, setHov] = useState(false);
  const dim = notif.status === "Draft";
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", opacity: dim ? 0.75 : 1 }}>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, minWidth: 260 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: `${C.cyan}0D`, border: `1px solid ${C.cyan}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Bell size={13} style={{ color: C.cyan, opacity: 0.7 }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.35 }}>{notif.title}</span>
        </div>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, minWidth: 200 }}>
        <span style={{ fontSize: 13, color: C.muted }}>{notif.recipient}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <NotifTypeBadge type={notif.type} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <NotifStatusBadge status={notif.status} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 13, color: C.muted }}>{notif.created}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, textAlign: "end" }}>
        <NotifActionsMenu notif={notif} onView={onView} onEdit={onEdit} onDelete={onDelete} onCancel={onCancel} />
      </td>
    </tr>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 22 — NOTIFICATIONS LIST
// ═══════════════════════════════════════════════════════════════════════════════

export function NotificationsListPage({
  onCreate,
  onView,
  onEdit,
}: {
  onCreate: () => void;
  onView:   (id: string) => void;
  onEdit:   (id: string) => void;
}) {
  const [records, setRecords]           = useState<NotifRecord[]>([...SEED_RECORDS]);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<NotifStatus | "All">("All");
  const [typeFilter, setTypeFilter]     = useState<NotifType | "All">("All");
  const [searchFocused, setSearchFocused] = useState(false);

  const totalCount     = records.length;
  const sentCount      = records.filter((r) => r.status === "Sent").length;
  const scheduledCount = records.filter((r) => r.status === "Scheduled").length;
  const draftCount     = records.filter((r) => r.status === "Draft").length;

  const filtered = records.filter((r) => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (typeFilter   !== "All" && r.type   !== typeFilter)   return false;
    const q = search.toLowerCase();
    if (q && !r.title.toLowerCase().includes(q) && !r.recipient.toLowerCase().includes(q)) return false;
    return true;
  });

  const hasFilters = statusFilter !== "All" || typeFilter !== "All" || !!search;

  const SUMMARY = [
    { label: "Total",     value: totalCount,     color: C.text,                   note: "all records"   },
    { label: "Sent",      value: sentCount,      color: "#4ade80",                note: "delivered"     },
    { label: "Scheduled", value: scheduledCount, color: C.cyan,                   note: "pending send"  },
    { label: "Draft",     value: draftCount,     color: "rgba(169,181,199,0.55)", note: "not sent"      },
  ];

  function handleDelete(id: string) {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }

  function handleCancel(id: string) {
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: "Draft" as NotifStatus } : r));
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg, fontFamily: "'Montserrat', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
        <span>Admin Console</span>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <span style={{ color: C.text }}>Notifications</span>
      </div>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Notifications</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>Manage system notifications and supported learner communications.</p>
        </div>
        <button
          onClick={onCreate}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, transition: "opacity 0.15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.86"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
          <Plus size={14} />Create Notification
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }} className="max-lg:grid-cols-2 max-sm:grid-cols-1">
        {SUMMARY.map(({ label, value, color, note }) => (
          <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.09em", textTransform: "uppercase" as const, marginBottom: 10 }}>{label}</div>
            <div style={{ fontSize: 30, fontWeight: 700, color, lineHeight: 1, letterSpacing: "-0.025em", marginBottom: 6 }}>{value}</div>
            <div style={{ fontSize: 11, color: "rgba(169,181,199,0.38)", fontStyle: "italic" }}>{note}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 280px", minWidth: 220 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.text : C.muted, pointerEvents: "none", transition: "color 0.15s" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            placeholder="Search notifications..."
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${searchFocused ? `${C.cyan}55` : C.border}`, borderRadius: 8, paddingInlineStart: 34, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" as const }} />
        </div>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {(["All", "Sent", "Scheduled", "Draft"] as const).map((s) => {
            const isActive = statusFilter === s;
            const cfg = s !== "All" ? STATUS_CFG[s as NotifStatus] : null;
            return (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${isActive && cfg ? cfg.color + "55" : C.border}`, background: isActive && cfg ? cfg.bg : isActive ? "rgba(255,255,255,0.05)" : "transparent", color: isActive && cfg ? cfg.color : isActive ? C.text : C.muted, fontSize: 12, fontWeight: isActive ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {s}
              </button>
            );
          })}
        </div>

        <div style={{ width: 1, height: 24, background: C.border, flexShrink: 0 }} />

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {(["All", "Course Update", "Certificate", "Access"] as const).map((t) => {
            const isActive = typeFilter === t;
            return (
              <button key={t} onClick={() => setTypeFilter(t)}
                style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${isActive ? `${C.cyan}44` : C.border}`, background: isActive ? `${C.cyan}10` : "transparent", color: isActive ? C.cyan : C.muted, fontSize: 12, fontWeight: isActive ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
            <thead>
              <tr style={{ background: C.elevated }}>
                {["Notification", "Recipient", "Type", "Status", "Created", ""].map((h, i) => (
                  <th key={i} style={{ padding: "11px 16px", textAlign: i === 5 ? "end" : "start", fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.6)", letterSpacing: "0.07em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "52px 20px", textAlign: "center" }}>
                    {hasFilters ? (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No notifications match your filters.</div>
                        <button onClick={() => { setStatusFilter("All"); setTypeFilter("All"); setSearch(""); }} style={{ fontSize: 13, color: C.cyan, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Clear Filters</button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No notifications yet.</div>
                        <button onClick={onCreate} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          <Plus size={13} />Create Notification
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((notif, i) => (
                  <NotifTableRow
                    key={notif.id}
                    notif={notif}
                    isLast={i === filtered.length - 1}
                    onView={() => onView(notif.id)}
                    onEdit={() => onEdit(notif.id)}
                    onDelete={() => handleDelete(notif.id)}
                    onCancel={() => handleCancel(notif.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "11px 16px", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 12, color: C.muted }}>
            {filtered.length} notification{filtered.length !== 1 ? "s" : ""}{hasFilters ? " matched" : ""}
          </span>
        </div>
      </div>
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 23 — NOTIFICATION DETAILS
// ═══════════════════════════════════════════════════════════════════════════════

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, padding: "13px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ width: 168, flexShrink: 0, fontSize: 12, fontWeight: 600, color: C.muted, paddingTop: 2 }}>{label}</div>
      <div style={{ flex: 1, fontSize: 13, color: C.text }}>{children}</div>
    </div>
  );
}

export function NotificationDetailsPage({
  notifId,
  onBack,
}: {
  notifId: string;
  onBack:  () => void;
}) {
  const notif = SEED_RECORDS.find((r) => r.id === notifId) ?? SEED_RECORDS[0];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px", background: C.bg, fontFamily: "'Montserrat', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 20 }}>
        <span>Admin Console</span>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <button onClick={onBack}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: C.muted, fontSize: 12, fontFamily: "inherit" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.muted; }}>
          Notifications
        </button>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <span style={{ color: C.text }}>Details</span>
      </div>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.25 }}>{notif.title}</h1>
            <NotifStatusBadge status={notif.status} />
          </div>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
            Created {notif.created} · {notif.type}
          </p>
        </div>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, transition: "all 0.15s" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
          <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />Back
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }} className="max-lg:grid-cols-1">

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Notification Information */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <FileText size={14} style={{ color: C.muted }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>Notification Information</span>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12 }}>
              <InfoRow label="Title">{notif.title}</InfoRow>
              <InfoRow label="Recipient">
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Users size={13} style={{ color: C.muted, flexShrink: 0 }} />
                  {notif.recipient}
                </div>
              </InfoRow>
              <InfoRow label="Type"><NotifTypeBadge type={notif.type} /></InfoRow>
              <InfoRow label="Status"><NotifStatusBadge status={notif.status} /></InfoRow>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 0, padding: "13px 0" }}>
                <div style={{ width: 168, flexShrink: 0, fontSize: 12, fontWeight: 600, color: C.muted, paddingTop: 2 }}>Created</div>
                <div style={{ flex: 1, fontSize: 13, color: C.text }}>{notif.created}</div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <AlignLeft size={14} style={{ color: C.muted }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>Message</span>
            </div>
            <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 18px", fontSize: 14, color: C.text, lineHeight: 1.65 }}>
              {notif.message}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Delivery status */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" as const, marginBottom: 14 }}>Delivery</div>
            {notif.status === "Sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>Delivered</span>
                </div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>
                  This notification was sent on <span style={{ color: C.text }}>{notif.created}</span>.
                </div>
              </div>
            ) : notif.status === "Scheduled" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CalendarClock size={15} style={{ color: C.cyan, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.cyan, fontWeight: 600 }}>Scheduled</span>
                </div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>Pending delivery.</div>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "rgba(169,181,199,0.45)", fontStyle: "italic" }}>Not yet sent.</div>
            )}
          </div>

          {/* Audience */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase" as const, marginBottom: 14 }}>Audience</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${C.cyan}10`, border: `1px solid ${C.cyan}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Users size={14} style={{ color: C.cyan }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{notif.recipient}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>Recipient scope</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 24 — NOTIFICATION COMPOSER
// ═══════════════════════════════════════════════════════════════════════════════

const INITIAL_FORM = {
  title:     "New Cardiology Revision Available",
  recipient: "Students with access to Advanced Cardiology",
  type:      "Course Update" as NotifType,
  message:   "A new Cardiology revision is now available for learners with access to the course.",
};

function SelectDropdown<T extends string>({
  value, options, onChange, placeholder,
}: {
  value: T; options: T[]; onChange: (v: T) => void; placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", height: 40, padding: "0 12px", background: C.elevated, border: `1px solid ${open ? `${C.cyan}55` : C.border}`, borderRadius: 8, fontSize: 13, color: value ? C.text : C.muted, textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.15s" }}>
        <span>{value || placeholder}</span>
        <ChevronRight size={13} style={{ color: C.muted, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineStart: 0, top: "calc(100% + 4px)", width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, zIndex: 40, boxShadow: "0 12px 32px rgba(0,0,0,0.35)", maxHeight: 240, overflowY: "auto" }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: value === opt ? C.cyan : C.text, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
              {opt}
              {value === opt && <span style={{ fontSize: 11, color: C.cyan }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DiscardModal({ onDiscard, onStay }: { onDiscard: () => void; onStay: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(7,18,37,0.75)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 32px", width: 380, boxShadow: "0 24px 64px rgba(0,0,0,0.5)", fontFamily: "'Montserrat',sans-serif" }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Unsaved Changes</h2>
        <p style={{ fontSize: 13, color: C.muted, margin: "0 0 24px", lineHeight: 1.6 }}>You have unsaved changes. Discard them and leave the editor?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onStay}
            style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Keep Editing
          </button>
          <button onClick={onDiscard}
            style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{label}</label>
      {children}
      {hint && <span style={{ fontSize: 11, color: "rgba(169,181,199,0.45)", fontStyle: "italic" }}>{hint}</span>}
    </div>
  );
}

export function NotificationComposerPage({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: () => void;
}) {
  const [form, setForm]           = useState({ ...INITIAL_FORM });
  const [isDirty, setIsDirty]     = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  function patch<K extends keyof typeof form>(key: K, val: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
    setIsDirty(true);
    setSaveState("idle");
  }

  function handleCancel() {
    if (isDirty) { setShowDiscard(true); } else { onBack(); }
  }

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => { setSaveState("saved"); setIsDirty(false); }, 900);
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px", background: C.bg, fontFamily: "'Montserrat', sans-serif" }}>

      {showDiscard && <DiscardModal onDiscard={onBack} onStay={() => setShowDiscard(false)} />}

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 20 }}>
        <span>Admin Console</span>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <button onClick={handleCancel}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: C.muted, fontSize: 12, fontFamily: "inherit" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.muted; }}>
          Notifications
        </button>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <span style={{ color: C.text }}>Create Notification</span>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0 }}>Create Notification</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>Compose an administrative notification for the selected audience.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 292px", gap: 20, alignItems: "start" }} className="max-lg:grid-cols-1">

        {/* ── Form ── */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 26px", display: "flex", flexDirection: "column", gap: 20 }}>

          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" as const, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
            Notification Information
          </div>

          <Field label="Title">
            <input value={form.title} onChange={(e) => patch("title", e.target.value)}
              style={{ height: 40, padding: "0 12px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box" as const, transition: "border-color 0.15s" }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${C.cyan}55`; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = C.border; }} />
          </Field>

          <Field label="Recipient" hint="Defines the audience scope for this notification.">
            <SelectDropdown<string>
              value={form.recipient}
              options={RECIPIENT_OPTIONS}
              onChange={(v) => patch("recipient", v)}
              placeholder="Select recipient or group..."
            />
          </Field>

          <Field label="Type">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {NOTIF_TYPES.map((t) => {
                const active = form.type === t;
                const cfg = TYPE_CFG[t];
                return (
                  <button key={t} onClick={() => patch("type", t)}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: `1px solid ${active ? cfg.color + "66" : C.border}`, background: active ? cfg.bg : "transparent", color: active ? cfg.color : C.muted, fontSize: 12, fontWeight: active ? 700 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                    {React.createElement(cfg.icon, { size: 12 })}
                    {t}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Message">
            <textarea value={form.message} onChange={(e) => patch("message", e.target.value)}
              rows={5}
              style={{ padding: "10px 12px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box" as const, resize: "vertical", lineHeight: 1.6, transition: "border-color 0.15s" }}
              onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = `${C.cyan}55`; }}
              onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = C.border; }} />
          </Field>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4 }}>
            <button onClick={handleSave}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 20px", borderRadius: 8, border: "none", background: saveState === "saved" ? "#22c55e" : C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s, opacity 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.86"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : "Save Draft"}
            </button>
            <button onClick={handleCancel}
              style={{ padding: "9px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
              Cancel
            </button>
            {isDirty && <span style={{ fontSize: 11, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginInlineStart: 4 }}>Unsaved changes</span>}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Preview */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 14 }}>Preview</div>
            <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${C.cyan}12`, border: `1px solid ${C.cyan}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Bell size={13} style={{ color: C.cyan }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 2 }}>
                    {form.title || <span style={{ color: "rgba(169,181,199,0.35)", fontStyle: "italic" }}>No title</span>}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>
                    {form.recipient || <span style={{ color: "rgba(169,181,199,0.35)", fontStyle: "italic" }}>No recipient</span>}
                  </div>
                </div>
              </div>
              {form.type && (
                <div><NotifTypeBadge type={form.type} /></div>
              )}
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
                {form.message || <span style={{ color: "rgba(169,181,199,0.35)", fontStyle: "italic" }}>No message</span>}
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 14 }}>Guidelines</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: Bell,       text: "Use system notification types only. Do not create marketing or promotional content." },
                { icon: Users,      text: "Make recipient scope explicit. Audience-targeted notifications reach all matching learners." },
                { icon: AlignLeft,  text: "Keep messages concise and action-oriented." },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                  <Icon size={13} style={{ color: C.muted, flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
