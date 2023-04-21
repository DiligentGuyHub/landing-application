import React, {useState, useEffect} from "react";
import '../styles/QuestionForm.css';
import {OptionElement} from "./OptionElement";
import {RangeElement} from "./RangeElement";
import {TextElement} from "./TextElement";
import {ProgressBar} from "./ProgressBar";
import axios from 'axios';
import labels from '../labels.json';
import {NavigationBar} from "./NavigationBar";

export const QuestionForm = ({isScrolled, handleUserCookie}) => {
    const [questionForm, setQuestionForm] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        const answeredQuestionsAmount = Object.keys(JSON.parse(localStorage.getItem('answers')) || {}).length;
        setPercentage(Math.round(answeredQuestionsAmount / questionForm.length * 100));
    }, [questionIndex, questionForm])

    useEffect(() => {
        axios.get(labels["http-get-questions"])
            .then(response => {
                setQuestionForm(response.data.questions);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleContinueClick = () => {
        setQuestionIndex(prev => prev + 1);
    };

    const handleBackClick = () => {
        setQuestionIndex(prev => prev - 1);
    };

    const handlePercentageChange = () => {
        const answeredQuestionsAmount = Object.keys(JSON.parse(localStorage.getItem(labels["localstorage-path"])) || {}).length;
        setPercentage(Math.round(answeredQuestionsAmount / questionForm.length * 100));
    }

    const handleSubmitClick = () => {
        const answers = JSON.parse(localStorage.getItem(labels["localstorage-path"])) || {};
        axios.post(labels["http-post-survey"], {answers})
            .then((response) => {
                if (response.status === 200) {
                    handleUserCookie(response.data.user);
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
                return (<OptionElement question={question} handlePercentageChange={handlePercentageChange}/>);
            case 'range':
                return (<RangeElement question={question} handlePercentageChange={handlePercentageChange}/>);
            case 'text':
                return (<TextElement question={question} handlePercentageChange={handlePercentageChange}/>);
        }

    }

    return (
        <div className={`question-form ${isScrolled ? 'show' : ''}`}>
            <div className='question-container'>
                {currentQuestion && (
                    <div className='question'>
                        <div className='question-text'>{currentQuestion.text}</div>
                        {renderAnswerInputs(currentQuestion)}
                        <NavigationBar isBackButtonEnabled={isBackButtonEnabled}
                                       isContinueButtonEnabled={isContinueButtonEnabled}
                                       isSubmitButtonEnabled={isSubmitButtonEnabled}
                                       handleBackClick={handleBackClick}
                                       handleContinueClick={handleContinueClick}
                                       handleSubmitClick={handleSubmitClick}/>
                    </div>
                )}
                <ProgressBar percentage={percentage}/>
            </div>
        </div>
    );
}