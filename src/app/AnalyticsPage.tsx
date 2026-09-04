import React, { useState } from "react";
import { ChevronRight, Users, BookOpen, ClipboardCheck, Award, ShieldCheck, Tag } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from "recharts";

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
  green:    "#4ade80",
  amber:    "#fbbf24",
  indigo:   "#818cf8",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type Range = "Today" | "7 Days" | "30 Days";

const PERIOD_LABEL: Record<Range, string> = {
  "Today":   "25 Aug 2026",
  "7 Days":  "19 Aug — 25 Aug 2026",
  "30 Days": "01 Mar 2026 — 31 Mar 2026",
};

// 30-day data (full dataset, shown when "30 Days" selected)
const WEEKLY_DATA = [
  { label: "Wk 1", students: 32, access: 61, completions: 68 },
  { label: "Wk 2", students: 41, access: 74, completions: 79 },
  { label: "Wk 3", students: 37, access: 79, completions: 84 },
  { label: "Wk 4", students: 36, access: 73, completions: 93 },
];

// 7-day slice (last 7 days)
const DAILY_7 = [
  { label: "Sun", students: 8,  access: 17, completions: 21 },
  { label: "Mon", students: 12, access: 22, completions: 18 },
  { label: "Tue", students: 7,  access: 19, completions: 24 },
  { label: "Wed", students: 14, access: 21, completions: 29 },
  { label: "Thu", students: 9,  access: 18, completions: 22 },
  { label: "Fri", students: 6,  access: 14, completions: 16 },
  { label: "Sat", students: 5,  access: 10, completions: 13 },
];

// Today (hourly buckets)
const DAILY_TODAY = [
  { label: "08:00", students: 1, access: 3, completions: 2 },
  { label: "10:00", students: 3, access: 5, completions: 4 },
  { label: "12:00", students: 2, access: 4, completions: 6 },
  { label: "14:00", students: 4, access: 7, completions: 5 },
  { label: "16:00", students: 2, access: 4, completions: 3 },
  { label: "18:00", students: 1, access: 2, completions: 2 },
];

const KPI_DATA: Record<Range, { active: number; newStudents: number; completions: number; quizAttempts: number; accessGrants: number; certificates: number }> = {
  "30 Days": { active: 1082, newStudents: 146, completions: 324, quizAttempts: 1864, accessGrants: 287, certificates: 118 },
  "7 Days":  { active: 312,  newStudents: 61,  completions: 143, quizAttempts: 517,  accessGrants: 74,  certificates: 38  },
  "Today":   { active: 84,   newStudents: 13,  completions: 22,  quizAttempts: 95,   accessGrants: 18,  certificates: 7   },
};

function getChartData(range: Range) {
  if (range === "Today")  return DAILY_TODAY;
  if (range === "7 Days") return DAILY_7;
  return WEEKLY_DATA;
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadEntry[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 13px", fontFamily: "'Montserrat', sans-serif", boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, letterSpacing: "0.05em" }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
          <span style={{ color: C.text, fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Mini sparkline chart ──────────────────────────────────────────────────────

function SparkChart({ data, dataKey, color }: { data: object[]; dataKey: string; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiDef {
  label:    string;
  value:    number;
  icon:     React.ElementType;
  color:    string;
  sparkKey: string;
}

function KpiCard({ def, data }: { def: KpiDef; data: object[] }) {
  const { label, value, icon: Icon, color, sparkKey } = def;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.5)", letterSpacing: "0.09em", textTransform: "uppercase" as const, marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.text, lineHeight: 1, letterSpacing: "-0.025em" }}>{value.toLocaleString()}</div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}14`, border: `1px solid ${color}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <SparkChart data={data} dataKey={sparkKey} color={color} />
    </div>
  );
}

// ─── Full area chart ──────────────────────────────────────────────────────────

function TrendChart({ title, dataKey, color, data }: { title: string; dataKey: string; color: string; data: object[] }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 18, letterSpacing: "0.01em" }}>{title}</div>
      <ResponsiveContainer width="100%" height={188}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={color} stopOpacity={0.22} />
              <stop offset="100%" stopColor={color} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "rgba(169,181,199,0.5)", fontSize: 11, fontFamily: "'Montserrat',sans-serif" }} axisLine={false} tickLine={false} dy={6} />
          <YAxis tick={{ fill: "rgba(169,181,199,0.5)", fontSize: 11, fontFamily: "'Montserrat',sans-serif" }} axisLine={false} tickLine={false} width={32} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} dot={false} activeDot={{ r: 4, fill: color, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Summary stat row ─────────────────────────────────────────────────────────

function SummaryRow({ range }: { range: Range }) {
  const kpi = KPI_DATA[range];
  const rows: { label: string; value: string | number; sub: string }[] = [
    { label: "Total Students",       value: "1,248",            sub: "all time"          },
    { label: "Active Students",      value: kpi.active.toLocaleString(), sub: "in period" },
    { label: "New Students",         value: kpi.newStudents,    sub: "registered"        },
    { label: "Active Courses",       value: 18,                 sub: "published"         },
    { label: "Active Revisions",     value: 7,                  sub: "published"         },
    { label: "Coupon Redemptions",   value: 214,                sub: "in period"         },
  ];
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 22px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 16, letterSpacing: "0.01em" }}>Platform Summary</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 0" }} className="max-sm:grid-cols-2">
        {rows.map(({ label, value, sub }) => (
          <div key={label} style={{ borderRight: "1px solid rgba(255,255,255,0.05)", paddingRight: 16, paddingLeft: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: 2 }}>{typeof value === "number" ? value.toLocaleString() : value}</div>
            <div style={{ fontSize: 11, color: "rgba(169,181,199,0.38)", fontStyle: "italic" }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("30 Days");
  const kpi   = KPI_DATA[range];
  const chart = getChartData(range);

  const RANGES: Range[] = ["Today", "7 Days", "30 Days"];

  const KPI_DEFS: KpiDef[] = [
    { label: "Active Students",    value: kpi.active,        icon: Users,        color: C.cyan,   sparkKey: "students"    },
    { label: "New Students",       value: kpi.newStudents,   icon: Users,        color: C.green,  sparkKey: "students"    },
    { label: "Course Completions", value: kpi.completions,   icon: BookOpen,     color: C.indigo, sparkKey: "completions" },
    { label: "Quiz Attempts",      value: kpi.quizAttempts,  icon: ClipboardCheck, color: C.amber, sparkKey: "completions" },
    { label: "New Access Grants",  value: kpi.accessGrants,  icon: ShieldCheck,  color: "#34d399", sparkKey: "access"     },
    { label: "Certificates Issued",value: kpi.certificates,  icon: Award,        color: "#f472b6", sparkKey: "completions" },
  ];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px", background: C.bg, fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Breadcrumb ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 20 }}>
        <span>Admin Console</span>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <span style={{ color: C.text }}>Analytics</span>
      </div>

      {/* ── Header row ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Analytics</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
            {PERIOD_LABEL[range]}
            <span style={{ marginInlineStart: 10, color: "rgba(169,181,199,0.4)", fontStyle: "italic", fontSize: 12 }}>vs. previous period</span>
          </p>
        </div>

        {/* Date range filter */}
        <div style={{ display: "flex", gap: 4, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, flexShrink: 0 }}>
          {RANGES.map((r) => (
            <button key={r} onClick={() => setRange(r)}
              style={{ padding: "6px 14px", borderRadius: 7, border: "none", background: range === r ? C.surface : "transparent", color: range === r ? C.text : C.muted, fontSize: 12, fontWeight: range === r ? 700 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap", boxShadow: range === r ? `0 1px 4px rgba(0,0,0,0.3)` : "none" }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }} className="max-lg:grid-cols-2 max-sm:grid-cols-1">
        {KPI_DEFS.map((def) => (
          <KpiCard key={def.label} def={def} data={chart} />
        ))}
      </div>

      {/* ── Trend charts ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }} className="max-lg:grid-cols-1">
        <TrendChart title="New Students"       dataKey="students"    color={C.cyan}    data={chart} />
        <TrendChart title="Access Grants"      dataKey="access"      color="#34d399"   data={chart} />
        <TrendChart title="Course Completions" dataKey="completions" color={C.indigo}  data={chart} />
      </div>

      {/* ── Platform summary ── */}
      <SummaryRow range={range} />

    </main>
  );
}
