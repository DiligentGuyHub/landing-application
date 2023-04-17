import React, {useState, useEffect} from "react";
import '../styles/QuestionForm.css';
import {AnswerElement} from "./AnswerElement";
import {RangeElement} from "./RangeElement";
import {TextElement} from "./TextElement";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';

export const QuestionForm = ({isScrolled}) => {
    const [questionForm, setQuestionForm] = useState([{
        "orderId": -1,
        "text": "",
        "type": "",
        "field": "",
        "answers": []
    }]);
    const [answers, setAnswers] = useState({
        "userId": "",
        "questions": []
    });
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userId, setUserId] = useState('');
    const currentQuestion = questionForm[questionIndex];

    useEffect(() => {
        let userIdCookie = Cookies.get('userId');
        if (!userIdCookie) {
            userIdCookie = uuidv4();
            Cookies.set('userId', userIdCookie);
            console.log(`user id created: ${userIdCookie}`);
        }
        setUserId(userIdCookie);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/api/questions')
            .then(response => {
                setQuestionForm(response.data.questions);
            })
            .catch(error => {
                console.log(error);
            });
    }, [userId]);

    useEffect(() => {
        axios.post('http://localhost:4000/api/questions', answers)
            .catch(error => {
                console.log(error);
            });
    }, [answers])

    const handleInputChange = (input) => {
        // setAnswers([input]);
    };

    const handleContinueClick = async (event) => {
        event.preventDefault();
        const selectedAnswers = Array.from(event.target.querySelectorAll('input[type="checkbox"]:checked'))
            .map((checkbox) => checkbox.id);

        setAnswers(prevState => {
            const index = prevState.questions.findIndex(question => question.questionId === currentQuestion._id);
            if (index !== -1) {
                const updatedQuestion = {
                    ...prevState.questions[index],
                    answers: selectedAnswers
                };
                const updatedQuestions = [
                    ...prevState.questions.slice(0, index),
                    updatedQuestion,
                    ...prevState.questions.slice(index + 1)
                ];
                return {
                    ...prevState,
                    questions: updatedQuestions
                };
            }

            return {
                ...prevState,
                questions: [
                    ...prevState.questions,
                    {
                        "questionId": currentQuestion._id,
                        "answers": selectedAnswers
                    }
                ]
            };
        });
        setQuestionIndex(prev => prev + 1);
    };

    const isContinueButtonEnabled = currentQuestion.answers.length !== 0;

    const renderAnswerInputs = (question) => {
        switch (question.type) {
            case 'radio':
            case 'checkbox':
                return question.answers.map((answer) => (
                    <AnswerElement
                        key={answer._id}
                        answer={answer}
                        type={question.type}/>
                ));
            case 'range':
                return (
                    <RangeElement
                        key={question._id}
                        min={question.min}
                        max={question.max}
                        onChange={handleInputChange}/>);
            case 'text':
                return (
                    <TextElement
                        key={question._id}
                        regex={question.validator}
                        onChange={handleInputChange}/>
                )
        }

    }

    return (
        <div className={`question-form-wrapper ${isScrolled ? 'show' : ''}`}>
            <form name='questionForm' onSubmit={handleContinueClick}>
                <h2>{currentQuestion.text}</h2>
                {renderAnswerInputs(currentQuestion)}
                {isContinueButtonEnabled && (
                    <div className="continue-button-wrapper">
                        <button className="continue-button" onSubmit={handleContinueClick}>продолжить</button>
                    </div>
                )}
            </form>
        </div>
    );
}