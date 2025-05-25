// BitInput.tsx
import React, { useState } from "react";
import "./BitInput.css";

interface BitTextFieldProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export function BitInput({
                           placeholder = "Enter text",
                           value,
                           onChange,
                           type = "text",
                         }: BitTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
      <div className={`bit-field ${isFocused ? "focused" : ""}`}>
        <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
        />
      </div>
  );
}

export default BitInput;
