import React, { useState } from "react";
import {
  LayoutDashboard, Users, BookOpen, RefreshCw,
  Lock, Tag, Award, Bell, BarChart2, Shield, Settings,
  ChevronRight, ChevronLeft, X
} from "lucide-react";
import SynapseLogo from "../brand/SynapseLogo";
import { SHELL_COLORS as C } from "./shellTheme";

export const NAV_SECTIONS = [
  { label: "MAIN", items: [
    { id: "Overview",      icon: LayoutDashboard },
    { id: "Students",      icon: Users           },
    { id: "Courses",       icon: BookOpen        },
    { id: "Revisions",     icon: RefreshCw       },
    { id: "Access",        icon: Lock            },
    { id: "Coupons",       icon: Tag             },
    { id: "Certificates",  icon: Award           },
    { id: "Notifications", icon: Bell            },
  ]},
  { label: "INSIGHTS", items: [
    { id: "Analytics",  icon: BarChart2 },
    { id: "Audit Logs", icon: Shield    },
  ]},
  { label: "SYSTEM", items: [{ id: "Settings", icon: Settings }] },
];

export function SidebarItem({
  id,
  icon: Icon,
  active,
  collapsed,
  onClick,
}: {
  id: string;
  icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={collapsed ? id : undefined}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: collapsed ? "10px 0" : "9px 12px",
        justifyContent: collapsed ? "center" : "flex-start",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        position: "relative",
        background: active ? C.elevated : hov ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "background 0.15s",
        textAlign: "left",
        fontFamily: "inherit",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            insetInlineStart: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 3,
            height: 20,
            borderRadius: 2,
            background: C.cyan,
          }}
        />
      )}
      <Icon size={17} style={{ color: active ? C.cyan : hov ? C.text : C.muted, flexShrink: 0, transition: "color 0.15s" }} />
      {!collapsed && (
        <span
          style={{
            fontSize: 14,
            fontWeight: active ? 600 : 500,
            color: active ? C.text : hov ? C.text : C.muted,
            whiteSpace: "nowrap",
            transition: "color 0.15s",
          }}
        >
          {id}
        </span>
      )}
    </button>
  );
}

export function SidebarDivider() {
  return <div style={{ height: 1, background: C.border, margin: "8px 0" }} />;
}

export function SidebarSection({
  label,
  items,
  active,
  collapsed,
  onSelect,
}: {
  label: string;
  items: { id: string; icon: React.ElementType }[];
  active: string;
  collapsed: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      {!collapsed && (
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(169,181,199,0.45)", padding: "0 12px", marginBottom: 4, marginTop: 4 }}>
          {label}
        </div>
      )}
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          id={item.id}
          icon={item.icon}
          active={active === item.id}
          collapsed={collapsed}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
}

export function SidebarProfile({
  collapsed,
  onToggleCollapse,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <div
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: collapsed ? "12px 8px" : "12px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: collapsed ? "center" : "space-between",
        background: C.elevated,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden", minWidth: 0 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.cyan}22, ${C.cyan}55)`,
            border: `1.5px solid ${C.cyan}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: C.cyan }}>AA</span>
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden", minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ahmed Admin</div>
            <div style={{ fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>Super Admin</div>
          </div>
        )}
      </div>
      <button
        onClick={onToggleCollapse}
        title={collapsed ? "Expand" : "Collapse"}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${C.border}`,
          cursor: "pointer",
          color: C.muted,
          padding: "5px 6px",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
}

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  active: string;
  onSelect: (id: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  active,
  onSelect,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const width = collapsed ? 72 : 256;
  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{ position: "fixed", inset: 0, background: "rgba(7,18,37,0.75)", zIndex: 40 }}
          className="lg:hidden"
        />
      )}
      <aside
        style={{
          width,
          background: C.bg,
          borderInlineEnd: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "fixed",
          insetInlineStart: 0,
          top: 0,
          zIndex: 50,
          transition: "width 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: "'Montserrat', sans-serif",
          overflowX: "hidden",
        }}
        className={mobileOpen ? "" : "max-lg:-translate-x-full"}
      >
        <div
          style={{
            height: 72,
            display: "flex",
            alignItems: "center",
            padding: collapsed ? "0" : "0 16px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
            gap: 10,
            position: "relative",
          }}
        >
          {collapsed ? (
            <SynapseLogo size={38} />
          ) : (
            <>
              <SynapseLogo size={42} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "0.05em", lineHeight: 1.25 }}>SYNAPSE MED</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", color: C.cyan, opacity: 0.75, lineHeight: 1, marginTop: 3 }}>ADMIN CONSOLE</div>
              </div>
            </>
          )}
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              style={{
                position: "absolute",
                insetInlineEnd: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: C.muted,
                padding: 4,
                display: "flex",
              }}
              className="lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column" }}>
          {NAV_SECTIONS.map((section, i) => (
            <div key={section.label}>
              {i > 0 && <SidebarDivider />}
              <SidebarSection
                label={section.label}
                items={section.items}
                active={active}
                collapsed={collapsed}
                onSelect={(id) => {
                  onSelect(id);
                  onCloseMobile();
                }}
              />
            </div>
          ))}
        </nav>
        <SidebarProfile collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      </aside>
    </>
  );
}
