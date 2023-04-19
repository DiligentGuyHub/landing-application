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
    const [userId, setUserId] = useState('');
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (userId) {
            Cookies.set('userId', userId);
            console.log(`user id created: ${userId}`);
        }
    }, [userId]);

    useEffect(() => {
        const answeredQuestionsAmount = Object.keys(JSON.parse(localStorage.getItem('answers')) || {}).length;
        setPercentage(Math.round(answeredQuestionsAmount / questionForm.length * 100));
    }, [questionIndex, questionForm])

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

    const handleSubmitClick = (event) => {
        const answers = JSON.parse(localStorage.getItem("answers")) || {};
        const data = {
            userId,
            answers,
        };
        axios.post("http://localhost:4000/api/questions", data)
            .then((response) => {
                if(response.status === 200){
                    setUserId(response.data.userId);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const currentQuestion = questionForm[questionIndex];
    const isContinueButtonEnabled = questionIndex < questionForm.length - 1;
    const isBackButtonEnabled = questionIndex > 0;
    const isSubmitButtonEnabled = questionIndex === questionForm.length - 1 && percentage === 100;

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
                                <div className="button-wrapper back-button-wrapper">
                                    <button className="navigation-button back-button" onClick={handleBackClick}>предыдущий вопрос
                                    </button>
                                </div>
                            )}
                            {isContinueButtonEnabled && (
                                <div className="button-wrapper continue-button-wrapper">
                                    <button className="navigation-button continue-button" onClick={handleContinueClick}>следующий
                                        вопрос
                                    </button>
                                </div>
                            )}
                            {isSubmitButtonEnabled && (
                            <div className="button-wrapper submit-button-wrapper">
                                <button className="navigation-button submit-button" onClick={handleSubmitClick}>
                                    завершить опрос
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