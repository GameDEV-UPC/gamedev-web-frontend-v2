import React from "react";


interface BoxSectionProps {
    children: React.ReactNode;
    className?: string;
}

function BoxSection({ children, className }: BoxSectionProps) {
    return (
        <div
            style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
            }}
            className={className ? className : "box-section"}
        >
            {children}
        </div>
    );
}

export default BoxSection;