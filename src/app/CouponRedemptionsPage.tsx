import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Tag, BookOpen, RefreshCw, UserCircle, ShieldCheck, MoreHorizontal } from "lucide-react";

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

export interface CouponContext {
  code:   string;
  target: string;
  type:   string;
  status: string;
  used:   number;
  limit:  number;
}

interface RedemptionRecord {
  id:         string;
  student:    string;
  email:      string;
  redeemedAt: string;
  result:     "Successful";
}

const REDEMPTIONS: RedemptionRecord[] = [
  { id: "rdm-001", student: "Ahmed Hassan",  email: "ahmed.hassan@example.com",  redeemedAt: "12 Mar 2026 · 10:42", result: "Successful" },
  { id: "rdm-002", student: "Mariam Adel",   email: "mariam.adel@example.com",   redeemedAt: "14 Mar 2026 · 14:18", result: "Successful" },
  { id: "rdm-003", student: "Omar Khaled",   email: "omar.khaled@example.com",   redeemedAt: "18 Mar 2026 · 09:31", result: "Successful" },
  { id: "rdm-004", student: "Sara Mohamed",  email: "sara.mohamed@example.com",  redeemedAt: "20 Mar 2026 · 16:02", result: "Successful" },
];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function hueFromName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return Math.abs(h) % 360;
}

function StudentAvatar({ name }: { name: string }) {
  const hue = hueFromName(name);
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: `hsl(${hue},45%,22%)`,
      border: `1px solid hsl(${hue},45%,34%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 700, color: `hsl(${hue},70%,72%)`,
      letterSpacing: "0.04em",
    }}>
      {initials(name)}
    </div>
  );
}

function ResultBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 9px", borderRadius: 20,
      background: "rgba(74,222,128,0.10)",
      border: "1px solid rgba(74,222,128,0.33)",
      fontSize: 12, fontWeight: 600, color: "#4ade80",
      whiteSpace: "nowrap",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
      Successful
    </span>
  );
}

function RedemptionActionsMenu({ studentName }: { studentName: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const items: { label: string; icon: React.ElementType; cb: () => void }[] = [
    { label: "View Student", icon: UserCircle, cb: () => {} },
    { label: "View Access",  icon: ShieldCheck, cb: () => {} },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 30, height: 30, borderRadius: 6,
          border: `1px solid ${open ? C.border : "transparent"}`,
          background: open ? C.elevated : "transparent",
          cursor: "pointer", color: C.muted, transition: "all 0.12s",
          fontFamily: "inherit",
        }}
        aria-label={`Actions for ${studentName}`}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div style={{
          position: "absolute", insetInlineEnd: 0, top: 36, zIndex: 50,
          background: C.elevated, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: 4, minWidth: 152,
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }}>
          {items.map(({ label, icon: Icon, cb }) => (
            <button
              key={label}
              onClick={() => { setOpen(false); cb(); }}
              style={{
                display: "flex", alignItems: "center", gap: 9,
                width: "100%", padding: "8px 12px", borderRadius: 6,
                border: "none", background: "transparent",
                color: C.muted, fontSize: 13, cursor: "pointer",
                fontFamily: "inherit", textAlign: "left",
                transition: "background 0.1s, color 0.1s",
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(255,255,255,0.05)";
                b.style.color = C.text;
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "transparent";
                b.style.color = C.muted;
              }}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RedemptionTableRow({ rec, isLast }: { rec: RedemptionRecord; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 0.12s" }}>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <StudentAvatar name={rec.student} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{rec.student}</div>
          </div>
        </div>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, color: C.muted }}>{rec.email}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 13, color: C.muted, fontVariantNumeric: "tabular-nums" }}>{rec.redeemedAt}</span>
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
        <ResultBadge />
      </td>
      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}`, textAlign: "end" }}>
        <RedemptionActionsMenu studentName={rec.student} />
      </td>
    </tr>
  );
}

const STATUS_CFG: Record<string, { color: string; bg: string }> = {
  Active:    { color: "#4ade80",               bg: "rgba(74,222,128,0.10)"  },
  Exhausted: { color: "#fbbf24",               bg: "rgba(251,191,36,0.10)"  },
  Expired:   { color: "rgba(169,181,199,0.5)", bg: "rgba(169,181,199,0.07)" },
};

function CouponContextStrip({ coupon }: { coupon: CouponContext }) {
  const cfg = STATUS_CFG[coupon.status] ?? STATUS_CFG.Expired;
  const pct = coupon.limit > 0 ? Math.min((coupon.used / coupon.limit) * 100, 100) : 0;
  const isCourse = coupon.type === "Course";

  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "18px 24px",
      display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap",
      marginBottom: 24,
    }}>
      {/* Code */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 180 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 9,
          background: `${C.cyan}10`, border: `1px solid ${C.cyan}28`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Tag size={15} style={{ color: C.cyan }} />
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 3 }}>Coupon</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: "monospace", letterSpacing: "0.06em" }}>{coupon.code}</div>
        </div>
      </div>

      <div style={{ width: 1, height: 36, background: C.border, flexShrink: 0 }} />

      {/* Target */}
      <div style={{ minWidth: 160 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 3 }}>Target</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 11, fontWeight: 600,
            color: isCourse ? C.cyan : "#818cf8",
            background: isCourse ? `${C.cyan}12` : "rgba(129,140,248,0.10)",
            border: `1px solid ${isCourse ? C.cyan + "33" : "rgba(129,140,248,0.25)"}`,
            borderRadius: 20, padding: "2px 7px", whiteSpace: "nowrap",
          }}>
            {isCourse ? <BookOpen size={9} /> : <RefreshCw size={9} />}
            {coupon.type}
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{coupon.target}</span>
        </div>
      </div>

      <div style={{ width: 1, height: 36, background: C.border, flexShrink: 0 }} />

      {/* Status */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 5 }}>Status</div>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 9px", borderRadius: 20,
          background: cfg.bg, border: `1px solid ${cfg.color}55`,
          fontSize: 12, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
          {coupon.status}
        </span>
      </div>

      <div style={{ width: 1, height: 36, background: C.border, flexShrink: 0 }} />

      {/* Usage */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 5 }}>Usage</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 72, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: C.cyan, borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text, fontVariantNumeric: "tabular-nums" }}>
            {coupon.used} <span style={{ fontWeight: 400, color: C.muted }}>/ {coupon.limit}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CouponRedemptionsPage({ coupon, onBack }: { coupon: CouponContext; onBack: () => void }) {
  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg, fontFamily: "'Montserrat', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 20 }}>
        <span>Admin Console</span>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: C.muted, fontSize: 12, fontFamily: "inherit" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.muted; }}>
          Coupons
        </button>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <span style={{ color: C.text, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.04em" }}>{coupon.code}</span>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <span style={{ color: C.text }}>Redemptions</span>
      </div>

      {/* Page title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Redemptions</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
          Students who redeemed coupon <span style={{ fontFamily: "monospace", color: C.cyan, fontWeight: 600 }}>{coupon.code}</span>.
        </p>
      </div>

      {/* Coupon context strip */}
      <CouponContextStrip coupon={coupon} />

      {/* Redemptions table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: C.elevated }}>
                {["Student", "Email", "Redeemed At", "Result", ""].map((h, i) => (
                  <th key={i} style={{
                    padding: "11px 16px",
                    textAlign: i === 4 ? "end" : "start",
                    fontSize: 11, fontWeight: 700,
                    color: "rgba(169,181,199,0.6)",
                    letterSpacing: "0.07em",
                    borderBottom: `1px solid ${C.border}`,
                    whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REDEMPTIONS.map((rec, i) => (
                <RedemptionTableRow key={rec.id} rec={rec} isLast={i === REDEMPTIONS.length - 1} />
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "11px 16px", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 12, color: C.muted }}>
            {REDEMPTIONS.length} redemption{REDEMPTIONS.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </main>
  );
}
