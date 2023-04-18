import React, {useState, useEffect} from "react";
import '../styles/QuestionForm.css';
import {OptionElement} from "./OptionElement";
import {RangeElement} from "./RangeElement";
import {TextElement} from "./TextElement";
import {ProgressBar} from "./ProgressBar";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';

export const QuestionForm = ({isScrolled}) => {
    const [questionForm, setQuestionForm] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [userId, setUserId] = useState('');
    const [percentage, setPercentage] = useState(0);

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
        setPercentage((localStorage.length / questionForm.length) * 100);
    }, [answers]);

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
    const isContinueButtonEnabled = questionIndex < questionForm.length - 1;
    const isBackButtonEnabled = questionIndex > 0;

    const renderAnswerInputs = (question) => {
        switch (question.type) {
            case 'radio':
            case 'checkbox':
                return (<OptionElement question={question}/>);
            case 'range':
                return (<RangeElement question={question}/>);
            case 'text':
                return (<TextElement question={question}/>);
        }

    }

    return (
        <div className={`question-form ${isScrolled ? 'show' : ''}`}>
            <div className='question-container'>
                {currentQuestion && (
                    <div className='question'>
                        <div className='question-text'>{currentQuestion.text}</div>
                        {renderAnswerInputs(currentQuestion)}
                        <div className="button-container">
                            {isBackButtonEnabled && (
                                <div className="back-button-wrapper">
                                    <button className="back-button" onClick={handleBackClick}>предыдущий вопрос
                                    </button>
                                </div>
                            )}
                            {isContinueButtonEnabled && (
                                <div className="continue-button-wrapper">
                                    <button className="continue-button" onClick={handleContinueClick}>следующий
                                        вопрос
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <ProgressBar percentage={percentage}/>
            </div>
        </div>

    );
}