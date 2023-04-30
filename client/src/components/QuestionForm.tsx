import React, {useEffect} from "react";
import '../styles/QuestionForm.css';
import {OptionElement} from "./OptionElement";
import {RangeElement} from "./RangeElement";
import {TextElement} from "./TextElement";
import {ProgressBar} from "./ProgressBar";
import axios from 'axios';
import {NavigationBar} from "./NavigationBar";

// @ts-ignore
import labels from '../labels.json';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers/RootReducer";
import {decrementIndex, getQuestions, incrementIndex} from "../actions/QuestionFormActions";
import {getQuestionIndex} from "../reducers/FormReducer";

interface QuestionFormProps {
    isScrolled: boolean;
    handleUserCookie: (user: any) => void;
}

interface Answer {
    _id: string;
    text: string;
}

export interface Question {
    _id: string;
    orderId: number;
    text: string;
    type: string;
    field: string;
    answers: [Answer],
    regex: string;
    regexMessage: string;
    min: number;
    max: number;
    isActive: boolean;
}

export interface QuestionFormElement {
    question: Question;
}

export const QuestionForm = ({isScrolled, handleUserCookie}: QuestionFormProps) => {
    const questionForm = useSelector((state: RootState) => state.form.questionForm);
    const dispatch = useDispatch();
    const questionIndex = useSelector((state: RootState) => getQuestionIndex(state));
    const responses = useSelector((state: RootState) => state.responses);
    const responsesCount = Object.keys(Object.entries(responses).filter(([key, value]) => value.length > 0)).length;
    const percentage = Math.round((responsesCount / questionForm.length) * 100);

    useEffect(() => {
        axios.get(labels["http-get-questions"])
            .then(response => {
                dispatch(getQuestions(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleContinueClick = () => {
        dispatch(incrementIndex());
    };

    const handleBackClick = () => {
        dispatch(decrementIndex());
    };

    const handleSubmitClick = () => {
        axios.post(labels["http-post-survey"], {responses})
            .then((response) => {
                if (response.status === 200 && response.data.user) {
                    handleUserCookie(response.data.user);
                }
            })
            .catch((error) => {
                if(error.response.status === 409) {
                    alert(error.response.data.message);
                }
            });
    };

    const currentQuestion = questionForm[questionIndex];
    const isContinueButtonEnabled = questionIndex < questionForm.length - 1;
    const isBackButtonEnabled = questionIndex > 0;
    const isSubmitButtonEnabled = questionIndex === questionForm.length - 1 && percentage === 100;

    const renderAnswerInputs = (question: Question) => {
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