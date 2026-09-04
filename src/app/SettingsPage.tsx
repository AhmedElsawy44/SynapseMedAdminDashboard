import React, { useState, useEffect } from "react";
import {
  Settings, Shield, Users, Lock, Key, Server, Smartphone,
  Check, AlertCircle, Save, Globe, Video, UserPlus, RefreshCw,
  ChevronRight, ToggleLeft, ToggleRight, User, Laptop, Monitor,
  Radio, Clock, AlertTriangle, LogOut
} from "lucide-react";
import PasswordOtpModal from "./settings/PasswordOtpModal";

const C = {
  bg:       "#071225",
  surface:  "#101A2B",
  elevated: "#151F32",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#A9B5C7",
  border:   "rgba(255,255,255,0.08)",
};

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Academic Director" | "Operations Lead" | "Support Specialist";
  status: "Active" | "Inactive";
  lastLogin: string;
}

const INITIAL_ADMINS: AdminUser[] = [
  { id: "adm-1", name: "Ahmed Admin", email: "ahmed.admin@synapsemed.edu", role: "Super Admin", status: "Active", lastLogin: "Just now" },
  { id: "adm-2", name: "Dr. Mostafa Omar", email: "mostafa.omar@synapsemed.edu", role: "Academic Director", status: "Active", lastLogin: "2 hours ago" },
  { id: "adm-3", name: "Sara Kamal", email: "sara.kamal@synapsemed.edu", role: "Operations Lead", status: "Active", lastLogin: "Yesterday" },
];

interface ActiveSessionItem {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const INITIAL_SESSIONS: ActiveSessionItem[] = [
  { id: "ses-1", device: "Desktop Workstation (Windows 11)", browser: "Chrome 128.0", ip: "197.38.120.45", location: "Cairo, Egypt", lastActive: "Active Now", isCurrent: true },
  { id: "ses-2", device: "iPad Pro 12.9 (M2)", browser: "Safari Mobile 17.4", ip: "156.204.14.88", location: "Alexandria, Egypt", lastActive: "3 hours ago", isCurrent: false },
  { id: "ses-3", device: "MacBook Pro 16", browser: "Chrome 127.0", ip: "197.45.89.201", location: "Giza, Egypt", lastActive: "Yesterday", isCurrent: false },
];

interface SettingsPageProps {
  initialTab?: "profile" | "security" | "sessions" | "admins" | "media" | "general";
  currentUser?: { name: string; email: string; role: string };
}

export default function SettingsPage({ initialTab = "security", currentUser }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "sessions" | "admins" | "media" | "general">(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Profile State
  const [adminName, setAdminName] = useState(currentUser?.name || "Ahmed Admin");
  const [adminEmail, setAdminEmail] = useState(currentUser?.email || "ahmed.admin@synapsemed.edu");
  const [adminPhone, setAdminPhone] = useState("+20 100 123 4567");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Security Policies State
  const [maxDevices, setMaxDevices] = useState(3);
  const [sessionTimeoutHours, setSessionTimeoutHours] = useState(72);
  const [enforceStrictIp, setEnforceStrictIp] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Bunny Stream Config State
  const [bunnyLibraryId, setBunnyLibraryId] = useState("syn-med-stream-9912");
  const [bunnyTokenActive, setBunnyTokenActive] = useState(true);
  const [bunnySecurityKey, setBunnySecurityKey] = useState("••••••••••••••••••••••••••••••••");

  // Sessions State
  const [sessions, setSessions] = useState<ActiveSessionItem[]>(INITIAL_SESSIONS);
  const [terminatedMessage, setTerminatedMessage] = useState<string | null>(null);

  // Password Rotation & 2FA OTP State
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [showPasswordOtpModal, setShowPasswordOtpModal] = useState(false);

  const handleRequestPasswordChange = () => {
    setPasswordError(null);
    setPasswordSuccess(null);
    if (!currPassword) {
      setPasswordError("Please enter your current administrative password.");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setPasswordError("New master password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New master password and confirmation password do not match.");
      return;
    }
    if (newPassword === currPassword) {
      setPasswordError("New password cannot be identical to the current password.");
      return;
    }
    // Launch 2FA OTP verification modal
    setShowPasswordOtpModal(true);
  };

  const handlePasswordOtpSuccess = () => {
    setShowPasswordOtpModal(false);
    setCurrPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSuccess("Master administrative password successfully rotated and authorized via 2FA OTP!");
    setTimeout(() => setPasswordSuccess(null), 5000);
  };

  // Admins state
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleTerminateOtherSessions = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
    setTerminatedMessage("All other remote administrative sessions have been revoked successfully.");
    setTimeout(() => setTerminatedMessage(null), 3500);
  };

  const handleTerminateSingleSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* ─── Breadcrumb & Title ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>Admin Console</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text, fontWeight: 600 }}>Settings</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>
              {activeTab === "profile" && "Administrator Profile & Credentials"}
              {activeTab === "sessions" && "Active Sessions & DRM Device Concurrency"}
              {activeTab === "security" && "System Security & Device Thresholds"}
              {activeTab === "media" && "Bunny Stream DRM & CDN Configuration"}
              {activeTab === "admins" && "Administrative Team & Roles"}
              {activeTab === "general" && "Platform General Settings"}
            </h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
              Manage administrative credentials, concurrent hardware allowances, cryptographic tokens, and team access.
            </p>
          </div>
          <button
            onClick={handleSaveSettings}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 22px", borderRadius: 8, border: "none", background: C.cyan, color: C.bg, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
          >
            {isSaved ? <><Check size={15} /> Saved Successfully</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* ─── Tabs Navigation ────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 8, borderBottom: `1px solid ${C.border}`, marginBottom: 24, paddingBottom: 2, overflowX: "auto" }}>
        {[
          { id: "profile",  label: "Administrator Profile", icon: User },
          { id: "security", label: "Security & Devices", icon: Shield },
          { id: "sessions", label: "Active Sessions", icon: Monitor },
          { id: "media",    label: "Bunny Stream DRM", icon: Video },
          { id: "admins",   label: "Admin Team & Roles", icon: Users },
          { id: "general",  label: "Platform General", icon: Globe },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              borderBottom: activeTab === id ? `2px solid ${C.cyan}` : "2px solid transparent",
              background: activeTab === id ? C.elevated : "transparent",
              color: activeTab === id ? C.cyan : C.muted,
              fontSize: 13,
              fontWeight: activeTab === id ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* ─── TAB 0: Administrator Profile ──────────────────────────────── */}
      {activeTab === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          {/* User Card */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px", display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: `linear-gradient(135deg, ${C.cyan}33, ${C.cyan}66)`, border: `2px solid ${C.cyan}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: C.cyan, flexShrink: 0 }}>
              AA
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0 }}>{adminName}</h2>
                <span style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(53,224,223,0.12)", border: `1px solid rgba(53,224,223,0.3)`, color: C.cyan, fontSize: 11, fontWeight: 700 }}>
                  SUPER ADMIN · FULL ROOT
                </span>
                <span style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 11, fontWeight: 700 }}>
                  2FA ACTIVE
                </span>
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                {adminEmail} · Synapse Med Platform Infrastructure & Security Division
              </div>
            </div>
          </div>

          {/* Account Details Form */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Personal & Contact Details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Full Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Official Work Email</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Emergency Contact Mobile</label>
                <input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Academic Affiliation</label>
                <input
                  type="text"
                  defaultValue="Faculty of Medicine · Synapse Academy"
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>
          </div>

          {/* Change Password Card with mandatory 2FA OTP requirement */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Key size={18} style={{ color: C.cyan }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Administrative Password & Key Rotation</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Password updates strictly require 2FA One-Time Password (OTP) authorization.</div>
                </div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, fontSize: 11, fontWeight: 700, color: C.cyan }}>
                <Shield size={12} /> 2FA OTP ENFORCED
              </span>
            </div>

            {passwordError && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 12, marginBottom: 16 }}>
                <AlertTriangle size={15} />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                <Check size={15} />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Current Password</label>
                <input
                  type="password"
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>New Master Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm match"
                  style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleRequestPasswordChange}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 20px",
                  borderRadius: 8,
                  border: `1px solid ${C.cyan}55`,
                  background: `linear-gradient(135deg, ${C.cyan} 0%, #1ab8b7 100%)`,
                  color: "#050C1A",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: "0 4px 14px rgba(53,224,223,0.25)",
                }}
              >
                <Shield size={14} />
                <span>Rotate Master Password (Requires 2FA OTP)</span>
              </button>
            </div>
          </div>

          {/* 2FA OTP Modal for Password Rotation */}
          <PasswordOtpModal
            isOpen={showPasswordOtpModal}
            adminEmail={adminEmail}
            onClose={() => {
              setShowPasswordOtpModal(false);
              setPasswordError(null);
            }}
            onSuccess={handlePasswordOtpSuccess}
            onError={(msg) => setPasswordError(msg)}
          />
        </div>
      )}


      {/* ─── TAB 1: Security & Devices ──────────────────────────────────── */}
      {activeTab === "security" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Device Concurrency Policy */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <Smartphone size={18} style={{ color: C.cyan }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Concurrent Device Policy (Strict Multi-Device Control)</div>
                <div style={{ fontSize: 12, color: C.muted }}>Limits how many simultaneous hardware devices a student can use before automated lock.</div>
              </div>
            </div>
            <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Maximum Active Devices per Student
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={maxDevices}
                    onChange={(e) => setMaxDevices(Number(e.target.value))}
                    style={{ width: 100, height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 14, fontWeight: 700, color: C.text, outline: "none" }}
                  />
                  <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>Active Policy: {maxDevices} Devices Enforced</span>
                </div>
                <p style={{ fontSize: 12, color: C.muted, margin: "8px 0 0", lineHeight: 1.5 }}>
                  When student attempts to log in from a 4th device, the session is rejected and logged in the Audit Trail.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Session Idle Expiration (Hours)
                </label>
                <input
                  type="number"
                  value={sessionTimeoutHours}
                  onChange={(e) => setSessionTimeoutHours(Number(e.target.value))}
                  style={{ width: 100, height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 14px", fontSize: 14, fontWeight: 700, color: C.text, outline: "none" }}
                />
                <p style={{ fontSize: 12, color: C.muted, margin: "8px 0 0", lineHeight: 1.5 }}>
                  Sessions automatically expire and require biometric or password re-authentication.
                </p>
              </div>
            </div>
          </div>

          {/* Cryptography & JWT Tokens */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Asymmetric Token Signing (RSA-2048 JWT)</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>High-security cryptographic key pair deployed in backend vault.</div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", fontSize: 11, fontWeight: 700, color: "#4ade80" }}>
                <Check size={12} /> Key Pair Healthy
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Sessions & Devices ──────────────────────────────────── */}
      {activeTab === "sessions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {terminatedMessage && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 13, fontWeight: 600 }}>
              <Check size={16} />
              <span>{terminatedMessage}</span>
            </div>
          )}

          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Monitor size={18} style={{ color: C.cyan }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Active Administrator Hardware Sessions</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Authorized devices currently authenticated to this account.</div>
                </div>
              </div>
              <button
                onClick={handleTerminateOtherSessions}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(248,113,113,0.3)",
                  background: "rgba(248,113,113,0.1)",
                  color: "#f87171",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <LogOut size={13} />
                Terminate All Other Sessions
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {sessions.map((ses) => (
                <div
                  key={ses.id}
                  style={{
                    padding: "16px 24px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: C.elevated, display: "flex", alignItems: "center", justifyContent: "center", color: ses.isCurrent ? C.cyan : C.muted }}>
                      <Laptop size={18} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{ses.device}</span>
                        {ses.isCurrent && (
                          <span style={{ padding: "2px 8px", borderRadius: 12, background: "rgba(53,224,223,0.15)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 10, fontWeight: 700 }}>
                            THIS DEVICE
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
                        {ses.browser} · IP: {ses.ip} · {ses.location}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: ses.isCurrent ? "#4ade80" : C.muted }}>{ses.lastActive}</div>
                      <div style={{ fontSize: 11, color: "rgba(169,181,199,0.5)" }}>Encrypted TLS 1.3</div>
                    </div>
                    {!ses.isCurrent && (
                      <button
                        onClick={() => handleTerminateSingleSession(ses.id)}
                        style={{ background: "transparent", border: "none", color: "#f87171", fontSize: 12, cursor: "pointer", padding: "4px 8px" }}
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: Bunny Stream DRM ────────────────────────────────────── */}
      {activeTab === "media" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.border}`, paddingBottom: 16 }}>
            <Video size={20} style={{ color: C.cyan }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Bunny Stream Video CDN & Security Key</div>
              <div style={{ fontSize: 12, color: C.muted }}>Tokens prevent hotlinking, unauthorized screen captures, and external downloads.</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Video Library ID</label>
              <input
                type="text"
                value={bunnyLibraryId}
                onChange={(e) => setBunnyLibraryId(e.target.value)}
                style={{ width: "100%", height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Token Signing Status</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8, height: 40 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "rgba(53,224,223,0.1)", border: `1px solid ${C.cyan}44`, color: C.cyan, fontSize: 12, fontWeight: 700 }}>
                  <Check size={13} /> SHA-256 DRM Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: Admin Team & Roles ──────────────────────────────────── */}
      {activeTab === "admins" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Authorized Administrative Users</div>
              <div style={{ fontSize: 12, color: C.muted }}>Personnel authorized to access the Synapse Med operational console.</div>
            </div>
            <button
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, border: `1px solid ${C.cyan}55`, background: C.cyan + "15", color: C.cyan, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              <UserPlus size={13} /> Add Administrator
            </button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted }}>User</th>
                <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted }}>Role</th>
                <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted }}>Status</th>
                <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted }}>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((adm) => (
                <tr key={adm.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontWeight: 600, color: C.text }}>{adm.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{adm.email}</div>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: adm.role === "Super Admin" ? C.cyan : C.text }}>{adm.role}</span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ padding: "3px 8px", borderRadius: 12, background: "rgba(74,222,128,0.1)", color: "#4ade80", fontSize: 11, fontWeight: 600 }}>
                      {adm.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", color: C.muted, fontSize: 12 }}>{adm.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── TAB 5: General Platform ────────────────────────────────────── */}
      {activeTab === "general" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Platform Title</label>
            <input
              type="text"
              defaultValue="SYNAPSE MED — Medical Education Platform"
              style={{ width: "100%", maxWidth: 450, height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Support Inquiry Email</label>
            <input
              type="email"
              defaultValue="support@synapsemed.edu"
              style={{ width: "100%", maxWidth: 450, height: 40, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0 12px", fontSize: 13, color: C.text, outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 20, maxWidth: 600 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Maintenance Mode</div>
              <div style={{ fontSize: 11, color: C.muted }}>When enabled, non-admin students will see a scheduled maintenance screen.</div>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: maintenanceMode ? C.cyan : C.muted, padding: 4 }}
            >
              {maintenanceMode ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
