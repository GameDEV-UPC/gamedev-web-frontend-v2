import React from "react";
import "./BoxSection.css";

interface BoxSectionProps {
  children: React.ReactNode;
}

function BoxSection({ children }: BoxSectionProps) {
  return <div className="box-section">{children}</div>;
}

export default BoxSection;
