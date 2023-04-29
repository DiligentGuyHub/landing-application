import {Question} from "../components/QuestionForm";

export const getQuestions = (questions: Question) => ({
    type: "GET_QUESTIONS",
    payload: questions
});

export const incrementIndex = () => ({
    type: "INCREMENT_INDEX",
    payload: {}
});

export const decrementIndex = () => ({
    type: "DECREMENT_INDEX",
    payload: {}
});