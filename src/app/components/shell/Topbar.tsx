import React from "react";
import { Menu } from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";
import { SHELL_COLORS as C } from "./shellTheme";

export interface TopbarProps {
  onOpenMobile: () => void;
  currentUser: { name: string; email: string; role: string };
  onNavigate: (route: string, subTab?: string) => void;
  onSignOut: () => void;
  onSelectEntity: (type: "course" | "student" | "revision" | "notification", idOrIdx: any) => void;
}

export default function Topbar({
  onOpenMobile,
  currentUser,
  onNavigate,
  onSignOut,
  onSelectEntity,
}: TopbarProps) {
  return (
    <header
      style={{
        height: 68,
        minHeight: 68,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 40,
        fontFamily: "'Montserrat', sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Left Column: Mobile Menu Toggle Button */}
      <div style={{ display: "flex", alignItems: "center", minWidth: 40 }}>
        <button
          onClick={onOpenMobile}
          className="mobile-menu-trigger"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: C.muted,
            padding: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Center Column: Perfectly Centered Search with Live Results */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", maxWidth: 500, margin: "0 auto" }}>
        <GlobalSearch onSelectEntity={onSelectEntity} />
      </div>

      {/* Right Column: Notification Popover Menu & Profile Dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <NotificationMenu onNavigate={onNavigate} onSelectNotification={(id) => onSelectEntity("notification", id)} />
        <ProfileMenu currentUser={currentUser} onNavigate={onNavigate} onSignOut={onSignOut} />
      </div>
    </header>
  );
}
