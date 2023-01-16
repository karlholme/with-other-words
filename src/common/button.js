import React from "react";

export default function buttonMaker() {
    function ButtonContent({
        label,
        className,
        style,
        disabled,
        onClick
    }) {
        return (
            <button
                className={className}
                style={style}
                disabled={disabled}
                onClick={function (event) {
                    event.preventDefault();
                    navigator.vibrate(200);
                    onClick();
                }}>
                <span className="button-text" >
                    {label}
                </span>
            </button>
        )
    }

    return function (props) {
        return <ButtonContent {...props} />
    }
}
