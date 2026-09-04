import React, { useState, useMemo } from "react";
import {
  Award, Search, ChevronRight, ChevronLeft, Check, AlertCircle,
  Copy, ExternalLink, QrCode, X, ShieldAlert, FileText, Download,
  SlidersHorizontal, CheckCircle2, RotateCcw
} from "lucide-react";

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

export interface CertificateItem {
  id: string;
  code: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  issueDate: string;
  status: "Issued" | "Revoked";
  revocationReason?: string;
  revokedAt?: string;
  scorePercentage?: number;
}

const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-01",
    code: "CERT-2026-000184",
    studentName: "Ahmed Hassan",
    studentEmail: "ahmed.hassan@example.com",
    courseTitle: "Advanced Cardiology",
    issueDate: "18 Mar 2026",
    status: "Issued",
    scorePercentage: 94,
  },
  {
    id: "cert-02",
    code: "CERT-2026-000185",
    studentName: "Mariam Adel",
    studentEmail: "mariam.adel@example.com",
    courseTitle: "Emergency Medicine Essentials",
    issueDate: "20 Mar 2026",
    status: "Issued",
    scorePercentage: 88,
  },
  {
    id: "cert-03",
    code: "CERT-2026-000186",
    studentName: "Omar Khaled",
    studentEmail: "omar.khaled@example.com",
    courseTitle: "Internal Medicine Review",
    issueDate: "21 Mar 2026",
    status: "Issued",
    scorePercentage: 91,
  },
  {
    id: "cert-04",
    code: "CERT-2026-000187",
    studentName: "Sara Mohamed",
    studentEmail: "sara.mohamed@example.com",
    courseTitle: "Clinical Pharmacology",
    issueDate: "22 Mar 2026",
    status: "Issued",
    scorePercentage: 96,
  },
  {
    id: "cert-05",
    code: "CERT-2026-000188",
    studentName: "Youssef Ali",
    studentEmail: "youssef.ali@example.com",
    courseTitle: "Neurology Board Review",
    issueDate: "25 Mar 2026",
    status: "Revoked",
    revocationReason: "Student course access revoked due to policy violation.",
    revokedAt: "26 Mar 2026",
    scorePercentage: 72,
  },
];

const COURSES_FILTER_OPTIONS = [
  "All Courses",
  "Advanced Cardiology",
  "Emergency Medicine Essentials",
  "Internal Medicine Review",
  "Clinical Pharmacology",
  "Neurology Board Review",
];

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Issued" | "Revoked">("All");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal states
  const [verifyCert, setVerifyCert] = useState<CertificateItem | null>(null);
  const [revokeCert, setRevokeCert] = useState<CertificateItem | null>(null);
  const [revokeReason, setRevokeReason] = useState("");
  const [isRevoking, setIsRevoking] = useState(false);

  // Copy helper
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filtered list
  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) => {
      const matchesSearch =
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      const matchesCourse = courseFilter === "All Courses" || c.courseTitle === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [certificates, searchQuery, statusFilter, courseFilter]);

  // Statistics
  const totalCount = certificates.length;
  const issuedCount = certificates.filter((c) => c.status === "Issued").length;
  const revokedCount = certificates.filter((c) => c.status === "Revoked").length;
  const latestIssued = "25 Mar 2026";

  const handleConfirmRevoke = () => {
    if (!revokeCert || !revokeReason.trim()) return;
    setIsRevoking(true);
    setTimeout(() => {
      setCertificates((prev) =>
        prev.map((item) =>
          item.id === revokeCert.id
            ? {
                ...item,
                status: "Revoked",
                revocationReason: revokeReason.trim(),
                revokedAt: "Today",
              }
            : item
        )
      );
      setIsRevoking(false);
      setRevokeCert(null);
      setRevokeReason("");
    }, 600);
  };

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* ─── Breadcrumb & Header ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text, fontWeight: 600 }}>Certificates</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Certificates</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
              Review, verify, and manage issued learning certificates and QR verification tokens.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Summary Cards ──────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: "0.04em" }}>TOTAL CERTIFICATES</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: C.text, marginTop: 6 }}>{totalCount}</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4ade80", letterSpacing: "0.04em" }}>ISSUED</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#4ade80", marginTop: 6 }}>{issuedCount}</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#f87171", letterSpacing: "0.04em" }}>REVOKED</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#f87171", marginTop: 6 }}>{revokedCount}</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: "0.04em" }}>LATEST ISSUED</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginTop: 8 }}>{latestIssued}</div>
        </div>
      </div>

      {/* ─── Search & Filters Bar ───────────────────────────────────────── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", marginBottom: 20, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 280px", display: "flex", alignItems: "center" }}>
          <Search size={15} style={{ position: "absolute", insetInlineStart: 12, color: C.muted, pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Search certificate, student, or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ position: "absolute", insetInlineEnd: 10, background: "transparent", border: "none", color: C.muted, cursor: "pointer", padding: 2 }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.elevated, padding: 4, borderRadius: 8, border: `1px solid ${C.border}` }}>
          {(["All", "Issued", "Revoked"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: statusFilter === status ? C.cyan + "22" : "transparent", color: statusFilter === status ? C.cyan : C.muted, fontSize: 12, fontWeight: statusFilter === status ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Course Filter Dropdown */}
        <div style={{ minWidth: 200 }}>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            {COURSES_FILTER_OPTIONS.map((c) => (
              <option key={c} value={c} style={{ background: C.elevated, color: C.text }}>{c}</option>
            ))}
          </select>
        </div>

        {/* Reset button if active */}
        {(searchQuery || statusFilter !== "All" || courseFilter !== "All Courses") && (
          <button
            onClick={() => { setSearchQuery(""); setStatusFilter("All"); setCourseFilter("All Courses"); }}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 12, cursor: "pointer" }}
          >
            <RotateCcw size={12} /> Clear Filters
          </button>
        )}
      </div>

      {/* ─── Certificates Table ─────────────────────────────────────────── */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Certificate</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Student</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Course</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Issued</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "48px 20px", textAlign: "center", color: C.muted }}>
                    <div style={{ display: "inline-flex", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.03)", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                      <Award size={22} style={{ opacity: 0.4 }} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>No certificates match your current filters.</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>Try clearing your search terms or filter selections.</div>
                  </td>
                </tr>
              ) : (
                filteredCertificates.map((cert, index) => {
                  const isLast = index === filteredCertificates.length - 1;
                  const isIssued = cert.status === "Issued";
                  return (
                    <tr
                      key={cert.id}
                      style={{
                        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Certificate Code Cell */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: C.cyan, letterSpacing: "0.04em" }}>
                            {cert.code}
                          </span>
                          <button
                            onClick={() => handleCopy(cert.code)}
                            title="Copy Certificate Code"
                            style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", padding: 2, display: "flex" }}
                          >
                            {copiedCode === cert.code ? <Check size={13} style={{ color: "#4ade80" }} /> : <Copy size={13} />}
                          </button>
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(169,181,199,0.5)", marginTop: 2 }}>Certificate</div>
                      </td>

                      {/* Student Cell */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 600, color: C.text }}>{cert.studentName}</div>
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{cert.studentEmail}</div>
                      </td>

                      {/* Course Cell */}
                      <td style={{ padding: "16px 20px", color: C.text, fontWeight: 500 }}>
                        {cert.courseTitle}
                        {cert.scorePercentage && (
                          <span style={{ marginInlineStart: 8, fontSize: 11, color: C.muted }}>
                            ({cert.scorePercentage}% Score)
                          </span>
                        )}
                      </td>

                      {/* Issued Date */}
                      <td style={{ padding: "16px 20px", color: C.muted, fontSize: 12 }}>
                        {cert.issueDate}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "16px 20px" }}>
                        {isIssued ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 20, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", fontSize: 12, fontWeight: 600, color: "#4ade80" }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
                            Issued
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 20, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", fontSize: 12, fontWeight: 600, color: "#f87171" }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f87171" }} />
                            Revoked
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <button
                            onClick={() => setVerifyCert(cert)}
                            title="Verify and Inspect QR Code"
                            style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.elevated, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                          >
                            <QrCode size={13} />
                            Verify
                          </button>

                          {isIssued ? (
                            <button
                              onClick={() => { setRevokeCert(cert); setRevokeReason(""); }}
                              title="Revoke Certificate"
                              style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 6, border: "1px solid rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.08)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                            >
                              <ShieldAlert size={13} />
                              Revoke
                            </button>
                          ) : (
                            <button
                              disabled
                              title="Revoked by administrator"
                              style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 6, border: "1px solid transparent", background: "transparent", color: "rgba(169,181,199,0.3)", fontSize: 12, cursor: "default" }}
                            >
                              Revoked
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

        {/* ─── Pagination ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted }}>
          <span>
            Showing 1–{filteredCertificates.length} of {certificates.length} certificates
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: "rgba(169,181,199,0.3)", cursor: "default" }}>
              <ChevronLeft size={14} />
            </button>
            <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: "rgba(169,181,199,0.3)", cursor: "default" }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Verify & QR Inspection Modal ───────────────────────────────── */}
      {verifyCert && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,18,37,0.85)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, width: "100%", maxWidth: 500, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Award size={18} style={{ color: C.cyan }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Official Certificate Verification</div>
                  <div style={{ fontSize: 11, color: C.muted }}>SYNAPSE MED Public Verification Ledger</div>
                </div>
              </div>
              <button onClick={() => setVerifyCert(null)} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", padding: 4 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
              {/* QR Preview Card */}
              <div style={{ background: "#ffffff", borderRadius: 12, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                {/* SVG QR Code Simulation */}
                <svg width="120" height="120" viewBox="0 0 100 100" fill="#071225">
                  <rect x="0" y="0" width="30" height="30" rx="4" fill="#071225" />
                  <rect x="5" y="5" width="20" height="20" rx="2" fill="#ffffff" />
                  <rect x="9" y="9" width="12" height="12" fill="#071225" />

                  <rect x="70" y="0" width="30" height="30" rx="4" fill="#071225" />
                  <rect x="75" y="5" width="20" height="20" rx="2" fill="#ffffff" />
                  <rect x="79" y="9" width="12" height="12" fill="#071225" />

                  <rect x="0" y="70" width="30" height="30" rx="4" fill="#071225" />
                  <rect x="5" y="75" width="20" height="20" rx="2" fill="#ffffff" />
                  <rect x="9" y="79" width="12" height="12" fill="#071225" />

                  <rect x="40" y="10" width="20" height="6" fill="#071225" />
                  <rect x="40" y="24" width="12" height="8" fill="#071225" />
                  <rect x="10" y="40" width="8" height="20" fill="#071225" />
                  <rect x="35" y="45" width="30" height="10" rx="2" fill="#071225" />
                  <rect x="75" y="45" width="15" height="18" fill="#071225" />
                  <rect x="42" y="70" width="18" height="20" fill="#071225" />
                  <rect x="70" y="75" width="22" height="15" fill="#071225" />
                </svg>
                <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: "#071225", letterSpacing: "0.06em" }}>
                  {verifyCert.code}
                </div>
                <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Scan to verify on public hospital portal</div>
              </div>

              {/* Certificate Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, background: C.elevated, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: C.muted }}>Student:</span>
                  <span style={{ fontWeight: 600, color: C.text }}>{verifyCert.studentName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: C.muted }}>Course:</span>
                  <span style={{ fontWeight: 600, color: C.text }}>{verifyCert.courseTitle}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: C.muted }}>Date Issued:</span>
                  <span style={{ color: C.text }}>{verifyCert.issueDate}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, alignItems: "center" }}>
                  <span style={{ color: C.muted }}>Status:</span>
                  {verifyCert.status === "Issued" ? (
                    <span style={{ color: "#4ade80", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <CheckCircle2 size={13} /> Authenticated & Valid
                    </span>
                  ) : (
                    <span style={{ color: "#f87171", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <AlertCircle size={13} /> Revoked ({verifyCert.revocationReason || "Administrative hold"})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: `1px solid ${C.border}`, background: C.surface }}>
              <button
                onClick={() => setVerifyCert(null)}
                style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer" }}
              >
                Close
              </button>
              <button
                onClick={() => handleCopy(`https://synapsemed.edu/verify/${verifyCert.code}`)}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                <ExternalLink size={14} /> Copy Verification URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Revoke Certificate Reason Modal (Backend Aligned) ───────────── */}
      {revokeCert && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,18,37,0.85)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.surface, border: "1px solid rgba(248,113,113,0.3)", borderRadius: 14, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldAlert size={20} style={{ color: "#f87171" }} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Revoke Certificate</div>
                <div style={{ fontSize: 12, color: C.muted }}>Audit compliance requires an explicit reason.</div>
              </div>
            </div>

            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: 12, fontSize: 13, color: "#fca5a5" }}>
                Revoking will immediately invalidate the QR verification link for <strong>{revokeCert.studentName}</strong> ({revokeCert.code}).
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Reason for Revocation <span style={{ color: "#f87171" }}>*</span>
                </label>
                <textarea
                  rows={3}
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder="E.g., Disciplinary action, academic dishonesty in final quiz, or refund requested."
                  style={{ width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, outline: "none", resize: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: `1px solid ${C.border}`, background: C.surface }}>
              <button
                onClick={() => { setRevokeCert(null); setRevokeReason(""); }}
                style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRevoke}
                disabled={!revokeReason.trim() || isRevoking}
                style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#f87171", color: "#ffffff", fontSize: 13, fontWeight: 700, cursor: !revokeReason.trim() || isRevoking ? "default" : "pointer", opacity: !revokeReason.trim() || isRevoking ? 0.5 : 1 }}
              >
                {isRevoking ? "Revoking..." : "Confirm Revocation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
