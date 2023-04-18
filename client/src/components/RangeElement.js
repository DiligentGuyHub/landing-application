import React, {useState, useEffect} from 'react';

export const RangeElement = ({question}) => {
    const [value, setValue] = useState(Math.round((question.max + question.min) / 2));
    const answers = JSON.parse(localStorage.getItem('answers'));

    useEffect(() => {
        if (answers && answers[question._id]) {
            setValue(parseInt(answers[question._id]));
        } else {
            localStorage.setItem('answers', JSON.stringify({...answers, [question._id]: value}));
        }
    }, [question._id]);

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);
        localStorage.setItem('answers', JSON.stringify({...answers, [question._id]: newValue}));
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