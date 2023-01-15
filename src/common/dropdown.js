import React from "react";

export default function () {

    function DropdownContent({
        title,
        value,
        onChange,
        required,
        style,
        alternatives = [],
    }) {
        return (
            <fieldset style={style}>
                {title && <label id={title}>{title}</label>}
                <select
                    id={title}
                    value={value || ''}
                    required={required}
                    onChange={function (e) {
                        onChange(e)
                    }}>
                    {alternatives.map((alternative) => {
                        return <option key={alternative} value={alternative}>{alternative}</option>
                    })}
                </select>
            </fieldset>
        );
    }

    return function Dropdown(props) {
        return <DropdownContent {...props} />
    }
}
