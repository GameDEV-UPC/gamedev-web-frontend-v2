import { useEffect, useState } from "react";
import "./AnimatedText.css";

interface AnimatedTextProps {
    children: string;
    size?: string;
    primaryColor?: string;
    glitchColor?: string;
    glitchInterval?: number;
    probability?: number;
    glow?: boolean;
    glowColor?: string;
}

function AnimatedText({
                          children,

                          primaryColor = "#fff",
                          glitchColor = "#ff0080",
                          glitchInterval = 800,
                          probability = 0.98,
                          glow = false,
                          glowColor = "#ff0080",
                      }: AnimatedTextProps) {
    const [text, setText] = useState(children);
    const glitchChars = "!@#$%^&*()_+1234567890<>?/|[]{}-=";

    useEffect(() => {
        const glitchText = () =>
            setText((prev) =>
                prev
                    .split("")
                    .map((char, i) =>
                        Math.random() > probability ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : children[i]
                    )
                    .join("")
            );

        const interval = setInterval(glitchText, glitchInterval);
        return () => clearInterval(interval);
    }, [children, glitchInterval, probability, glitchChars]);

    return (
        <div
            className="animated-text"
            style={{

                color: primaryColor,
                textShadow: glow ? `0 0 10px ${glowColor}` : "none",
            }}
        >
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className={char !== children[i] ? "glitch-char" : ""}
                    style={{ color: char !== children[i] ? glitchColor : primaryColor }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}

export default AnimatedText;
