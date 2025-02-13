import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CustomInput(props) {
    const [bgColor, setBgColor] = useState('white');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            style={{
                padding: 5,
                border: "0.5px #c0c0c0 solid",
                margin: 5,
                boxSizing: "border-box",
                borderRadius: "10px",
                backgroundColor: bgColor,
                ...props.style,
            }}
        >
            <p style={{ color: bgColor === 'white' ? "#c0c0c0" : 'black', fontWeight: "normal", fontSize: 12 }}>
                {props.title}
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              
            <input
            type={props.type !== 'password' ? props.type : showPassword ? 'text' : 'password'}

                style={{
                    border: "none",
                    padding: 3,
                    outline: "none",
                    fontWeight: "normal",
                    fontSize: 12,
                    backgroundColor: "inherit",
                    width: "90%",
                }}
                onFocus={() => setBgColor('#9bdaff')}
                onBlur={() => setBgColor('white')}
                placeholder={props.placeholder}
                onChange={props.onChange}
                required={props.required}
                name={props.name}
                id={props.id}
                // Add any additional props here
                 // Spread all other props directly
            />
            {props.type === 'password' && (
                    <div
                        style={{ cursor: 'pointer', marginLeft: 10 }}
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