import { useEffect, useState, ReactNode, JSX } from "react";
import "@fontsource/silkscreen";
import "./EffectText.css";
import React from "react";

function EffectText({
  children,
  pixelMode = false,
  fontSize = "1rem",
  borderOffset = 3.0,
  className = "",
}: {
  children: ReactNode;
  pixelMode?: boolean;
  fontSize?: string;
  borderOffset?: number;
  className?: string;
}) {
  const [animatedText, setAnimatedText] = useState<(JSX.Element | string)[]>(
    []
  );

  useEffect(() => {
    const text = React.Children.toArray(children).join("");
    const letters = text.split("").map((char, charIndex) => {
      const textShadow = pixelMode
        ? `
            ${parseFloat(fontSize) * 0.5 * borderOffset}px 0px 0px #ffffff, 
            0px ${parseFloat(fontSize) * -0.1 * borderOffset}px 0px #ffffff, 
            ${parseFloat(fontSize) * -0.1 * borderOffset}px 0px 0px #ffffff, 
            0px ${parseFloat(fontSize) * 0.5 * borderOffset}px 0px #ffffff
          `
        : "none";

      // Si es espacio, renderiza span especial
      if (char === " ") {
        return (
          <span
            key={charIndex}
            style={{
              display: "inline-block",
              width: `0.5em`, // aquí defines cuánto ocupa un espacio visualmente
            }}
          />
        );
      }

      return (
        <span
          className="effect-text"
          key={charIndex}
          style={{
            animationDelay: `${0.05 * charIndex}s`,
            fontSize,
            textShadow,
            color: pixelMode ? "black" : "white",
            backgroundColor: pixelMode ? "transparent" : "black",
            padding: pixelMode ? "0" : "0em",
            borderRadius: pixelMode ? "0" : "4px",
          }}
        >
          <b>{char}</b>
        </span>
      );
    });

    setAnimatedText(letters);
  }, [children, fontSize, pixelMode, borderOffset]);

  return <div className={`txt ${className}`}>{animatedText}</div>;
}

export default EffectText;
