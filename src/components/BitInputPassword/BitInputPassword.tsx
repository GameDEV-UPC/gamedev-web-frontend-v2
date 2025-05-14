import React, { useState, useEffect } from "react";
import "./BitInputPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface BitInputPasswordProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BitInputPassword({
  placeholder,
  value,
  onChange,
}: BitInputPasswordProps) {
  const [hide, setHide] = useState(true);
  const [displayValue, setDisplayValue] = useState("Enter Password");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const animateTransition = (toHide: boolean) => {
    setIsAnimating(true);
    const originalValue = value.split("");
    const maskedValue = "#".repeat(originalValue.length).split("");
    const animationFrames = 15;
    const interval = 20;
    let step = 0;

    const intervalId = setInterval(() => {
      setDisplayValue(
        originalValue
          .map((_, i) =>
            step >= animationFrames
              ? toHide
                ? "#"
                : originalValue[i]
              : chars.charAt(Math.random() * chars.length)
          )
          .join("")
      );

      if (++step > animationFrames) {
        clearInterval(intervalId);
        setIsAnimating(false);
        setDisplayValue(toHide ? maskedValue.join("") : value);
      }
    }, interval);
  };

  useEffect(() => {
    animateTransition(hide);
  }, [hide, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let updatedValue = value;

    if (hide) {
      // Control manual para esconder
      if (inputValue.length > value.length) {
        updatedValue += inputValue.slice(-1);
      } else if (inputValue.length < value.length) {
        updatedValue = value.slice(0, -1);
      }
    } else {
      updatedValue = inputValue;
    }

    const fakeEvent = {
      ...e,
      target: {
        ...e.target,
        value: updatedValue,
      },
    };

    onChange(fakeEvent as React.ChangeEvent<HTMLInputElement>);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsFocused(true);
    e.target.select();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <ul
      className={`bit-password ${isFocused ? "focused" : ""}`}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        type="text"
        value={
          isAnimating ? displayValue : hide ? "#".repeat(value.length) : value
        }
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={(event) => event.currentTarget.select()}
        placeholder={placeholder}
      />
      <button
        className={`show-hide ${isAnimating ? "disabled" : ""}`}
        onClick={() => setHide((prev) => !prev)}
        disabled={isAnimating}
        style={{ marginLeft: "0px" }}
      >
        <FontAwesomeIcon className="icon" icon={hide ? faEye : faEyeSlash} />
      </button>
    </ul>
  );
}

export default BitInputPassword;
