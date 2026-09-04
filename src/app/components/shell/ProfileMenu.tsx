import React, { useState, useRef, useEffect } from "react";
import { User, Key, Monitor, LogOut, ChevronDown } from "lucide-react";
import { SHELL_COLORS as C } from "./shellTheme";

export interface ProfileMenuProps {
  currentUser: { name: string; email: string; role: string };
  onNavigate: (route: string, subTab?: string) => void;
  onSignOut: () => void;
}

export default function ProfileMenu({ currentUser, onNavigate, onSignOut }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const items = [
    { label: "Profile", icon: User, action: () => { setOpen(false); onNavigate("Settings", "profile"); } },
    { label: "Security", icon: Key, action: () => { setOpen(false); onNavigate("Settings", "security"); } },
    { label: "Sessions", icon: Monitor, action: () => { setOpen(false); onNavigate("Settings", "sessions"); } },
    { label: "Sign out", icon: LogOut, danger: true, action: () => { setOpen(false); onSignOut(); } },
  ];

  const initials = currentUser.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "AA";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: open ? C.elevated : "transparent",
          border: `1px solid ${open ? C.border : "transparent"}`,
          borderRadius: 8,
          padding: "5px 10px 5px 6px",
          cursor: "pointer",
          transition: "background 0.15s",
          fontFamily: "inherit",
        }}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${C.cyan}22, ${C.cyan}55)`, border: `1.5px solid ${C.cyan}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.cyan }}>{initials}</span>
        </div>
        <div style={{ textAlign: "start" }} className="hidden sm:block">
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{currentUser.name}</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.2 }}>{currentUser.role}</div>
        </div>
        <ChevronDown size={14} style={{ color: C.muted, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
      </button>
      {open && (
        <div role="menu" style={{ position: "absolute", insetInlineEnd: 0, top: "calc(100% + 8px)", width: 192, background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 12, padding: "6px", zIndex: 100, boxShadow: "0 16px 48px rgba(0,0,0,0.45)" }}>
          {items.map((item) => (
            <button
              key={item.label}
              role="menuitem"
              onClick={item.action}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 8,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "start",
                fontFamily: "inherit",
                color: item.danger ? "#f87171" : C.muted,
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <item.icon size={15} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
