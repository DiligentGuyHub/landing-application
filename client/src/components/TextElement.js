import React, {useState, useEffect} from "react";

export const TextElement = ({question, handlePercentageChange}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('answers'));
        if (savedAnswers && savedAnswers[question._id]) {
            console.log(question._id);
            setValue(savedAnswers[question._id]);
        } else {
            setValue('');
        }
    }, [question._id]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleBlur = (event) => {
        const newValue = event.target.value;
        const regex = new RegExp(question.regex);
        if (!regex.test(value)) {
            console.log('error');
            setError(true);
        } else {
            setError(false);
            const savedAnswers = JSON.parse(localStorage.getItem('answers'));
            localStorage.setItem(
                'answers',
                JSON.stringify({
                    ...savedAnswers,
                    [question._id]: newValue,
                })
            );
            handlePercentageChange();
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
