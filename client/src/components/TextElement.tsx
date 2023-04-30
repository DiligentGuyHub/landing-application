import React from "react";
import {QuestionFormElement} from "./QuestionForm"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers/RootReducer";
import {updateAnswers} from "../actions/AnswersActions";

export const TextElement = ({question}: QuestionFormElement) => {
    const dispatch = useDispatch();
    const answer = useSelector((state: RootState) => state.responses[question._id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        dispatch(updateAnswers(question._id, newValue));
    };

    return (
        <div className="question-text-input-wrapper">
            <input
                className="question-text-input"
                type="text"
                value={answer || ''}
                onChange={handleChange}
            />
        </div>
    );
}
