import React, { useId } from "react";

function Select(
    {
        options,
        label,
        className,
        ...props
    }, ref) {
    const id = useId();
    return (
        <>
            <div className="w-full ">
                {
                    label && <label htmlFor={id} className="text-sm font-medium text-gray-900">{label}</label>}
                <select {...props} id={id} ref={ref} className={`block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${className}`}>
                    {
                        options?.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default React.forwardRef(Select)