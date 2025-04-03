import React, { useState } from 'react';
import './BitInput.css';

interface BitTextFieldProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function BitInput({ placeholder = 'Enter text', value, onChange, type = 'text' }: BitTextFieldProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`inputField ${isFocused ? 'focused' : ''}`}>

            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}  // Cuando el campo recibe foco
                onBlur={() => setIsFocused(false)}  // Cuando el campo pierde foco
                placeholder={placeholder}
            />

        </div>
    );
};

export default BitInput;
