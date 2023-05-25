import {RootState} from "./RootReducer";
import {Question} from "../components/QuestionForm";

export interface QuestionFormState {
    questionForm: Question[];
    currentQuestion: Question | null;
    questionIndex: number;
}

const initialState: QuestionFormState = {
    questionForm: [],
    currentQuestion: null,
    questionIndex: 0,
};

export const getQuestionIndex = (state: RootState) => state.form.questionIndex;

export const formReducer = (
    state = initialState,
    action: { type: string; payload: any }
) => {
    switch (action.type) {
        case 'GET_QUESTIONS':
            return {
                ...state,
                questionForm: action.payload.questions,
            };
        case 'INCREMENT_INDEX':
            return {
                ...state,
                currentQuestion: state.questionForm[state.questionIndex],
                questionIndex: state.questionIndex + 1
            }
        case 'DECREMENT_INDEX':
            return {
                ...state,
                currentQuestion: state.questionForm[state.questionIndex],
                questionIndex: state.questionIndex - 1
            }
        default:
            return state;
    }
}