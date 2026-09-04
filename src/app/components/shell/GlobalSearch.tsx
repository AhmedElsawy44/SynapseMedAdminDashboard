import React, { useState, useRef, useEffect } from "react";
import { Search, BookOpen, Users, RefreshCw } from "lucide-react";
import { SHELL_COLORS as C } from "./shellTheme";

export const SEARCH_DATABASE = {
  courses: [
    { idx: 0, title: "Advanced Clinical Cardiology", code: "CARD-401", instructor: "Prof. Ahmed Shawky", extra: "1,240 Students" },
    { idx: 1, title: "Pediatric Intensive Care & Resuscitation", code: "PED-302", instructor: "Dr. Mostafa Omar", extra: "890 Students" },
    { idx: 2, title: "Neurology & Neuro-Anatomy Comprehensive", code: "NEUR-501", instructor: "Dr. Sarah Tarek", extra: "760 Students" },
    { idx: 3, title: "Internal Medicine Clinical Clerkship", code: "MED-402", instructor: "Prof. Hossam Kamel", extra: "1,420 Students" },
    { idx: 4, title: "Emergency Trauma & Critical Resuscitation", code: "EMER-505", instructor: "Dr. Tarek Zaki", extra: "610 Students" },
  ],
  students: [
    { id: "std-001", name: "Mahmoud Hassan", email: "m.hassan@kasralainy.edu.eg", university: "Cairo University (Kasr Al-Ainy)" },
    { id: "std-002", name: "Sarah Ahmed", email: "s.ahmed@med.asu.edu.eg", university: "Ain Shams University" },
    { id: "std-003", name: "Youssef Omar", email: "youssef.omar@alexmed.edu.eg", university: "Alexandria Faculty of Medicine" },
    { id: "std-004", name: "Nour El-Din", email: "nour.eldin@mans.edu.eg", university: "Mansoura University" },
    { id: "std-005", name: "Mariam Adel", email: "mariam.adel@kasralainy.edu.eg", university: "Cairo University" },
  ],
  revisions: [
    { idx: 0, title: "Comprehensive Cardiology ECG Blitz", type: "Course-Linked", duration: "42 min" },
    { idx: 1, title: "Pediatric Airway Emergencies & CPR", type: "Standalone", duration: "28 min" },
    { idx: 2, title: "Cranial Nerves Diagnostic Mapping", type: "Standalone", duration: "35 min" },
    { idx: 3, title: "Fluid & Acid-Base Clinical Electrolytes", type: "Course-Linked", duration: "50 min" },
  ],
};

export interface GlobalSearchProps {
  onSelectEntity: (type: "course" | "student" | "revision", idOrIdx: any) => void;
}

export default function GlobalSearch({ onSelectEntity }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<"all" | "courses" | "students" | "revisions">("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const q = query.trim().toLowerCase();

  const filteredCourses = SEARCH_DATABASE.courses.filter(
    (c) => !q || c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
  );

  const filteredStudents = SEARCH_DATABASE.students.filter(
    (s) => !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.university.toLowerCase().includes(q)
  );

  const filteredRevisions = SEARCH_DATABASE.revisions.filter(
    (r) => !q || r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)
  );

  const totalResults =
    (category === "all" || category === "courses" ? filteredCourses.length : 0) +
    (category === "all" || category === "students" ? filteredStudents.length : 0) +
    (category === "all" || category === "revisions" ? filteredRevisions.length : 0);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", maxWidth: 460 }}>
      {/* Search Input */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
        <Search
          size={15}
          style={{
            position: "absolute",
            insetInlineStart: 12,
            color: open ? C.cyan : "rgba(169,181,199,0.5)",
            pointerEvents: "none",
            zIndex: 1,
            transition: "color 0.15s",
          }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search students, courses, revisions... (Ctrl + K)"
          style={{
            width: "100%",
            height: 40,
            background: C.elevated,
            border: `1px solid ${open ? C.cyan + "88" : C.border}`,
            borderRadius: open ? "8px 8px 0 0" : 8,
            paddingInlineStart: 36,
            paddingInlineEnd: 74,
            fontSize: 13,
            color: C.text,
            outline: "none",
            fontFamily: "'Montserrat', sans-serif",
            transition: "all 0.15s",
            boxShadow: open ? "0 0 14px rgba(53,224,223,0.15)" : "none",
          }}
        />
        <div style={{ position: "absolute", insetInlineEnd: 10, pointerEvents: "none", display: "flex", alignItems: "center", gap: 4 }}>
          <kbd style={{ fontSize: 10, fontWeight: 600, color: "rgba(169,181,199,0.6)", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "2px 5px", fontFamily: "inherit" }}>
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Live Search Results Overlay */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#0c172a",
            border: `1px solid ${C.cyan}44`,
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 18px 48px rgba(0,0,0,0.65)",
            zIndex: 100,
            maxHeight: 440,
            overflowY: "auto",
            padding: "8px 0",
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: "flex", gap: 4, padding: "4px 12px 8px", borderBottom: `1px solid ${C.border}` }}>
            {[
              { id: "all", label: "All" },
              { id: "courses", label: `Courses (${filteredCourses.length})` },
              { id: "students", label: `Students (${filteredStudents.length})` },
              { id: "revisions", label: `Revisions (${filteredRevisions.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id as any)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "none",
                  background: category === tab.id ? "rgba(53,224,223,0.15)" : "transparent",
                  color: category === tab.id ? C.cyan : C.muted,
                  fontSize: 11,
                  fontWeight: category === tab.id ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Results List */}
          {totalResults === 0 ? (
            <div style={{ padding: "24px 16px", textAlign: "center", color: C.muted, fontSize: 13 }}>
              No matches found for <strong style={{ color: C.text }}>"{query}"</strong>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Courses Results */}
              {(category === "all" || category === "courses") && filteredCourses.length > 0 && (
                <div>
                  <div style={{ padding: "8px 14px 4px", fontSize: 10.5, fontWeight: 700, color: C.cyan, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Courses
                  </div>
                  {filteredCourses.map((c) => (
                    <div
                      key={c.idx}
                      onClick={() => {
                        onSelectEntity("course", c.idx);
                        setOpen(false);
                      }}
                      style={{
                        padding: "8px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(53,224,223,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan, flexShrink: 0 }}>
                          <BookOpen size={14} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{c.title}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>{c.code} · {c.instructor}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: "rgba(169,181,199,0.5)" }}>{c.extra}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Students Results */}
              {(category === "all" || category === "students") && filteredStudents.length > 0 && (
                <div>
                  <div style={{ padding: "8px 14px 4px", fontSize: 10.5, fontWeight: 700, color: "#818cf8", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>
                    Students
                  </div>
                  {filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        onSelectEntity("student", s.id);
                        setOpen(false);
                      }}
                      style={{
                        padding: "8px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(129,140,248,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#818cf8", flexShrink: 0 }}>
                          <Users size={14} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>{s.email}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 10.5, color: C.muted }}>{s.university}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Revisions Results */}
              {(category === "all" || category === "revisions") && filteredRevisions.length > 0 && (
                <div>
                  <div style={{ padding: "8px 14px 4px", fontSize: 10.5, fontWeight: 700, color: "#fbbf24", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>
                    Revisions
                  </div>
                  {filteredRevisions.map((r) => (
                    <div
                      key={r.idx}
                      onClick={() => {
                        onSelectEntity("revision", r.idx);
                        setOpen(false);
                      }}
                      style={{
                        padding: "8px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(251,191,36,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24", flexShrink: 0 }}>
                          <RefreshCw size={14} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.title}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>{r.type} · {r.duration}</div>
                        </div>
                      </div>
                      <span style={{ padding: "2px 7px", borderRadius: 10, background: "rgba(53,224,223,0.1)", color: C.cyan, fontSize: 10, fontWeight: 600 }}>
                        Revision Unit
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
