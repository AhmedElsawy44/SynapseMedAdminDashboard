import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { SHELL_COLORS as C } from "./shellTheme";

export interface NotificationMenuProps {
  onNavigate: (route: string) => void;
  onSelectNotification: (id: string) => void;
}

export default function NotificationMenu({
  onNavigate,
  onSelectNotification,
}: NotificationMenuProps) {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [items, setItems] = useState([
    { id: "ntf-001", title: "New Cardiology Revision Available", category: "Course Update", time: "10m ago", read: false },
    { id: "ntf-004", title: "Course Access Granted to Mariam Adel", category: "Access", time: "2h ago", read: false },
    { id: "ntf-003", title: "Certificate Generated for Ahmed Hassan", category: "Certificate", time: "1d ago", read: false },
    { id: "ntf-002", title: "Emergency Medicine Revision Scheduled", category: "Schedule", time: "2d ago", read: true },
  ]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
    setUnreadCount(0);
  };

  const handleItemClick = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
    setUnreadCount((c) => Math.max(0, c - 1));
    setOpen(false);
    onSelectNotification(id);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: 8,
          background: open ? C.elevated : "transparent",
          border: `1px solid ${open ? C.border : "transparent"}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s",
          flexShrink: 0,
        }}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell size={18} style={{ color: open ? C.text : C.muted }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 6,
              insetInlineEnd: 6,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: C.cyan,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              fontWeight: 800,
              color: "#050C1A",
              boxShadow: "0 0 8px rgba(53,224,223,0.5)",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Popover Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            insetInlineEnd: 0,
            top: "calc(100% + 8px)",
            width: 360,
            background: "#0c172a",
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Notifications</span>
              {unreadCount > 0 && (
                <span style={{ padding: "2px 6px", borderRadius: 10, background: "rgba(53,224,223,0.15)", color: C.cyan, fontSize: 10.5, fontWeight: 700 }}>
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                style={{ background: "transparent", border: "none", color: C.cyan, fontSize: 11, fontWeight: 600, cursor: "pointer", padding: 0 }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid rgba(255,255,255,0.04)`,
                  background: item.read ? "transparent" : "rgba(53,224,223,0.04)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = item.read ? "transparent" : "rgba(53,224,223,0.04)")}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.read ? "transparent" : C.cyan, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: item.read ? 500 : 700, color: C.text, lineHeight: 1.35 }}>
                    {item.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, fontSize: 11, color: C.muted }}>
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer View All Link */}
          <div style={{ padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onNavigate("Notifications");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: C.cyan,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              View All in Notifications Console →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
