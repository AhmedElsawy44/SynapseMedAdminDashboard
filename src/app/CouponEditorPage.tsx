import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight, ChevronDown, Tag, BookOpen,
  RefreshCw, Check, AlertCircle,
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

type TargetType = "Course" | "Revision";

const COURSES = [
  "Advanced Cardiology",
  "Emergency Medicine Essentials",
  "Internal Medicine Review",
  "Neurology Board Review",
  "Clinical Pharmacology",
  "Pediatrics Essentials",
];

const REVISIONS: { title: string; course: string }[] = [
  { title: "Cardiology — 2026 Update",         course: "Advanced Cardiology"          },
  { title: "Emergency Medicine — Spring 2026",  course: "Emergency Medicine Essentials" },
  { title: "Internal Medicine — Draft v2",      course: "Internal Medicine Review"      },
  { title: "Pharmacology — Previous Version",   course: "Clinical Pharmacology"         },
  { title: "Neurology — Archived 2025",         course: "Neurology Board Review"        },
  { title: "Pediatrics — Summer 2026",          course: "Pediatrics Essentials"         },
];

// ── Dropdown ──────────────────────────────────────────────────────────────────
function SelectDropdown({
  value, onChange, options, placeholder, error, disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        style={{
          width: "100%", height: 40, display: "flex", alignItems: "center",
          justifyContent: "space-between", background: C.elevated,
          border: `1px solid ${error ? "#ef444460" : open ? `${C.cyan}55` : C.border}`,
          borderRadius: 8, padding: "0 12px", fontSize: 13,
          color: value ? C.text : "rgba(169,181,199,0.4)",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "'Montserrat',sans-serif", textAlign: "left",
          transition: "border-color 0.15s", opacity: disabled ? 0.55 : 1,
        }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value || placeholder}</span>
        <ChevronDown size={14} style={{ color: C.muted, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0, marginInlineStart: 8 }} />
      </button>
      {open && !disabled && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", insetInlineStart: 0, zIndex: 30, width: "100%", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, boxShadow: "0 8px 28px rgba(0,0,0,0.4)", maxHeight: 240, overflowY: "auto" }}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", borderRadius: 6, border: "none", background: opt === value ? `${C.cyan}10` : "transparent", color: opt === value ? C.cyan : C.muted, fontSize: 13, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", textAlign: "left", transition: "background 0.1s, color 0.1s" }}
              onMouseEnter={(e) => { if (opt !== value) { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.04)"; b.style.color = C.text; } }}
              onMouseLeave={(e) => { if (opt !== value) { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = C.muted; } }}>
              <span style={{ width: 16, flexShrink: 0, display: "flex", alignItems: "center" }}>{opt === value && <Check size={12} />}</span>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Discard confirmation modal ────────────────────────────────────────────────
function DiscardModal({ onDiscard, onKeep }: { onDiscard: () => void; onKeep: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(7,18,37,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 32px", width: "100%", maxWidth: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.55)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <AlertCircle size={17} style={{ color: "#f87171" }} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>Unsaved Changes</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>You have unsaved edits to this coupon.</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, margin: "0 0 24px" }}>
          If you leave now, all changes will be discarded. This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button type="button" onClick={onKeep}
            style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s, border-color 0.15s" }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
            Keep Editing
          </button>
          <button type="button" onClick={onDiscard}
            style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.35)", background: "rgba(248,113,113,0.08)", color: "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,113,113,0.16)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,113,113,0.08)"; }}>
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, required, hint, error, children }: {
  label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, letterSpacing: "0.01em" }}>
        {label}{required && <span style={{ color: "#f87171", marginInlineStart: 3 }}>*</span>}
      </label>
      {children}
      {error && <div style={{ fontSize: 11, color: "#f87171", marginTop: 4 }}>{error}</div>}
      {!error && hint && <div style={{ fontSize: 11, color: "rgba(169,181,199,0.45)", marginTop: 5, lineHeight: 1.55 }}>{hint}</div>}
    </div>
  );
}

// ── CouponEditorPage ──────────────────────────────────────────────────────────
export default function CouponEditorPage({ onBack, onSave }: { onBack: () => void; onSave: () => void }) {
  // Form values — pre-filled with sample data
  const [code, setCode]                     = useState("CARDIO-SUMMER-2026");
  const [targetType, setTargetType]         = useState<TargetType>("Course");
  const [course, setCourse]                 = useState("Advanced Cardiology");
  const [revision, setRevision]             = useState("");
  const [maxRedemptions, setMaxRedemptions] = useState("50");
  const [expires, setExpires]               = useState("31 Aug 2026");

  // UI state
  const [isDirty, setIsDirty]         = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);
  const [saveState, setSaveState]     = useState<"idle" | "saving" | "saved">("idle");

  // Validation errors
  const [codeErr, setCodeErr]         = useState("");
  const [courseErr, setCourseErr]     = useState("");
  const [revisionErr, setRevisionErr] = useState("");
  const [expiresErr, setExpiresErr]   = useState("");

  function markDirty() { setIsDirty(true); setSaveState("idle"); }

  function handleTargetTypeChange(t: TargetType) {
    setTargetType(t);
    setRevision("");
    setRevisionErr("");
    markDirty();
  }

  function handleCourseChange(v: string) {
    setCourse(v);
    setRevision("");
    setRevisionErr("");
    setCourseErr("");
    markDirty();
  }

  function handleCancel() {
    if (isDirty) setShowDiscard(true);
    else onBack();
  }

  function validate(): boolean {
    let ok = true;
    const ce = !code.trim() ? "Coupon code is required." : "";
    const kre = !course ? "Please select a course." : "";
    const re = targetType === "Revision" && !revision ? "Please select a revision." : "";
    const ee = !expires.trim() ? "Expiration date is required." : "";
    setCodeErr(ce); setCourseErr(kre); setRevisionErr(re); setExpiresErr(ee);
    if (ce || kre || re || ee) ok = false;
    return ok;
  }

  function handleSave() {
    if (!validate()) return;
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setIsDirty(false);
      setTimeout(onSave, 700);
    }, 600);
  }

  const visibleRevisions = course
    ? REVISIONS.filter((r) => r.course === course).map((r) => r.title)
    : REVISIONS.map((r) => r.title);

  // Live preview
  const previewCode   = code.trim() || "—";
  const previewTarget = targetType === "Course"
    ? (course || "—")
    : (revision || "—");
  const previewLimit  = maxRedemptions.trim() ? `${maxRedemptions} max` : "Unlimited";
  const previewExpiry = expires.trim() || "No expiry set";

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 56px", background: C.bg, fontFamily: "'Montserrat', sans-serif" }}>
      {showDiscard && (
        <DiscardModal
          onDiscard={() => { setShowDiscard(false); onBack(); }}
          onKeep={() => setShowDiscard(false)}
        />
      )}

      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin Console</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <button onClick={handleCancel} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 12, padding: 0, transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.text)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.muted)}>
            Coupons
          </button>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text }}>Create Coupon</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: `${C.cyan}10`, border: `1px solid ${C.cyan}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Tag size={18} style={{ color: C.cyan }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>Create Coupon</h1>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Define a new access coupon for student redemption.</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {isDirty && saveState === "idle" && (
              <span style={{ fontSize: 11, color: "rgba(169,181,199,0.5)", fontStyle: "italic" }}>Unsaved changes</span>
            )}
            <button type="button" onClick={handleCancel}
              style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s, border-color 0.15s" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text; b.style.borderColor = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.muted; b.style.borderColor = C.border; }}>
              Cancel
            </button>
            <button type="button" onClick={handleSave}
              style={{ padding: "8px 22px", borderRadius: 8, border: "none", background: saveState === "saved" ? "#4ade80" : C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: saveState === "saving" ? "default" : "pointer", fontFamily: "inherit", transition: "background 0.25s, opacity 0.15s", opacity: saveState === "saving" ? 0.72 : 1, minWidth: 120, textAlign: "center" }}>
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved ✓" : "Save Coupon"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 292px", gap: 20, alignItems: "start" }} className="max-lg:grid-cols-1">

        {/* ── Left: form card ── */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.55)", letterSpacing: "0.09em", textTransform: "uppercase" as const }}>
              Coupon Information
            </span>
          </div>

          <div style={{ padding: "26px 20px", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Coupon Code */}
            <Field
              label="Coupon Code"
              required
              hint="Letters, numbers, and hyphens only. Displayed to students at checkout."
              error={codeErr}>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""));
                  setCodeErr("");
                  markDirty();
                }}
                placeholder="e.g. CARDIO-SUMMER-2026"
                style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${codeErr ? "#ef444460" : C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, fontWeight: 600, color: C.text, outline: "none", fontFamily: "monospace", letterSpacing: "0.07em", transition: "border-color 0.15s", boxSizing: "border-box" }}
                onFocus={(e) => { if (!codeErr) e.target.style.borderColor = `${C.cyan}55`; }}
                onBlur={(e) => { e.target.style.borderColor = codeErr ? "#ef444460" : C.border; }}
              />
            </Field>

            {/* Target Type */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8, letterSpacing: "0.01em" }}>Target Type</div>
              <div style={{ display: "inline-flex", gap: 2, background: C.elevated, borderRadius: 8, padding: 3, border: `1px solid ${C.border}` }}>
                {(["Course", "Revision"] as const).map((t) => {
                  const Icon = t === "Course" ? BookOpen : RefreshCw;
                  const active = targetType === t;
                  return (
                    <button key={t} type="button" onClick={() => handleTargetTypeChange(t)}
                      style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 18px", borderRadius: 6, border: "none", background: active ? C.surface : "transparent", color: active ? C.text : C.muted, fontSize: 13, fontWeight: active ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.25)" : "none" }}>
                      <Icon size={13} style={{ color: active ? C.cyan : "inherit", flexShrink: 0 }} />
                      {t}
                    </button>
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: "rgba(169,181,199,0.45)", marginTop: 7, lineHeight: 1.55 }}>
                {targetType === "Course"
                  ? "Grants the student full access to the selected course."
                  : "Grants access to a specific revision within a course."}
              </div>
            </div>

            {/* Course */}
            <Field label="Course" required hint="The course this coupon unlocks." error={courseErr}>
              <SelectDropdown
                value={course}
                onChange={handleCourseChange}
                options={COURSES}
                placeholder="Select a course"
                error={!!courseErr}
              />
            </Field>

            {/* Revision — shown only when targetType === "Revision" */}
            {targetType === "Revision" && (
              <Field
                label="Revision"
                required
                hint={course ? "The specific revision this coupon unlocks." : "Select a course first to filter available revisions."}
                error={revisionErr}>
                <SelectDropdown
                  value={revision}
                  onChange={(v) => { setRevision(v); setRevisionErr(""); markDirty(); }}
                  options={visibleRevisions}
                  placeholder={course ? "Select a revision" : "Select a course first"}
                  error={!!revisionErr}
                  disabled={!course}
                />
              </Field>
            )}

            {/* Max Redemptions + Expiration — side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Maximum Redemptions" hint="Leave blank to allow unlimited redemptions.">
                <input
                  type="number"
                  min={1}
                  value={maxRedemptions}
                  onChange={(e) => { setMaxRedemptions(e.target.value); markDirty(); }}
                  placeholder="e.g. 50"
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }}
                  onFocus={(e) => { e.target.style.borderColor = `${C.cyan}55`; }}
                  onBlur={(e) => { e.target.style.borderColor = C.border; }}
                />
              </Field>

              <Field label="Expiration Date" required hint="Format: DD Mon YYYY" error={expiresErr}>
                <input
                  type="text"
                  value={expires}
                  onChange={(e) => { setExpires(e.target.value); setExpiresErr(""); markDirty(); }}
                  placeholder="31 Aug 2026"
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${expiresErr ? "#ef444460" : C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.15s", boxSizing: "border-box" }}
                  onFocus={(e) => { if (!expiresErr) e.target.style.borderColor = `${C.cyan}55`; }}
                  onBlur={(e) => { e.target.style.borderColor = expiresErr ? "#ef444460" : C.border; }}
                />
              </Field>
            </div>

          </div>
        </div>

        {/* ── Right: sidebar ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Live preview */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.55)", letterSpacing: "0.09em", textTransform: "uppercase" as const }}>Preview</span>
            </div>
            <div style={{ padding: "18px" }}>
              {/* Code tile */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.elevated, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: `${C.cyan}10`, border: `1px solid ${C.cyan}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Tag size={13} style={{ color: C.cyan }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "monospace", letterSpacing: "0.06em", wordBreak: "break-all" as const }}>
                  {previewCode}
                </span>
              </div>

              {/* Detail rows */}
              {([
                { key: "Target",  val: previewTarget },
                { key: "Type",    val: targetType    },
                { key: "Limit",   val: previewLimit  },
                { key: "Expires", val: previewExpiry },
              ] as const).map(({ key, val }) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(169,181,199,0.45)", letterSpacing: "0.08em", flexShrink: 0 }}>{key.toUpperCase()}</span>
                  <span style={{ fontSize: 12, color: C.text, fontWeight: 500, textAlign: "end", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{val}</span>
                </div>
              ))}

              <div style={{ marginTop: 14 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: "rgba(74,222,128,0.10)", border: "1px solid rgba(74,222,128,0.30)", fontSize: 11, fontWeight: 600, color: "#4ade80" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                  Active on save
                </span>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(169,181,199,0.55)", letterSpacing: "0.09em", textTransform: "uppercase" as const }}>Guidelines</span>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
              {([
                { title: "Code format",       body: "Use uppercase letters, numbers, and hyphens. Spaces are not allowed." },
                { title: "Redemption limit",  body: "Leave blank to allow unlimited redemptions. A limit controls access volume." },
                { title: "Expiration",        body: "Once expired, the coupon cannot be redeemed. Existing grants are unaffected." },
                { title: "Revision target",   body: "Select Revision to restrict the coupon to a single revision rather than a full course." },
              ]).map(({ title, body }) => (
                <div key={title}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, marginBottom: 3, letterSpacing: "0.02em" }}>{title}</div>
                  <div style={{ fontSize: 11, color: "rgba(169,181,199,0.55)", lineHeight: 1.65 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
