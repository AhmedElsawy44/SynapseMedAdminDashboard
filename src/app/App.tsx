import React, { useState } from "react";
import { Sidebar, Topbar, SHELL_COLORS as C } from "./components/shell";

// ─── Modular Page Imports ───────────────────────────────────────────────────
import RevisionsPage, { RevisionDetailsPage, RevisionEditorPage, INITIAL_REVISIONS, RevisionRecord, RevisionStatus } from "./RevisionsPage";
import AccessPage, { AccessDetailsPage, GrantAccessPage, INITIAL_ACCESS_RECORDS, AccessRecord, AccessStatus } from "./AccessPage";

// ─── App ──────────────────────────────────────────────────────────────────────
import CouponsPage from "./CouponsPage";
import CouponEditorPage from "./CouponEditorPage";
import CouponRedemptionsPage from "./CouponRedemptionsPage";
import AnalyticsPage from "./AnalyticsPage";
import { NotificationsListPage, NotificationDetailsPage, NotificationComposerPage } from "./NotificationsPage";
import CertificatesPage from "./CertificatesPage";
import AuditLogsPage from "./AuditLogsPage";
import SettingsPage from "./SettingsPage";
import OverviewPage from "./OverviewPage";
import CourseEditorPage from "./CourseEditorPage";
import StudentsPage, { StudentDetailsPage } from "./StudentsPage";
import CoursesPage, { CourseDetailsPage, INITIAL_COURSES } from "./CoursesPage";
import { CourseItem } from "./courseTypes";
import QuizzesPage from "./QuizzesPage";
import LoginPage from "./LoginPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Ahmed Admin",
    email: "ahmed.admin@synapsemed.edu",
    role: "Super Admin",
  });
  const [settingsTab, setSettingsTab] = useState<"profile" | "security" | "sessions" | "admins" | "media" | "general">("profile");

  const [collapsed, setCollapsed]           = useState(false);
  const [active, setActive]                 = useState("Overview");
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Courses state & subviews
  const [courseRows, setCourseRows]                 = useState<CourseItem[]>([...INITIAL_COURSES]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
  const [courseSubView, setCourseSubView]           = useState<"details" | "editor" | "create" | null>(null);

  const [selectedQuizIndex, setSelectedQuizIndex]     = useState<number | null>(null);
  const [quizSubView, setQuizSubView]                 = useState<"attempts" | "editor" | null>(null);

  // Revision state
  const [revisionRows, setRevisionRows]             = useState<RevisionRecord[]>([...INITIAL_REVISIONS]);
  const [selectedRevisionIdx, setSelectedRevisionIdx] = useState<number | null>(null);
  const [revisionSubView, setRevisionSubView]         = useState<"details" | "editor" | null>(null);

  // Access state
  const [accessRows, setAccessRows]             = useState<AccessRecord[]>([...INITIAL_ACCESS_RECORDS]);
  const [selectedAccessId, setSelectedAccessId] = useState<string | null>(null);
  const [accessSubView, setAccessSubView]       = useState<"details" | "grant" | null>(null);

  // Coupon state
  const [couponSubView, setCouponSubView] = useState<"editor" | "redemptions" | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<{ code: string; target: string; type: string; status: string; used: number; limit: number } | null>(null);

  // Notification state
  const [notifSubView, setNotifSubView]     = useState<"details" | "composer" | null>(null);
  const [selectedNotifId, setSelectedNotifId] = useState<string | null>(null);

  const sidebarWidth = collapsed ? 72 : 256;

  function updateRevisionRow(idx: number, updates: Partial<RevisionRecord>) {
    setRevisionRows((prev) => prev.map((r, i) => i === idx ? { ...r, ...updates } : r));
  }

  function handleNavSelect(id: string, subTab?: string) {
    setActive(id);
    if (id === "Settings" && subTab) {
      setSettingsTab(subTab as any);
    }
    setSelectedStudentId(null);
    setSelectedCourseIndex(null);
    setCourseSubView(null);
    setSelectedQuizIndex(null);
    setQuizSubView(null);
    setSelectedRevisionIdx(null);
    setRevisionSubView(null);
    setSelectedAccessId(null);
    setAccessSubView(null);
    setCouponSubView(null);
    setSelectedCoupon(null);
    setNotifSubView(null);
    setSelectedNotifId(null);
  }

  function handleSelectSearchResult(type: "course" | "student" | "revision" | "notification", idOrIdx: any) {
    if (type === "course") {
      setActive("Courses");
      setSelectedCourseIndex(typeof idOrIdx === "number" ? idOrIdx : 0);
      setCourseSubView("details");
    } else if (type === "student") {
      setActive("Students");
      setSelectedStudentId(String(idOrIdx));
    } else if (type === "revision") {
      setActive("Revisions");
      setSelectedRevisionIdx(typeof idOrIdx === "number" ? idOrIdx : 0);
      setRevisionSubView("details");
    } else if (type === "notification") {
      setActive("Notifications");
      setSelectedNotifId(String(idOrIdx));
      setNotifSubView("details");
    }
  }

  function renderPage() {
    if (active === "Students" && selectedStudentId) {
      return <StudentDetailsPage studentId={selectedStudentId} onBack={() => setSelectedStudentId(null)} />;
    }
    if (active === "Students") {
      return <StudentsPage onViewStudent={(id) => setSelectedStudentId(id)} />;
    }

    // Courses routing
    if (active === "Courses" && courseSubView === "create") {
      return (
        <CourseEditorPage
          isCreate={true}
          onSave={(newCourse) => {
            setCourseRows([newCourse, ...courseRows]);
            setSelectedCourseIndex(0);
            setCourseSubView("details");
          }}
          onBack={() => setCourseSubView(null)}
        />
      );
    }
    if (active === "Courses" && selectedCourseIndex !== null && courseSubView === "editor") {
      const selectedCourse = courseRows[selectedCourseIndex];
      return (
        <CourseEditorPage
          courseIndex={selectedCourseIndex}
          courseRow={selectedCourse}
          isCreate={false}
          onSave={(updatedCourse) => {
            setCourseRows((prev) => prev.map((c, i) => i === selectedCourseIndex ? updatedCourse : c));
            setCourseSubView("details");
          }}
          onBack={() => setCourseSubView("details")}
        />
      );
    }
    if (active === "Courses" && selectedCourseIndex !== null && courseSubView === "details") {
      const selectedCourse = courseRows[selectedCourseIndex];
      return (
        <CourseDetailsPage
          course={selectedCourse}
          courseId={selectedCourse?.id}
          coursesList={courseRows}
          onPublish={() => {
            setCourseRows((prev) => prev.map((c, i) => i === selectedCourseIndex ? { ...c, status: "Published", updated: "Just now" } : c));
          }}
          onArchive={() => {
            setCourseRows((prev) => prev.map((c, i) => i === selectedCourseIndex ? { ...c, status: "Archived", updated: "Just now" } : c));
          }}
          onBack={() => { setSelectedCourseIndex(null); setCourseSubView(null); }}
          onEdit={() => setCourseSubView("editor")}
        />
      );
    }
    if (active === "Courses") {
      return (
        <CoursesPage
          courses={courseRows}
          onViewCourse={(i) => { setSelectedCourseIndex(i); setCourseSubView("details"); }}
          onEditCourse={(i) => { setSelectedCourseIndex(i); setCourseSubView("editor"); }}
          onCreateCourse={() => { setSelectedCourseIndex(null); setCourseSubView("create"); }}
        />
      );
    }

    // Revision routing
    if (active === "Revisions" && selectedRevisionIdx !== null && revisionSubView === "editor") {
      return (
        <RevisionEditorPage
          revision={revisionRows[selectedRevisionIdx]}
          onSave={(updates) => {
            if (selectedRevisionIdx !== null) updateRevisionRow(selectedRevisionIdx, updates);
            setRevisionSubView("details");
          }}
          onBack={() => setRevisionSubView(selectedRevisionIdx !== null ? "details" : null)}
        />
      );
    }
    if (active === "Revisions" && revisionSubView === "editor" && selectedRevisionIdx === null) {
      return (
        <RevisionEditorPage
          onSave={(newRev) => {
            const fullRev: RevisionRecord = {
              id: `REV-2026-0${revisionRows.length + 1}`,
              title: newRev.title || "New Revision",
              description: newRev.description || "",
              isStandalone: newRev.isStandalone ?? false,
              course: newRev.isStandalone ? null : (newRev.course || "Advanced Clinical Cardiology"),
              order: newRev.order || 1,
              specialty: newRev.specialty || "Cardiology",
              status: newRev.status || "Draft",
              availableFrom: newRev.availableFrom || null,
              availableUntil: newRev.availableUntil || null,
              enrolledStudents: 0,
              completionRate: 0,
              lastModified: "Just now",
              hasVideo: newRev.hasVideo ?? false,
              videoFileName: newRev.videoFileName || null,
              videoDurationSeconds: newRev.videoDurationSeconds || 0,
              durationMinutes: newRev.durationMinutes || 0,
              videoPreviewUrl: newRev.videoPreviewUrl || null,
              attachments: newRev.attachments || [],
              ...newRev,
            };
            setRevisionRows([fullRev, ...revisionRows]);
            setRevisionSubView(null);
          }}
          onBack={() => setRevisionSubView(null)}
        />
      );
    }
    if (active === "Revisions" && selectedRevisionIdx !== null && revisionSubView === "details") {
      return (
        <RevisionDetailsPage
          revision={revisionRows[selectedRevisionIdx]}
          onBack={() => { setSelectedRevisionIdx(null); setRevisionSubView(null); }}
          onEdit={() => setRevisionSubView("editor")}
          onPublish={() => {
            updateRevisionRow(selectedRevisionIdx, { status: "Active" });
          }}
          onArchive={() => {
            updateRevisionRow(selectedRevisionIdx, { status: "Archived" });
          }}
        />
      );
    }
    if (active === "Revisions") {
      return (
        <RevisionsPage
          rows={revisionRows}
          onTransition={(idx, next) => updateRevisionRow(idx, { status: next })}
          onView={(idx) => { setSelectedRevisionIdx(idx); setRevisionSubView("details"); }}
          onEdit={(idx) => {
            setSelectedRevisionIdx(idx);
            setRevisionSubView("editor");
          }}
          onCreate={() => {
            setSelectedRevisionIdx(null);
            setRevisionSubView("editor");
          }}
        />
      );
    }

    // Access routing
    if (active === "Access" && selectedAccessId && accessSubView === "details") {
      const rec = accessRows.find((r) => r.id === selectedAccessId);
      if (!rec) return null;
      return (
        <AccessDetailsPage
          record={rec}
          onRevoke={(id, reason) => {
            setAccessRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "Revoked", revokedAt: "Just now", revocationReason: reason } : r));
            setSelectedAccessId(null);
            setAccessSubView(null);
          }}
          onBack={() => { setSelectedAccessId(null); setAccessSubView(null); }}
        />
      );
    }
    if (active === "Access" && accessSubView === "grant") {
      return (
        <GrantAccessPage
          onGrant={(rec) => {
            const newRec: AccessRecord = {
              id: `ACC-${Math.floor(100 + Math.random() * 900)}`,
              studentId: rec.studentId || `SM-${Math.floor(10000 + Math.random() * 90000)}`,
              studentName: rec.studentName || "Medical Candidate",
              studentEmail: rec.studentEmail || "candidate@kasralainy.edu.eg",
              targetType: rec.targetType || "Course",
              target: rec.target || "Advanced Clinical Cardiology",
              status: "Active",
              granted: "Today",
              expiresAt: rec.expiresAt || null,
              grantedBy: "Super Admin",
              ...rec,
            };
            setAccessRows((prev) => [newRec, ...prev]);
            setAccessSubView(null);
          }}
          onBack={() => setAccessSubView(null)}
        />
      );
    }
    if (active === "Access") {
      return (
        <AccessPage
          rows={accessRows}
          onRevoke={(id, reason) => setAccessRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "Revoked", revokedAt: "Just now", revocationReason: reason } : r))}
          onView={(id) => { setSelectedAccessId(id); setAccessSubView("details"); }}
          onGrant={() => setAccessSubView("grant")}
        />
      );
    }

    if (active === "Coupons" && couponSubView === "redemptions" && selectedCoupon) {
      return (
        <CouponRedemptionsPage
          coupon={selectedCoupon}
          onBack={() => { setCouponSubView(null); setSelectedCoupon(null); }}
        />
      );
    }
    if (active === "Coupons" && couponSubView === "editor") {
      return (
        <CouponEditorPage
          onBack={() => setCouponSubView(null)}
          onSave={() => setCouponSubView(null)}
        />
      );
    }
    if (active === "Coupons") {
      return (
        <CouponsPage
          onCreate={() => setCouponSubView("editor")}
          onViewRedemptions={(c) => { setSelectedCoupon(c); setCouponSubView("redemptions"); }}
        />
      );
    }

    if (active === "Quizzes") {
      return (
        <QuizzesPage
          onNavigateToCourse={() => {
            setActive("Courses");
            setCourseSubView(null);
          }}
          onNavigateToRevision={() => {
            setActive("Revisions");
            setRevisionSubView(null);
          }}
        />
      );
    }
    if (active === "Notifications" && notifSubView === "details" && selectedNotifId) {
      return (
        <NotificationDetailsPage
          notifId={selectedNotifId}
          onBack={() => { setNotifSubView(null); setSelectedNotifId(null); }}
        />
      );
    }
    if (active === "Notifications" && notifSubView === "composer") {
      return (
        <NotificationComposerPage
          onBack={() => setNotifSubView(null)}
          onSave={() => setNotifSubView(null)}
        />
      );
    }
    if (active === "Notifications") {
      return (
        <NotificationsListPage
          onCreate={() => setNotifSubView("composer")}
          onView={(id) => { setSelectedNotifId(id); setNotifSubView("details"); }}
          onEdit={(id) => { setSelectedNotifId(id); setNotifSubView("composer"); }}
        />
      );
    }

    if (active === "Analytics") {
      return <AnalyticsPage />;
    }
    if (active === "Certificates") {
      return <CertificatesPage />;
    }
    if (active === "Audit Logs") {
      return <AuditLogsPage />;
    }
    if (active === "Settings") {
      return <SettingsPage initialTab={settingsTab} currentUser={currentUser} />;
    }
    return (
      <OverviewPage
        onNavigate={(route) => handleNavSelect(route)}
        onCreateCourse={() => {
          setActive("Courses");
          setSelectedCourseIndex(null);
          setCourseSubView("create");
        }}
        onViewCourse={(idx) => {
          setActive("Courses");
          setSelectedCourseIndex(idx);
          setCourseSubView("details");
        }}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Montserrat', sans-serif", overflow: "hidden", color: C.text }}>
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} active={active} onSelect={(id) => handleNavSelect(id)} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", marginInlineStart: sidebarWidth, transition: "margin-inline-start 0.22s cubic-bezier(0.4,0,0.2,1)" }} className="max-lg:!ms-0">
        <Topbar
          onOpenMobile={() => setMobileOpen(true)}
          currentUser={currentUser}
          onNavigate={(route, subTab) => handleNavSelect(route, subTab)}
          onSignOut={() => setIsAuthenticated(false)}
          onSelectEntity={handleSelectSearchResult}
        />
        {renderPage()}
      </div>
    </div>
  );
}
