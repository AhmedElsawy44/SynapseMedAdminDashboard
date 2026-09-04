import React, { useState } from "react";
import {
  Users, BookOpen, Award, Lock, ArrowUpRight, TrendingUp,
  Clock, Plus, RefreshCw, ClipboardCheck, Tag, Send,
  ChevronRight, MoreHorizontal, FileText, CheckCircle2, ShieldCheck
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid
} from "recharts";

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

const CHART_DATA = {
  "7D": [
    { period: "Mon", enrollments: 14, completions: 8 },
    { period: "Tue", enrollments: 22, completions: 12 },
    { period: "Wed", enrollments: 18, completions: 10 },
    { period: "Thu", enrollments: 31, completions: 19 },
    { period: "Fri", enrollments: 42, completions: 26 },
    { period: "Sat", enrollments: 19, completions: 14 },
    { period: "Sun", enrollments: 28, completions: 18 },
  ],
  "30D": [
    { period: "Week 1", enrollments: 118, completions: 74 },
    { period: "Week 2", enrollments: 164, completions: 102 },
    { period: "Week 3", enrollments: 142, completions: 95 },
    { period: "Week 4", enrollments: 210, completions: 141 },
  ],
  "90D": [
    { period: "Month 1", enrollments: 480, completions: 310 },
    { period: "Month 2", enrollments: 620, completions: 435 },
    { period: "Month 3", enrollments: 590, completions: 412 },
  ],
};

const KPI_DATA = [
  {
    id: "students",
    label: "Total Students",
    value: "1,284",
    change: "+12.4%",
    positive: true,
    subtext: "1,190 Active accounts",
    icon: Users,
    color: "#35E0DF",
  },
  {
    id: "courses",
    label: "Active Courses",
    value: "18",
    change: "+2",
    positive: true,
    subtext: "6 published, 4 in review",
    icon: BookOpen,
    color: "#4ade80",
  },
  {
    id: "certificates",
    label: "Certificates Issued",
    value: "412",
    change: "+28",
    positive: true,
    subtext: "100% QR Verified",
    icon: Award,
    color: "#818cf8",
  },
  {
    id: "access",
    label: "Pending Access",
    value: "6",
    change: "Action required",
    positive: false,
    subtext: "Manual approvals",
    icon: Lock,
    color: "#fbbf24",
  },
];

const RECENT_ACTIVITIES = [
  {
    title: "Course content updated",
    desc: "Advanced Cardiology Lecture 8 video transcoded via Bunny Stream.",
    time: "2 min ago",
    icon: BookOpen,
    badgeColor: "#35E0DF",
  },
  {
    title: "Revision submitted for review",
    desc: "Internal Medicine Fall 2026 Revision awaiting academic review.",
    time: "14 min ago",
    icon: RefreshCw,
    badgeColor: "#818cf8",
  },
  {
    title: "Final Assessment graded",
    desc: "Clinical Pharmacology quiz completed with 92% average score.",
    time: "1 hr ago",
    icon: ClipboardCheck,
    badgeColor: "#4ade80",
  },
  {
    title: "Official certificate issued",
    desc: "Certificate CERT-2026-000187 generated for Sara Mohamed.",
    time: "2 hrs ago",
    icon: Award,
    badgeColor: "#35E0DF",
  },
  {
    title: "Access grant revoked",
    desc: "Access revoked with reason logged in security audit trail.",
    time: "3 hrs ago",
    icon: Lock,
    badgeColor: "#f87171",
  },
];

const TOP_COURSES = [
  { name: "Advanced Cardiology", status: "Published", students: 342, completionRate: 84, updated: "Aug 20, 2026" },
  { name: "Emergency Medicine Essentials", status: "Published", students: 289, completionRate: 78, updated: "Aug 18, 2026" },
  { name: "Internal Medicine Review", status: "In Review", students: 215, completionRate: 65, updated: "Aug 15, 2026" },
  { name: "Clinical Pharmacology", status: "Published", students: 198, completionRate: 91, updated: "Aug 10, 2026" },
  { name: "Neurology Board Review", status: "Draft", students: 140, completionRate: 42, updated: "Jul 30, 2026" },
];

const STATUS_BADGES: Record<string, { color: string; bg: string }> = {
  Published:  { color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  "In Review":{ color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  Draft:      { color: "#A9B5C7", bg: "rgba(169,181,199,0.1)" },
  Archived:   { color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
};

export default function OverviewPage({
  onNavigate,
  onCreateCourse,
  onViewCourse,
}: {
  onNavigate?: (route: string) => void;
  onCreateCourse?: () => void;
  onViewCourse?: (courseIndex: number) => void;
}) {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D">("30D");

  const chartData = CHART_DATA[period];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 4 }}>{label}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.cyan, fontWeight: 700 }}>
            <span>Enrollments:</span>
            <span>{payload[0].value}</span>
          </div>
          {payload[1] && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4ade80", marginTop: 2 }}>
              <span>Completions:</span>
              <span>{payload[1].value}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <main style={{ flex: 1, padding: "28px 32px 40px", fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: 24, background: C.bg }}>
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, flexShrink: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
            <span>Admin Console</span>
            <ChevronRight size={12} style={{ opacity: 0.5 }} />
            <span style={{ color: C.cyan, fontWeight: 600 }}>Overview</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
            Operational Overview
          </h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
            Real-time medical learning statistics, enrollment throughput, and platform health.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => onNavigate && onNavigate("Access")}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
          >
            <Lock size={14} style={{ color: C.cyan }} /> Review Access
          </button>
          <button
            onClick={() => {
              if (onCreateCourse) onCreateCourse();
              else if (onNavigate) onNavigate("Courses");
            }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
          >
            <Plus size={14} /> New Course
          </button>
        </div>
      </div>

      {/* ─── Metric KPI Cards ───────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, flexShrink: 0 }}>
        {KPI_DATA.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${C.cyan}44`;
                e.currentTarget.style.boxShadow = `0 4px 20px ${C.cyan}0f`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: "0.04em" }}>{kpi.label.toUpperCase()}</span>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `${kpi.color}15`, border: `1px solid ${kpi.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} style={{ color: kpi.color }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.text, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {kpi.value}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: kpi.positive ? "#4ade80" : "#fbbf24", background: kpi.positive ? "rgba(74,222,128,0.1)" : "rgba(251,191,36,0.1)", padding: "2px 6px", borderRadius: 4 }}>
                  {kpi.change}
                </span>
              </div>

              <div style={{ fontSize: 12, color: "rgba(169,181,199,0.5)", marginTop: 8 }}>
                {kpi.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Interactive Recharts Chart & Activity Grid ──────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start", flexShrink: 0 }} className="max-lg:grid-cols-1">
        {/* Recharts Area Chart Card */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "22px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Enrollment Throughput & Progress</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Visual representation of student enrollments vs course completions.</div>
            </div>

            {/* Period Switcher */}
            <div style={{ display: "flex", gap: 3, background: C.elevated, borderRadius: 8, padding: 3, border: `1px solid ${C.border}` }}>
              {(["7D", "30D", "90D"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: period === p ? C.cyan + "22" : "transparent",
                    color: period === p ? C.cyan : C.muted,
                    fontSize: 12,
                    fontWeight: period === p ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Area Container */}
          <div style={{ width: "100%", height: 230 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanEnrollmentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.cyan} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={C.cyan} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="greenCompletionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="period" stroke="rgba(169,181,199,0.4)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(169,181,199,0.4)" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="enrollments"
                  stroke={C.cyan}
                  strokeWidth={2.5}
                  fill="url(#cyanEnrollmentGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="completions"
                  stroke="#4ade80"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="url(#greenCompletionGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 18, marginTop: 12, fontSize: 11 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.cyan }} />
              <span style={{ color: C.muted }}>New Enrollments</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ color: C.muted }}>Completed Lessons</span>
            </div>
          </div>
        </div>

        {/* Live Activity Stream */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "22px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Live Activity Stream</div>
            <span style={{ fontSize: 11, color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>LIVE</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {RECENT_ACTIVITIES.map((act, i) => {
              const Icon = act.icon;
              const isLast = i === RECENT_ACTIVITIES.length - 1;
              return (
                <div key={i} style={{ display: "flex", gap: 12, paddingBottom: isLast ? 0 : 12, borderBottom: isLast ? "none" : `1px solid ${C.border}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <Icon size={14} style={{ color: act.badgeColor }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{act.title}</div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4, marginTop: 2 }}>{act.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <Clock size={10} style={{ color: "rgba(169,181,199,0.4)" }} />
                      <span style={{ fontSize: 10, color: "rgba(169,181,199,0.5)" }}>{act.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Top Performing Courses ──────────────────────────────────────── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: `1px solid ${C.border}` }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Course Performance & Throughput</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Academic content enrollment metrics and completion benchmarks.</div>
          </div>
          <button
            onClick={() => onNavigate && onNavigate("Courses")}
            style={{ fontSize: 12, color: C.cyan, fontWeight: 600, background: "transparent", border: "none", cursor: "pointer" }}
          >
            View all courses →
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "12px 22px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Course</th>
                <th style={{ padding: "12px 22px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "12px 22px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Enrolled Students</th>
                <th style={{ padding: "12px 22px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Completion Benchmark</th>
                <th style={{ padding: "12px 22px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {TOP_COURSES.map((c, i) => {
                const st = STATUS_BADGES[c.status] ?? { color: C.muted, bg: "rgba(255,255,255,0.05)" };
                return (
                  <tr
                    key={c.name}
                    onClick={() => {
                      if (onViewCourse) onViewCourse(i);
                      else if (onNavigate) onNavigate("Courses");
                    }}
                    style={{ borderBottom: i < TOP_COURSES.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.15s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.elevated, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <BookOpen size={14} style={{ color: C.cyan }} />
                        </div>
                        <span style={{ fontWeight: 600, color: C.text }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 22px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 12, background: st.bg, color: st.color, fontSize: 11, fontWeight: 600 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.color }} />
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 22px", color: C.text, fontWeight: 500 }}>
                      {c.students} students
                    </td>
                    <td style={{ padding: "14px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 160 }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                          <div style={{ width: `${c.completionRate}%`, height: "100%", background: C.cyan, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>{c.completionRate}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 22px", color: C.muted, fontSize: 12 }}>
                      {c.updated}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Quick Operations Bar ────────────────────────────────────────── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          QUICK OPERATIONS
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "Create Course", icon: Plus, action: () => onCreateCourse ? onCreateCourse() : onNavigate?.("Courses") },
            { label: "Create Revision", icon: RefreshCw, action: () => onNavigate?.("Revisions") },
            { label: "Create Quiz", icon: ClipboardCheck, action: () => onNavigate?.("Quizzes") },
            { label: "Create Coupon", icon: Tag, action: () => onNavigate?.("Coupons") },
            { label: "Verify Certificate", icon: Award, action: () => onNavigate?.("Certificates") },
            { label: "Security Logs", icon: ShieldCheck, action: () => onNavigate?.("Audit Logs") },
          ].map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={action}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 7, border: `1px solid ${C.border}`, background: C.elevated, color: C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.text;
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.muted;
                e.currentTarget.style.borderColor = C.border;
              }}
            >
              <Icon size={13} style={{ color: C.cyan }} /> {label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
