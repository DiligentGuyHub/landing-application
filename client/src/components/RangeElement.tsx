import React, {useState, useEffect} from 'react';
import { QuestionFormElement } from './QuestionForm'

export const RangeElement = ({ question }: QuestionFormElement) => {
    const [value, setValue] = useState(Math.round((question.max + question.min) / 2));
    const answers = JSON.parse(localStorage.getItem('answers') || '');

    useEffect(() => {
        if (answers && answers[question._id]) {
            setValue(parseInt(answers[question._id]));
        } else {
            localStorage.setItem('answers', JSON.stringify({...answers, [question._id]: value}));
        }
    }, [question._id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}