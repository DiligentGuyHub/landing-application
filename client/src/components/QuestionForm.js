import React, {useState, useEffect} from "react";
import '../styles/QuestionForm.css';
import {AnswerElement} from "./AnswerElement";
import {RangeElement} from "./RangeElement";
import axios from "axios";

export const QuestionForm = ({isScrolled}) => {
    const [question, setQuestion] = useState({
        "orderId": null,
        "text": "",
        "type": "",
        "field": "",
        "answers": []
    });
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [counter, setCounter] = useState(7);

    useEffect(() => {
        console.log(selectedAnswers);
    }, [selectedAnswers]);

    useEffect(() => {
        axios.get(`http://localhost:4000/questions/${counter}`)
            .then(response => {
                setQuestion(response.data.question);
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

    const handleRangeChange = (selectedValue) => {
        setSelectedAnswers([selectedValue]);
    };

    const handleContinueClick = (event) => {
        event.preventDefault();
        setCounter(prev => prev + 1);
        setSelectedAnswers([]);
    };

    const isContinueButtonEnabled = selectedAnswers.length !== 0;

    const renderAnswerInputs = (question) => {
        switch (question.type) {
            case 'radio':
            case 'checkbox':
                return question.answers.map((answer) => (
                    <AnswerElement
                        key={answer._id}
                        answer={answer}
                        type={question.type}
                        handleAnswerSelect={handleAnswerSelect}/>
                ));
            case 'range':
                return (
                    <RangeElement
                        key={question._id}
                        min={parseInt(question.answers[0].text)}
                        max={parseInt(question.answers[1].text)}
                        onChange={handleRangeChange}/>);
        }

    }

    return (
        <div className={`question-form-wrapper ${isScrolled ? 'show' : ''}`}>
            <form onSubmit={handleContinueClick}>
                <h2>{question.text}</h2>
                {renderAnswerInputs(question)}
                {isContinueButtonEnabled && (
                    <div className="continue-button-wrapper">
                        <button className="continue-button" onSubmit={handleContinueClick}>продолжить</button>
                    </div>
                )}
            </form>
        </div>
    );
}