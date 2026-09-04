import React, { useState, useRef } from "react";
import {
  RefreshCw, Search, ArrowUpDown, ArrowUp, ArrowDown,
  ChevronRight, MoreHorizontal, Eye, AlertCircle,
  Plus, Calendar, Clock, BookOpen, Check, X, ShieldAlert,
  Edit2, Trash2, CheckCircle2, ChevronDown, Play, Pause,
  Volume2, VolumeX, Maximize2, FileText, Download,
  Upload, Film, Paperclip, Sparkles, Layers, Award,
  HelpCircle, ExternalLink, VideoOff, Info, ArrowLeft,
  ClipboardCheck, FileQuestion
} from "lucide-react";
import { QuizItem } from "./courseTypes";
import { QuizEditorPage, QuizAttemptsPage, SAMPLE_REVISION_QUIZ } from "./QuizzesPage";

export type RevisionStatus = "Draft" | "Scheduled" | "Active" | "Inactive" | "Archived";

export interface RevisionAttachment {
  id: string;
  name: string;
  type: string; // "PDF" | "DOCX" | "SLIDES" | "NOTES"
  sizeBytes: number;
  sizeFormatted: string;
  uploadedAt: string;
  url?: string;
}

export interface RevisionRecord {
  id: string;
  title: string;
  description: string;
  isStandalone: boolean;
  course: string | null; // null if standalone, or course name e.g. "Advanced Clinical Cardiology"
  order?: number; // ordering index in course (e.g. 1, 2, 3...)
  specialty: string;
  status: RevisionStatus;
  availableFrom: string | null;
  availableUntil: string | null;
  enrolledStudents: number;
  completionRate: number; // e.g. 78%
  lastModified: string;
  
  // Video Management (Primary Learning Unit Content)
  hasVideo: boolean;
  videoFileName?: string | null;
  videoDurationSeconds?: number;
  durationMinutes: number; // Auto-extracted from video
  videoPreviewUrl?: string | null;
  
  // Document Management (Optional Materials)
  attachments: RevisionAttachment[];

  // Assessment Quiz (Strictly attached to this Revision)
  quiz?: QuizItem | null;
}

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  purple:   "#a855f7",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

const STATUS_CONFIG: Record<RevisionStatus, { color: string; bg: string }> = {
  Active:     { color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  Scheduled:  { color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  Draft:      { color: "#A9B5C7", bg: "rgba(169,181,199,0.12)" },
  Inactive:   { color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  Archived:   { color: "rgba(169,181,199,0.5)", bg: "rgba(255,255,255,0.04)" },
};

const LIFECYCLE_ORDER: RevisionStatus[] = ["Draft", "Scheduled", "Active", "Inactive", "Archived"];

export const AVAILABLE_COURSES = [
  "Advanced Clinical Cardiology",
  "Comprehensive Clinical Neurology",
  "Pediatrics Board Preparation",
  "General Surgery Mastery Series",
  "Internal Medicine Clinical Core",
  "Obstetrics & Gynecology Clinical Essentials",
];

export const SAMPLE_EMERGENCY_REVISION_QUIZ: QuizItem = {
  id: "quiz-rev-2",
  title: "Emergency Medicine Board Blitz Quiz",
  description: "High-yield resuscitation algorithms, polytrauma protocol review, and toxicology emergency questions.",
  parentType: "Revision",
  parentId: "REV-2026-02",
  parentTitle: "Emergency Medicine Board Blitz & Resuscitation Protocols",
  questionCount: 2,
  passingScore: 75,
  timeLimitMinutes: 20,
  maxAttempts: 3,
  totalAttempts: 184,
  passRate: 86,
  status: "Published",
  questions: [
    {
      id: "q-em1",
      stem: "A 32-year-old male arrives following high-speed motor vehicle collision with BP 70/40 mmHg, distended neck veins, and absent breath sounds on the left side. What is the immediate life-saving intervention?",
      options: [
        "Immediate tube thoracostomy (chest tube) or needle decompression in 2nd/5th intercostal space",
        "Stat CT pulmonary angiogram with IV contrast",
        "Fluid resuscitation with 2 liters of normal saline before imaging",
        "Endotracheal intubation and transfer to the trauma ICU"
      ],
      correctAnswer: 0,
      explanation: "Tension pneumothorax is a clinical diagnosis requiring immediate needle decompression or finger thoracostomy without waiting for radiographic confirmation."
    },
    {
      id: "q-em2",
      stem: "A 4-year-old child ingested an unknown liquid and presents with miosis, salivation, lacrimation, urination, defecation, and severe bradycardia. What is the definitive pharmacologic antidote?",
      options: [
        "Atropine followed by Pralidoxime (2-PAM)",
        "Naloxone IV bolus",
        "N-acetylcysteine infusion",
        "Flumazenil IV push"
      ],
      correctAnswer: 0,
      explanation: "The presentation represents acute organophosphate/cholinergic toxidrome (SLUDGE syndrome), treated with high-dose Atropine to control secretions followed by Pralidoxime."
    }
  ]
};

export const INITIAL_REVISIONS: RevisionRecord[] = [
  {
    id: "REV-2026-01",
    title: "Cardiology Rapid Review & ECG Masterclass 2026",
    description: "High-yield ECG rhythm interpretation, acute coronary syndrome decision algorithms, arrhythmia management, and board exam simulation.",
    isStandalone: false,
    course: "Advanced Clinical Cardiology",
    order: 1,
    specialty: "Cardiology",
    status: "Active",
    availableFrom: "2026-08-01",
    availableUntil: "2026-10-31",
    enrolledStudents: 342,
    completionRate: 78,
    lastModified: "Aug 28, 2026",
    hasVideo: true,
    videoFileName: "cardiology_ecg_rapid_masterclass_v3.mp4",
    videoDurationSeconds: 2880,
    durationMinutes: 48,
    videoPreviewUrl: null,
    attachments: [
      {
        id: "att-1",
        name: "ECG Interpretation Quick Cheat Sheet.pdf",
        type: "PDF",
        sizeBytes: 2450000,
        sizeFormatted: "2.4 MB",
        uploadedAt: "Aug 20, 2026",
      },
      {
        id: "att-2",
        name: "Arrhythmia Pharmacotherapy Summary.pdf",
        type: "PDF",
        sizeBytes: 5120000,
        sizeFormatted: "5.1 MB",
        uploadedAt: "Aug 21, 2026",
      },
      {
        id: "att-3",
        name: "Clinical Vignettes & High-Yield Quiz Answers.pdf",
        type: "PDF",
        sizeBytes: 1200000,
        sizeFormatted: "1.2 MB",
        uploadedAt: "Aug 22, 2026",
      },
    ],
    quiz: SAMPLE_REVISION_QUIZ,
  },
  {
    id: "REV-2026-02",
    title: "Emergency Medicine Board Blitz & Resuscitation Protocols",
    description: "Standalone fast-track revision unit covering acute resuscitation, polytrauma stabilization, toxicological emergencies, and rapid ultrasound triage.",
    isStandalone: true,
    course: null,
    order: 1,
    specialty: "Emergency Medicine",
    status: "Active",
    availableFrom: "2026-08-10",
    availableUntil: "2026-11-30",
    enrolledStudents: 488,
    completionRate: 85,
    lastModified: "Aug 29, 2026",
    hasVideo: true,
    videoFileName: "em_board_blitz_resus_2026.mp4",
    videoDurationSeconds: 3720,
    durationMinutes: 62,
    videoPreviewUrl: null,
    attachments: [
      {
        id: "att-4",
        name: "ACLS & PALS Critical Resuscitation Guide.pdf",
        type: "PDF",
        sizeBytes: 3800000,
        sizeFormatted: "3.8 MB",
        uploadedAt: "Aug 15, 2026",
      },
      {
        id: "att-5",
        name: "Emergency Ultrasound (FAST) Pocket Guide.pdf",
        type: "PDF",
        sizeBytes: 950000,
        sizeFormatted: "950 KB",
        uploadedAt: "Aug 16, 2026",
      },
    ],
    quiz: SAMPLE_EMERGENCY_REVISION_QUIZ,
  },
  {
    id: "REV-2026-03",
    title: "Neurotrauma & Cranial Nerve Emergencies Exam Prep",
    description: "Intensive exam review of cranial nerve brainstem localization, acute stroke intervention pathways, and ICP monitoring protocols.",
    isStandalone: false,
    course: "Comprehensive Clinical Neurology",
    order: 2,
    specialty: "Neurology",
    status: "Active",
    availableFrom: "2026-08-15",
    availableUntil: "2026-11-15",
    enrolledStudents: 289,
    completionRate: 64,
    lastModified: "Aug 29, 2026",
    hasVideo: true,
    videoFileName: "neuro_trauma_cranial_localization.mp4",
    videoDurationSeconds: 3240,
    durationMinutes: 54,
    videoPreviewUrl: null,
    attachments: [
      {
        id: "att-6",
        name: "Cranial Nerves Localization Flowchart.pdf",
        type: "PDF",
        sizeBytes: 1800000,
        sizeFormatted: "1.8 MB",
        uploadedAt: "Aug 25, 2026",
      },
    ],
  },
  {
    id: "REV-2026-04",
    title: "Pediatric Resuscitation PALS & Sepsis Protocol Review",
    description: "High-yield pediatric emergency algorithms, sepsis fluid bolus guidelines, status epilepticus management, and pediatric board questions.",
    isStandalone: false,
    course: "Pediatrics Board Preparation",
    order: 1,
    specialty: "Pediatrics",
    status: "Scheduled",
    availableFrom: "2026-09-15",
    availableUntil: "2026-12-15",
    enrolledStudents: 195,
    completionRate: 0,
    lastModified: "Aug 30, 2026",
    hasVideo: true,
    videoFileName: "pals_sepsis_pediatric_review.mp4",
    videoDurationSeconds: 2520,
    durationMinutes: 42,
    videoPreviewUrl: null,
    attachments: [
      {
        id: "att-7",
        name: "Pediatric Dosing & Resuscitation Card.pdf",
        type: "PDF",
        sizeBytes: 1400000,
        sizeFormatted: "1.4 MB",
        uploadedAt: "Aug 29, 2026",
      },
    ],
  },
  {
    id: "REV-2026-05",
    title: "USMLE Step 2 Clinical Knowledge Standalone Review",
    description: "Integrated multi-organ board exam simulation pearls covering internal medicine, surgical triage, and high-yield biostatistics.",
    isStandalone: true,
    course: null,
    order: 1,
    specialty: "General Medicine",
    status: "Draft",
    availableFrom: null,
    availableUntil: null,
    enrolledStudents: 0,
    completionRate: 0,
    lastModified: "Sep 01, 2026",
    hasVideo: false,
    videoFileName: null,
    videoDurationSeconds: 0,
    durationMinutes: 0,
    videoPreviewUrl: null,
    attachments: [],
  },
  {
    id: "REV-2025-09",
    title: "Obstetric Emergencies & Fetal Heart Tracing Review 2025",
    description: "Archived comprehensive revision module covering intrapartum fetal monitoring (Category I-III) and postpartum hemorrhage management.",
    isStandalone: false,
    course: "Obstetrics & Gynecology Clinical Essentials",
    order: 3,
    specialty: "Obstetrics & Gynecology",
    status: "Archived",
    availableFrom: "2025-09-01",
    availableUntil: "2025-12-31",
    enrolledStudents: 520,
    completionRate: 91,
    lastModified: "Jan 05, 2026",
    hasVideo: true,
    videoFileName: "obgyn_fetal_tracing_2025.mp4",
    videoDurationSeconds: 3000,
    durationMinutes: 50,
    videoPreviewUrl: null,
    attachments: [
      {
        id: "att-8",
        name: "ACOG Fetal Monitoring Interpretation Guidelines.pdf",
        type: "PDF",
        sizeBytes: 4200000,
        sizeFormatted: "4.2 MB",
        uploadedAt: "Jan 10, 2025",
      },
    ],
  },
];

// ─── Revisions Directory Page (Admin List) ──────────────────────────────────────────
export default function RevisionsPage({
  rows = INITIAL_REVISIONS,
  onTransition,
  onView,
  onEdit,
  onCreate,
}: {
  rows?: RevisionRecord[];
  onTransition?: (idx: number, nextStatus: RevisionStatus) => void;
  onView: (idx: number) => void;
  onEdit: (idx: number) => void;
  onCreate?: () => void;
}) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Standalone" | "Course-linked" | "Active" | "Draft" | "Archived">("All");
  const [page, setPage] = useState(1);
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);
  const [modalData, setModalData] = useState<{ idx: number; nextStatus: RevisionStatus; title: string; body: string } | null>(null);

  const filtered = rows.filter((r) => {
    // Tab filter
    if (activeTab === "Standalone" && !r.isStandalone) return false;
    if (activeTab === "Course-linked" && r.isStandalone) return false;
    if (activeTab === "Active" && r.status !== "Active") return false;
    if (activeTab === "Draft" && r.status !== "Draft") return false;
    if (activeTab === "Archived" && r.status !== "Archived") return false;

    // Search query
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const courseMatch = r.course ? r.course.toLowerCase().includes(q) : false;
    return (
      r.title.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.specialty.toLowerCase().includes(q) ||
      courseMatch
    );
  });

  const PER_PAGE = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function requestTransition(idx: number, next: RevisionStatus) {
    setActiveMenuIdx(null);
    const target = rows[idx];
    if (next === "Inactive") {
      setModalData({
        idx,
        nextStatus: next,
        title: "Deactivate Revision?",
        body: `Deactivating "${target.title}" will temporarily restrict student access until reactivated.`,
      });
    } else if (next === "Archived") {
      setModalData({
        idx,
        nextStatus: next,
        title: "Archive Revision Permanently?",
        body: `Archived revisions are preserved in the audit trail as read-only historical records and cannot be scheduled or modified directly.`,
      });
    } else {
      onTransition?.(idx, next);
    }
  }

  const standaloneCount = rows.filter((r) => r.isStandalone).length;
  const courseLinkedCount = rows.filter((r) => !r.isStandalone).length;
  const activeCount = rows.filter((r) => r.status === "Active").length;
  const totalStudents = rows.reduce((acc, r) => acc + r.enrolledStudents, 0);

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Content Management</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Revisions</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Revision Units</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
              Manage independent learning units — standalone masterclasses & course-linked clinical revision modules.
            </p>
          </div>
          <button
            onClick={onCreate}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
              borderRadius: 8, border: "none", background: C.cyan, color: C.bg,
              fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Create Revision
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Active Revisions</span>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#4ade80", marginTop: 6 }}>
            {activeCount}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Live and accessible to students</span>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Standalone Units</span>
            <Sparkles size={14} style={{ color: C.purple }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.purple, marginTop: 6 }}>
            {standaloneCount}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Direct entry, no course required</span>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Course-Linked Modules</span>
            <BookOpen size={14} style={{ color: "#60a5fa" }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#60a5fa", marginTop: 6 }}>
            {courseLinkedCount}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Associated with course curriculum</span>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>Enrolled Candidates</span>
            <Award size={14} style={{ color: C.cyan }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.cyan, marginTop: 6 }}>
            {totalStudents.toLocaleString()}
          </div>
          <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "block" }}>Across active cohorts</span>
        </div>
      </div>

      {/* Filters Bar & Tab Selection */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 420 }}>
          <Search size={15} style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: C.muted, pointerEvents: "none" }} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by revision title, ID, course, or specialty..."
            style={{
              width: "100%", height: 40, background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 8, paddingInlineStart: 38, paddingInlineEnd: 12, fontSize: 13,
              color: C.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box"
            }}
          />
        </div>

        {/* Tab Pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(["All", "Standalone", "Course-linked", "Active", "Draft", "Archived"] as const).map((tab) => {
            const isSel = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setPage(1); }}
                style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: isSel ? 700 : 500,
                  border: `1px solid ${isSel ? (tab === "Standalone" ? C.purple : C.cyan) : C.border}`,
                  background: isSel ? (tab === "Standalone" ? "rgba(168,85,247,0.15)" : "rgba(53,224,223,0.12)") : "transparent",
                  color: isSel ? (tab === "Standalone" ? C.purple : C.cyan) : C.muted,
                  cursor: "pointer", fontFamily: "inherit"
                }}
              >
                {tab === "Standalone" ? "★ Standalone" : tab === "Course-linked" ? "📚 Course-linked" : tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr style={{ background: C.elevated, height: 44 }}>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Revision Unit</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Course Context</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Video Asset</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Documents</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Assessment</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "0 20px", textAlign: "start", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Cohorts</th>
              <th style={{ padding: "0 20px", textAlign: "end", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 48, textAlign: "center", color: C.muted, fontSize: 14 }}>
                  No revision units found matching your search and filter criteria.
                </td>
              </tr>
            ) : (
              paged.map((rev) => {
                const originalIdx = rows.findIndex((r) => r.id === rev.id);
                const cfg = STATUS_CONFIG[rev.status];
                const isMenuOpen = activeMenuIdx === originalIdx;

                return (
                  <tr
                    key={rev.id}
                    style={{
                      height: 68,
                      borderBottom: `1px solid ${C.border}`,
                      background: "transparent",
                    }}
                  >
                    {/* Revision Unit Title & ID */}
                    <td style={{ padding: "0 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: 8,
                          background: rev.isStandalone ? "rgba(168,85,247,0.12)" : "rgba(53,224,223,0.1)",
                          border: `1px solid ${rev.isStandalone ? "rgba(168,85,247,0.3)" : `${C.cyan}33`}`,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}>
                          {rev.isStandalone ? (
                            <Sparkles size={17} style={{ color: C.purple }} />
                          ) : (
                            <RefreshCw size={17} style={{ color: C.cyan }} />
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, maxWidth: 280, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={rev.title}>
                            {rev.title}
                          </div>
                          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                            {rev.id} · {rev.specialty}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Course Context (Standalone vs Course-linked) */}
                    <td style={{ padding: "0 20px" }}>
                      {rev.isStandalone ? (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 6, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", color: C.purple, fontSize: 11, fontWeight: 600 }}>
                          <Sparkles size={11} />
                          Standalone
                        </div>
                      ) : (
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.text }}>
                            <BookOpen size={12} style={{ color: "#60a5fa", flexShrink: 0 }} />
                            <span style={{ maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={rev.course || ""}>
                              {rev.course}
                            </span>
                          </div>
                          {rev.order && (
                            <span style={{ fontSize: 10, color: C.muted, marginTop: 2, display: "block" }}>
                              Revision order #{rev.order}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Video Asset */}
                    <td style={{ padding: "0 20px" }}>
                      {rev.hasVideo ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.text }}>
                          <Film size={14} style={{ color: C.cyan }} />
                          <span>{rev.durationMinutes} min</span>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                          <VideoOff size={14} style={{ opacity: 0.5 }} />
                          <span style={{ fontStyle: "italic", fontSize: 11 }}>No video</span>
                        </div>
                      )}
                    </td>

                    {/* Documents */}
                    <td style={{ padding: "0 20px" }}>
                      {rev.attachments.length > 0 ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: C.muted }}>
                          <Paperclip size={13} style={{ color: C.cyan }} />
                          <span>{rev.attachments.length} file{rev.attachments.length > 1 ? "s" : ""}</span>
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, color: C.muted, opacity: 0.5 }}>0 files</span>
                      )}
                    </td>

                    {/* Assessment Quiz */}
                    <td style={{ padding: "0 20px" }}>
                      {rev.quiz ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: C.purple, fontWeight: 600 }}>
                          <ClipboardCheck size={13} style={{ color: C.purple }} />
                          <span>{rev.quiz.questionCount} Qs ({rev.quiz.passingScore}%)</span>
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, color: C.muted, opacity: 0.5 }}>No quiz</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: "0 20px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg }}>
                        {rev.status}
                      </span>
                    </td>

                    {/* Cohorts */}
                    <td style={{ padding: "0 20px" }}>
                      <div style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>
                        {rev.enrolledStudents.toLocaleString()}
                      </div>
                      {rev.completionRate > 0 && (
                        <div style={{ fontSize: 10, color: "#4ade80", marginTop: 2 }}>
                          {rev.completionRate}% avg completion
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "0 20px", textAlign: "end", position: "relative" }}>
                      <div style={{ display: "inline-flex", gap: 8 }}>
                        <button
                          onClick={() => onView(originalIdx)}
                          style={{
                            padding: "6px 12px", borderRadius: 6, background: "rgba(53,224,223,0.1)",
                            border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600,
                            cursor: "pointer", fontFamily: "inherit"
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => onEdit(originalIdx)}
                          style={{
                            padding: "6px 12px", borderRadius: 6, background: "transparent",
                            border: `1px solid ${C.border}`, color: C.muted, fontSize: 12,
                            cursor: "pointer", fontFamily: "inherit"
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setActiveMenuIdx(isMenuOpen ? null : originalIdx)}
                          style={{
                            width: 30, height: 30, borderRadius: 6, background: isMenuOpen ? C.elevated : "transparent",
                            border: `1px solid ${C.border}`, color: C.muted, display: "flex",
                            alignItems: "center", justifyContent: "center", cursor: "pointer"
                          }}
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div
                          style={{
                            position: "absolute", insetInlineEnd: 20, top: 48, zIndex: 40,
                            background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8,
                            padding: 6, minWidth: 160, boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                            textAlign: "start"
                          }}
                        >
                          {rev.status === "Draft" && (
                            <button
                              onClick={() => requestTransition(originalIdx, "Active")}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#4ade80", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "start", fontFamily: "inherit" }}
                            >
                              Publish Immediately
                            </button>
                          )}
                          {rev.status === "Draft" && (
                            <button
                              onClick={() => requestTransition(originalIdx, "Scheduled")}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#60a5fa", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "start", fontFamily: "inherit" }}
                            >
                              Schedule Activation
                            </button>
                          )}
                          {rev.status === "Scheduled" && (
                            <button
                              onClick={() => requestTransition(originalIdx, "Active")}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#4ade80", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "start", fontFamily: "inherit" }}
                            >
                              Activate Immediately
                            </button>
                          )}
                          {rev.status === "Active" && (
                            <button
                              onClick={() => requestTransition(originalIdx, "Inactive")}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#fbbf24", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "start", fontFamily: "inherit" }}
                            >
                              Deactivate
                            </button>
                          )}
                          {rev.status === "Inactive" && (
                            <button
                              onClick={() => requestTransition(originalIdx, "Active")}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#4ade80", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "start", fontFamily: "inherit" }}
                            >
                              Reactivate
                            </button>
                          )}
                          {rev.status !== "Archived" && (
                            <button
                              onClick={() => requestTransition(originalIdx, "Archived")}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "start", fontFamily: "inherit" }}
                            >
                              Archive
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {modalData && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(7,18,37,0.85)", backdropFilter: "blur(4px)" }}>
          <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, width: "90%", maxWidth: 460, boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0 }}>{modalData.title}</h3>
            <p style={{ fontSize: 13, color: C.muted, margin: "12px 0 24px", lineHeight: 1.6 }}>{modalData.body}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setModalData(null)}
                style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onTransition?.(modalData.idx, modalData.nextStatus);
                  setModalData(null);
                }}
                style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#f87171", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ─── Revision Details Page (Admin View) ─────────────────────────────────────────────
export function RevisionDetailsPage({
  revision,
  onBack,
  onEdit,
  onPublish,
  onArchive,
}: {
  revision: RevisionRecord;
  onBack: () => void;
  onEdit: () => void;
  onPublish?: () => void;
  onArchive?: () => void;
}) {
  const cfg = STATUS_CONFIG[revision.status];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isQuizEditorOpen, setIsQuizEditorOpen]     = useState(false);
  const [isQuizAttemptsOpen, setIsQuizAttemptsOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz]               = useState<QuizItem | null>(revision.quiz || null);

  if (isQuizEditorOpen) {
    return (
      <QuizEditorPage
        parentType="Revision"
        parentId={revision.id}
        parentTitle={revision.title}
        parentCourseTitle={revision.course || undefined}
        quiz={currentQuiz}
        onBack={() => setIsQuizEditorOpen(false)}
        onSave={(updatedQuiz) => {
          setCurrentQuiz(updatedQuiz);
          revision.quiz = updatedQuiz;
          setIsQuizEditorOpen(false);
        }}
        onDelete={() => {
          setCurrentQuiz(null);
          revision.quiz = null;
          setIsQuizEditorOpen(false);
        }}
      />
    );
  }

  if (isQuizAttemptsOpen && currentQuiz) {
    return (
      <QuizAttemptsPage
        quiz={currentQuiz}
        onBack={() => setIsQuizAttemptsOpen(false)}
      />
    );
  }

  const durationSec = revision.videoDurationSeconds || (revision.durationMinutes * 60) || 1800;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Content</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Revisions</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>{revision.id}</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>{revision.title}</h1>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg }}>
                {revision.status}
              </span>
              {revision.isStandalone ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: C.purple, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  <Sparkles size={11} /> Standalone Unit
                </span>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "#60a5fa", background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.25)" }}>
                  <BookOpen size={11} /> {revision.course} {revision.order ? `· #${revision.order}` : ""}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
              Specialty: <strong style={{ color: C.text }}>{revision.specialty}</strong> · Last updated: {revision.lastModified}
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onBack}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={onEdit}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            >
              <Edit2 size={14} /> Edit Revision
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: 24, alignItems: "start" }}>
        {/* Left Column: Learning Content (Video + Description + Attachments) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Video Experience Card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Film size={16} style={{ color: C.cyan }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>Primary Video Content</h3>
              </div>
              <span style={{ fontSize: 12, color: C.muted }}>
                Duration: <strong style={{ color: C.text }}>{revision.durationMinutes} min</strong>
              </span>
            </div>

            {revision.hasVideo ? (
              <div>
                {/* Video Player Preview Viewport */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#030812",
                  border: `1px solid ${C.border}`,
                  aspectRatio: "16 / 9",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  {revision.videoPreviewUrl ? (
                    <video
                      ref={videoRef}
                      src={revision.videoPreviewUrl}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onTimeUpdate={(e) => setCurrentTimeSec((e.target as HTMLVideoElement).currentTime)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  ) : (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center" }}>
                      <div
                        onClick={togglePlay}
                        style={{
                          width: 64, height: 64, borderRadius: "50%",
                          background: isPlaying ? "rgba(53,224,223,0.9)" : "rgba(53,224,223,0.15)",
                          border: `2px solid ${C.cyan}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", transition: "all 0.2s",
                          color: isPlaying ? C.bg : C.cyan
                        }}
                      >
                        {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginInlineStart: 4 }} />}
                      </div>
                      <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: C.text }}>
                        {revision.videoFileName || "synapse_revision_master_stream.mp4"}
                      </div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                        Bunny Stream CDN · Transcoded High-Definition HLS · Encrypted Token Protection
                      </div>
                    </div>
                  )}

                  {/* Player Controls Bar */}
                  <div style={{ padding: "12px 16px", background: "linear-gradient(to top, rgba(3,8,18,0.95), rgba(3,8,18,0.4))", display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                      onClick={togglePlay}
                      style={{ background: "none", border: "none", color: C.text, cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span style={{ fontSize: 11, color: C.muted, minWidth: 85, fontFamily: "monospace" }}>
                      {formatTime(currentTimeSec)} / {formatTime(durationSec)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={durationSec}
                      value={currentTimeSec}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCurrentTimeSec(val);
                        if (videoRef.current) videoRef.current.currentTime = val;
                      }}
                      style={{ flex: 1, accentColor: C.cyan, cursor: "pointer" }}
                    />
                    <Volume2 size={16} style={{ color: C.muted }} />
                    <Maximize2 size={16} style={{ color: C.muted, cursor: "pointer" }} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, fontSize: 12, color: C.muted }}>
                  <span>Asset: <strong style={{ color: C.text }}>{revision.videoFileName || "HLS Video Stream"}</strong></span>
                  <span style={{ color: "#4ade80" }}>✓ Cloud Stream Ready</span>
                </div>
              </div>
            ) : (
              <div style={{ padding: 36, textAlign: "center", background: C.elevated, borderRadius: 8, border: `1px dashed ${C.border}` }}>
                <VideoOff size={32} style={{ color: C.muted, opacity: 0.5, margin: "0 auto 10px" }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>No Video Attached</div>
                <p style={{ fontSize: 12, color: C.muted, margin: "6px 0 16px" }}>
                  This revision is currently missing its primary video stream. Attach a video to make it ready for publishing.
                </p>
                <button
                  onClick={onEdit}
                  style={{ padding: "8px 16px", borderRadius: 8, background: C.cyan, color: C.bg, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Upload Video
                </button>
              </div>
            )}
          </div>

          {/* Description & Clinical Focus */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Description & High-Yield Focus</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>
              {revision.description || "No description provided for this revision unit."}
            </p>
          </div>

          {/* Documents / Attachments Card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Paperclip size={16} style={{ color: C.cyan }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>Revision Materials & Documents</h3>
              </div>
              <span style={{ fontSize: 12, color: C.muted }}>
                {revision.attachments.length} document{revision.attachments.length !== 1 ? "s" : ""}
              </span>
            </div>

            {revision.attachments.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {revision.attachments.map((att) => (
                  <div
                    key={att.id}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", background: C.elevated, border: `1px solid ${C.border}`,
                      borderRadius: 8
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 6,
                        background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <FileText size={16} style={{ color: "#ef4444" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{att.name}</div>
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                          {att.type} · {att.sizeFormatted} · Uploaded {att.uploadedAt}
                        </div>
                      </div>
                    </div>
                    <button
                      title="Download or preview file"
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${C.border}`, color: C.text, fontSize: 12,
                        cursor: "pointer", fontFamily: "inherit"
                      }}
                    >
                      <Download size={13} /> Download
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "20px 0", textAlign: "center", color: C.muted, fontSize: 13 }}>
                No clinical attachments or lecture notes uploaded for this revision unit.
              </div>
            )}
          </div>

          {/* ─── Assessment Quiz Card (Section 4 & 28) ─── */}
          <div style={{ background: C.surface, border: `1px solid ${currentQuiz ? `${C.purple}44` : C.border}`, borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ClipboardCheck size={16} style={{ color: C.purple }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>Revision Assessment Quiz</h3>
              </div>
              {currentQuiz && (
                <span style={{ fontSize: 11, fontWeight: 700, color: currentQuiz.status === "Published" ? "#4ade80" : C.muted, background: currentQuiz.status === "Published" ? "rgba(74,222,128,0.12)" : "rgba(169,181,199,0.12)", padding: "3px 10px", borderRadius: 12 }}>
                  {currentQuiz.status}
                </span>
              )}
            </div>

            {currentQuiz ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "16px 18px", background: C.elevated, borderRadius: 10, border: `1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{currentQuiz.title}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                    {currentQuiz.questionCount} Questions · Pass Criteria: <strong style={{ color: "#4ade80" }}>{currentQuiz.passingScore}%</strong> · Time Limit: {currentQuiz.timeLimitMinutes} Mins · Max Retakes: {currentQuiz.maxAttempts}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setIsQuizAttemptsOpen(true)}
                    style={{ padding: "7px 14px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.text, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    View Attempts
                  </button>
                  <button
                    onClick={() => setIsQuizEditorOpen(true)}
                    style={{ padding: "7px 16px", borderRadius: 6, background: C.cyan, border: "none", color: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Manage Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "16px 18px", background: C.elevated, borderRadius: 10, border: `1px dashed ${C.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>No Assessment Attached</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                    Attach an assessment quiz to test board recall following the revision video and materials.
                  </div>
                </div>
                <button
                  onClick={() => setIsQuizEditorOpen(true)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: C.purple, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  <Plus size={14} /> Create Revision Quiz
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Context, Access & Lifecycle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Architecture Card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Learning Unit Architecture</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit Structure</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: revision.isStandalone ? C.purple : "#60a5fa", marginTop: 4 }}>
                  {revision.isStandalone ? "Standalone Learning Unit" : "Course-Linked Revision"}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Course Association</span>
                <div style={{ fontSize: 13, color: C.text, marginTop: 4 }}>
                  {revision.isStandalone ? (
                    <span style={{ color: C.muted, fontStyle: "italic" }}>None (Direct student access without course dependency)</span>
                  ) : (
                    <span>{revision.course} {revision.order ? `(Order: Revision #${revision.order})` : ""}</span>
                  )}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 11, color: C.muted }}>Enrolled Students</span>
                    <div style={{ fontSize: 18, fontWeight: 700, color: C.cyan, marginTop: 2 }}>
                      {revision.enrolledStudents.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: C.muted }}>Completion Rate</span>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#4ade80", marginTop: 2 }}>
                      {revision.completionRate}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeframe & Availability */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Availability Window</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: C.muted }}>Available From:</span>
                <span style={{ color: C.text, fontWeight: 600 }}>{revision.availableFrom || "Immediate upon publish"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: C.muted }}>Available Until:</span>
                <span style={{ color: C.text, fontWeight: 600 }}>{revision.availableUntil || "Permanent access"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: C.muted }}>Deep Link URI:</span>
                <span style={{ color: C.cyan, fontFamily: "monospace", fontSize: 11 }}>synapsemed://revision/{revision.id}</span>
              </div>
            </div>
          </div>

          {/* Lifecycle Progression */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Lifecycle Progression</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {LIFECYCLE_ORDER.map((st, idx) => {
                const currentIdx = LIFECYCLE_ORDER.indexOf(revision.status);
                const isDone = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                return (
                  <div key={st} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: isCurrent ? C.cyan : isDone ? "#4ade80" : "transparent",
                        border: `2px solid ${isCurrent ? C.cyan : isDone ? "#4ade80" : C.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isCurrent || isDone ? C.bg : C.muted, fontSize: 11, fontWeight: 700
                      }}
                    >
                      {isDone ? <Check size={12} strokeWidth={3} /> : idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? C.cyan : isDone ? C.text : C.muted }}>
                        {st}
                      </div>
                      {isCurrent && <div style={{ fontSize: 11, color: C.muted }}>Current operational status</div>}
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

// ─── Revision Editor Page (Admin Create / Edit Flow) ────────────────────────────────
export function RevisionEditorPage({
  revision,
  onBack,
  onSave,
}: {
  revision?: RevisionRecord;
  onBack: () => void;
  onSave: (data: Partial<RevisionRecord>) => void;
}) {
  const isNew = !revision;

  // Form States
  const [title, setTitle] = useState(revision?.title ?? "");
  const [description, setDescription] = useState(revision?.description ?? "");
  const [isStandalone, setIsStandalone] = useState(revision?.isStandalone ?? false);
  const [course, setCourse] = useState<string | null>(revision?.course ?? AVAILABLE_COURSES[0]);
  const [order, setOrder] = useState<number>(revision?.order ?? 1);
  const [specialty, setSpecialty] = useState(revision?.specialty ?? "Cardiology");
  const [availFrom, setAvailFrom] = useState(revision?.availableFrom ?? "");
  const [availUntil, setAvailUntil] = useState(revision?.availableUntil ?? "");
  const [status, setStatus] = useState<RevisionStatus>(revision?.status ?? "Draft");

  // Video Management States
  const [hasVideo, setHasVideo] = useState(revision?.hasVideo ?? false);
  const [videoFileName, setVideoFileName] = useState(revision?.videoFileName ?? "");
  const [durationMinutes, setDurationMinutes] = useState(revision?.durationMinutes ?? 0);
  const [videoDurationSeconds, setVideoDurationSeconds] = useState(revision?.videoDurationSeconds ?? 0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(revision?.videoPreviewUrl ?? null);
  const [videoUploading, setVideoUploading] = useState(false);

  // Document Management States
  const [attachments, setAttachments] = useState<RevisionAttachment[]>(revision?.attachments ? [...revision.attachments] : []);

  // Assessment Quiz State (just like a lecture!)
  const [quiz, setQuiz]                             = useState<QuizItem | null>(revision?.quiz ?? null);
  const [isQuizEditorOpen, setIsQuizEditorOpen]     = useState(false);
  const [isQuizAttemptsOpen, setIsQuizAttemptsOpen] = useState(false);

  // Validation Error State
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Automated Video Duration Extraction & File Upload Handler
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoUploading(true);
    setVideoFileName(file.name);

    const objectUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(objectUrl);

    // Extract exact duration from real video metadata
    const tempVideo = document.createElement("video");
    tempVideo.preload = "metadata";

    tempVideo.onloadedmetadata = () => {
      const realSeconds = Math.round(tempVideo.duration) || 1800;
      const calculatedMins = Math.max(1, Math.round(realSeconds / 60));
      setVideoDurationSeconds(realSeconds);
      setDurationMinutes(calculatedMins);
      setHasVideo(true);
      setVideoUploading(false);
      setValidationError(null);
    };

    tempVideo.onerror = () => {
      // Fallback estimate if browser codec is not locally playable
      const fallbackSecs = Math.max(60, Math.round(file.size / (1024 * 1024 * 0.4)));
      const calculatedMins = Math.max(1, Math.round(fallbackSecs / 60));
      setVideoDurationSeconds(fallbackSecs);
      setDurationMinutes(calculatedMins);
      setHasVideo(true);
      setVideoUploading(false);
      setValidationError(null);
    };

    tempVideo.src = objectUrl;
  };

  const handleRemoveVideo = () => {
    setHasVideo(false);
    setVideoFileName("");
    setDurationMinutes(0);
    setVideoDurationSeconds(0);
    setVideoPreviewUrl(null);
  };

  // Document Attachment Handler
  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: RevisionAttachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const ext = f.name.split(".").pop()?.toUpperCase() || "PDF";
      const sizeKB = Math.round(f.size / 1024);
      const sizeFormatted = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

      newAttachments.push({
        id: `att-${Date.now()}-${i}`,
        name: f.name,
        type: ext,
        sizeBytes: f.size,
        sizeFormatted,
        uploadedAt: "Just now",
        url: URL.createObjectURL(f),
      });
    }

    setAttachments((prev) => [...prev, ...newAttachments]);
    if (documentInputRef.current) documentInputRef.current.value = "";
  };

  const handleRemoveAttachment = (attId: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== attId));
  };

  // Publishing Validation Logic according to Master Prompt rules
  function handleSave(targetStatus?: RevisionStatus) {
    const desiredStatus = targetStatus || status;

    if (!title.trim()) {
      setValidationError("Revision Title is required.");
      return;
    }

    if (desiredStatus === "Active" || desiredStatus === "Scheduled") {
      const missing: string[] = [];
      if (!title.trim()) missing.push("Title");
      if (!description.trim()) missing.push("Description");
      if (!hasVideo) missing.push("Primary Video Content");

      if (missing.length > 0) {
        setValidationError(`Cannot publish revision. Please complete: ${missing.join(" • ")}`);
        return;
      }
    }

    setValidationError(null);
    setSaved(true);

    setTimeout(() => {
      onSave({
        title: title.trim(),
        description: description.trim(),
        isStandalone,
        course: isStandalone ? null : course,
        order: isStandalone ? 1 : Number(order) || 1,
        specialty,
        availableFrom: availFrom || null,
        availableUntil: availUntil || null,
        status: desiredStatus,
        hasVideo,
        videoFileName: hasVideo ? videoFileName : null,
        durationMinutes,
        videoDurationSeconds,
        videoPreviewUrl,
        attachments,
        quiz,
        lastModified: "Just now",
      });
      onBack();
    }, 500);
  }

  if (isQuizEditorOpen) {
    return (
      <QuizEditorPage
        parentType="Revision"
        parentId={revision?.id || "new-rev"}
        parentTitle={title || "New Revision Unit"}
        parentCourseTitle={!isStandalone && course ? course : undefined}
        quiz={quiz}
        onBack={() => setIsQuizEditorOpen(false)}
        onSave={(savedQuiz) => {
          setQuiz(savedQuiz);
          setIsQuizEditorOpen(false);
        }}
        onDelete={() => {
          setQuiz(null);
          setIsQuizEditorOpen(false);
        }}
      />
    );
  }

  if (isQuizAttemptsOpen && quiz) {
    return (
      <QuizAttemptsPage
        quiz={quiz}
        onBack={() => setIsQuizAttemptsOpen(false)}
      />
    );
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* Hidden File Inputs */}
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,video/*"
        style={{ display: "none" }}
        onChange={handleVideoFileChange}
      />
      <input
        ref={documentInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
        style={{ display: "none" }}
        onChange={handleDocumentFileChange}
      />

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Content</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0 }}>Revisions</button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>{isNew ? "Create Revision" : "Edit Revision"}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>
              {isNew ? "Create Revision Unit" : `Edit Revision: ${revision.id}`}
            </h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>
              Configure standalone or course-linked learning unit, video stream, and clinical attachments.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onBack}
              style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave("Draft")}
              style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.elevated, color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave("Active")}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 20px",
                borderRadius: 8, border: "none", background: saved ? "#4ade80" : C.cyan,
                color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              {saved ? <Check size={14} /> : null}
              {saved ? "Published!" : "Publish Revision"}
            </button>
          </div>
        </div>
      </div>

      {/* Validation Banner */}
      {validationError && (
        <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <AlertCircle size={18} style={{ color: "#f87171", flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#f87171", fontWeight: 500 }}>{validationError}</span>
        </div>
      )}

      {/* Editor Sections Stack */}
      <div style={{ maxWidth: 840, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* SECTION 1: Architecture & Course Association */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Layers size={18} style={{ color: C.cyan }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>1. Architecture & Course Association</h2>
          </div>
          <p style={{ fontSize: 12, color: C.muted, margin: "0 0 20px" }}>
            Specify whether this revision is an independent Standalone Revision or linked to a parent Course curriculum.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {/* Standalone Choice Card */}
            <div
              onClick={() => {
                setIsStandalone(true);
                setCourse(null);
              }}
              style={{
                padding: 18, borderRadius: 10, cursor: "pointer", transition: "all 0.2s",
                border: `2px solid ${isStandalone ? C.purple : C.border}`,
                background: isStandalone ? "rgba(168,85,247,0.1)" : C.elevated
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: isStandalone ? C.purple : C.text }}>Standalone Revision</span>
                {isStandalone && <CheckCircle2 size={16} style={{ color: C.purple }} />}
              </div>
              <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.5 }}>
                Independent learning unit with direct student discovery and enrollment. Does not require entering or owning a parent course.
              </p>
            </div>

            {/* Course-linked Choice Card */}
            <div
              onClick={() => {
                setIsStandalone(false);
                if (!course) setCourse(AVAILABLE_COURSES[0]);
              }}
              style={{
                padding: 18, borderRadius: 10, cursor: "pointer", transition: "all 0.2s",
                border: `2px solid ${!isStandalone ? C.cyan : C.border}`,
                background: !isStandalone ? "rgba(53,224,223,0.08)" : C.elevated
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: !isStandalone ? C.cyan : C.text }}>Course-Linked Revision</span>
                {!isStandalone && <CheckCircle2 size={16} style={{ color: C.cyan }} />}
              </div>
              <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.5 }}>
                Embedded revision module associated with an existing medical course. Can be sequenced within the course revision tab.
              </p>
            </div>
          </div>

          {/* If Course-linked, show Course Selector & Order Input */}
          {!isStandalone && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, padding: 16, background: C.elevated, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Parent Course</label>
                <select
                  value={course || AVAILABLE_COURSES[0]}
                  onChange={(e) => setCourse(e.target.value)}
                  style={{ width: "100%", height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit" }}
                >
                  {AVAILABLE_COURSES.map((c) => (
                    <option key={c} value={c} style={{ background: C.surface, color: C.text }}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Revision Order #</label>
                <input
                  type="number"
                  min={1}
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  placeholder="1"
                  style={{ width: "100%", height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Basic Information */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <FileText size={18} style={{ color: C.cyan }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>2. Basic Information</h2>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
              Revision Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cardiology Rapid Review & ECG Masterclass 2026"
              style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
              Clinical Description & Focus *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the high-yield topics, clinical decision algorithms, or board preparation goals covered in this revision..."
              style={{ width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
              Medical Specialty / Discipline
            </label>
            <input
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="e.g. Cardiology, Neurology, Pediatrics"
              style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* SECTION 3: Video Experience & Upload */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Film size={18} style={{ color: C.cyan }} />
              <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>3. Primary Video Management</h2>
            </div>
            {hasVideo && (
              <span style={{ fontSize: 12, color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
                <Check size={14} /> Duration Auto-calculated ({durationMinutes} min)
              </span>
            )}
          </div>
          <p style={{ fontSize: 12, color: C.muted, margin: "0 0 16px" }}>
            The primary learning unit is the video. Video duration is computed automatically from file metadata.
          </p>

          {hasVideo ? (
            <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Film size={18} style={{ color: C.cyan }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{videoFileName || "Uploaded Video Asset"}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                      Duration: {durationMinutes} minutes ({videoDurationSeconds} seconds) · Cloud Stream Encoding
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    style={{ padding: "6px 12px", borderRadius: 6, background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Replace Video
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Live Video Player Preview */}
              {videoPreviewUrl && (
                <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, marginTop: 12, background: "#000" }}>
                  <video
                    src={videoPreviewUrl}
                    controls
                    style={{ width: "100%", maxHeight: 320, objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => videoInputRef.current?.click()}
              style={{
                border: `2px dashed ${C.border}`, borderRadius: 10, padding: "36px 20px",
                textAlign: "center", background: C.elevated, cursor: "pointer",
                transition: "border-color 0.2s"
              }}
            >
              <Upload size={32} style={{ color: C.cyan, margin: "0 auto 10px" }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
                {videoUploading ? "Analyzing Video Metadata..." : "Click to Upload Video Asset"}
              </div>
              <p style={{ fontSize: 12, color: C.muted, margin: "6px 0 0" }}>
                Supports MP4, MOV, WebM. Duration is automatically detected and synced with backend SLA.
              </p>
            </div>
          )}
        </div>

        {/* SECTION 4: Documents & Clinical Materials */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Paperclip size={18} style={{ color: C.cyan }} />
              <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>4. Documents & Materials (Optional)</h2>
            </div>
            <button
              type="button"
              onClick={() => documentInputRef.current?.click()}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              <Plus size={14} /> Add Document
            </button>
          </div>
          <p style={{ fontSize: 12, color: C.muted, margin: "0 0 16px" }}>
            Attach optional lecture notes, high-yield summaries, or algorithmic flowcharts. A revision can contain 0 attachments.
          </p>

          {attachments.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {attachments.map((att) => (
                <div
                  key={att.id}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px", background: C.elevated, border: `1px solid ${C.border}`,
                    borderRadius: 8
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <FileText size={16} style={{ color: "#ef4444" }} />
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{att.name}</span>
                      <span style={{ fontSize: 11, color: C.muted, marginInlineStart: 8 }}>
                        ({att.type} · {att.sizeFormatted})
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(att.id)}
                    style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: 4 }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "16px", textAlign: "center", background: C.elevated, borderRadius: 8, color: C.muted, fontSize: 12 }}>
              No documents attached yet. Documents are optional.
            </div>
          )}
        </div>

        {/* SECTION 5: Assessment Quiz (Section 4 & 28) */}
        <div style={{ background: C.surface, border: `1px solid ${quiz ? `${C.purple}44` : C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ClipboardCheck size={18} style={{ color: C.purple }} />
              <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>5. Assessment Quiz (Optional)</h2>
            </div>
            {quiz && (
              <span style={{ fontSize: 11, fontWeight: 700, color: quiz.status === "Published" ? "#4ade80" : C.muted, background: quiz.status === "Published" ? "rgba(74,222,128,0.12)" : "rgba(169,181,199,0.12)", padding: "3px 10px", borderRadius: 12 }}>
                {quiz.status}
              </span>
            )}
          </div>
          <p style={{ fontSize: 12, color: C.muted, margin: "0 0 16px" }}>
            Every revision unit can have an attached assessment quiz (just like any lecture) to test recall immediately after learning.
          </p>

          {quiz ? (
            <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(168,85,247,0.12)", border: `1px solid ${C.purple}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ClipboardCheck size={18} style={{ color: C.purple }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{quiz.title}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
                      {quiz.questionCount} Questions · Pass Criteria: <strong style={{ color: "#4ade80" }}>{quiz.passingScore}%</strong> · Time Limit: {quiz.timeLimitMinutes} Mins · Max Retakes: {quiz.maxAttempts}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setIsQuizAttemptsOpen(true)}
                    style={{ padding: "7px 14px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.text, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    View Attempts
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQuizEditorOpen(true)}
                    style={{ padding: "7px 16px", borderRadius: 6, background: C.cyan, border: "none", color: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Manage Quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuiz(null)}
                    title="Remove Quiz"
                    style={{ padding: "7px 10px", borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: 12, cursor: "pointer" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ border: `2px dashed ${C.border}`, borderRadius: 10, padding: "24px 20px", textAlign: "center", background: C.elevated }}>
              <FileQuestion size={28} style={{ color: C.muted, margin: "0 auto 8px", opacity: 0.6 }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>No Assessment Attached</div>
              <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 14px" }}>
                Optionally attach a multiple-choice assessment quiz to evaluate students on this revision.
              </p>
              <button
                type="button"
                onClick={() => setIsQuizEditorOpen(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 8, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: C.purple, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                <Plus size={14} /> Create Revision Quiz
              </button>
            </div>
          )}
        </div>

        {/* SECTION 6: Availability & Publication */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Calendar size={18} style={{ color: C.cyan }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>6. Availability & Lifecycle State</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Available From (Optional)</label>
              <input
                type="date"
                value={availFrom}
                onChange={(e) => setAvailFrom(e.target.value)}
                style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Available Until (Optional)</label>
              <input
                type="date"
                value={availUntil}
                onChange={(e) => setAvailUntil(e.target.value)}
                style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Target Status</label>
            <div style={{ display: "flex", gap: 8 }}>
              {(["Draft", "Scheduled", "Active"] as RevisionStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  style={{
                    padding: "8px 18px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                    border: `1px solid ${status === st ? C.cyan : C.border}`,
                    background: status === st ? "rgba(53,224,223,0.12)" : "transparent",
                    color: status === st ? C.cyan : C.muted, cursor: "pointer", fontFamily: "inherit"
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
