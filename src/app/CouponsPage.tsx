import React, { useState, useRef, useEffect } from "react";
import {
  Search, ChevronRight, Plus, Tag, BookOpen,
  RefreshCw, Eye, Settings2, X, MoreHorizontal,
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

type CouponStatus = "Active" | "Exhausted" | "Expired";
type CouponType   = "Course" | "Revision";

interface CouponRecord {
  id:      string;
  code:    string;
  target:  string;
  type:    CouponType;
  status:  CouponStatus;
  used:    number;
  limit:   number;
  expires: string;
}

const COUPON_RECORDS: CouponRecord[] = [
  { id: "cpn-001", code: "CARDIO-2026",      target: "Advanced Cardiology",              type: "Course",   status: "Active",    used: 12,  limit: 50,  expires: "31 Aug 2026" },
  { id: "cpn-002", code: "EMERGENCY-SPRING", target: "Emergency Medicine — Spring 2026", type: "Revision", status: "Active",    used: 8,   limit: 25,  expires: "15 Oct 2026" },
  { id: "cpn-003", code: "INTERNAL-REVIEW",  target: "Internal Medicine Review",         type: "Course",   status: "Exhausted", used: 100, limit: 100, expires: "30 Jun 2026" },
  { id: "cpn-004", code: "NEURO-2025",       target: "Neurology — Archived 2025",        type: "Revision", status: "Expired",   used: 34,  limit: 50,  expires: "31 Dec 2025" },
];

const COUPON_STATUS_CFG: Record<CouponStatus, { color: string; bg: string }> = {
  Active:    { color: "#4ade80",               bg: "rgba(74,222,128,0.10)"  },
  Exhausted: { color: "#fbbf24",               bg: "rgba(251,191,36,0.10)"  },
  Expired:   { color: "rgba(169,181,199,0.5)", bg: "rgba(169,181,199,0.07)" },
};

function CouponStatusBadge({ status }: { status: CouponStatus }) {
  const cfg = COUPON_STATUS_CFG[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}55`, fontSize: 12, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function CouponTypeBadge({ type }: { type: CouponType }) {
  const isCourse = type === "Course";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: isCourse ? C.cyan : "#818cf8", background: isCourse ? `${C.cyan}12` : "rgba(129,140,248,0.10)", border: `1px solid ${isCourse ? C.cyan + "33" : "rgba(129,140,248,0.25)"}`, borderRadius: 20, padding: "3px 8px", whiteSpace: "nowrap" }}>
      {isCourse ? <BookOpen size={10} /> : <RefreshCw size={10} />}
      {type}
    </span>
  );
}

function CouponUsageBar({ used, limit, status }: { used: number; limit: number; status: CouponStatus }) {
  const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const barColor = status === "Exhausted" ? "#fbbf24" : status === "Expired" ? "rgba(169,181,199,0.28)" : C.cyan;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 56, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 12, color: status === "Expired" ? "rgba(169,181,199,0.4)" : C.muted, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
        {used} / {limit}
      </span>
    </div>
  );
}

function CouponActionsMenu({ coupon, onView, onDisable }: { coupon: CouponRecord; onView: () => void; onDisable: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const items: { label: string; icon: React.ElementType; danger?: boolean; cb: () => void }[] = [
    { label: "View", icon: Eye, cb: onView },
  ];
  if (coupon.status === "Active") {
    items.push({ label: "Edit",    icon: Settings2, cb: () => {}  });
    items.push({ label: "Disable", icon: X,         cb: onDisable, danger: true });
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 6, border: `1px solid ${open ? C.border : "transparent"}`, background: open ? C.elevated : "transparent", cursor: "pointer", color: C.muted, transition: "all 0.12s", fontFamily: "inherit" }}
        aria-label={`Actions for ${coupon.code}`}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div style={{ position: "absolute", insetInlineEnd: 0, top: 36, zIndex: 50, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, minWidth: 152, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          {items.map(({ label, icon: Icon, cb, danger }) => (
            <button key={label} onClick={() => { setOpen(false); cb(); }}
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

function CouponTableRow({ coupon, isLast, onView, onDisable }: { coupon: CouponRecord; isLast: boolean; onView: () => void; onDisable: () => void }) {
  const [hov, setHov] = useState(false);
  const dim = coupon.status !== "Active";
  return (
    <tr onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s", opacity: dim ? 0.72 : 1 }}>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: dim ? "rgba(169,181,199,0.06)" : `${C.cyan}10`, border: `1px solid ${dim ? C.border : C.cyan + "28"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Tag size={13} style={{ color: dim ? "rgba(169,181,199,0.35)" : C.cyan }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: dim ? "rgba(169,181,199,0.55)" : C.text, fontFamily: "monospace", letterSpacing: "0.05em" }}>
            {coupon.code}
          </span>
        </div>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, minWidth: 210 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: dim ? "rgba(169,181,199,0.55)" : C.text, lineHeight: 1.4 }}>
          {coupon.target}
        </span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <CouponTypeBadge type={coupon.type} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <CouponUsageBar used={coupon.used} limit={coupon.limit} status={coupon.status} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <CouponStatusBadge status={coupon.status} />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: coupon.status === "Expired" ? "rgba(169,181,199,0.38)" : C.muted }}>
          {coupon.expires}
        </span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, textAlign: "end" }}>
        <CouponActionsMenu coupon={coupon} onView={onView} onDisable={onDisable} />
      </td>
    </tr>
  );
}

export default function CouponsPage({ onCreate, onViewRedemptions }: { onCreate?: () => void; onViewRedemptions?: (coupon: { code: string; target: string; type: string; status: string; used: number; limit: number }) => void }) {
  const [coupons, setCoupons]           = useState<CouponRecord[]>([...COUPON_RECORDS]);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<CouponStatus | "All">("All");
  const [typeFilter, setTypeFilter]     = useState<CouponType | "All">("All");
  const [searchFocused, setSearchFocused] = useState(false);

  const totalCount     = coupons.length;
  const activeCount    = coupons.filter((c) => c.status === "Active").length;
  const exhaustedCount = coupons.filter((c) => c.status === "Exhausted").length;
  const expiredCount   = coupons.filter((c) => c.status === "Expired").length;

  const filtered = coupons.filter((c) => {
    if (statusFilter !== "All" && c.status !== statusFilter) return false;
    if (typeFilter   !== "All" && c.type   !== typeFilter)   return false;
    const q = search.toLowerCase();
    if (q && !c.code.toLowerCase().includes(q) && !c.target.toLowerCase().includes(q)) return false;
    return true;
  });

  const hasFilters = statusFilter !== "All" || typeFilter !== "All" || !!search;

  const SUMMARY = [
    { label: "Total Coupons", value: totalCount,     color: C.text,                   note: "all records"   },
    { label: "Active",        value: activeCount,    color: "#4ade80",                note: "redeemable"    },
    { label: "Exhausted",     value: exhaustedCount, color: "#fbbf24",                note: "limit reached" },
    { label: "Expired",       value: expiredCount,   color: "rgba(169,181,199,0.55)", note: "past expiry"   },
  ];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg, fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin Console</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Coupons</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Coupons</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>Manage access coupons and redemption availability.</p>
          </div>
          <button
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, transition: "opacity 0.15s" }}
            onClick={onCreate}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.86"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
            <Plus size={14} />Create Coupon
          </button>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }} className="max-lg:grid-cols-2 max-sm:grid-cols-1">
        {SUMMARY.map(({ label, value, color, note }) => (
          <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.09em", textTransform: "uppercase" as const, marginBottom: 10 }}>{label}</div>
            <div style={{ fontSize: 30, fontWeight: 700, color, lineHeight: 1, letterSpacing: "-0.025em", marginBottom: 6 }}>{value}</div>
            <div style={{ fontSize: 11, color: "rgba(169,181,199,0.38)", fontStyle: "italic" }}>{note}</div>
          </div>
        ))}
      </div>

      {/* ── Filters row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 280px", minWidth: 220 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: searchFocused ? C.text : C.muted, pointerEvents: "none", transition: "color 0.15s" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search coupon code or target..."
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${searchFocused ? `${C.cyan}55` : C.border}`, borderRadius: 8, paddingInlineStart: 34, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }} />
        </div>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {(["All", "Active", "Exhausted", "Expired"] as const).map((s) => {
            const isActive = statusFilter === s;
            const cfg = s !== "All" ? COUPON_STATUS_CFG[s as CouponStatus] : null;
            return (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${isActive && cfg ? cfg.color + "55" : C.border}`, background: isActive && cfg ? cfg.bg : isActive ? "rgba(255,255,255,0.05)" : "transparent", color: isActive && cfg ? cfg.color : isActive ? C.text : C.muted, fontSize: 12, fontWeight: isActive ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {s}
              </button>
            );
          })}
        </div>

        <div style={{ width: 1, height: 24, background: C.border, flexShrink: 0 }} />

        <div style={{ display: "flex", gap: 4 }}>
          {(["All", "Course", "Revision"] as const).map((t) => {
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

      {/* ── Table ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
            <thead>
              <tr style={{ background: C.elevated }}>
                {["Code", "Target", "Type", "Usage", "Status", "Expires", ""].map((h, i) => (
                  <th key={i} style={{ padding: "11px 16px", textAlign: "start", fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.6)", letterSpacing: "0.07em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "52px 20px", textAlign: "center" }}>
                    {hasFilters ? (
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic", marginBottom: 12 }}>No coupons match your current filters.</div>
                        <button onClick={() => { setStatusFilter("All"); setTypeFilter("All"); setSearch(""); }} style={{ fontSize: 13, color: C.cyan, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Clear Filters</button>
                      </div>
                    ) : (
                      <div style={{ fontSize: 14, color: "rgba(169,181,199,0.45)", fontStyle: "italic" }}>No coupons yet.</div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((coupon, i) => (
                  <CouponTableRow
                    key={coupon.id}
                    coupon={coupon}
                    isLast={i === filtered.length - 1}
                    onView={() => onViewRedemptions?.({ code: coupon.code, target: coupon.target, type: coupon.type, status: coupon.status, used: coupon.used, limit: coupon.limit })}
                    onDisable={() =>
                      setCoupons((prev) =>
                        prev.map((c) => c.id === coupon.id ? { ...c, status: "Expired" as CouponStatus } : c)
                      )
                    }
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "11px 16px", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 12, color: C.muted }}>
            {filtered.length} coupon{filtered.length !== 1 ? "s" : ""}{hasFilters ? " matched" : ""}
          </span>
        </div>
      </div>
    </main>
  );
}
