import React, {useState, useEffect} from "react";
import '../styles/TextElement.css'

export const TextElement = ({question}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const savedValue = localStorage.getItem(question._id);
        if (savedValue) {
            setValue(savedValue);
        }
    }, [question._id]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleBlur = (event) => {
        const newValue = event.target.value;
        const regex = new RegExp(question.regex);
        if (!regex.test(value))  {
            console.log('error');
            setError(true);
        } else {
            setError(false);
            localStorage.setItem(question._id, newValue);
        }
    };
    return (
        <div className="question-text-input-wrapper">
            <input
                className={`question-text-input ${error ? 'question-text-input-error' : ''}`}
                type="text"
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
            />
        </div>
    );
}
