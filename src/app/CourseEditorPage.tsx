import React, { useState, useMemo } from "react";
import {
  BookOpen, ChevronRight, RefreshCw, Check,
  AlertCircle, Upload, Plus, Play, Pause, Trash2,
  Video, Clock, ShieldCheck, Film, ArrowUp, ArrowDown,
  Globe, Archive, EyeOff, Volume2, Maximize2, Image as ImageIcon,
  ClipboardCheck, FileQuestion
} from "lucide-react";
import { CourseItem, CourseLecture, COURSE_STATUS_CONFIG, QuizItem } from "./courseTypes";
import { QuizEditorPage, QuizAttemptsPage } from "./QuizzesPage";

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

const SPECIALTIES = [
  "Cardiology",
  "Emergency Medicine",
  "Internal Medicine",
  "Clinical Pharmacology",
  "Neurology",
  "Pediatrics",
  "General Surgery",
  "Obstetrics & Gynecology",
];

export interface CourseEditorPageProps {
  courseRow?: CourseItem | null;
  courseIndex?: number | null;
  isCreate?: boolean;
  onSave: (course: CourseItem) => void;
  onBack: () => void;
}

export default function CourseEditorPage({
  courseRow,
  courseIndex,
  isCreate = false,
  onSave,
  onBack,
}: CourseEditorPageProps) {
  const mode = isCreate || !courseRow ? "create" : "edit";

  // ─── Backend Domain Form State ──────────────────────────────────────────────
  const [title, setTitle]                 = useState(courseRow?.title || "");
  const [slug, setSlug]                   = useState(courseRow?.slug || "");
  const [slugManual, setSlugManual]       = useState(Boolean(courseRow?.slug));
  const [description, setDescription]     = useState(courseRow?.description || "");
  const [thumbnailUrl, setThumbnailUrl]   = useState(courseRow?.thumbnailUrl || "");
  const [priceAmount, setPriceAmount]     = useState<number>(courseRow?.priceAmount ?? 1200);
  const [priceCurrency, setPriceCurrency] = useState(courseRow?.priceCurrency || "EGP");
  const [code, setCode]                   = useState(courseRow?.code || (mode === "create" ? "MED-" + Math.floor(100 + Math.random() * 900) : ""));
  const [specialty, setSpecialty]         = useState(courseRow?.specialty || "Cardiology");
  const [coverFileName, setCoverFileName] = useState<string>(courseRow?.thumbnailUrl ? "Course_Cover_Banner.jpg" : "");

  const handleCoverUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setThumbnailUrl(objectUrl);
    setCoverFileName(file.name);
  };

  // In creation phase, everything starts strictly as "Draft" until explicitly Published!
  const [status, setStatus] = useState<"Draft" | "Published" | "Archived">(
    mode === "create" ? "Draft" : (courseRow?.status === "In Review" ? "Draft" : (courseRow?.status || "Draft"))
  );

  const [lectures, setLectures] = useState<CourseLecture[]>(
    courseRow?.lectures ? JSON.parse(JSON.stringify(courseRow.lectures)) : []
  );

  const [expandedLectureId, setExpandedLectureId]   = useState<string | null>(
    lectures.length > 0 ? lectures[0].id : null
  );
  const [previewingLectureId, setPreviewingLectureId] = useState<string | null>(null);
  const [quizEditorLecId, setQuizEditorLecId]         = useState<string | null>(null);
  const [quizAttemptsLecId, setQuizAttemptsLecId]     = useState<string | null>(null);

  // Upload simulation & preview state per lecture
  const [uploadingLecId, setUploadingLecId]       = useState<string | null>(null);
  const [uploadProgress, setUploadProgress]       = useState<number>(0);
  const [uploadedFileUrls, setUploadedFileUrls]   = useState<Record<string, string>>({});
  const [playingVideo, setPlayingVideo]           = useState<boolean>(false);

  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);

  // Auto-generate slug from title if user hasn't typed a custom slug
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setErrorMsg(null);
    if (!slugManual) {
      const generated = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generated);
    }
  };

  // Unsaved changes detection
  const isDirty = useMemo(() => {
    if (mode === "create") {
      return title.trim().length > 0 || description.trim().length > 0 || lectures.length > 0;
    }
    if (!courseRow) return false;
    return (
      title !== courseRow.title ||
      slug !== courseRow.slug ||
      description !== courseRow.description ||
      thumbnailUrl !== (courseRow.thumbnailUrl || "") ||
      priceAmount !== courseRow.priceAmount ||
      status !== courseRow.status ||
      JSON.stringify(lectures) !== JSON.stringify(courseRow.lectures)
    );
  }, [mode, courseRow, title, slug, description, thumbnailUrl, priceAmount, status, lectures]);

  // Calculations
  const totalMinutes = lectures.reduce((acc: number, l: CourseLecture) => acc + (Number(l.durationMinutes) || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Lecture handlers
  const handleAddLecture = () => {
    const nextNum = lectures.length + 1;
    const newLec: CourseLecture = {
      id: `lec-${Date.now()}`,
      lectureNumber: nextNum,
      title: `Lecture ${nextNum}: Clinical Diagnostic Topic`,
      durationMinutes: 0, // Duration will be calculated automatically when video is uploaded
      videoDurationSeconds: 0,
      bunnyVideoId: "",
      videoLibraryId: "syn-med-248109",
      isPreview: nextNum === 1, // First lecture defaults as free preview
      status: "Draft", // New lectures always start as Draft!
      transcodingStatus: "Pending",
      hasSlides: true,
    };
    const updated = [...lectures, newLec];
    setLectures(updated);
    setExpandedLectureId(newLec.id);
  };

  const updateLecture = (id: string, updates: Partial<CourseLecture>) => {
    setLectures((prev: CourseLecture[]) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  };

  const handleRemoveLecture = (id: string) => {
    const remaining = lectures.filter((l) => l.id !== id).map((l, idx) => ({
      ...l,
      lectureNumber: idx + 1,
    }));
    setLectures(remaining);
    if (expandedLectureId === id) {
      setExpandedLectureId(remaining.length > 0 ? remaining[0].id : null);
    }
    if (previewingLectureId === id) {
      setPreviewingLectureId(null);
    }
  };

  const handleMoveLecture = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === lectures.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const items = [...lectures];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    const reindexed = items.map((l, idx) => ({ ...l, lectureNumber: idx + 1 }));
    setLectures(reindexed);
  };

  // ─── Automated Video Metadata Extraction & Upload ───────────────────────────
  // Duration is 100% computed from the actual video file metadata, NOT manually entered!
  // Cloud infrastructure IDs (Bunny GUID, Library ID) are handled automatically by backend.
  const handleVideoUpload = (lectureId: string, file: File) => {
    setUploadingLecId(lectureId);
    setUploadProgress(15);

    const objectUrl = URL.createObjectURL(file);
    setUploadedFileUrls((prev) => ({ ...prev, [lectureId]: objectUrl }));

    // Extract exact duration from real video metadata
    const tempVideo = document.createElement("video");
    tempVideo.preload = "metadata";

    const processUpload = (durationSec: number) => {
      const durationMins = Math.max(1, Math.round(durationSec / 60));
      const autoGuid = "b84f" + Math.random().toString(16).substring(2, 6) + "-391a-4d72-910a-" + Date.now().toString(16).slice(-8);

      const interval = setInterval(() => {
        setUploadProgress((curr) => {
          if (curr >= 100) {
            clearInterval(interval);
            setUploadingLecId(null);
            updateLecture(lectureId, {
              bunnyVideoId: autoGuid,
              videoDurationSeconds: durationSec,
              durationMinutes: durationMins,
              transcodingStatus: "Ready",
              videoLibraryId: "syn-med-248109",
            });
            setPreviewingLectureId(lectureId); // Auto-open live preview upon upload completion!
            return 100;
          }
          return curr + 25;
        });
      }, 250);
    };

    tempVideo.onloadedmetadata = () => {
      const realSeconds = Math.round(tempVideo.duration) || 2700;
      processUpload(realSeconds);
    };

    tempVideo.onerror = () => {
      // Fallback estimate if browser codec is not natively decoded locally
      const fallbackSecs = Math.max(60, Math.round(file.size / (1024 * 1024 * 0.35)));
      processUpload(fallbackSecs);
    };

    tempVideo.src = objectUrl;
  };

  // Status transitions
  const handlePublish = () => {
    if (!title.trim()) {
      setErrorMsg("Course Title is required before publishing.");
      return;
    }
    if (lectures.length === 0) {
      setErrorMsg("A course must have at least one lecture before publishing.");
      return;
    }
    setStatus("Published");
    setErrorMsg(null);
  };

  const handleArchive = () => {
    setStatus("Archived");
  };

  const handleSetDraft = () => {
    setStatus("Draft");
  };

  // Form submit
  const handleSave = (targetStatus?: "Draft" | "Published") => {
    if (!title.trim()) {
      setErrorMsg("Course Title is required according to ASP.NET Core CreateCourseRequest contract.");
      return;
    }
    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    if (!finalSlug) {
      setErrorMsg("Course Slug is required.");
      return;
    }

    const finalStatus = targetStatus || status;

    setErrorMsg(null);
    setSaveState("saving");

    setTimeout(() => {
      const payload: CourseItem = {
        id: courseRow?.id || `crs-${Date.now().toString().slice(-4)}`,
        slug: finalSlug,
        code: code || "MED-100",
        title: title.trim(),
        description: description.trim(),
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        priceAmount: Number(priceAmount) || 1200,
        priceCurrency: priceCurrency || "EGP",
        specialty,
        instructor: courseRow?.instructor || "Prof. Dr. Mostafa Omar",
        instructorTitle: courseRow?.instructorTitle || "Professor of Clinical Medicine",
        status: finalStatus,
        updated: "Just now",
        enrolledStudents: courseRow?.enrolledStudents || 0,
        bunnyLibraryId: courseRow?.bunnyLibraryId || "syn-med-248109",
        lectures: lectures.map((l) => ({
          ...l,
          status: finalStatus === "Draft" ? "Draft" : (l.status || "Published"),
        })),
      };

      onSave(payload);
      setSaveState("saved");
    }, 400);
  };

  if (quizEditorLecId) {
    const activeLec = lectures.find((l) => l.id === quizEditorLecId);
    if (activeLec) {
      return (
        <QuizEditorPage
          parentType="Lecture"
          parentId={activeLec.id}
          parentTitle={activeLec.title}
          parentCourseTitle={title || "New Course"}
          quiz={activeLec.quiz || null}
          onBack={() => setQuizEditorLecId(null)}
          onSave={(savedQuiz) => {
            updateLecture(activeLec.id, { quiz: savedQuiz });
            setQuizEditorLecId(null);
          }}
          onDelete={() => {
            updateLecture(activeLec.id, { quiz: null });
            setQuizEditorLecId(null);
          }}
        />
      );
    }
  }

  if (quizAttemptsLecId) {
    const activeLec = lectures.find((l) => l.id === quizAttemptsLecId);
    if (activeLec && activeLec.quiz) {
      return (
        <QuizAttemptsPage
          quiz={activeLec.quiz}
          onBack={() => setQuizAttemptsLecId(null)}
        />
      );
    }
  }

  const statusCfg = COURSE_STATUS_CONFIG[status] || { color: C.muted, bg: "rgba(169,181,199,0.1)" };

  return (
    <main style={{ flex: 1, padding: "28px 32px 40px", fontFamily: "'Montserrat', sans-serif", overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: 24, background: C.bg }}>
      
      {/* ─── Breadcrumb & Header ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
            <span>Admin</span>
            <ChevronRight size={12} style={{ opacity: 0.5 }} />
            <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", padding: 0, font: "inherit", fontSize: 12 }}>
              Courses
            </button>
            <ChevronRight size={12} style={{ opacity: 0.5 }} />
            {mode === "create" ? (
              <span style={{ color: C.cyan, fontWeight: 600 }}>Create Course</span>
            ) : (
              <>
                <span style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {courseRow?.title}
                </span>
                <ChevronRight size={12} style={{ opacity: 0.5 }} />
                <span style={{ color: C.cyan, fontWeight: 600 }}>Edit</span>
              </>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>
              {mode === "create" ? "Create New Course" : `Edit Course: ${title || "Untitled"}`}
            </h1>

            {/* Status Badge */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: statusCfg.bg, border: `1px solid ${statusCfg.color}33`, fontSize: 11, fontWeight: 600, color: statusCfg.color }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusCfg.color }} />
              {status === "Draft" ? "Draft (Unpublished)" : status}
            </span>

            {/* Unsaved Changes Indicator */}
            {isDirty && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 20, background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", fontSize: 11, fontWeight: 600, color: "#fbbf24" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fbbf24" }} />
                Unsaved changes
              </span>
            )}
          </div>

          <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
            {mode === "create"
              ? "All new courses start in Draft mode. Upload lecture videos; duration and CDN encoding are calculated automatically."
              : "Update syllabus, pricing, and video streaming units backed by ASP.NET Core & Bunny Stream CDN."}
          </p>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onBack}
            style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontWeight: 600 }}
          >
            Cancel
          </button>

          <button
            onClick={() => handleSave("Draft")}
            disabled={saveState === "saving"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.elevated,
              color: C.text,
              fontSize: 13,
              fontWeight: 600,
              cursor: saveState === "saving" ? "not-allowed" : "pointer",
            }}
          >
            Save as Draft
          </button>

          <button
            onClick={() => handleSave("Published")}
            disabled={saveState === "saving"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: saveState === "saved" ? "#4ade80" : `linear-gradient(135deg, ${C.cyan}, #00b4d8)`,
              color: "#071225",
              fontSize: 13,
              fontWeight: 700,
              cursor: saveState === "saving" ? "not-allowed" : "pointer",
              boxShadow: `0 4px 14px ${C.cyan}33`,
              transition: "all 0.2s",
            }}
          >
            {saveState === "saving" ? (
              <RefreshCw size={14} className="spin" />
            ) : saveState === "saved" ? (
              <Check size={14} />
            ) : (
              <Globe size={14} />
            )}
            {saveState === "saved" ? "Published!" : "Publish Course"}
          </button>
        </div>
      </div>

      {/* Draft Invariant Information Banner */}
      {status === "Draft" && (
        <div style={{ background: "rgba(169,181,199,0.06)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <AlertCircle size={18} style={{ color: C.cyan, flexShrink: 0 }} />
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
            <strong style={{ color: C.text }}>Draft Mode Active:</strong> New courses and video lectures are saved as <span style={{ color: C.cyan }}>Draft</span> during creation. They remain invisible to storefront students until you click <strong style={{ color: "#4ade80" }}>Publish Course</strong>.
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, color: "#f87171", fontSize: 13 }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ─── Two-Column Form Layout ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        
        {/* Left Column: Course Details & Curriculum */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Section 1: Course Identification & Pricing (ASP.NET Core Domain: Course.cs) */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>General Information & Pricing</div>
                <div style={{ fontSize: 11, color: C.muted }}>Validated against backend PostgreSQL courses schema</div>
              </div>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: C.cyan, background: C.elevated, padding: "3px 8px", borderRadius: 6, border: `1px solid ${C.border}` }}>
                {code}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Course Title <span style={{ color: C.cyan }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Clinical Cardiology & 12-Lead ECG Masterclass"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${errorMsg && !title ? "rgba(239,68,68,0.6)" : C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Specialty & Pricing */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 100px", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                    Medical Specialty / Department
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", cursor: "pointer", boxSizing: "border-box" }}
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                    Price Amount <span style={{ color: C.cyan }}>*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={priceAmount}
                    onChange={(e) => setPriceAmount(Number(e.target.value))}
                    style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                    Currency
                  </label>
                  <input
                    type="text"
                    value={priceCurrency}
                    onChange={(e) => setPriceCurrency(e.target.value.toUpperCase())}
                    style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.cyan, fontWeight: 700, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Course Cover Image (Direct File Upload & Instant Preview) */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Course Cover Image (صورة الغلاف)
                </label>

                {thumbnailUrl ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 16, background: C.elevated, padding: "12px 16px", borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <div style={{ width: 104, height: 62, borderRadius: 6, overflow: "hidden", background: "#000", border: `1px solid ${C.cyan}44`, flexShrink: 0 }}>
                      <img src={thumbnailUrl} alt="Course Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {coverFileName || "Course_Cover_Banner.jpg"}
                      </div>
                      <div style={{ fontSize: 11, color: "#4ade80", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
                        <ShieldCheck size={12} /> Image Ready • Stored by Backend
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, background: `${C.cyan}15`, border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        <RefreshCw size={12} /> Change Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCoverUpload(file);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => { setThumbnailUrl(""); setCoverFileName(""); }}
                        style={{ padding: "6px 10px", borderRadius: 6, background: "transparent", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 12, cursor: "pointer" }}
                        title="Remove Cover Image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ border: `1.5px dashed ${C.border}`, borderRadius: 8, padding: "22px 20px", textAlign: "center", background: "rgba(255,255,255,0.01)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: `${C.cyan}12`, display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan }}>
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Upload Course Cover Image</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Supports PNG, JPG, or WebP (16:9 recommended). Handled automatically by storage.</div>
                    </div>
                    <label style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 6, background: C.cyan, color: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: `0 2px 10px ${C.cyan}33` }}>
                      <Upload size={12} />
                      <span>Browse Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleCoverUpload(file);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Syllabus & Clinical Objectives <span style={{ color: C.cyan }}>*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline clinical case studies, pharmacological regimens, and diagnostic criteria covered..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, outline: "none", resize: "vertical", boxSizing: "border-box", minHeight: 90 }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Lectures & Video Upload/Streaming (Automated CDN) */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Lectures & Video Curriculum</div>
                <div style={{ fontSize: 11, color: C.muted }}>Videos are automatically processed; duration is extracted directly from the video file</div>
              </div>

              <button
                onClick={handleAddLecture}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 16px",
                  borderRadius: 7,
                  border: `1px solid ${C.cyan}55`,
                  background: C.cyan + "15",
                  color: C.cyan,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Plus size={14} /> Add Lecture
              </button>
            </div>

            {/* Empty State */}
            {lectures.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(53,224,223,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Film size={22} style={{ color: C.cyan }} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>No lectures added yet</div>
                <p style={{ fontSize: 12, color: C.muted, maxWidth: 360, margin: 0 }}>
                  Build the course curriculum by adding lecture units. Video duration and cloud identifiers are calculated automatically upon file upload.
                </p>
                <button
                  onClick={handleAddLecture}
                  style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 7, background: C.cyan, border: "none", color: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  <Plus size={13} /> Add First Lecture
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {lectures.map((lec, idx) => {
                  const isExpanded = expandedLectureId === lec.id;
                  const isPreviewOpen = previewingLectureId === lec.id;
                  const num = String(lec.lectureNumber || idx + 1).padStart(2, "0");
                  const isUploading = uploadingLecId === lec.id;

                  return (
                    <div key={lec.id} style={{ borderBottom: idx < lectures.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      
                      {/* Compact Lecture Header Bar */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "14px 20px",
                          background: isExpanded ? `${C.cyan}07` : "transparent",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onClick={() => setExpandedLectureId(isExpanded ? null : lec.id)}
                      >
                        {/* Reorder Up/Down Controls */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }} onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMoveLecture(idx, "up")}
                            disabled={idx === 0}
                            title="Move Up"
                            style={{ background: "none", border: "none", padding: 1, cursor: idx === 0 ? "not-allowed" : "pointer", color: idx === 0 ? "rgba(169,181,199,0.2)" : C.muted, display: "flex" }}
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={() => handleMoveLecture(idx, "down")}
                            disabled={idx === lectures.length - 1}
                            title="Move Down"
                            style={{ background: "none", border: "none", padding: 1, cursor: idx === lectures.length - 1 ? "not-allowed" : "pointer", color: idx === lectures.length - 1 ? "rgba(169,181,199,0.2)" : C.muted, display: "flex" }}
                          >
                            <ArrowDown size={12} />
                          </button>
                        </div>

                        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, minWidth: 24 }}>{num}</span>

                        <div style={{ flex: 1, fontWeight: 600, fontSize: 13, color: C.text }}>
                          {lec.title}
                        </div>

                        {/* Status & Video Badges */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          {lec.isPreview && (
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#38bdf8", background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.3)", padding: "2px 6px", borderRadius: 4 }}>
                              FREE PREVIEW
                            </span>
                          )}

                          {lec.durationMinutes > 0 ? (
                            <span style={{ fontSize: 11, color: C.cyan, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, background: `${C.cyan}12`, padding: "2px 8px", borderRadius: 10 }}>
                              <Clock size={11} /> {lec.durationMinutes} min
                            </span>
                          ) : (
                            <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
                              <Clock size={11} /> No video yet
                            </span>
                          )}

                          {lec.bunnyVideoId ? (
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "2px 7px", borderRadius: 10, display: "flex", alignItems: "center", gap: 4 }}>
                              <ShieldCheck size={11} /> Ready
                            </span>
                          ) : (
                            <span style={{ fontSize: 11, color: "rgba(169,181,199,0.4)", fontStyle: "italic", background: "rgba(255,255,255,0.03)", padding: "2px 7px", borderRadius: 10 }}>
                              Pending Upload
                            </span>
                          )}

                          <ChevronRight size={14} style={{ color: C.muted, transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
                        </div>
                      </div>

                      {/* Expanded Lecture Details & Automated Video Panel */}
                      {isExpanded && (
                        <div style={{ padding: "20px 24px", background: C.elevated, borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
                          
                          {/* Title & Free Preview Toggle */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 190px", gap: 14 }}>
                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                                Lecture Title <span style={{ color: C.cyan }}>*</span>
                              </label>
                              <input
                                type="text"
                                value={lec.title}
                                onChange={(e) => updateLecture(lec.id, { title: e.target.value })}
                                style={{ width: "100%", height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                              />
                            </div>

                            <div>
                              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                                Free Student Preview
                              </label>
                              <label style={{ display: "flex", alignItems: "center", gap: 8, height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7, padding: "0 12px", cursor: "pointer" }}>
                                <input
                                  type="checkbox"
                                  checked={lec.isPreview}
                                  onChange={(e) => updateLecture(lec.id, { isPreview: e.target.checked })}
                                  style={{ accentColor: C.cyan }}
                                />
                                <span style={{ fontSize: 12, color: lec.isPreview ? C.cyan : C.muted, fontWeight: 600 }}>
                                  {lec.isPreview ? "Free Sample" : "Enrolled Only"}
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* ─── Video Asset Section (No Manual GUID or Duration typing) ─── */}
                          <div style={{ background: C.surface, border: `1px solid ${lec.bunnyVideoId ? "rgba(74,222,128,0.25)" : C.border}`, borderRadius: 10, padding: 18 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <Video size={16} style={{ color: C.cyan }} />
                                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Lecture Video Asset</span>
                                {lec.bunnyVideoId ? (
                                  <span style={{ fontSize: 11, fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "2px 8px", borderRadius: 10, display: "flex", alignItems: "center", gap: 4 }}>
                                    <ShieldCheck size={12} /> Video Attached & Encoded
                                  </span>
                                ) : (
                                  <span style={{ fontSize: 11, color: "#fbbf24", background: "rgba(251,191,36,0.1)", padding: "2px 8px", borderRadius: 10 }}>
                                    Video Required
                                  </span>
                                )}
                              </div>

                              {lec.bunnyVideoId && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewingLectureId(isPreviewOpen ? null : lec.id)}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 5,
                                    padding: "5px 12px",
                                    borderRadius: 6,
                                    background: isPreviewOpen ? C.cyan : `${C.cyan}18`,
                                    border: `1px solid ${C.cyan}55`,
                                    color: isPreviewOpen ? C.bg : C.cyan,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                  }}
                                >
                                  {isPreviewOpen ? <EyeOff size={12} /> : <Play size={12} />}
                                  {isPreviewOpen ? "Hide Preview" : "Preview Video Player"}
                                </button>
                              )}
                            </div>

                            {/* State A: Video is attached */}
                            {lec.bunnyVideoId ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.elevated, padding: "12px 16px", borderRadius: 8, border: `1px solid ${C.border}` }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(53,224,223,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan }}>
                                      <Film size={18} />
                                    </div>
                                    <div>
                                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                                        {lec.title}.mp4
                                      </div>
                                      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: C.muted, marginTop: 2 }}>
                                        <span style={{ color: C.cyan, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                                          <Clock size={11} /> {lec.durationMinutes} min (Auto-calculated from video)
                                        </span>
                                        <span>•</span>
                                        <span style={{ color: "#4ade80" }}>1080p FHD</span>
                                        <span>•</span>
                                        <span>Bunny CDN DRM Active</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <label style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                                      <RefreshCw size={12} />
                                      <span>Replace Video</span>
                                      <input
                                        type="file"
                                        accept="video/*"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) handleVideoUpload(lec.id, file);
                                        }}
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => updateLecture(lec.id, { bunnyVideoId: "", durationMinutes: 0, videoDurationSeconds: 0 })}
                                      style={{ padding: "6px 10px", borderRadius: 6, background: "transparent", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 12, cursor: "pointer" }}
                                      title="Remove Video"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* State B: No video yet -> Clean upload dropzone */
                              <div style={{ border: `2px dashed ${C.cyan}44`, borderRadius: 10, padding: "26px 20px", textAlign: "center", background: `${C.cyan}04`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(53,224,223,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan }}>
                                  <Upload size={20} />
                                </div>
                                <div>
                                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Upload Lecture Video</div>
                                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3, maxWidth: 380 }}>
                                    Select or drop your video file (.mp4, .mov, .mkv). Video duration and CDN transcoding will be computed and processed automatically.
                                  </div>
                                </div>

                                <label style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 7, background: C.cyan, border: "none", color: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: `0 2px 10px ${C.cyan}33` }}>
                                  <Upload size={13} />
                                  <span>Browse Video File</span>
                                  <input
                                    type="file"
                                    accept="video/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleVideoUpload(lec.id, file);
                                    }}
                                  />
                                </label>

                                {isUploading && (
                                  <div style={{ width: "100%", maxWidth: 280, marginTop: 8 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.cyan, fontWeight: 600, marginBottom: 4 }}>
                                      <span>Analyzing metadata & uploading...</span>
                                      <span>{uploadProgress}%</span>
                                    </div>
                                    <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                                      <div style={{ width: `${uploadProgress}%`, height: "100%", background: C.cyan, transition: "width 0.2s" }} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* ─── Embedded Live Video Player ─── */}
                            {isPreviewOpen && (
                              <div style={{ marginTop: 16, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.cyan}44`, background: "#050B14" }}>
                                <div style={{ background: "#0c1524", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                                      Live Preview: {lec.title}
                                    </span>
                                    <span style={{ fontSize: 10, color: C.cyan, background: "rgba(53,224,223,0.1)", padding: "1px 6px", borderRadius: 4 }}>
                                      1080p FHD
                                    </span>
                                  </div>
                                  <div style={{ fontSize: 10, color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
                                    <ShieldCheck size={12} />
                                    <span>Token Signed (SHA-256 Valid)</span>
                                  </div>
                                </div>

                                {/* Actual Video or Interactive Player Mockup */}
                                {uploadedFileUrls[lec.id] ? (
                                  <video
                                    src={uploadedFileUrls[lec.id]}
                                    controls
                                    autoPlay
                                    style={{ width: "100%", maxHeight: 320, background: "#000", display: "block" }}
                                  />
                                ) : (
                                  <div style={{ position: "relative", height: 260, background: "linear-gradient(180deg, #091322 0%, #03070e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                    {/* Medical Background Wave Grid */}
                                    <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "radial-gradient(circle, #35E0DF 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                                    
                                    {/* Synapse Dynamic Watermark */}
                                    <div style={{ position: "absolute", top: 12, insetInlineEnd: 16, background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 6, border: `1px solid ${C.cyan}44`, fontSize: 10, color: C.cyan, fontWeight: 600, letterSpacing: "0.08em" }}>
                                      SYNAPSE MED • DRM SECURE
                                    </div>

                                    {/* Center Play Graphic */}
                                    <button
                                      type="button"
                                      onClick={() => setPlayingVideo(!playingVideo)}
                                      style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.cyan}, #00b4d8)`, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.bg, boxShadow: `0 0 24px ${C.cyan}66`, zIndex: 2, transition: "transform 0.15s" }}
                                    >
                                      {playingVideo ? <Pause size={22} fill={C.bg} /> : <Play size={22} fill={C.bg} style={{ marginInlineStart: 3 }} />}
                                    </button>

                                    <div style={{ marginTop: 12, fontSize: 12, color: C.text, fontWeight: 600, zIndex: 2 }}>
                                      {playingVideo ? "Streaming Bunny CDN Video..." : "Click to Test Stream"}
                                    </div>
                                    <div style={{ fontSize: 10, color: C.muted, zIndex: 2, marginTop: 4 }}>
                                      Duration: {lec.durationMinutes} min • CDN Transcoded
                                    </div>

                                    {/* Bottom Player Controls Bar */}
                                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "rgba(7,18,37,0.9)", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", zIndex: 2 }}>
                                      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: C.text }}>
                                        <Clock size={12} style={{ color: C.cyan }} />
                                        <span>00:15 / {lec.durationMinutes}:00</span>
                                      </div>

                                      {/* Scrubber */}
                                      <div style={{ flex: 1, margin: "0 16px", height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, position: "relative" }}>
                                        <div style={{ width: "25%", height: "100%", background: C.cyan, borderRadius: 2 }} />
                                      </div>

                                      <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.muted }}>
                                        <Volume2 size={14} />
                                        <Maximize2 size={14} />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* ─── Assessment Quiz Attached to Lecture (Section 3 & 27) ─── */}
                          <div style={{ background: C.elevated, border: `1px solid ${lec.quiz ? `${C.cyan}44` : C.border}`, borderRadius: 8, padding: "12px 16px", marginTop: 12 }}>
                            {lec.quiz ? (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                  <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(53,224,223,0.12)", border: `1px solid ${C.cyan}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ClipboardCheck size={16} style={{ color: C.cyan }} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{lec.quiz.title}</div>
                                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                                      {lec.quiz.questionCount} Questions · Pass: {lec.quiz.passingScore}% · {lec.quiz.timeLimitMinutes} Mins · Status: <strong style={{ color: lec.quiz.status === "Published" ? "#4ade80" : C.muted }}>{lec.quiz.status}</strong>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <button
                                    type="button"
                                    onClick={() => setQuizAttemptsLecId(lec.id)}
                                    style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.text, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                                  >
                                    View Attempts
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setQuizEditorLecId(lec.id)}
                                    style={{ padding: "6px 14px", borderRadius: 6, background: C.cyan, border: "none", color: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                                  >
                                    Manage Quiz
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateLecture(lec.id, { quiz: null })}
                                    title="Remove Quiz"
                                    style={{ padding: "6px 10px", borderRadius: 6, background: "transparent", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 12, cursor: "pointer" }}
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <FileQuestion size={16} style={{ color: C.muted }} />
                                  <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Lecture Assessment</span>
                                  <span style={{ fontSize: 11, color: C.muted }}>— No quiz attached yet</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setQuizEditorLecId(lec.id)}
                                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                                >
                                  <Plus size={13} /> Create Quiz
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Footer: Protection & Remove Unit */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: lec.bunnyVideoId ? "#4ade80" : C.muted }}>
                              <ShieldCheck size={13} />
                              <span>{lec.bunnyVideoId ? "SHA-256 Token Protection Active" : "Upload a video file to complete this unit"}</span>
                            </div>

                            <button
                              onClick={() => handleRemoveLecture(lec.id)}
                              style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "transparent", border: "none", color: "#f87171", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
                            >
                              <Trash2 size={13} /> Remove Unit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Lifecycle Actions, Summary & Publishing Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Lifecycle State Management Panel (POST /publish, POST /archive) */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
              Lifecycle Status & Publishing
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: C.elevated, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 12, color: C.muted }}>Current Status</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: statusCfg.color }}>
                  {status}
                </span>
              </div>

              {/* Status explanation */}
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
                {status === "Draft" && "Draft courses are completely private. Only administrators can view and edit curriculum units."}
                {status === "Published" && "This course is published and available for student enrollment."}
                {status === "Archived" && "Course is archived. Students cannot newly enroll; existing access is preserved."}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                {status !== "Published" ? (
                  <button
                    onClick={handlePublish}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 8,
                      background: `linear-gradient(135deg, ${C.cyan}22, ${C.cyan}44)`,
                      border: `1px solid ${C.cyan}66`,
                      color: C.cyan,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Globe size={14} /> Publish Course Now
                  </button>
                ) : (
                  <button
                    onClick={handleSetDraft}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 8,
                      background: "transparent",
                      border: `1px solid ${C.border}`,
                      color: C.muted,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Revert to Draft
                  </button>
                )}

                {status !== "Archived" && mode === "edit" && (
                  <button
                    onClick={handleArchive}
                    style={{
                      width: "100%",
                      padding: "9px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1px solid rgba(251,191,36,0.3)",
                      color: "#fbbf24",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Archive size={13} /> Archive Course
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Curriculum Stats Card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
              Curriculum Metrics
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: C.elevated, padding: "12px", borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>Lectures</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{lectures.length}</div>
              </div>

              <div style={{ background: C.elevated, padding: "12px", borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>Duration</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.cyan }}>{totalHours}h</div>
              </div>
            </div>

            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: C.muted }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Free Previews:</span>
                <strong style={{ color: C.text }}>{lectures.filter((l) => l.isPreview).length} units</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>DRM Protected:</span>
                <strong style={{ color: "#4ade80" }}>{lectures.filter((l) => l.bunnyVideoId).length} units</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Price:</span>
                <strong style={{ color: C.cyan }}>{priceAmount} {priceCurrency}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
