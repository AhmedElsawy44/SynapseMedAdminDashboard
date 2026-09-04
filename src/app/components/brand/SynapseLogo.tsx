import React from "react";

const C = {
  elevated: "#151F32",
  cyan:     "#35E0DF",
};

interface SynapseLogoProps {
  size?: number;
}

export default function SynapseLogo({ size = 48 }: SynapseLogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" stroke={C.cyan} strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
      <circle cx="24" cy="24" r="15" fill={C.elevated} stroke={C.cyan} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="6" fill={C.cyan} />
      <path d="M24 9V18M24 30V39M9 24H18M30 24H39" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="13" cy="13" r="2.5" fill={C.cyan} opacity="0.7" />
      <circle cx="35" cy="13" r="2.5" fill={C.cyan} opacity="0.7" />
      <circle cx="13" cy="35" r="2.5" fill={C.cyan} opacity="0.7" />
      <circle cx="35" cy="35" r="2.5" fill={C.cyan} opacity="0.7" />
    </svg>
  );
}
