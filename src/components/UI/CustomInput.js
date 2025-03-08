import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../../styles/variables.css';

function CustomInput(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            style={{
                padding: 'var(--padding-xs)',
                border: `var(--border-width) var(--border-color) solid`,
                margin: 'var(--padding-xs)',
                boxSizing: "border-box",
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: isFocused ? 'var(--primary-light)' : 'var(--background-color)',
                ...props.style,
            }}
        >
            <p style={{ 
                color: isFocused ? 'var(--text-color)' : 'var(--placeholder-color)', 
                fontWeight: "normal", 
                fontSize: 'var(--font-size-xs)' 
            }}>
                {props.title}
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    {...props}
                    type={props.type !== 'password' ? props.type : showPassword ? 'text' : 'password'}
                    style={{
                        border: "none",
                        padding: 'var(--padding-xs)',
                        outline: "none",
                        fontWeight: "normal",
                        fontSize: 'var(--font-size-xs)',
                        backgroundColor: "inherit",
                        width: "90%",
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    required={props.required}
                    name={props.name}
                    id={props.id}
                />
                {props.type === 'password' && (
                    <div
                        style={{ 
                            cursor: 'pointer', 
                            marginLeft: 'var(--padding-sm)',
                            color: 'var(--text-color)'
                        }}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomInput;