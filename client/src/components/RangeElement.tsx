import React from 'react';
import {QuestionFormElement} from './QuestionForm'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers/RootReducer";
import {updateAnswers} from "../actions/AnswersActions";

export const RangeElement = ({question}: QuestionFormElement) => {
    const dispatch = useDispatch();
    const answer = useSelector((state: RootState) => state.responses[question._id]);
    const defaultValue = Math.round((question.max + question.min) / 2);

    if (!answer) {
        dispatch(updateAnswers(question._id, String(defaultValue)));
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        dispatch(updateAnswers(question._id, selectedValue));
    };

    return (
        <div className='question-option-wrapper'>
            <label className='question-range-label'>{answer || defaultValue}</label>
            <input
                className='question-range-input'
                type='range'
                min={question.min}
                max={question.max}
                value={answer || defaultValue}
                onChange={handleChange}
            />
        </div>
    );
}