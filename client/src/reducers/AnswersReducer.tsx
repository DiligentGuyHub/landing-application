import {RootState} from "./RootReducer";

export interface Answer {
    questionId: string;
    answers: string[];
}

export interface AnswersState {
    [questionId: string]: string[];
}

const initialState: AnswersState = {};
export const getAnswersForQuestion = (state: RootState, questionId: string) => {
    const answers = state.responses[questionId];
    return answers ? [...answers] : [];
};

export const answersReducer = (
    state = initialState,
    action: { type: string; payload: any }
) => {
    switch (action.type) {
        case "ADD_ANSWER": {
            const { questionId, answers} = action.payload;
            return {
                ...state,
                [questionId]: [...(state[questionId] || []), answers]
            };
        }
        case "REMOVE_ANSWER": {
            const { questionId, answers } = action.payload;
            return {
                ...state,
                [questionId]: state[questionId].filter((item) => item !== answers)
            };
        }
        case "UPDATE_ANSWERS": {
            const { questionId, answers } = action.payload;
            return {
                ...state,
                [questionId]: answers
            };
        }
        default:
            return state;
    }
};