export const addAnswer = (questionId: string, answers: string) => ({
    type: "ADD_ANSWER",
    payload: {
        questionId,
        answers,
    }
});
export const removeAnswer = (questionId: string, answers: string) => ({
    type: "REMOVE_ANSWER",
    payload: {
        questionId,
        answers,
    }
});

export const updateAnswers = (questionId: string, answers: string) => ({
    type: "UPDATE_ANSWERS",
    payload: {
        questionId,
        answers,
    }
});