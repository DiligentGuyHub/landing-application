import React, {useState, useEffect} from 'react';
import labels from '../labels.json'
export const OptionElement = ({question}) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem(labels["localstorage-path"]));
        if (savedAnswers) {
            const questionAnswers = savedAnswers[question._id] || [];
            console.log(questionAnswers);
            setAnswers(questionAnswers);
        }
    }, [question._id]);
    const handleChange = (event) => {
        const selectedAnswer = event.target.id;
        let newAnswers;
        if (question.type === 'radio') {
            newAnswers = [selectedAnswer];
        } else {
            if (event.target.checked) {
                newAnswers = [...answers, selectedAnswer];
            } else {
                newAnswers = answers.filter((answer) => answer !== selectedAnswer);
            }
        }
        setAnswers(newAnswers);
        const answersObj = {
            ...JSON.parse(localStorage.getItem(labels["localstorage-path"])),
            [question._id]: newAnswers,
        };
        if (newAnswers.length === 0) {
            delete answersObj[question._id];
        }
        localStorage.setItem(labels["localstorage-path"], JSON.stringify(answersObj));
    };

    return (
        <div className='question-option-wrapper'>
            {question.answers.map((option) => (
                <div className='question-option' key={option._id}>
                    <input
                        className="question-option-input"
                        type={question.type}
                        name='option'
                        id={option._id}
                        value={option.text}
                        checked={answers.includes(option._id)}
                        onChange={handleChange}
                    />
                    <label className='question-option-label' htmlFor={option._id}>
                        {option.text}
                    </label>
                </div>
            ))}
        </div>
    );
}