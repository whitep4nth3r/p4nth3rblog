import React from "react";

export default function ColorBg({
  children,
  color,
  borderTopColor,
  borderBottomColor,
  marginBottom,
}) {
  const applyColor = color || "#0f111a";
  const applyBorderTopColor = borderTopColor || "transparent";
  const applyBorderBottomColor = borderBottomColor || "transparent";
  const marginBottomValue = marginBottom || "0";

  return (
    <div
      style={{
        backgroundColor: applyColor,
        borderTop: `0.25rem solid ${applyBorderTopColor}`,
        borderBottom: `0.25rem solid ${applyBorderBottomColor}`,
        marginBottom: `${marginBottom}`,
      }}
    >
      {children}
    </div>
  );
}
