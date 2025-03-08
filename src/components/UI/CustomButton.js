import React from "react";
import '../../styles/variables.css';

function CustomButton(props) {
  return (
    // <div
    //   style={{
    //     width: "100%",
    //     alignSelf: "center",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#9bdaff",
    //     borderRadius:12,
    //     padding:5

    //   }}
    // >
    <button 
      type={props.type} 
      style={{
        width: "100%",
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props.disabled ? 'var(--disabled-color)' : 'var(--primary-color)',
        borderRadius: 'var(--border-radius-md)',
        padding: 'var(--padding-md)',
        fontSize: 'var(--font-size-md)',
        outline: 'none',
        color: 'white',
        border: 'none',
        cursor: props.disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.3s, transform 0.1s",
        ...props.style
      }} 
      onClick={props.onClick}
    >
      {props.title}
    </button>
    /* </div> */
  );
}

export default CustomButton;
