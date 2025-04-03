import React, {useState} from "react";
import "./BitButton.css";
import EffectText from "../EffectText/EffectText.tsx";


interface ButtonProps {
    children: string;
    onClick?: () => void;
}

function BitButton({ children, onClick }: ButtonProps) {
    const [animatedText, setAnimatedText] = useState(children);
    const [isAnimating, setIsAnimating] = useState(false);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const animateText = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        const originalText = children.split("");
        const animationFrames = 15;
        const interval = 30;

        let frame = 0;

        const intervalId = setInterval(() => {
            setAnimatedText(
                originalText
                    .map((char, idx) => (frame < animationFrames ? chars.charAt(Math.random() * chars.length) : char))
                    .join("")
            );

            if (++frame > animationFrames) {
                clearInterval(intervalId);
                setIsAnimating(false);
                setAnimatedText(children);
            }
        }, interval);
    };

    const handleClick = () => {
        onClick?.();
        animateText();
    };
    return (
        <button
            className="bit-button"
            onClick={handleClick}
            onMouseEnter={animateText}
        >
            <EffectText fontSize={"1rem"}
                pixelMode
                        borderOffset={5.0}
            >{animatedText}</EffectText>
        </button>
    );
}

export default BitButton;