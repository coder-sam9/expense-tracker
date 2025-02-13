import React from "react";

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
    <button type={props.type} style={{
        width: "100%",
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f61dd",
        borderRadius:12,
        padding:5,
        fontSize:16,
        outline:'none',
        color:'white',
        border:'none',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: props.disabled ? "#ccc" : "#007bff",
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
