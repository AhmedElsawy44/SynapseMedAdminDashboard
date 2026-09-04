import React, { useState, useRef, useEffect } from "react";
import {
  Lock, Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Eye, AlertCircle, Plus, BookOpen, RefreshCw,
  Check, X, Clock, ShieldAlert, Key, UserCheck, Calendar
} from "lucide-react";

export type AccessStatus = "Active" | "Expired" | "Revoked" | "Pending";
export type AccessTargetType = "Course" | "Revision";

export interface AccessRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  targetType: AccessTargetType;
  target: string;
  course?: string;
  status: AccessStatus;
  granted: string;
  expiresAt: string | null;
  grantedBy: string;
  revokedAt?: string;
  revocationReason?: string;
}

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

const STATUS_CONFIG: Record<AccessStatus, { color: string; bg: string }> = {
  Active:   { color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  Pending:  { color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  Expired:  { color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  Revoked:  { color: "#f87171", bg: "rgba(248,113,113,0.12)" },
};

export const INITIAL_ACCESS_RECORDS: AccessRecord[] = [
  {
    id: "ACC-091",
    studentId: "SM-10492",
    studentName: "Dr. Ahmed Mansour",
    studentEmail: "ahmed.mansour@kasralainy.edu.eg",
    targetType: "Course",
    target: "Advanced Clinical Cardiology",
    status: "Active",
    granted: "Aug 12, 2026",
    expiresAt: "Feb 12, 2027",
    grantedBy: "Super Admin (Dr. Mostafa)",
  },
  {
    id: "ACC-092",
    studentId: "SM-10884",
    studentName: "Dr. Nourhan El-Sayed",
    studentEmail: "nourhan.elsayed@kasralainy.edu.eg",
    targetType: "Revision",
    target: "Cardiology Rapid Review & ECG Masterclass 2026",
    course: "Advanced Clinical Cardiology",
    status: "Active",
    granted: "Aug 20, 2026",
    expiresAt: "Oct 31, 2026",
    grantedBy: "Admin System",
  },
  {
    id: "ACC-093",
    studentId: "SM-11204",
    studentName: "Dr. Omar Khaled",
    studentEmail: "omar.khaled@med.asu.edu.eg",
    targetType: "Course",
    target: "Comprehensive Clinical Neurology",
    status: "Active",
    granted: "Jul 15, 2026",
    expiresAt: "Jan 15, 2027",
    grantedBy: "Super Admin (Dr. Mostafa)",
  },
  {
    id: "ACC-094",
    studentId: "SM-10118",
    studentName: "Dr. Youssef El-Hawary",
    studentEmail: "youssef.elhawary@alexmed.edu.eg",
    targetType: "Course",
    target: "Pediatrics Board Preparation",
    status: "Revoked",
    granted: "May 10, 2026",
    expiresAt: null,
    grantedBy: "Super Admin (Dr. Mostafa)",
    revokedAt: "Aug 02, 2026",
    revocationReason: "Exceeded concurrency device threshold (4 hardware devices detected).",
  },
  {
    id: "ACC-095",
    studentId: "SM-11559",
    studentName: "Dr. Salma Tarek",
    studentEmail: "salma.tarek@mansmed.edu.eg",
    targetType: "Revision",
    target: "Obstetric Emergencies & Fetal Heart Tracing Review",
    course: "Obstetrics & Gynecology Clinical Essentials",
    status: "Expired",
    granted: "May 01, 2026",
    expiresAt: "Aug 01, 2026",
    grantedBy: "Admin System",
  },
  {
    id: "ACC-096",
    studentId: "SM-12001",
    studentName: "Dr. Karim Adel",
    studentEmail: "karim.adel@kasralainy.edu.eg",
    targetType: "Course",
    target: "General Surgery Mastery Series",
    status: "Active",
    granted: "Aug 25, 2026",
    expiresAt: "Feb 25, 2027",
    grantedBy: "Admin System",
  },
];

export default function AccessPage({
  rows = INITIAL_ACCESS_RECORDS,
  onRevoke,
  onView,
  onGrant,
}: {
  rows?: AccessRecord[];
  onRevoke: (id: string, reason: string) => void;
  onView: (id: string) => void;
  onGrant: () => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AccessStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<AccessTargetType | "All">("All");
  const [page, setPage] = useState(1);
  const [revokingRec, setRevokingRec] = useState<AccessRecord | null>(null);
  const [revokeReason, setRevokeReason] = useState("");

  const filtered = rows.filter((r) => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (typeFilter !== "All" && r.targetType !== typeFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.studentName.toLowerCase().includes(q) ||
      r.studentEmail.toLowerCase().includes(q) ||
      r.studentId.toLowerCase().includes(q) ||
      r.target.toLowerCase().includes(q)
    );
  });

  const PER_PAGE = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function confirmRevocation() {
    if (!revokingRec || !revokeReason.trim()) return;
    onRevoke(revokingRec.id, revokeReason.trim());
    setRevokingRec(null);
    setRevokeReason("");
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Access Control</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Student Entitlements & Access</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
              Enforce access permissions, review expiry windows, and manage mandatory revocation reasons.
            </p>
          </div>
          <button
            onClick={onGrant}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
              borderRadius: 8, border: "none", background: C.cyan, color: C.bg,
              fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Grant Access
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Active Entitlements</span>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#4ade80", marginTop: 4 }}>
            {rows.filter(r => r.status === "Active").length}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Valid DRM session tokens</span>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Course Access Grants</span>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.cyan, marginTop: 4 }}>
            {rows.filter(r => r.targetType === "Course").length}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Full curriculum enrollment</span>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Revision Access Grants</span>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#818cf8", marginTop: 4 }}>
            {rows.filter(r => r.targetType === "Revision").length}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Intensive exam prep passes</span>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Revoked / Flagged</span>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#f87171", marginTop: 4 }}>
            {rows.filter(r => r.status === "Revoked").length}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Security audit sanctions</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 420 }}>
          <Search size={15} style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: C.muted, pointerEvents: "none" }} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search candidate name, email, or course..."
            style={{
              width: "100%", height: 40, background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 8, paddingInlineStart: 38, paddingInlineEnd: 12, fontSize: 13,
              color: C.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {(["All", "Active", "Expired", "Revoked"] as const).map((st) => {
              const isSel = statusFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => { setStatusFilter(st); setPage(1); }}
                  style={{
                    padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: isSel ? 700 : 500,
                    border: `1px solid ${isSel ? C.cyan : C.border}`,
                    background: isSel ? "rgba(53,224,223,0.12)" : "transparent",
                    color: isSel ? C.cyan : C.muted, cursor: "pointer", fontFamily: "inherit"
                  }}
                >
                  {st}
                </button>
              );
            })}
          </div>

          <div style={{ width: 1, height: 20, background: C.border }} />

          <div style={{ display: "flex", gap: 4 }}>
            {(["All", "Course", "Revision"] as const).map((tp) => {
              const isSel = typeFilter === tp;
              return (
                <button
                  key={tp}
                  onClick={() => { setTypeFilter(tp); setPage(1); }}
                  style={{
                    padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: isSel ? 700 : 500,
                    border: `1px solid ${isSel ? `${C.cyan}55` : C.border}`,
                    background: isSel ? `${C.cyan}18` : "transparent",
                    color: isSel ? C.cyan : C.muted, cursor: "pointer", fontFamily: "inherit"
                  }}
                >
                  {tp}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 850 }}>
          <thead>
            <tr style={{ background: C.elevated, height: 44 }}>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Candidate</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Target Entitlement</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Type</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Expiry</th>
              <th style={{ padding: "0 20px", textAlign: "end", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 48, textAlign: "center", color: C.muted, fontSize: 14 }}>
                  No entitlement records match your current filter.
                </td>
              </tr>
            ) : (
              paged.map((rec) => {
                const cfg = STATUS_CONFIG[rec.status];
                return (
                  <tr key={rec.id} style={{ height: 64, borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "0 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(53,224,223,0.12)", border: `1px solid ${C.cyan}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.cyan, flexShrink: 0 }}>
                          {rec.studentName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{rec.studentName}</div>
                          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{rec.studentEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "0 20px" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{rec.target}</div>
                      {rec.course && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{rec.course}</div>}
                    </td>
                    <td style={{ padding: "0 20px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: rec.targetType === "Course" ? C.cyan : "#818cf8", background: rec.targetType === "Course" ? "rgba(53,224,223,0.1)" : "rgba(129,140,248,0.1)", border: `1px solid ${rec.targetType === "Course" ? C.cyan + "33" : "rgba(129,140,248,0.3)"}`, borderRadius: 20, padding: "2px 8px" }}>
                        {rec.targetType === "Course" ? <BookOpen size={10} /> : <RefreshCw size={10} />}
                        {rec.targetType}
                      </span>
                    </td>
                    <td style={{ padding: "0 20px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg }}>
                        {rec.status}
                      </span>
                    </td>
                    <td style={{ padding: "0 20px", fontSize: 12, color: C.muted }}>
                      {rec.expiresAt ?? "Unlimited"}
                    </td>
                    <td style={{ padding: "0 20px", textAlign: "end" }}>
                      <div style={{ display: "inline-flex", gap: 8 }}>
                        <button
                          onClick={() => onView(rec.id)}
                          style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                        >
                          View
                        </button>
                        {rec.status === "Active" && (
                          <button
                            onClick={() => { setRevokingRec(rec); setRevokeReason(""); }}
                            style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Revocation Modal with Mandatory Reason (Backend contract) */}
      {revokingRec && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(7,18,37,0.8)" }}>
          <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, width: "90%", maxWidth: 460, boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#f87171", marginBottom: 12 }}>
              <ShieldAlert size={22} />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Revoke Entitlement</h3>
            </div>
            <p style={{ fontSize: 13, color: C.muted, margin: "0 0 16px", lineHeight: 1.6 }}>
              You are revoking access to <strong>{revokingRec.target}</strong> for <strong>{revokingRec.studentName}</strong> ({revokingRec.studentId}).
              Active DRM video playback tokens will immediately terminate.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>
                Revocation Reason <span style={{ color: "#f87171" }}>*</span>
              </label>
              <textarea
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="Enter mandatory audit reason (e.g. device policy breach, refund, academic suspension)..."
                rows={3}
                style={{
                  width: "100%", background: C.surface, border: `1px solid ${revokeReason.trim() ? `${C.cyan}55` : C.border}`,
                  borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, outline: "none",
                  fontFamily: "inherit", boxSizing: "border-box", resize: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setRevokingRec(null)}
                style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmRevocation}
                disabled={!revokeReason.trim()}
                style={{
                  padding: "8px 18px", borderRadius: 8, border: "none",
                  background: revokeReason.trim() ? "#f87171" : "rgba(248,113,113,0.3)",
                  color: "#fff", fontSize: 13, fontWeight: 700,
                  cursor: revokeReason.trim() ? "pointer" : "not-allowed", fontFamily: "inherit"
                }}
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ─── Access Details Page ─────────────────────────────────────────────────────────
export function AccessDetailsPage({
  record,
  onBack,
  onRevoke,
}: {
  record: AccessRecord;
  onBack: () => void;
  onRevoke: (id: string, reason: string) => void;
}) {
  const cfg = STATUS_CONFIG[record.status];
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Access Control</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>{record.id}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>Entitlement: {record.target}</h1>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg }}>
                {record.status}
              </span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Granted to {record.studentName} ({record.studentId})</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onBack} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Back</button>
            {record.status === "Active" && (
              <button onClick={() => setShowRevokeModal(true)} style={{ padding: "8px 18px", borderRadius: 8, background: "rgba(248,113,113,0.15)", border: "1px solid #f87171", color: "#f87171", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Revoke Entitlement
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Candidate Credentials</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Full Name</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginTop: 2 }}>{record.studentName}</div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Email Address</span>
              <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>{record.studentEmail}</div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Student ID</span>
              <div style={{ fontSize: 13, color: C.cyan, fontWeight: 600, marginTop: 2 }}>{record.studentId}</div>
            </div>
          </div>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Audit & Entitlement Details</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Grant Date</span>
              <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>{record.granted} (by {record.grantedBy})</div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Expiration Date</span>
              <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>{record.expiresAt ?? "No expiration configured"}</div>
            </div>
            {record.revokedAt && (
              <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: 12 }}>
                <span style={{ fontSize: 11, color: "#f87171", fontWeight: 700, textTransform: "uppercase" }}>Revocation Audit Record</span>
                <div style={{ fontSize: 12, color: C.text, marginTop: 4 }}>Date: {record.revokedAt}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Reason: {record.revocationReason}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Grant Access Page ───────────────────────────────────────────────────────────
export function GrantAccessPage({
  onBack,
  onGrant,
}: {
  onBack: () => void;
  onGrant: (data: Partial<AccessRecord>) => void;
}) {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [targetType, setTargetType] = useState<AccessTargetType>("Course");
  const [target, setTarget] = useState("Advanced Clinical Cardiology");
  const [expiryDate, setExpiryDate] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit() {
    if (!studentName.trim() || !studentEmail.trim()) return;
    setSaved(true);
    setTimeout(() => {
      onGrant({
        studentId: studentId.trim() || `SM-${Math.floor(10000 + Math.random() * 90000)}`,
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim(),
        targetType,
        target,
        status: "Active",
        granted: "Just now",
        expiresAt: expiryDate || null,
        grantedBy: "Super Admin",
      });
      onBack();
    }, 600);
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Access Control</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Grant Entitlement</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>Grant Student Access</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Issue direct course or revision licenses for medical candidates.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onBack} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={!studentName.trim() || !studentEmail.trim()}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 18px",
                borderRadius: 8, border: "none", background: saved ? "#4ade80" : C.cyan,
                color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              {saved ? <Check size={14} /> : null}
              {saved ? "Granted!" : "Confirm Grant"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28, maxWidth: 680 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Candidate Name *</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Dr. Tarek Radwan"
              style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Candidate Email *</label>
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="e.g. tarek.radwan@kasralainy.edu.eg"
              style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Entitlement Target Type</label>
          <div style={{ display: "flex", gap: 10 }}>
            {(["Course", "Revision"] as AccessTargetType[]).map((tp) => (
              <button
                key={tp}
                type="button"
                onClick={() => setTargetType(tp)}
                style={{
                  padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: `1px solid ${targetType === tp ? C.cyan : C.border}`,
                  background: targetType === tp ? "rgba(53,224,223,0.12)" : "transparent",
                  color: targetType === tp ? C.cyan : C.muted, cursor: "pointer", fontFamily: "inherit"
                }}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Target Curriculum Title</label>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Expiration Date (Optional)</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
          />
        </div>
      </div>
    </main>
  );
}
