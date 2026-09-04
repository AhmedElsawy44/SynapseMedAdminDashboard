import React, { useState, useMemo } from "react";
import {
  Shield, Search, ChevronRight, ChevronLeft, Filter,
  Eye, Calendar, Clock, Terminal, AlertTriangle, CheckCircle,
  FileCode, X, ArrowRight, UserCheck, KeyRound
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

export type AuditActionType =
  | "GRANT_ACCESS"
  | "REVOKE_ACCESS"
  | "PUBLISH_COURSE"
  | "REVOKE_CERTIFICATE"
  | "CREATE_COUPON"
  | "UPDATE_QUIZ"
  | "SECURITY_LOGIN";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  adminRole: string;
  action: AuditActionType;
  targetEntity: string;
  ipAddress: string;
  status: "Success" | "Warning" | "Critical";
  details: {
    description: string;
    before?: Record<string, any>;
    after?: Record<string, any>;
  };
}

const INITIAL_LOGS: AuditLogEntry[] = [
  {
    id: "log-9901",
    timestamp: "04 Sep 2026, 03:45:12 AM",
    adminName: "Ahmed Admin",
    adminRole: "Super Admin",
    action: "GRANT_ACCESS",
    targetEntity: "Ahmed Hassan → Advanced Cardiology",
    ipAddress: "197.34.112.50",
    status: "Success",
    details: {
      description: "Direct course access granted manually to student Ahmed Hassan.",
      before: { accessStatus: "None" },
      after: { accessStatus: "Active", course: "Advanced Cardiology", validUntil: "Unlimited" },
    },
  },
  {
    id: "log-9902",
    timestamp: "04 Sep 2026, 02:18:40 AM",
    adminName: "Dr. Mostafa Omar",
    adminRole: "Academic Director",
    action: "PUBLISH_COURSE",
    targetEntity: "Course: Clinical Pharmacology",
    ipAddress: "41.233.10.88",
    status: "Success",
    details: {
      description: "Course transition from In Review to Published state.",
      before: { status: "In Review", publishedLectures: 14 },
      after: { status: "Published", publishedLectures: 16 },
    },
  },
  {
    id: "log-9903",
    timestamp: "03 Sep 2026, 11:20:05 PM",
    adminName: "Ahmed Admin",
    adminRole: "Super Admin",
    action: "REVOKE_CERTIFICATE",
    targetEntity: "Cert: CERT-2026-000188 (Youssef Ali)",
    ipAddress: "197.34.112.50",
    status: "Critical",
    details: {
      description: "Certificate invalidated following disciplinary review and exam anomaly investigation.",
      before: { status: "Issued", qrVerification: "Active" },
      after: { status: "Revoked", reason: "Student course access revoked due to policy violation." },
    },
  },
  {
    id: "log-9904",
    timestamp: "03 Sep 2026, 09:12:33 PM",
    adminName: "Sara Kamal",
    adminRole: "Operations Lead",
    action: "CREATE_COUPON",
    targetEntity: "Coupon: SYNAPSE-MED-FALL26",
    ipAddress: "156.204.89.12",
    status: "Success",
    details: {
      description: "Generated 25% discount coupon for medical interns.",
      after: { code: "SYNAPSE-MED-FALL26", discountPercentage: 25, usageLimit: 200, expiresAt: "30 Oct 2026" },
    },
  },
  {
    id: "log-9905",
    timestamp: "03 Sep 2026, 06:40:19 PM",
    adminName: "Dr. Mostafa Omar",
    adminRole: "Academic Director",
    action: "UPDATE_QUIZ",
    targetEntity: "Quiz: Cardiology Final Assessment",
    ipAddress: "41.233.10.88",
    status: "Success",
    details: {
      description: "Added 5 new clinical scenario questions and updated passing threshold to 75%.",
      before: { questionCount: 25, passingScore: 70 },
      after: { questionCount: 30, passingScore: 75 },
    },
  },
  {
    id: "log-9906",
    timestamp: "03 Sep 2026, 04:15:02 PM",
    adminName: "System Guardian",
    adminRole: "Automated Policy",
    action: "REVOKE_ACCESS",
    targetEntity: "Student SM-0046 (Ahmed Yousef)",
    ipAddress: "127.0.0.1 (Internal Worker)",
    status: "Warning",
    details: {
      description: "Automatic suspension: Concurrency limit violated (> 3 concurrent active devices detected).",
      before: { studentStatus: "Active", concurrentDevices: 4 },
      after: { studentStatus: "Suspended", lockReason: "Device concurrency threshold reached." },
    },
  },
];

const ACTION_CONFIG: Record<AuditActionType, { label: string; color: string; bg: string }> = {
  GRANT_ACCESS:       { label: "GRANT ACCESS",       color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  REVOKE_ACCESS:      { label: "REVOKE ACCESS",      color: "#f87171", bg: "rgba(248,113,113,0.1)" },
  PUBLISH_COURSE:     { label: "PUBLISH COURSE",     color: "#35E0DF", bg: "rgba(53,224,223,0.1)" },
  REVOKE_CERTIFICATE: { label: "REVOKE CERT",        color: "#f87171", bg: "rgba(248,113,113,0.15)" },
  CREATE_COUPON:      { label: "CREATE COUPON",      color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  UPDATE_QUIZ:        { label: "UPDATE QUIZ",        color: "#818cf8", bg: "rgba(129,140,248,0.1)" },
  SECURITY_LOGIN:     { label: "LOGIN",              color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
};

export default function AuditLogsPage() {
  const [logs] = useState<AuditLogEntry[]>(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("ALL");
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((item) => {
      const matchSearch =
        item.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.action.toLowerCase().includes(searchQuery.toLowerCase());

      const matchAction = actionFilter === "ALL" || item.action === actionFilter;

      return matchSearch && matchAction;
    });
  }, [logs, searchQuery, actionFilter]);

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* ─── Breadcrumb & Title ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Insights</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text, fontWeight: 600 }}>Audit Logs</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Security & Audit Logs</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
              Cryptographically verified, immutable ledger of all administrative interventions, course status changes, and access permissions.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(53,224,223,0.06)", border: `1px solid ${C.cyan}33`, padding: "6px 14px", borderRadius: 8 }}>
            <Shield size={15} style={{ color: C.cyan }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.cyan }}>Tamper-evident Ledger Active</span>
          </div>
        </div>
      </div>

      {/* ─── Metric Cards ───────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: "0.04em" }}>TOTAL LOGGED EVENTS</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: C.text, marginTop: 6 }}>1,428</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.cyan, letterSpacing: "0.04em" }}>ADMIN ACTIONS TODAY</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: C.cyan, marginTop: 6 }}>34</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fbbf24", letterSpacing: "0.04em" }}>SECURITY ALERTS / REVOCATIONS</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#fbbf24", marginTop: 6 }}>3</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: "0.04em" }}>AUTHORIZED ADMINS</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: C.text, marginTop: 6 }}>4</div>
        </div>
      </div>

      {/* ─── Search and Filters ─────────────────────────────────────────── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", marginBottom: 20, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 280px", display: "flex", alignItems: "center" }}>
          <Search size={15} style={{ position: "absolute", insetInlineStart: 12, color: C.muted, pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Search by admin, entity, action, or IP address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none" }}
          />
        </div>

        <div style={{ minWidth: 200 }}>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", cursor: "pointer" }}
          >
            <option value="ALL">All Action Types</option>
            <option value="GRANT_ACCESS">Grant Access</option>
            <option value="REVOKE_ACCESS">Revoke Access</option>
            <option value="PUBLISH_COURSE">Publish Course</option>
            <option value="REVOKE_CERTIFICATE">Revoke Certificate</option>
            <option value="CREATE_COUPON">Create Coupon</option>
            <option value="UPDATE_QUIZ">Update Quiz</option>
          </select>
        </div>
      </div>

      {/* ─── Table ──────────────────────────────────────────────────────── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Timestamp</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Action</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Target Entity</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>IP Address</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "right" }}>Inspect</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "48px 20px", textAlign: "center", color: C.muted }}>
                    No audit records match your current criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((item, index) => {
                  const isLast = index === filteredLogs.length - 1;
                  const cfg = ACTION_CONFIG[item.action] ?? { label: item.action, color: C.muted, bg: "rgba(255,255,255,0.05)" };
                  return (
                    <tr
                      key={item.id}
                      style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}`, transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "16px 20px", color: C.muted, fontSize: 12, whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Clock size={12} style={{ opacity: 0.6 }} />
                          {item.timestamp}
                        </div>
                      </td>

                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 600, color: C.text }}>{item.adminName}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>{item.adminRole}</div>
                      </td>

                      <td style={{ padding: "16px 20px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 6, background: cfg.bg, border: `1px solid ${cfg.color}33`, fontSize: 11, fontWeight: 700, color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </td>

                      <td style={{ padding: "16px 20px", color: C.text, fontWeight: 500, maxWidth: 300 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.targetEntity}
                        </div>
                      </td>

                      <td style={{ padding: "16px 20px", color: C.muted, fontSize: 12, fontFamily: "monospace" }}>
                        {item.ipAddress}
                      </td>

                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          onClick={() => setSelectedLog(item)}
                          style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.elevated, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                        >
                          <Eye size={13} /> Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Inspection Drawer / Modal ──────────────────────────────────── */}
      {selectedLog && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,18,37,0.85)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, width: "100%", maxWidth: 640, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Terminal size={18} style={{ color: C.cyan }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Audit Event Payload — {selectedLog.id}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{selectedLog.timestamp} • IP {selectedLog.ipAddress}</div>
                </div>
              </div>
              <button onClick={() => setSelectedLog(null)} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 18, maxHeight: "70vh", overflowY: "auto" }}>
              <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Action Summary</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{selectedLog.details.description}</div>
              </div>

              {/* Before vs After Diff Section */}
              <div style={{ display: "grid", gridTemplateColumns: selectedLog.details.before ? "1fr 1fr" : "1fr", gap: 14 }}>
                {selectedLog.details.before && (
                  <div style={{ background: "rgba(248,113,113,0.04)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#f87171", textTransform: "uppercase", marginBottom: 8 }}>State Before Action</div>
                    <pre style={{ margin: 0, fontSize: 11, fontFamily: "monospace", color: C.text, whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(selectedLog.details.before, null, 2)}
                    </pre>
                  </div>
                )}
                {selectedLog.details.after && (
                  <div style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#4ade80", textTransform: "uppercase", marginBottom: 8 }}>State After Action</div>
                    <pre style={{ margin: 0, fontSize: 11, fontFamily: "monospace", color: C.text, whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(selectedLog.details.after, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 24px", borderTop: `1px solid ${C.border}`, background: C.surface }}>
              <button
                onClick={() => setSelectedLog(null)}
                style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.elevated, color: C.text, fontSize: 13, cursor: "pointer", fontWeight: 600 }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
