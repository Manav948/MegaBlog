import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...Props
}, ref) {
    const id = useId();
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label htmlFor={id} className="text-sm font-semibold">{label}</label>}
            <input
                type={type}
                className = {`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                ref={ref}
                {...Props}
                id={id}
            />
        </div>
    );
}
)
export default Input;