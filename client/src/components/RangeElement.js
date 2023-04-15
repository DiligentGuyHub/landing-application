import React, {useState, useEffect, useRef} from "react";
import '../styles/RangeElement.css'
export const RangeElement = ({min, max, onChange}) => {
    const [selectedValue, setSelectedValue] = useState((min + max + 1) / 2);
    const handleChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedValue(value);
        onChange(value);
    }
    return (
        <div className='range-wrapper'>
            <label className='range-label'>
                {selectedValue}
            </label>
            <input
                type='range'
                className="range-input"
                min={min}
                max={max}
                value={selectedValue}
                onChange={handleChange}/>
        </div>
    );
}