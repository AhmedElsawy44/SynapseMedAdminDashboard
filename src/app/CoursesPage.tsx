import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen, Search, SlidersHorizontal, ArrowUpDown, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, MoreHorizontal, Eye, AlertCircle, RefreshCw,
  Plus, FileText, Settings2, Play, Check, Clock, Film, Video, ShieldCheck,
  Award, Users, Layers, ExternalLink, Sparkles
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

import { CourseLecture, CourseItem, COURSE_STATUS_CONFIG } from "./courseTypes";
import { SAMPLE_LECTURE_QUIZ } from "./QuizzesPage";
export type { CourseLecture, CourseItem };
export { COURSE_STATUS_CONFIG };

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: "crs-001",
    slug: "advanced-clinical-cardiology-ecg-masterclass",
    code: "CARD-401",
    title: "Advanced Clinical Cardiology & ECG Masterclass",
    description: "In-depth diagnostic cardiology covering electrophysiology, acute coronary syndromes, valvular heart disease, and emergency catheterization indications.",
    specialty: "Cardiology",
    targetLevel: "Year 4 — Clinical Rotations",
    priceAmount: 1400,
    priceCurrency: "EGP",
    instructor: "Prof. Dr. Mostafa Omar",
    instructorTitle: "Professor of Cardiovascular Medicine",
    status: "Published",
    updated: "Aug 28, 2026",
    enrolledStudents: 412,
    bunnyLibraryId: "syn-med-stream-9912",
    lectures: [
      { id: "lec-1", lectureNumber: 1, title: "Pathophysiology of Acute Coronary Syndromes (ACS)", durationMinutes: 48, bunnyVideoId: "b84f912c-391a-4d72-910a-8451f2bc8910", isPreview: true, status: "Published", transcodingStatus: "Ready", hasSlides: true },
      { id: "lec-2", lectureNumber: 2, title: "12-Lead ECG Interpretation: STEMI Equivalents", durationMinutes: 55, bunnyVideoId: "a190ef81-229c-482a-9921-99881122aaff", isPreview: false, status: "Published", transcodingStatus: "Ready", hasSlides: true, quiz: SAMPLE_LECTURE_QUIZ },
      { id: "lec-3", lectureNumber: 3, title: "Atrial Fibrillation & Anticoagulation (CHA2DS2-VASc)", durationMinutes: 42, bunnyVideoId: "c331902a-9912-4011-8843-129930401102", isPreview: false, status: "Published", transcodingStatus: "Ready", hasSlides: true },
      { id: "lec-4", lectureNumber: 4, title: "Emergency PCI Indications & Guideline Updates", durationMinutes: 60, bunnyVideoId: "d774102c-1122-4433-8899-009988776655", isPreview: false, status: "Published", transcodingStatus: "Ready", hasSlides: false },
      { id: "lec-5", lectureNumber: 5, title: "Heart Failure with Reduced Ejection Fraction (HFrEF)", durationMinutes: 52, bunnyVideoId: "e9912233-4455-6677-8899-112233445566", isPreview: false, status: "Published", transcodingStatus: "Ready", hasSlides: true },
    ],
  },
  {
    id: "crs-002",
    slug: "emergency-resuscitation-shock-trauma-protocols",
    code: "EMRG-502",
    title: "Emergency Resuscitation, Shock & Trauma Protocols",
    description: "Evidence-based emergency resuscitation guidelines, hemodynamic shock classification, airway management, and thoracic trauma triage.",
    specialty: "Emergency Medicine",
    targetLevel: "Year 5 — Clinical Medicine",
    priceAmount: 1100,
    priceCurrency: "EGP",
    instructor: "Dr. Tarek Al-Husseini",
    instructorTitle: "Consultant of Emergency & Critical Care",
    status: "Published",
    updated: "Aug 25, 2026",
    enrolledStudents: 328,
    bunnyLibraryId: "syn-med-stream-9912",
    lectures: [
      { id: "lec-6", lectureNumber: 1, title: "Advanced Cardiac Life Support (ACLS) Algorithm 2026", durationMinutes: 50, bunnyVideoId: "f1122334-5566-7788-9900-aabbccddeeff", isPreview: true, status: "Published", transcodingStatus: "Ready", hasSlides: true },
      { id: "lec-7", lectureNumber: 2, title: "Septic Shock: Early Goal-Directed Therapy & Vasopressors", durationMinutes: 46, bunnyVideoId: "a0011223-3445-5667-7889-9aabbccddeef", isPreview: false, status: "Published", transcodingStatus: "Ready", hasSlides: true },
      { id: "lec-8", lectureNumber: 3, title: "Point-of-Care Ultrasound (POCUS) in Hemodynamic Shock", durationMinutes: 58, bunnyVideoId: "b1122334-4556-6778-8990-0aabbccddeef", isPreview: false, status: "Published", transcodingStatus: "Ready", hasSlides: true },
    ],
  },
  {
    id: "crs-003",
    slug: "comprehensive-internal-medicine-clinical-review",
    code: "INTM-301",
    title: "Comprehensive Internal Medicine Clinical Review",
    description: "Core syllabus covering nephrology, endocrinology, rheumatology, and systemic autoimmune disorders for medical board preparation.",
    specialty: "Internal Medicine",
    targetLevel: "Year 5 — Clinical Medicine",
    priceAmount: 1800,
    priceCurrency: "EGP",
    instructor: "Prof. Dr. Layla Mahmoud",
    instructorTitle: "Professor of Internal Medicine",
    status: "Published",
    updated: "Aug 19, 2026",
    enrolledStudents: 290,
    bunnyLibraryId: "syn-med-stream-9912",
    lectures: [
      { id: "lec-9", lectureNumber: 1, title: "Diabetic Ketoacidosis & Hyperosmolar Hyperglycemic State", durationMinutes: 54, bunnyVideoId: "c2233445-5667-7889-9001-1aabbccddeef", isPreview: true, status: "Published", transcodingStatus: "Ready", hasSlides: true },
      { id: "lec-10", lectureNumber: 2, title: "Acute Kidney Injury: KDIGO Staging & Management", durationMinutes: 47, bunnyVideoId: "d3344556-6778-8990-0112-2aabbccddeef", isPreview: false, status: "Published", transcodingStatus: "Ready", hasSlides: true },
    ],
  },
  {
    id: "crs-004",
    slug: "clinical-pharmacology-antimicrobial-stewardship",
    code: "PHRM-202",
    title: "Clinical Pharmacology & Antimicrobial Stewardship",
    description: "Mechanism of action, pharmacokinetics, adverse drug interactions, and hospital antibiogram guidance for multidrug-resistant pathogens.",
    specialty: "Clinical Pharmacology",
    targetLevel: "Year 3 — Basic Sciences",
    priceAmount: 950,
    priceCurrency: "EGP",
    instructor: "Dr. Karim Nader",
    instructorTitle: "Associate Professor of Pharmacology",
    status: "Draft",
    updated: "Aug 14, 2026",
    enrolledStudents: 0,
    bunnyLibraryId: "syn-med-stream-9912",
    lectures: [
      { id: "lec-11", lectureNumber: 1, title: "Antimicrobial Resistance & Carbapenemase-Producing Enterobacteriaceae", durationMinutes: 44, bunnyVideoId: "", isPreview: true, status: "Draft", transcodingStatus: "Pending", hasSlides: false },
    ],
  },
  {
    id: "crs-005",
    slug: "neurology-board-review-stroke-neurocritical-care",
    code: "NEUR-404",
    title: "Neurology Board Review: Stroke & Neurocritical Care",
    description: "Acute ischemic stroke thrombolytic windows, mechanical thrombectomy criteria, intracerebral hemorrhage, and status epilepticus management.",
    specialty: "Neurology",
    targetLevel: "Post-Graduate Board Review",
    priceAmount: 1350,
    priceCurrency: "EGP",
    instructor: "Dr. Sherif Kamel",
    instructorTitle: "Consultant of Interventional Neurology",
    status: "Draft",
    updated: "Aug 08, 2026",
    enrolledStudents: 145,
    bunnyLibraryId: "syn-med-stream-9912",
    lectures: [
      { id: "lec-12", lectureNumber: 1, title: "Time-Window Protocols in Acute Ischemic Stroke", durationMinutes: 52, bunnyVideoId: "e4455667-7889-9001-1223-3aabbccddeef", isPreview: true, status: "Draft", transcodingStatus: "Ready", hasSlides: true },
      { id: "lec-13", lectureNumber: 2, title: "Refractory Status Epilepticus Treatment Protocols", durationMinutes: 49, bunnyVideoId: "f5566778-8990-0112-2334-4aabbccddeef", isPreview: false, status: "Draft", transcodingStatus: "Ready", hasSlides: true },
    ],
  },
];

function CourseStatusBadge({ status }: { status: string }) {
  const cfg = COURSE_STATUS_CONFIG[status] ?? { color: C.muted, bg: "rgba(169,181,199,0.1)" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}33`, fontSize: 12, fontWeight: 600, color: cfg.color, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ─── Course Details Component ─────────────────────────────────────────────────
export function CourseDetailsPage({
  course: courseProp,
  courseId,
  coursesList = INITIAL_COURSES,
  onBack,
  onEdit,
  onPublish,
  onArchive,
}: {
  course?: CourseItem;
  courseId?: string;
  coursesList?: CourseItem[];
  onBack: () => void;
  onEdit: () => void;
  onPublish?: () => void;
  onArchive?: () => void;
}) {
  const course = courseProp || coursesList.find((c) => c.id === courseId || c.code === courseId) || coursesList[0];
  const totalDuration = course.lectures.reduce((sum, l) => sum + (l.durationMinutes || 0), 0);
  const totalHours = (totalDuration / 60).toFixed(1);

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: 24 }}>
      
      {/* Breadcrumb + Back */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <button onClick={onBack} style={{ fontSize: 12, color: C.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
            Courses
          </button>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>{course.title}</span>
        </div>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <ChevronLeft size={14} /> Back to Courses
        </button>
      </div>

      {/* Hero Header */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", maxWidth: 840 }}>
          <div style={{ width: 64, height: 64, borderRadius: 12, background: "rgba(53,224,223,0.12)", border: `1px solid ${C.cyan}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <BookOpen size={28} style={{ color: C.cyan }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: C.cyan, background: C.elevated, padding: "2px 8px", borderRadius: 6, border: `1px solid ${C.border}` }}>
                {course.code}
              </span>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>{course.title}</h1>
              <CourseStatusBadge status={course.status} />
            </div>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              {course.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", fontSize: 12, color: C.muted }}>
              <span>Specialty: <strong style={{ color: C.text }}>{course.specialty}</strong></span>
              <span>•</span>
              <span>Level: <strong style={{ color: C.text }}>{course.targetLevel}</strong></span>
              <span>•</span>
              <span>Instructor: <strong style={{ color: C.cyan }}>{course.instructor}</strong> ({course.instructorTitle})</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {course.status !== "Published" && onPublish && (
            <button
              onClick={onPublish}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              <Check size={14} /> Publish Course
            </button>
          )}
          {course.status !== "Archived" && onArchive && (
            <button
              onClick={onArchive}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Archive
            </button>
          )}
          <button onClick={onEdit}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 8, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <FileText size={14} /> Edit Curriculum
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="max-md:grid-cols-2">
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Curriculum Lectures</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{course.lectures.length} Units</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Total Duration</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.cyan }}>{totalHours} Hours</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Active Students</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#4ade80" }}>{course.enrolledStudents} Enrolled</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>CDN Host</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginTop: 4 }}>Bunny Stream DRM</div>
        </div>
      </div>

      {/* Lectures Playlist Ledger */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Structured Lectures & Video Units</div>
            <div style={{ fontSize: 12, color: C.muted }}>Tokenized streaming video delivery via Bunny CDN</div>
          </div>
          <button onClick={onEdit}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 6, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <Plus size={13} /> Add New Unit
          </button>
        </div>
        
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ height: 42, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "0 24px", textAlign: "start", width: 60 }}>#</th>
              <th style={{ padding: "0 24px", textAlign: "start" }}>Lecture Title</th>
              <th style={{ padding: "0 24px", textAlign: "start", width: 140 }}>Duration</th>
              <th style={{ padding: "0 24px", textAlign: "start", width: 180 }}>Bunny Stream GUID</th>
              <th style={{ padding: "0 24px", textAlign: "start", width: 140 }}>Transcoding</th>
              <th style={{ padding: "0 24px", textAlign: "end", width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {course.lectures.map((lec) => (
              <tr key={lec.id} style={{ height: 60, borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "0 24px", fontSize: 12, fontWeight: 700, color: C.muted }}>
                  {String(lec.lectureNumber).padStart(2, "0")}
                </td>
                <td style={{ padding: "0 24px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{lec.title}</div>
                  {lec.hasSlides && <span style={{ fontSize: 11, color: C.muted }}>Attached clinical PDF slides</span>}
                </td>
                <td style={{ padding: "0 24px", fontSize: 12, color: C.cyan, fontWeight: 600 }}>
                  <Clock size={12} style={{ display: "inline", marginInlineEnd: 4 }} />
                  {lec.durationMinutes} min
                </td>
                <td style={{ padding: "0 24px", fontFamily: "monospace", fontSize: 11, color: C.muted }}>
                  {lec.bunnyVideoId ? (
                    <span title={lec.bunnyVideoId}>
                      {lec.bunnyVideoId.slice(0, 14)}...
                    </span>
                  ) : (
                    <span style={{ color: "#f87171" }}>Not linked</span>
                  )}
                </td>
                <td style={{ padding: "0 24px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, background: lec.transcodingStatus === "Ready" ? "rgba(74,222,128,0.1)" : "rgba(251,191,36,0.1)", color: lec.transcodingStatus === "Ready" ? "#4ade80" : "#fbbf24", border: `1px solid ${lec.transcodingStatus === "Ready" ? "#4ade8033" : "#fbbf2433"}` }}>
                    {lec.transcodingStatus === "Ready" ? <Check size={11} /> : <RefreshCw size={11} />}
                    {lec.transcodingStatus}
                  </span>
                </td>
                <td style={{ padding: "0 24px", textAlign: "end" }}>
                  <button onClick={onEdit}
                    style={{ padding: "5px 12px", borderRadius: 6, background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                    Edit Unit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

// ─── Courses Directory Screen ─────────────────────────────────────────────────
export default function CoursesPage({
  courses: coursesProp,
  onViewCourse,
  onCreateCourse,
  onEditCourse,
}: {
  courses?: CourseItem[];
  onViewCourse: (index: number) => void;
  onCreateCourse?: () => void;
  onEditCourse?: (index: number) => void;
}) {
  const courses = coursesProp || INITIAL_COURSES;
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  let filtered = courses;
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.specialty.toLowerCase().includes(q)
    );
  }
  if (specialtyFilter) filtered = filtered.filter((c) => c.specialty === specialtyFilter);
  if (statusFilter) filtered = filtered.filter((c) => c.status === statusFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main style={{ flex: 1, padding: 32, fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0 }}>
      
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Admin Console</span>
          <ChevronRight size={11} style={{ color: "rgba(169,181,199,0.35)" }} />
          <span style={{ fontSize: 12, color: C.cyan }}>Courses</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.01em" }}>Course Catalog</h1>
            <p style={{ fontSize: 14, color: C.muted, margin: "4px 0 0" }}>Manage medical video lectures, clinical curricula, and Bunny Stream DRM protection.</p>
          </div>
          <button onClick={() => { if (onCreateCourse) onCreateCourse(); else onViewCourse(0); }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, background: C.cyan, border: "none", color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            <Plus size={14} /> Create Course
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }} className="max-md:grid-cols-2">
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Active Curricula</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.cyan }}>{courses.length} Courses</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Published & Live</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#4ade80" }}>
            {courses.filter((c) => c.status === "Published").length} Courses
          </div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Total Video Units</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>
            {courses.reduce((sum, c) => sum + c.lectures.length, 0)} Lectures
          </div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Enrolled Doctors/Students</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#60a5fa" }}>
            {courses.reduce((sum, c) => sum + c.enrolledStudents, 0)} Students
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 400 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by title, code, instructor, specialty..."
            style={{ width: "100%", height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>

        {/* Specialty Filter */}
        <select
          value={specialtyFilter || ""}
          onChange={(e) => { setSpecialtyFilter(e.target.value || null); setPage(1); }}
          style={{ height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", color: specialtyFilter ? C.cyan : C.muted, fontSize: 13, outline: "none", cursor: "pointer", fontFamily: "inherit" }}>
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Emergency Medicine">Emergency Medicine</option>
          <option value="Internal Medicine">Internal Medicine</option>
          <option value="Clinical Pharmacology">Clinical Pharmacology</option>
          <option value="Neurology">Neurology</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter || ""}
          onChange={(e) => { setStatusFilter(e.target.value || null); setPage(1); }}
          style={{ height: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", color: statusFilter ? C.cyan : C.muted, fontSize: 13, outline: "none", cursor: "pointer", fontFamily: "inherit" }}>
          <option value="">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="In Review">In Review</option>
          <option value="Archived">Archived</option>
        </select>

        {(specialtyFilter || statusFilter || search) && (
          <button
            onClick={() => { setSearch(""); setSpecialtyFilter(null); setStatusFilter(null); setPage(1); }}
            style={{ height: 40, padding: "0 14px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Courses Catalog Table */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ height: 44, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Course Code & Title</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Specialty & Level</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Instructor</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Lectures</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Status</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Updated</th>
              <th style={{ padding: "0 20px", textAlign: "end" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((course, idx) => (
              <tr key={course.id}
                onClick={() => onViewCourse(idx)}
                style={{ height: 72, borderBottom: `1px solid ${C.border}`, cursor: "pointer", transition: "background 0.12s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <td style={{ padding: "0 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <BookOpen size={18} style={{ color: C.cyan }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontFamily: "monospace", color: C.cyan, fontWeight: 700 }}>{course.code}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{course.title}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "0 20px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{course.specialty}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{course.targetLevel}</div>
                </td>
                <td style={{ padding: "0 20px" }}>
                  <div style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{course.instructor}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{course.instructorTitle}</div>
                </td>
                <td style={{ padding: "0 20px", fontSize: 13, color: C.text, fontWeight: 600 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Film size={14} style={{ color: C.cyan }} />
                    {course.lectures.length} Units
                  </div>
                </td>
                <td style={{ padding: "0 20px" }}>
                  <CourseStatusBadge status={course.status} />
                </td>
                <td style={{ padding: "0 20px", fontSize: 12, color: C.muted }}>
                  {course.updated}
                </td>
                <td style={{ padding: "0 20px", textAlign: "end" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {onEditCourse && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onEditCourse(idx); }}
                        style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        Edit
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); onViewCourse(idx); }}
                      style={{ padding: "6px 14px", borderRadius: 6, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <Eye size={13} /> View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 12, color: C.muted }}>Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} courses</span>
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
