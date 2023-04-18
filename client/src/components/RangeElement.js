import React, {useState, useEffect} from 'react';

export const RangeElement = ({question}) => {
    const [value, setValue] = useState(Math.round((question.max + question.min)/2));

    useEffect(() => {
        const savedValue = localStorage.getItem(question._id);
        if (savedValue) {
            setValue(parseInt(savedValue));
        }
        else {
            localStorage.setItem(question._id, value);
        }
    }, [question._id]);

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);
        localStorage.setItem(question._id, newValue);
    };

    return (
        <div className='question-option-wrapper'>
            <label className='question-range-label'>{value}</label>
            <input
                className='question-range-input'
                type='range'
                min={question.min}
                max={question.max}
                step={question.step}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}