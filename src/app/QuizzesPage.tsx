import React, { useState } from "react";
import {
  ClipboardCheck, Search, ChevronRight, Eye, AlertCircle,
  Plus, Trash2, Check, Clock, HelpCircle, BookOpen, User,
  CheckCircle2, XCircle, ArrowLeft, RefreshCw, Sparkles,
  Layers, ShieldAlert, Award, FileQuestion, MoveUp, MoveDown
} from "lucide-react";
import { QuizItem, QuizQuestion, QuizAttemptRecord } from "./courseTypes";

export type { QuizItem, QuizQuestion, QuizAttemptRecord };

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

export const INITIAL_QUIZ_ATTEMPTS: QuizAttemptRecord[] = [
  { id: "att-1", studentId: "SM-0041", studentName: "Sarah Al-Rashidi", studentEmail: "s.alrashidi@kasralainy.edu.eg", attemptNum: 1, score: 94, passingScore: 75, result: "Passed", date: "Aug 28, 2026", durationMinutes: 18 },
  { id: "att-2", studentId: "SM-0042", studentName: "Mohammed Khalid", studentEmail: "m.khalid@kasralainy.edu.eg", attemptNum: 1, score: 62, passingScore: 75, result: "Failed", date: "Aug 27, 2026", durationMinutes: 28 },
  { id: "att-3", studentId: "SM-0042", studentName: "Mohammed Khalid", studentEmail: "m.khalid@kasralainy.edu.eg", attemptNum: 2, score: 80, passingScore: 75, result: "Passed", date: "Aug 28, 2026", durationMinutes: 22 },
  { id: "att-4", studentId: "SM-0045", studentName: "Layla Nasser", studentEmail: "l.nasser@kasralainy.edu.eg", attemptNum: 1, score: 98, passingScore: 75, result: "Passed", date: "Aug 26, 2026", durationMinutes: 14 },
  { id: "att-5", studentId: "SM-0047", studentName: "Noor Ibrahim", studentEmail: "n.ibrahim@kasralainy.edu.eg", attemptNum: 1, score: 72, passingScore: 75, result: "Failed", date: "Aug 25, 2026", durationMinutes: 29 },
];

export const SAMPLE_LECTURE_QUIZ: QuizItem = {
  id: "quiz-lec-2",
  title: "12-Lead ECG Interpretation: STEMI Equivalents Assessment",
  description: "Board-style clinical case vignettes testing identification of de Winter T waves, Wellens syndrome, and posterior STEMI equivalents.",
  parentType: "Lecture",
  parentId: "lec-2",
  parentTitle: "12-Lead ECG Interpretation: STEMI Equivalents",
  parentCourseTitle: "Advanced Clinical Cardiology & ECG Masterclass",
  questionCount: 2,
  passingScore: 75,
  timeLimitMinutes: 25,
  maxAttempts: 3,
  totalAttempts: 142,
  passRate: 82,
  status: "Published",
  questions: [
    {
      id: "q-1",
      stem: "A 58-year-old male presents with crushing substernal chest pain. The ECG reveals ST-depression in V1-V3 with tall, upright T waves and prominent R waves in V2. What is the most appropriate next management step?",
      options: [
        "Discharge with outpatient treadmill stress test referral",
        "Obtain posterior leads (V7-V9) to confirm posterior STEMI and activate the cath lab",
        "Administer oral beta-blockers and await serial troponin at 6 hours",
        "Order urgent thoracic CT with contrast to rule out aortic dissection alone"
      ],
      correctAnswer: 1,
      explanation: "ST-depression in V1-V3 with tall R waves and upright T waves is a classic STEMI equivalent representing acute posterior transmural ischemia (LCx or RCA occlusion). Obtaining posterior leads V7-V9 confirms posterior ST-elevation for immediate reperfusion."
    },
    {
      id: "q-2",
      stem: "According to the modified Sgarbossa criteria, which finding has the highest positive predictive value for acute coronary occlusion in the presence of LBBB?",
      options: [
        "Concordant ST elevation ≥ 1 mm in any lead with a positive QRS",
        "Excessively discordant ST depression in lead V6",
        "Presence of new Q waves in leads I and aVL",
        "PR interval prolongation > 240 ms"
      ],
      correctAnswer: 0,
      explanation: "Concordant ST elevation ≥ 1 mm in leads with a positive QRS (Sgarbossa criterion A) has a specificity exceeding 98% for acute coronary occlusion even in the presence of baseline left bundle branch block."
    }
  ]
};

export const SAMPLE_REVISION_QUIZ: QuizItem = {
  id: "quiz-rev-1",
  title: "Cardiology Rapid Review Clinical Board Quiz",
  description: "Comprehensive end-of-revision assessment covering emergency algorithms, antiarrhythmic pharmacology, and acute coronary syndrome pearls.",
  parentType: "Revision",
  parentId: "REV-2026-01",
  parentTitle: "Cardiology Rapid Review & ECG Masterclass 2026",
  parentCourseTitle: "Advanced Clinical Cardiology",
  questionCount: 3,
  passingScore: 70,
  timeLimitMinutes: 30,
  maxAttempts: 2,
  totalAttempts: 98,
  passRate: 78,
  status: "Published",
  questions: [
    {
      id: "q-r1",
      stem: "A 64-year-old female in the CCU develops wide-complex tachycardia with hemodynamic stability. What ECG feature most strongly differentiates Ventricular Tachycardia (VT) from SVT with aberrancy?",
      options: [
        "Heart rate between 150-180 bpm",
        "AV dissociation with capture or fusion beats",
        "Right bundle branch block pattern alone",
        "Regularity of the RR intervals"
      ],
      correctAnswer: 1,
      explanation: "AV dissociation with independent P waves, capture beats, or fusion beats (Dressler beats) is pathognomonic for Ventricular Tachycardia."
    },
    {
      id: "q-r2",
      stem: "Which of the following antiarrhythmic agents is contraindicated in patients with coronary artery disease and previous myocardial infarction due to increased mortality (CAST trial)?",
      options: [
        "Flecainide",
        "Amiodarone",
        "Metoprolol",
        "Diltiazem"
      ],
      correctAnswer: 0,
      explanation: "Class 1C antiarrhythmics like Flecainide and Propafenone are strictly contraindicated post-MI due to proarrhythmic effects and excess mortality demonstrated in the landmark CAST trial."
    },
    {
      id: "q-r3",
      stem: "A patient with acute decompensated heart failure has a blood pressure of 82/50 mmHg, cold extremities, and elevated jugular venous pressure. Which inotrope is first-line when severe hypotension is present?",
      options: [
        "Milrinone alone",
        "Norepinephrine combined with Dobutamine",
        "Oral Digoxin",
        "High-dose Furosemide bolus only"
      ],
      correctAnswer: 1,
      explanation: "In cardiogenic shock with severe hypotension (SBP < 90 mmHg), Norepinephrine is required to restore perfusion pressure, paired with inotropic support (Dobutamine)."
    }
  ]
};

// ─── Reusable Admin Quiz Builder UI (Section 29) ────────────────────────────────────
export function QuizEditorPage({
  parentType,
  parentId,
  parentTitle,
  parentCourseTitle,
  quiz,
  onBack,
  onSave,
  onDelete,
}: {
  parentType: "Lecture" | "Revision";
  parentId: string;
  parentTitle: string;
  parentCourseTitle?: string;
  quiz?: QuizItem | null;
  onBack: () => void;
  onSave: (savedQuiz: QuizItem) => void;
  onDelete?: () => void;
}) {
  const isNew = !quiz;

  // Form state
  const [title, setTitle] = useState(quiz?.title || `${parentTitle} Assessment`);
  const [description, setDescription] = useState(quiz?.description || "");
  const [passingScore, setPassingScore] = useState<number>(quiz?.passingScore ?? 70);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(quiz?.timeLimitMinutes ?? 20);
  const [maxAttempts, setMaxAttempts] = useState<number>(quiz?.maxAttempts ?? 3);
  const [status, setStatus] = useState<"Draft" | "Published" | "Archived">(quiz?.status ?? "Draft");
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    quiz?.questions && quiz.questions.length > 0
      ? [...quiz.questions]
      : [
          {
            id: `q-${Date.now()}`,
            stem: "A 45-year-old patient presents with symptoms...",
            options: ["Diagnostic Option A", "Diagnostic Option B", "Diagnostic Option C", "Diagnostic Option D"],
            correctAnswer: 0,
            explanation: "Clinical rationale explaining the correct answer according to standard clinical guidelines."
          }
        ]
  );

  const [validationError, setValidationError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Question handlers
  const handleAddQuestion = () => {
    const nextIndex = questions.length + 1;
    const newQ: QuizQuestion = {
      id: `q-${Date.now()}-${nextIndex}`,
      stem: "",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      explanation: ""
    };
    setQuestions([...questions, newQ]);
  };

  const handleUpdateQuestion = (qIndex: number, updates: Partial<QuizQuestion>) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === qIndex ? { ...q, ...updates } : q))
    );
  };

  const handleRemoveQuestion = (qIndex: number) => {
    setQuestions((prev) => prev.filter((_, idx) => idx !== qIndex));
  };

  const handleMoveQuestion = (fromIdx: number, direction: "up" | "down") => {
    const toIdx = direction === "up" ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= questions.length) return;
    const items = [...questions];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    setQuestions(items);
  };

  // Publishing Validation Logic (Section 34)
  const handleFormSubmit = (targetStatus?: "Draft" | "Published" | "Archived") => {
    const desiredStatus = targetStatus || status;

    if (!title.trim()) {
      setValidationError("Quiz Title is required.");
      return;
    }

    if (desiredStatus === "Published") {
      const missing: string[] = [];
      if (questions.length === 0) missing.push("At least one question");

      const hasEmptyStem = questions.some((q) => !q.stem.trim());
      if (hasEmptyStem) missing.push("Valid question stems for all items");

      const hasEmptyOption = questions.some((q) => q.options.some((o) => !o.trim()));
      if (hasEmptyOption) missing.push("Complete answer options A, B, C, D");

      const invalidScore = passingScore < 50 || passingScore > 100;
      if (invalidScore) missing.push("Passing score threshold between 50% and 100%");

      if (missing.length > 0) {
        setValidationError(`Cannot publish Quiz. Please complete: • ${missing.join(" • ")}`);
        return;
      }
    }

    setValidationError(null);
    setSaved(true);

    const compiledQuiz: QuizItem = {
      id: quiz?.id || `quiz-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      parentType,
      parentId,
      parentTitle,
      parentCourseTitle,
      questionCount: questions.length,
      passingScore,
      timeLimitMinutes,
      maxAttempts,
      totalAttempts: quiz?.totalAttempts ?? 0,
      passRate: quiz?.passRate ?? 0,
      status: desiredStatus,
      questions,
    };

    setTimeout(() => {
      onSave(compiledQuiz);
      onBack();
    }, 500);
  };

  return (
    <main style={{ flex: 1, padding: "28px 32px 40px", background: C.bg, overflowY: "auto", minHeight: 0 }}>
      {/* Breadcrumb & Navigation */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Parent Context</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span>{parentType}: {parentTitle}</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>{isNew ? "Create Quiz" : "Edit Assessment"}</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>
              {isNew ? "Create Assessment Quiz" : "Edit Assessment Quiz"}
            </h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>
              Construct clinical assessment questions, passing threshold, and attempt constraints.
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
              onClick={() => handleFormSubmit("Draft")}
              style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.elevated, color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleFormSubmit("Published")}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 20px",
                borderRadius: 8, border: "none", background: saved ? "#4ade80" : C.cyan,
                color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              {saved ? <Check size={14} /> : null}
              {saved ? "Published!" : "Publish Quiz"}
            </button>
          </div>
        </div>
      </div>

      {/* Parent Context Banner (Strict rule: No Standalone Quizzes) */}
      <div style={{
        background: parentType === "Revision" ? "rgba(168,85,247,0.1)" : "rgba(53,224,223,0.08)",
        border: `1px solid ${parentType === "Revision" ? "rgba(168,85,247,0.3)" : `${C.cyan}44`}`,
        borderRadius: 12, padding: "16px 20px", marginBottom: 24,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 8,
            background: parentType === "Revision" ? "rgba(168,85,247,0.15)" : "rgba(53,224,223,0.12)",
            border: `1px solid ${parentType === "Revision" ? C.purple : C.cyan}`,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            {parentType === "Revision" ? <Sparkles size={18} style={{ color: C.purple }} /> : <BookOpen size={18} style={{ color: C.cyan }} />}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: parentType === "Revision" ? C.purple : C.cyan, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Bound Learning Context: {parentType}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginTop: 2 }}>
              {parentTitle} {parentCourseTitle ? `• (${parentCourseTitle})` : ""}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>
          Context Locked • Quizzes are strictly attached to this learning content
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <AlertCircle size={18} style={{ color: "#f87171", flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#f87171", fontWeight: 500 }}>{validationError}</span>
        </div>
      )}

      {/* Two Column Layout: Left Questions, Right Scoring Settings */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        
        {/* Left Column: Questions Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Basic Info */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>1. Basic Assessment Information</h2>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
                Quiz Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 12-Lead ECG STEMI Equivalents Assessment"
                style={{ width: "100%", height: 42, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
                Description & Learning Objectives
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the clinical focus, question topics, and learning assessment objectives..."
                style={{ width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }}
              />
            </div>
          </div>

          {/* Question Builder Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: C.text, margin: 0 }}>
                2. Clinical Questions ({questions.length})
              </h2>
              <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0" }}>
                Add board-style MCQs. Select the radio for the verified correct answer.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                borderRadius: 8, background: "rgba(53,224,223,0.12)", border: `1px solid ${C.cyan}44`,
                color: C.cyan, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              <Plus size={14} /> Add Question
            </button>
          </div>

          {questions.map((q, qIdx) => (
            <div key={q.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22 }}>
              {/* Question Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(53,224,223,0.15)", border: `1px solid ${C.cyan}44`, color: C.cyan, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                    {qIdx + 1}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Question #{qIdx + 1}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button
                    type="button"
                    disabled={qIdx === 0}
                    onClick={() => handleMoveQuestion(qIdx, "up")}
                    title="Move question up"
                    style={{ background: "none", border: "none", color: qIdx === 0 ? "rgba(255,255,255,0.1)" : C.muted, cursor: qIdx === 0 ? "default" : "pointer", padding: 4 }}
                  >
                    <MoveUp size={15} />
                  </button>
                  <button
                    type="button"
                    disabled={qIdx === questions.length - 1}
                    onClick={() => handleMoveQuestion(qIdx, "down")}
                    title="Move question down"
                    style={{ background: "none", border: "none", color: qIdx === questions.length - 1 ? "rgba(255,255,255,0.1)" : C.muted, cursor: qIdx === questions.length - 1 ? "default" : "pointer", padding: 4 }}
                  >
                    <MoveDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(qIdx)}
                    title="Delete question"
                    style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: 4, marginInlineStart: 8 }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Question Stem */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Clinical Vignette / Question Stem *</label>
                <textarea
                  rows={3}
                  value={q.stem}
                  onChange={(e) => handleUpdateQuestion(qIdx, { stem: e.target.value })}
                  placeholder="Enter patient presentation, clinical history, diagnostic findings..."
                  style={{ width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>

              {/* Options */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>
                  Answer Options (Select the verified correct answer):
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["A", "B", "C", "D"].map((letter, optIdx) => {
                    const isCorrect = q.correctAnswer === optIdx;
                    return (
                      <div
                        key={optIdx}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "6px 12px", borderRadius: 8,
                          background: isCorrect ? "rgba(74,222,128,0.06)" : C.elevated,
                          border: `1px solid ${isCorrect ? "#4ade8055" : C.border}`
                        }}
                      >
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={isCorrect}
                          onChange={() => handleUpdateQuestion(qIdx, { correctAnswer: optIdx })}
                          style={{ accentColor: "#4ade80", cursor: "pointer", width: 16, height: 16 }}
                        />
                        <span style={{ fontSize: 12, fontWeight: 700, color: isCorrect ? "#4ade80" : C.muted, width: 16 }}>{letter}</span>
                        <input
                          value={q.options[optIdx] || ""}
                          onChange={(e) => {
                            const newOpts = [...q.options];
                            newOpts[optIdx] = e.target.value;
                            handleUpdateQuestion(qIdx, { options: newOpts });
                          }}
                          placeholder={`Option ${letter}...`}
                          style={{ flex: 1, height: 36, background: "transparent", border: "none", color: C.text, fontSize: 13, outline: "none", fontFamily: "inherit" }}
                        />
                        {isCorrect && (
                          <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                            <Check size={12} /> Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Clinical Rationale & Explanation (Shown on review after submission)</label>
                <textarea
                  rows={2}
                  value={q.explanation}
                  onChange={(e) => handleUpdateQuestion(qIdx, { explanation: e.target.value })}
                  placeholder="Explain why the selected option is correct and why other distractors are incorrect..."
                  style={{ width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Scoring, Time Limits & Attempts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Rules & Constraints Card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>3. Assessment Rules</h3>

            {/* Passing Score */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>Passing Score</label>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#4ade80" }}>{passingScore}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#4ade80", cursor: "pointer" }}
              />
              <span style={{ fontSize: 11, color: C.muted, display: "block", marginTop: 4 }}>Standard medical pass mark is usually 70-75%.</span>
            </div>

            {/* Time Limit */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Time Limit (Minutes)</label>
              <input
                type="number"
                min={5}
                max={180}
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />
              <span style={{ fontSize: 11, color: C.muted, display: "block", marginTop: 4 }}>0 means untimed assessment.</span>
            </div>

            {/* Max Retakes */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Allowed Attempts</label>
              <select
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(Number(e.target.value))}
                style={{ width: "100%", height: 38, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit" }}
              >
                <option value={1} style={{ background: C.surface }}>1 Attempt (Strict Board Simulation)</option>
                <option value={2} style={{ background: C.surface }}>2 Attempts</option>
                <option value={3} style={{ background: C.surface }}>3 Attempts (Recommended)</option>
                <option value={5} style={{ background: C.surface }}>5 Attempts</option>
                <option value={99} style={{ background: C.surface }}>Unlimited Attempts</option>
              </select>
            </div>

            {/* Status Selector */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Publication Status</label>
              <div style={{ display: "flex", gap: 6 }}>
                {(["Draft", "Published", "Archived"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    style={{
                      flex: 1, padding: "7px 0", borderRadius: 6, fontSize: 11, fontWeight: 700,
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

          {/* Delete Action if existing */}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "10px", borderRadius: 8, background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit"
              }}
            >
              <Trash2 size={14} /> Remove Assessment from {parentType}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

// ─── Reusable Quiz Student Attempts Inspector (Section 19) ──────────────────────────
export function QuizAttemptsPage({
  quiz,
  onBack,
}: {
  quiz: QuizItem;
  onBack: () => void;
}) {
  const [filterResult, setFilterResult] = useState<"All" | "Passed" | "Failed">("All");
  const [search, setSearch] = useState("");

  const attempts = INITIAL_QUIZ_ATTEMPTS.filter((a) => {
    if (filterResult !== "All" && a.result !== filterResult) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return a.studentName.toLowerCase().includes(q) || a.studentEmail.toLowerCase().includes(q) || a.studentId.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <main style={{ flex: 1, padding: "28px 32px 40px", background: C.bg, overflowY: "auto", minHeight: 0 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Parent Context</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span>{quiz.parentType}: {quiz.parentTitle}</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Attempt History</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>Student Attempt History</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>{quiz.title}</p>
          </div>
          <button
            onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
          >
            <ArrowLeft size={14} /> Back to {quiz.parentType}
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Total Attempts</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginTop: 4 }}>{quiz.totalAttempts || attempts.length} Submissions</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Pass Rate</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#4ade80", marginTop: 4 }}>{quiz.passRate || 80}%</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Passing Threshold</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.cyan, marginTop: 4 }}>{quiz.passingScore}% Min</div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Time Limit</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginTop: 4 }}>{quiz.timeLimitMinutes} Mins</div>
        </div>
      </div>

      {/* Filter and Table */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 360 }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by student name, ID, or email..."
            style={{ width: "100%", height: 38, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, paddingInlineStart: 36, paddingInlineEnd: 12, fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["All", "Passed", "Failed"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilterResult(r)}
              style={{
                padding: "6px 14px", borderRadius: 6,
                border: `1px solid ${filterResult === r ? C.cyan : C.border}`,
                background: filterResult === r ? "rgba(53,224,223,0.12)" : "transparent",
                color: filterResult === r ? C.cyan : C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ height: 42, background: C.elevated, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Student Candidate</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Attempt #</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Score</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Status</th>
              <th style={{ padding: "0 20px", textAlign: "start" }}>Duration</th>
              <th style={{ padding: "0 20px", textAlign: "end" }}>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((att) => (
              <tr key={att.id} style={{ height: 60, borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "0 20px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{att.studentName}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{att.studentEmail} • <span style={{ fontFamily: "monospace" }}>{att.studentId}</span></div>
                </td>
                <td style={{ padding: "0 20px", fontSize: 12, color: C.muted }}>
                  Attempt #{att.attemptNum}
                </td>
                <td style={{ padding: "0 20px", fontSize: 15, fontWeight: 700, color: att.result === "Passed" ? "#4ade80" : "#f87171" }}>
                  {att.score}%
                </td>
                <td style={{ padding: "0 20px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: att.result === "Passed" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)", color: att.result === "Passed" ? "#4ade80" : "#f87171", border: `1px solid ${att.result === "Passed" ? "#4ade8033" : "#f8717133"}` }}>
                    {att.result === "Passed" ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {att.result}
                  </span>
                </td>
                <td style={{ padding: "0 20px", fontSize: 12, color: C.muted }}>
                  {att.durationMinutes} minutes
                </td>
                <td style={{ padding: "0 20px", textAlign: "end", fontSize: 12, color: C.muted }}>
                  {att.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

// ─── Assessment Hub (Guidance Screen if reached directly) ───────────────────────────
export default function QuizzesPage({
  onNavigateToCourse,
  onNavigateToRevision,
}: {
  onNavigateToCourse?: (courseId: string) => void;
  onNavigateToRevision?: (revisionId: string) => void;
}) {
  return (
    <main style={{ flex: 1, padding: "28px 32px 40px", background: C.bg, overflowY: "auto", minHeight: 0 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Content Management</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Assessments Architecture</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0 }}>Contextual Assessment Management</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
          Architectural Rule: There are NO Standalone Quizzes. Every Quiz is bound to either a Lecture or a Revision unit.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Lecture Flow Card */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={20} style={{ color: C.cyan }} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>Lecture Quizzes</h3>
              <span style={{ fontSize: 12, color: C.cyan }}>Course → Lecture → Quiz</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: "0 0 18px" }}>
            Lecture assessments evaluate student comprehension immediately following the lecture video. Managed directly inside Course Lecture management.
          </p>
          <div style={{ padding: "12px 14px", background: C.elevated, borderRadius: 8, fontSize: 12, color: C.text, border: `1px solid ${C.border}` }}>
            Navigate to <strong>Courses</strong> → Open any course → Expand target Lecture → Click <strong>[Manage Quiz]</strong>.
          </div>
        </div>

        {/* Revision Flow Card */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(168,85,247,0.12)", border: `1px solid rgba(168,85,247,0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={20} style={{ color: C.purple }} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>Revision Quizzes</h3>
              <span style={{ fontSize: 12, color: C.purple }}>Revision → Quiz</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: "0 0 18px" }}>
            Revision assessments test high-yield board recall across clinical topics. Managed directly inside Revision management.
          </p>
          <div style={{ padding: "12px 14px", background: C.elevated, borderRadius: 8, fontSize: 12, color: C.text, border: `1px solid ${C.border}` }}>
            Navigate to <strong>Revisions</strong> → Open target revision → Click <strong>[Manage Quiz]</strong>.
          </div>
        </div>
      </div>
    </main>
  );
}
