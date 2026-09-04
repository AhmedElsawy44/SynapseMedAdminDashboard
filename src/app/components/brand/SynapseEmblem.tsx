import React from "react";

interface SynapseEmblemProps {
  size?: number;
}

export default function SynapseEmblem({ size = 96 }: SynapseEmblemProps) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background ambient radial aura */}
      <div style={{
        position: "absolute",
        inset: -12,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(53,224,223,0.35) 0%, rgba(53,224,223,0.08) 50%, transparent 75%)",
        filter: "blur(14px)",
        animation: "synapseAura 3s ease-in-out infinite alternate",
      }} />

      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", zIndex: 2 }}>
        <defs>
          <linearGradient id="cyanArc" x1="40" y1="20" x2="160" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#25D6D5" />
            <stop offset="50%" stopColor="#35E0DF" />
            <stop offset="100%" stopColor="#128A89" />
          </linearGradient>

          <linearGradient id="silverArc" x1="160" y1="180" x2="40" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <filter id="nucleusGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Top Cyan Arc */}
        <path
          d="M 148 36 C 115 14, 60 22, 52 64 C 48 84, 65 106, 102 110 L 120 112 C 100 110, 84 94, 88 80 C 92 64, 116 52, 138 60 L 148 36 Z"
          fill="url(#cyanArc)"
        />

        {/* Dendritic branches */}
        <g stroke="#35E0DF" strokeWidth="1.75" strokeLinecap="round" opacity="0.85">
          <path d="M 64 50 Q 82 58 98 76" />
          <path d="M 80 58 Q 74 46 68 42" />
          <path d="M 76 68 Q 62 70 56 78" />
          <path d="M 94 72 Q 106 62 114 58" />
          <path d="M 104 68 Q 112 74 122 72" />
        </g>

        {/* Bottom Silver Arc */}
        <path
          d="M 52 164 C 85 186, 140 178, 148 136 C 152 116, 135 94, 98 90 L 80 88 C 100 90, 116 106, 112 120 C 108 136, 84 148, 62 140 L 52 164 Z"
          fill="url(#silverArc)"
        />

        {/* Lower axonal roots */}
        <g stroke="#1E293B" strokeWidth="1.75" strokeLinecap="round" opacity="0.75">
          <path d="M 136 150 Q 118 142 102 124" />
          <path d="M 120 142 Q 126 154 132 158" />
          <path d="M 124 132 Q 138 130 144 122" />
          <path d="M 106 128 Q 94 138 86 142" />
        </g>

        {/* Center Play / Pulse Triangle */}
        <polygon
          points="88,96 116,112 88,128"
          fill="#35E0DF"
          opacity="0.95"
        />

        {/* Glowing Synaptic Nucleus */}
        <g filter="url(#nucleusGlow)">
          <circle cx="102" cy="88" r="9" fill="#FFFFFF" />
          <circle cx="102" cy="88" r="14" fill="#35E0DF" opacity="0.5" />
          <circle cx="102" cy="88" r="22" stroke="#35E0DF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
