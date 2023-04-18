import React, {useState, useEffect} from "react";
import '../styles/QuestionForm.css';
import {AnswerElement} from "./AnswerElement";
import {RangeElement} from "./RangeElement";
import {TextElement} from "./TextElement";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';

export const QuestionForm = ({isScrolled}) => {
    const [questionForm, setQuestionForm] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userId, setUserId] = useState('');

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

    const handleContinueClick = (event) => {
        setQuestionIndex(prev => prev + 1);
    };

    const handleBackClick = (event) => {
        setQuestionIndex(prev => prev - 1);
    };

    const currentQuestion = questionForm[questionIndex];
    const isContinueButtonEnabled = currentQuestion?.answers.length !== 0;
    const isBackButtonEnabled = questionIndex > 0;

    const renderAnswerInputs = (question) => {
        switch (question.type) {
            case 'radio':
            case 'checkbox':
                return (<AnswerElement
                    question={question}
                    type={question.type}/>);
        }

    }

    return (
        <div className={`question-form ${isScrolled ? 'show' : ''}`}>
            <div className='question-container'>
                {currentQuestion && (
                    <div className='question'>
                        <div className='question-text'>{currentQuestion.text}</div>
                        {renderAnswerInputs(currentQuestion)}
                        {isContinueButtonEnabled && (
                            <div className="continue-button-wrapper">
                                <button className="continue-button" onClick={handleContinueClick}>продолжить</button>
                            </div>
                        )}
                        {isBackButtonEnabled && (
                            <div className="continue-button-wrapper">
                                <button className="continue-button" onClick={handleBackClick}>назад</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}