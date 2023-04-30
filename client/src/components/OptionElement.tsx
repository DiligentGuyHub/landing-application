import React from 'react';
// @ts-ignore
import labels from '../labels.json'
import {QuestionFormElement} from "./QuestionForm";
import {useDispatch, useSelector} from 'react-redux';
import {addAnswer, removeAnswer} from '../actions/AnswersActions';
import {getAnswersForQuestion} from "../reducers/AnswersReducer";
import {RootState} from "../reducers/RootReducer";

export const OptionElement = ({question}: QuestionFormElement) => {
    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => getAnswersForQuestion(state, question._id));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedAnswer = event.target.id;
        const {type} = question;

        if (type === 'radio') {
            dispatch(addAnswer(question._id, selectedAnswer));
        } else {
            if (event.target.checked) {
                dispatch(addAnswer(question._id, selectedAnswer));
            } else {
                dispatch(removeAnswer(question._id, selectedAnswer));
            }
        }
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