import React, {useState, useEffect} from "react";
import {AnswerElement} from "./AnswerElement";
import axios from "axios";

export const QuestionForm = () => {
    const [question, setQuestion] = useState({
        "orderId": null,
        "text": "",
        "category": "",
        "field": "",
        "answers": []
    });
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:4000/questions/${counter}`)
            .then(response => {
                setQuestion(response.data.question);
                console.log(response.data.question);
            })
            .catch(error => {
                console.log(error);
            });
    }, [counter]);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswers((prevState) => {
            return (prevState.includes(answer))
                ? prevState.filter((selectedOption) => selectedOption !== answer)
                : [...prevState, answer];
        });
    };

    const handleContinueClick = (event) => {
        event.preventDefault();
        setCounter(prev => prev + 1);
    };

    const isContinueButtonDisabled = selectedAnswers.length !== 0;

    const renderAnswerInputs = (category) => {
        switch (category) {
            case 'single':
                // return question.answers.map((answer) => (
                //     <div key={answer.value}>
                //         <input
                //             type='radio'
                //             name='option'
                //             id={answer.value}
                //             value={answer.text}
                //             checked={selectedAnswers.includes(answer)}
                //             onChange={(e) => handleOptionChange(answer)}/>
                //         <label htmlFor={answer.value}>{answer.text}</label>
                //     </div>
                // ));
            case 'multiple':
                return question.answers.map((answer) => (
                    <AnswerElement
                        key={answer._id}
                        answer={answer}
                        type='checkbox'
                        handleAnswerSelect={handleAnswerSelect}/>
                ));
            case 'text':
                return <input type="text" name={question.id}/>;
            case 'range':
        }
    }

    return (
        <form onSubmit={handleContinueClick}>
            <h2>{question.text}</h2>
            {renderAnswerInputs(question.category)}
            {isContinueButtonDisabled && (
                <div className="continue-button-wrapper">
                    <button className="continue-button" onSubmit={handleContinueClick}>продолжить</button>
                </div>
            )}
        </form>
    );
}