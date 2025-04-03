import { useEffect, useState, ReactNode } from "react";
import "@fontsource/silkscreen";
import "./EffectText.css";
import React from "react"; // Asegurar que React esté importado

function EffectText({
                        children,
                        pixelMode = false,
                        fontSize = "1rem",
                        borderOffset = 3.0
                    }: {
    children: ReactNode;
    pixelMode?: boolean;
    fontSize?: string;
    borderOffset?: number;
}) {
    const [animatedText, setAnimatedText] = useState<(JSX.Element | string)[]>([]);

    useEffect(() => {
        const text = React.Children.toArray(children).join(""); // Convierte correctamente a string sin comas
        const letters = text.split("").map((char, charIndex) => {
            const textShadow = pixelMode
                ? `
                    ${parseFloat(fontSize) * 0.5 * borderOffset}px 0px 0px #ffffff, 
                    0px ${parseFloat(fontSize) * -0.1 * borderOffset}px 0px #ffffff, 
                    ${parseFloat(fontSize) * -0.1 * borderOffset}px 0px 0px #ffffff, 
                    0px ${parseFloat(fontSize) * 0.5 * borderOffset}px 0px rgb(255, 255, 255)
                `
                : "none";

            return (
                <span
                    key={charIndex}
                    style={{
                        animationDelay: `${0.1 * charIndex}s`,
                        fontSize,
                        letterSpacing: pixelMode ? "0.3em" : "0em",
                        textShadow,
                        color: pixelMode ? "black" : "white",
                        backgroundColor: pixelMode ? "transparent" : "black",
                        padding: pixelMode ? "0" : "0.2em",
                        borderRadius: pixelMode ? "0" : "4px"
                    }}
                >
                    <b>{char}</b>
                </span>
            );
        });

        setAnimatedText(letters);
    }, [children, fontSize, pixelMode, borderOffset]);

    return <div className="txt">{animatedText}</div>;
}

export default EffectText;
