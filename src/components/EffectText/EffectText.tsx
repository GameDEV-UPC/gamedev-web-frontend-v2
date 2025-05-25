import { useEffect, useState, ReactNode, JSX } from "react";
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

      if (char === " ") {
        return (
          <span
            key={charIndex}
            style={{
              display: "inline-block",
              width: `0.5em`,
            }}
          />
        );
      }

      return (
        <span
          className={className ? className : "effect-text"}
          key={charIndex}
          style={{
            animationDelay: `${0.05 * charIndex}s`,
            fontSize,
            textShadow: pixelMode ? textShadow : undefined,
          }}
        >
          <b>{char}</b>
        </span>
      );
    });

    setAnimatedText(letters);
  }, [children, fontSize, pixelMode, className, borderOffset]);

  return <span>{animatedText}</span>;
}

export default EffectText;
