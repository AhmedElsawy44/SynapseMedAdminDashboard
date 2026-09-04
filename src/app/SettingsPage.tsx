import React, { useState } from "react";
import {
  Settings, Shield, Users, Lock, Key, Server, Smartphone,
  Check, AlertCircle, Save, Globe, Video, UserPlus, RefreshCw,
  ChevronRight, ToggleLeft, ToggleRight
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"security" | "admins" | "media" | "general">("security");

  // Security Policies State
  const [maxDevices, setMaxDevices] = useState(3);
  const [sessionTimeoutHours, setSessionTimeoutHours] = useState(72);
  const [enforceStrictIp, setEnforceStrictIp] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Bunny Stream Config State
  const [bunnyLibraryId, setBunnyLibraryId] = useState("syn-med-stream-9912");
  const [bunnyTokenActive, setBunnyTokenActive] = useState(true);
  const [bunnySecurityKey, setBunnySecurityKey] = useState("••••••••••••••••••••••••••••••••");

  // Admins state
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px", background: C.bg }}>
      {/* ─── Breadcrumb & Title ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, marginBottom: 8 }}>
          <span>System</span>
          <ChevronRight size={12} style={{ opacity: 0.5 }} />
          <span style={{ color: C.text, fontWeight: 600 }}>Settings</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>System & Security Settings</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
              Configure device concurrency thresholds, video token DRM encryption, and administrative team privileges.
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
      <div style={{ display: "flex", gap: 8, borderBottom: `1px solid ${C.border}`, marginBottom: 24, paddingBottom: 2 }}>
        {[
          { id: "security", label: "Security & Devices", icon: Shield },
          { id: "media",    label: "Bunny Stream Video DRM", icon: Video },
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
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

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

      {/* ─── TAB 2: Bunny Stream DRM ────────────────────────────────────── */}
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

      {/* ─── TAB 3: Admin Team & Roles ──────────────────────────────────── */}
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

      {/* ─── TAB 4: General Platform ────────────────────────────────────── */}
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
