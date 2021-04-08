import React from "react";

export default function ColorBg({ children, color, borderTopColor }) {
  const applyColor = color || "#0f111a";
  const applyBorderTopColor = borderTopColor || "transparent";
  return (
    <div
      style={{
        backgroundColor: applyColor,
        borderTop: `0.5rem solid ${applyBorderTopColor}`,
      }}
    >
      {children}
    </div>
  );
}
