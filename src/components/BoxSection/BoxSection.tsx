import React from "react";
import "./BoxSection.css";

interface BoxSectionProps {
  children: React.ReactNode;
  className?: string;
}

function BoxSection({ children, className }: BoxSectionProps) {
  return (
    <div
      style={{
        boxShadow: "0 0 16px #0ff, 0 0 32px #ea36af, inset 0 0 8px #75fa69",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px",
      }}
      className={className ? className : "box-section"}
    >
      {children}
    </div>
  );
}

export default BoxSection;
