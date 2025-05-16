import React, { useState } from "react";
import "../BitInput/BitInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface BitInputPasswordProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maskChar?: string;
}

export function BitInputPassword({
  placeholder,
  value,
  onChange,
  maskChar = "#",
}: BitInputPasswordProps) {
  const [hide, setHide] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const animateTransition = (toHide: boolean) => {
    setIsAnimating(true);
    const originalValue = value.split("");
    const animationFrames = 15;
    const interval = 20;
    let step = 0;

    const intervalId = setInterval(() => {
      setDisplayValue(
        originalValue
          .map((_, i) =>
            step >= animationFrames
              ? toHide
                ? maskChar
                : originalValue[i]
              : chars.charAt(Math.floor(Math.random() * chars.length))
          )
          .join("")
      );

      if (++step > animationFrames) {
        clearInterval(intervalId);
        setIsAnimating(false);
        setDisplayValue(toHide ? maskChar.repeat(value.length) : value);
      }
    }, interval);
  };

  const handleToggleHide = () => {
    animateTransition(!hide);
    setHide((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);
    setDisplayValue(inputValue);
  };

  return (
    <div className={`bit-field ${isFocused ? "focused" : ""}`}>
      <input
        type={hide ? "password" : "text"}
        value={hide && !isAnimating ? value : displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button
        className={`show-hide ${isAnimating ? "disabled" : ""}`}
        onClick={handleToggleHide}
        disabled={isAnimating}
        type="button"
      >
        <FontAwesomeIcon icon={hide ? faEye : faEyeSlash} className="icon" />
      </button>
    </div>
  );
}

export default BitInputPassword;
