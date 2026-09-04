import React, { useState, useRef, useEffect } from "react";
import {
  Users, Search, SlidersHorizontal, ArrowUpDown, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, MoreHorizontal, Eye, AlertCircle, RefreshCw,
  BookOpen, ClipboardCheck, Award, Monitor, Smartphone, Shield, Key,
  X, Check, Lock, SmartphoneNfc, Phone, Mail, GraduationCap, MapPin
} from "lucide-react";

// Brand tokens
const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

export const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Active:     { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Inactive:   { color: "#A9B5C7", bg: "rgba(169,181,199,0.1)" },
  Suspended:  { color: "#fbbf24", bg: "rgba(251,191,36,0.1)"  },
  Pending:    { color: "#60a5fa", bg: "rgba(96,165,250,0.1)"  },
  Passed:     { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Failed:     { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
  Granted:    { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Revoked:    { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

export interface DeviceSession {
  id: string;
  device: string;
  os: string;
  browser: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface StudentCourseProgress {
  id: string;
  title: string;
  progressPercent: number;
  lecturesCompleted: number;
  totalLectures: number;
  state: "In Progress" | "Completed" | "Not Started";
  lastAccessed: string;
}

export interface StudentQuizActivity {
  id: string;
  title: string;
  attemptNumber: number;
  score: number;
  maxScore: number;
  result: "Passed" | "Failed";
  date: string;
}

export interface StudentCertificate {
  id: string;
  code: string;
  courseTitle: string;
  issuedAt: string;
  grade: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  nameAr?: string;
  email: string;
  phone: string;
  faculty: string;
  academicYear: string;
  status: "Active" | "Inactive" | "Suspended" | "Pending";
  enrolled: string;
  gpa: string;
  devices: DeviceSession[];
  courses: StudentCourseProgress[];
  quizzes: StudentQuizActivity[];
  certificates: StudentCertificate[];
}

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "SM-0041",
    name: "Sarah Al-Rashidi",
    nameAr: "سارة الرشيدي",
    email: "s.alrashidi@med.edu",
    phone: "+20 101 458 9921",
    faculty: "Faculty of Medicine (Kasr Al-Ainy)",
    academicYear: "Year 4 - Clinical",
    status: "Active",
    enrolled: "Jan 12, 2024",
    gpa: "3.88 / 4.0",
    devices: [
      { id: "dev-1", device: "Desktop PC", os: "Windows 11", browser: "Chrome 122", ip: "197.38.44.12", lastActive: "Active Now", isCurrent: true },
      { id: "dev-2", device: "iPhone 15 Pro", os: "iOS 17.4", browser: "Synapse App", ip: "102.188.20.1", lastActive: "3 hrs ago", isCurrent: false },
    ],
    courses: [
      { id: "c-101", title: "Advanced Clinical Cardiology", progressPercent: 85, lecturesCompleted: 17, totalLectures: 20, state: "In Progress", lastAccessed: "Today, 10:14 AM" },
      { id: "c-102", title: "Emergency Resuscitation & Trauma Care", progressPercent: 100, lecturesCompleted: 14, totalLectures: 14, state: "Completed", lastAccessed: "Yesterday" },
      { id: "c-103", title: "Diagnostic Ultrasound in Critical Care", progressPercent: 30, lecturesCompleted: 3, totalLectures: 10, state: "In Progress", lastAccessed: "Aug 28, 2026" },
    ],
    quizzes: [
      { id: "q-1", title: "ECG Arrhythmia Mastery Exam", attemptNumber: 1, score: 94, maxScore: 100, result: "Passed", date: "Aug 26, 2026" },
      { id: "q-2", title: "Emergency ACLS Protocol Check", attemptNumber: 2, score: 88, maxScore: 100, result: "Passed", date: "Aug 15, 2026" },
    ],
    certificates: [
      { id: "cert-1", code: "CERT-2026-000184", courseTitle: "Emergency Resuscitation & Trauma Care", issuedAt: "Aug 20, 2026", grade: "Honors (96%)" },
    ],
  },
  {
    id: "SM-0042",
    name: "Mohammed Khalid",
    nameAr: "محمد خالد",
    email: "m.khalid@med.edu",
    phone: "+20 114 902 3318",
    faculty: "Ain Shams Faculty of Medicine",
    academicYear: "Year 5 - Internal Medicine",
    status: "Active",
    enrolled: "Feb 3, 2024",
    gpa: "3.72 / 4.0",
    devices: [
      { id: "dev-3", device: "MacBook Air M2", os: "macOS Sonoma", browser: "Safari 17", ip: "156.204.18.90", lastActive: "Yesterday", isCurrent: false },
    ],
    courses: [
      { id: "c-101", title: "Advanced Clinical Cardiology", progressPercent: 40, lecturesCompleted: 8, totalLectures: 20, state: "In Progress", lastAccessed: "Yesterday" },
    ],
    quizzes: [
      { id: "q-3", title: "Cardio Pharmacology Quick Test", attemptNumber: 1, score: 62, maxScore: 100, result: "Failed", date: "Aug 10, 2026" },
    ],
    certificates: [],
  },
  {
    id: "SM-0043",
    name: "Fatima Hassan",
    nameAr: "فاطمة حسن",
    email: "f.hassan@med.edu",
    phone: "+20 128 334 1109",
    faculty: "Alexandria Faculty of Medicine",
    academicYear: "Year 3 - Basic Sciences",
    status: "Inactive",
    enrolled: "Dec 5, 2023",
    gpa: "3.45 / 4.0",
    devices: [
      { id: "dev-4", device: "Samsung Galaxy Tab S9", os: "Android 14", browser: "Synapse App", ip: "196.151.7.34", lastActive: "12 days ago", isCurrent: false },
    ],
    courses: [
      { id: "c-104", title: "Clinical Pharmacology Essentials", progressPercent: 15, lecturesCompleted: 2, totalLectures: 12, state: "In Progress", lastAccessed: "Aug 12, 2026" },
    ],
    quizzes: [],
    certificates: [],
  },
  {
    id: "SM-0044",
    name: "Omar Siddiqui",
    nameAr: "عمر صديقي",
    email: "o.siddiqui@med.edu",
    phone: "+20 109 881 2290",
    faculty: "Mansoura Faculty of Medicine",
    academicYear: "House Officer / Internship",
    status: "Pending",
    enrolled: "Mar 1, 2024",
    gpa: "3.90 / 4.0",
    devices: [],
    courses: [],
    quizzes: [],
    certificates: [],
  },
  {
    id: "SM-0045",
    name: "Layla Nasser",
    nameAr: "ليلى ناصر",
    email: "l.nasser@med.edu",
    phone: "+20 115 674 8832",
    faculty: "Faculty of Medicine (Kasr Al-Ainy)",
    academicYear: "Year 4 - Clinical",
    status: "Active",
    enrolled: "Nov 20, 2023",
    gpa: "3.95 / 4.0",
    devices: [
      { id: "dev-5", device: "iPad Pro 11", os: "iPadOS 17.5", browser: "Synapse App", ip: "41.45.190.22", lastActive: "1 hr ago", isCurrent: true },
      { id: "dev-6", device: "Windows Desktop", os: "Windows 11", browser: "Firefox 126", ip: "41.45.190.22", lastActive: "2 days ago", isCurrent: false },
      { id: "dev-7", device: "iPhone 14", os: "iOS 17.2", browser: "Synapse App", ip: "197.160.8.44", lastActive: "Aug 29, 2026", isCurrent: false },
    ],
    courses: [
      { id: "c-101", title: "Advanced Clinical Cardiology", progressPercent: 100, lecturesCompleted: 20, totalLectures: 20, state: "Completed", lastAccessed: "Today" },
      { id: "c-105", title: "Pediatric Advanced Life Support (PALS)", progressPercent: 70, lecturesCompleted: 7, totalLectures: 10, state: "In Progress", lastAccessed: "Today" },
    ],
    quizzes: [
      { id: "q-4", title: "Cardiology Master Board Exam", attemptNumber: 1, score: 98, maxScore: 100, result: "Passed", date: "Aug 28, 2026" },
    ],
    certificates: [
      { id: "cert-2", code: "CERT-2026-000192", courseTitle: "Advanced Clinical Cardiology", issuedAt: "Aug 29, 2026", grade: "Distinction (98%)" },
    ],
  },
  {
    id: "SM-0046",
    name: "Ahmed Yousef",
    nameAr: "أحمد يوسف",
    email: "a.yousef@med.edu",
    phone: "+20 100 234 5678",
    faculty: "Assiut Faculty of Medicine",
    academicYear: "Year 2 - Foundations",
    status: "Suspended",
    enrolled: "Oct 8, 2023",
    gpa: "2.80 / 4.0",
    devices: [
      { id: "dev-8", device: "Unknown Device", os: "Linux", browser: "Headless Chrome", ip: "185.220.101.5", lastActive: "Suspended", isCurrent: false },
    ],
    courses: [],
    quizzes: [],
    certificates: [],
  },
  {
    id: "SM-0047",
    name: "Noor Ibrahim",
    nameAr: "نور إبراهيم",
    email: "n.ibrahim@med.edu",
    phone: "+20 122 778 4410",
    faculty: "Faculty of Medicine (Kasr Al-Ainy)",
    academicYear: "Year 5 - Internal Medicine",
    status: "Active",
    enrolled: "Apr 15, 2024",
    gpa: "3.65 / 4.0",
    devices: [
      { id: "dev-9", device: "HP Envy Laptop", os: "Windows 11", browser: "Chrome 125", ip: "197.36.10.45", lastActive: "4 hrs ago", isCurrent: false },
    ],
    courses: [
      { id: "c-101", title: "Advanced Clinical Cardiology", progressPercent: 55, lecturesCompleted: 11, totalLectures: 20, state: "In Progress", lastAccessed: "4 hrs ago" },
    ],
    quizzes: [],
    certificates: [],
  },
];

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { color: C.muted, bg: "rgba(169,181,199,0.1)" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}33`, fontSize: 12, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `hsl(${hue},40%,20%)`, border: `1.5px solid hsl(${hue},40%,32%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.35, fontWeight: 700, color: `hsl(${hue},60%,72%)` }}>{initials}</span>
    </div>
  );
}

// ─── Student Details Screen ───────────────────────────────────────────────────
export function StudentDetailsPage({
  studentId,
  onBack,
}: {
  studentId: string;
  onBack: () => void;
}) {
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const student = students.find((s) => s.id === studentId) || students[0];
  const [activeTab, setActiveTab] = useState<"courses" | "quizzes" | "certificates" | "devices">("courses");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  function handleResetDevices() {
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, devices: [] } : s))
    );
    showToast("Hardware sessions cleared. Student will be asked to re-authenticate.");
  }

  function handleToggleStatus() {
    const nextStatus = student.status === "Suspended" ? "Active" : "Suspended";
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, status: nextStatus } : s))
    );
    showToast(`Student status updated to ${nextStatus}.`);
  }

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: 24 }}>
      
      {/* Toast */}
      {toastMessage && (
        <div style={{ position: "fixed", top: 24, insetInlineEnd: 24, zIndex: 999, background: C.elevated, border: `1px solid ${C.cyan}66`, borderRadius: 10, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
          <Check size={16} style={{ color: C.cyan }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb + Back */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <button onClick={onBack} style={{ fontSize: 12, color: C.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
            Students
          </button>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>{student.name}</span>
        </div>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
          onMouseEnter={(e) => { const b = e.currentTarget; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { const b = e.currentTarget; b.style.color = C.muted; b.style.borderColor = C.border; }}>
          <ChevronLeft size={14} /> Back to Directory
        </button>
      </div>

      {/* Student Hero Card */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Avatar name={student.name} size={64} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>{student.name}</h1>
              {student.nameAr && <span style={{ fontSize: 14, color: C.muted }}>({student.nameAr})</span>}
              <StatusBadge status={student.status} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", fontSize: 13, color: C.muted }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Mail size={13} style={{ color: C.cyan }} />{student.email}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Phone size={13} style={{ color: C.cyan }} />{student.phone}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><GraduationCap size={14} style={{ color: C.cyan }} />{student.faculty}</span>
              <span style={{ fontFamily: "monospace", fontSize: 12, background: C.elevated, padding: "2px 8px", borderRadius: 6, border: `1px solid ${C.border}` }}>{student.id}</span>
            </div>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button onClick={handleResetDevices}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <SmartphoneNfc size={14} /> Reset Devices ({student.devices.length}/3)
          </button>
          <button onClick={handleToggleStatus}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: student.status === "Suspended" ? "rgba(74,222,128,0.12)" : "rgba(239,68,68,0.1)", border: `1px solid ${student.status === "Suspended" ? "#4ade80" : "#f87171"}44`, color: student.status === "Suspended" ? "#4ade80" : "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <Shield size={14} /> {student.status === "Suspended" ? "Reactivate Student" : "Suspend Access"}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Tabs + Right Info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }} className="max-lg:grid-cols-1">
        
        {/* Left Column: Interactive Sub-Ledgers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Tab Bar */}
          <div style={{ display: "flex", gap: 6, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 5, alignSelf: "flex-start" }}>
            {[
              { id: "courses", label: `Enrolled Courses (${student.courses.length})`, icon: BookOpen },
              { id: "quizzes", label: `Quiz Records (${student.quizzes.length})`, icon: ClipboardCheck },
              { id: "certificates", label: `Certificates (${student.certificates.length})`, icon: Award },
              { id: "devices", label: `Active Devices (${student.devices.length}/3)`, icon: Monitor },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSel = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                  style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 7, border: "none", background: isSel ? C.elevated : "transparent", color: isSel ? C.text : C.muted, fontSize: 13, fontWeight: isSel ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                  <Icon size={14} style={{ color: isSel ? C.cyan : "inherit" }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Enrolled Courses Tab */}
          {activeTab === "courses" && (
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Curriculum Progress</span>
                <span style={{ fontSize: 12, color: C.muted }}>Backend Sync Active</span>
              </div>
              {student.courses.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: C.muted, fontSize: 13 }}>No courses enrolled yet.</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ height: 40, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Course</th>
                      <th style={{ padding: "0 20px", textAlign: "start", width: 180 }}>Completion</th>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Lectures</th>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>State</th>
                      <th style={{ padding: "0 20px", textAlign: "end" }}>Last Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.courses.map((c) => (
                      <tr key={c.id} style={{ height: 60, borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "0 20px" }}>
                          <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{c.title}</div>
                        </td>
                        <td style={{ padding: "0 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ flex: 1, height: 6, borderRadius: 3, background: C.elevated, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${c.progressPercent}%`, background: c.progressPercent === 100 ? "#4ade80" : C.cyan, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{c.progressPercent}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "0 20px", fontSize: 12, color: C.muted }}>
                          {c.lecturesCompleted} / {c.totalLectures}
                        </td>
                        <td style={{ padding: "0 20px" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 12, background: c.state === "Completed" ? "rgba(74,222,128,0.1)" : "rgba(53,224,223,0.1)", color: c.state === "Completed" ? "#4ade80" : C.cyan, border: `1px solid ${c.state === "Completed" ? "#4ade8033" : C.cyan + "33"}` }}>
                            {c.state}
                          </span>
                        </td>
                        <td style={{ padding: "0 20px", textAlign: "end", fontSize: 12, color: C.muted }}>
                          {c.lastAccessed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === "quizzes" && (
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Assessment Ledger</span>
              </div>
              {student.quizzes.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: C.muted, fontSize: 13 }}>No quizzes attempted yet.</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ height: 40, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Quiz Title</th>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Attempt</th>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Score</th>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Result</th>
                      <th style={{ padding: "0 20px", textAlign: "end" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.quizzes.map((q) => (
                      <tr key={q.id} style={{ height: 56, borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "0 20px", fontSize: 13, fontWeight: 600, color: C.text }}>{q.title}</td>
                        <td style={{ padding: "0 20px", fontSize: 12, color: C.muted }}>#{q.attemptNumber}</td>
                        <td style={{ padding: "0 20px", fontSize: 13, fontWeight: 700, color: q.result === "Passed" ? "#4ade80" : "#f87171" }}>
                          {q.score} / {q.maxScore}
                        </td>
                        <td style={{ padding: "0 20px" }}>
                          <StatusBadge status={q.result} />
                        </td>
                        <td style={{ padding: "0 20px", textAlign: "end", fontSize: 12, color: C.muted }}>{q.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === "certificates" && (
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Issued Medical Credentials</span>
              </div>
              {student.certificates.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: C.muted, fontSize: 13 }}>No certificates earned yet.</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ height: 40, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Serial Code</th>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Course</th>
                      <th style={{ padding: "0 20px", textAlign: "start" }}>Grade</th>
                      <th style={{ padding: "0 20px", textAlign: "end" }}>Issued Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.certificates.map((cert) => (
                      <tr key={cert.id} style={{ height: 56, borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "0 20px", fontFamily: "monospace", fontSize: 12, color: C.cyan, fontWeight: 600 }}>{cert.code}</td>
                        <td style={{ padding: "0 20px", fontSize: 13, color: C.text }}>{cert.courseTitle}</td>
                        <td style={{ padding: "0 20px", fontSize: 12, color: "#4ade80", fontWeight: 600 }}>{cert.grade}</td>
                        <td style={{ padding: "0 20px", textAlign: "end", fontSize: 12, color: C.muted }}>{cert.issuedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Devices Tab */}
          {activeTab === "devices" && (
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Hardware Binding Monitor</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Strict 3-device concurrency security enforcement</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: student.devices.length >= 3 ? "#f87171" : C.cyan, background: C.elevated, padding: "3px 10px", borderRadius: 8, border: `1px solid ${C.border}` }}>
                  {student.devices.length} / 3 Devices Used
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {student.devices.map((dev) => (
                  <div key={dev.id} style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: dev.isCurrent ? "rgba(53,224,223,0.12)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${dev.isCurrent ? C.cyan + "44" : C.border}` }}>
                        {dev.device.includes("Phone") || dev.device.includes("iPad") ? <Smartphone size={16} style={{ color: dev.isCurrent ? C.cyan : C.muted }} /> : <Monitor size={16} style={{ color: dev.isCurrent ? C.cyan : C.muted }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
                          {dev.device} ({dev.os})
                          {dev.isCurrent && <span style={{ fontSize: 10, color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>ACTIVE NOW</span>}
                        </div>
                        <div style={{ fontSize: 11, color: C.muted }}>
                          {dev.browser} • IP: {dev.ip} • Last seen: {dev.lastActive}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Academic & Security Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>
              Academic Profile
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
              <div>
                <span style={{ color: C.muted, display: "block", fontSize: 11 }}>University & Faculty:</span>
                <span style={{ color: C.text, fontWeight: 600 }}>{student.faculty}</span>
              </div>
              <div>
                <span style={{ color: C.muted, display: "block", fontSize: 11 }}>Academic Stage:</span>
                <span style={{ color: C.cyan, fontWeight: 600 }}>{student.academicYear}</span>
              </div>
              <div>
                <span style={{ color: C.muted, display: "block", fontSize: 11 }}>Cumulative Grade / GPA:</span>
                <span style={{ color: "#4ade80", fontWeight: 700 }}>{student.gpa}</span>
              </div>
              <div>
                <span style={{ color: C.muted, display: "block", fontSize: 11 }}>Registration Date:</span>
                <span style={{ color: C.text }}>{student.enrolled}</span>
              </div>
            </div>
          </div>

          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>
              Backend Security Policy
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12, color: C.muted }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Check size={14} style={{ color: "#4ade80" }} /> Max 3 concurrent devices
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Check size={14} style={{ color: "#4ade80" }} /> Signed URL DRM playback
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Check size={14} style={{ color: "#4ade80" }} /> Real-time audit log tracking
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

// ─── Students Directory Screen ────────────────────────────────────────────────
export default function StudentsPage({
  onViewStudent,
}: {
  onViewStudent: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  let students = INITIAL_STUDENTS;
  if (search.trim()) {
    const q = search.toLowerCase();
    students = students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.faculty.toLowerCase().includes(q)
    );
  }
  if (statusFilter) students = students.filter((s) => s.status === statusFilter);
  if (yearFilter) students = students.filter((s) => s.academicYear.includes(yearFilter));
  if (sortDir === "asc") students = [...students].sort((a, b) => a.enrolled.localeCompare(b.enrolled));
  if (sortDir === "desc") students = [...students].sort((a, b) => b.enrolled.localeCompare(a.enrolled));

  const totalPages = Math.max(1, Math.ceil(students.length / PER_PAGE));
  const paginated = students.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>Students</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.01em" }}>Student Accounts</h1>
            <p style={{ fontSize: 14, color: C.muted, margin: "4px 0 0" }}>Manage verified medical students, device concurrency, and enrolled curriculums.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Total Enrolled</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.cyan }}>{INITIAL_STUDENTS.length} Students</div>
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Active Devices</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#4ade80" }}>
                {INITIAL_STUDENTS.reduce((acc, s) => acc + s.devices.length, 0)} Sessions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 400 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by student name, email, ID, or faculty..."
            style={{ width: "100%", height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter || ""}
          onChange={(e) => { setStatusFilter(e.target.value || null); setPage(1); }}
          style={{ height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", color: statusFilter ? C.cyan : C.muted, fontSize: 13, outline: "none", cursor: "pointer", fontFamily: "inherit" }}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Academic Year Filter */}
        <select
          value={yearFilter || ""}
          onChange={(e) => { setYearFilter(e.target.value || null); setPage(1); }}
          style={{ height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", color: yearFilter ? C.cyan : C.muted, fontSize: 13, outline: "none", cursor: "pointer", fontFamily: "inherit" }}>
          <option value="">All Academic Years</option>
          <option value="Year 1">Year 1</option>
          <option value="Year 2">Year 2</option>
          <option value="Year 3">Year 3</option>
          <option value="Year 4">Year 4 - Clinical</option>
          <option value="Year 5">Year 5 - Internal Med</option>
          <option value="Internship">House Officer / Internship</option>
        </select>

        {(statusFilter || yearFilter || search) && (
          <button
            onClick={() => { setSearch(""); setStatusFilter(null); setYearFilter(null); setPage(1); }}
            style={{ height: 40, padding: "0 14px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Students Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ height: 44, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Student Name</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Faculty & University</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Academic Year</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Status</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Devices (Max 3)</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Enrolled</th>
              <th style={{ padding: "0 20px", textAlign: "end" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((student) => (
              <tr key={student.id}
                onClick={() => onViewStudent(student.id)}
                style={{ height: 68, borderBottom: `1px solid ${C.border}`, cursor: "pointer", transition: "background 0.12s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <td style={{ padding: "0 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={student.name} size={36} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{student.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{student.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "0 20px", fontSize: 12, color: C.text }}>
                  {student.faculty}
                </td>
                <td style={{ padding: "0 20px", fontSize: 12, color: C.cyan, fontWeight: 600 }}>
                  {student.academicYear}
                </td>
                <td style={{ padding: "0 20px" }}>
                  <StatusBadge status={student.status} />
                </td>
                <td style={{ padding: "0 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: student.devices.length >= 3 ? "#f87171" : C.muted }}>
                    <Smartphone size={13} style={{ color: student.devices.length >= 3 ? "#f87171" : C.cyan }} />
                    <span style={{ fontWeight: 600 }}>{student.devices.length} / 3</span>
                  </div>
                </td>
                <td style={{ padding: "0 20px", fontSize: 12, color: C.muted }}>
                  {student.enrolled}
                </td>
                <td style={{ padding: "0 20px", textAlign: "end" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onViewStudent(student.id); }}
                    style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <Eye size={13} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 12, color: C.muted }}>Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, students.length)} of {students.length} students</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: page === 1 ? "rgba(169,181,199,0.3)" : C.text, cursor: page === 1 ? "not-allowed" : "pointer" }}>
              <ChevronLeft size={14} />
            </button>
            <span style={{ fontSize: 12, color: C.cyan, fontWeight: 600, padding: "0 8px" }}>Page {page} of {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: page === totalPages ? "rgba(169,181,199,0.3)" : C.text, cursor: page === totalPages ? "not-allowed" : "pointer" }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
