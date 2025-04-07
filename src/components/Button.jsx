import React from "react";

function Button({
    children,
    type = "button",
    className = "",
    textColor = "text-white",
    bgColor = "bg-blue-500",
    ...props

}) {
    return (
        <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${className} , ${textColor} ${bgColor} {...props}`}>
            {children}
        </button>
    );
}

export default Button;