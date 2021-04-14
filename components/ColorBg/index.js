import React from "react";

export default function ColorBg({
  children,
  color,
  borderTopColor,
  borderBottomColor,
}) {
  const applyColor = color || "#0f111a";
  const applyBorderTopColor = borderTopColor || "transparent";
  const applyBorderBottomColor = borderBottomColor || "transparent";

  return (
    <div
      style={{
        backgroundColor: applyColor,
        borderTop: `0.25rem solid ${applyBorderTopColor}`,
        borderBottom: `0.25rem solid ${applyBorderBottomColor}`,
      }}
    >
      {children}
    </div>
  );
}
