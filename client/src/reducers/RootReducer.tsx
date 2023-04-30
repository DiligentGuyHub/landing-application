import {combineReducers} from "redux";
import {formReducer} from "./FormReducer";
import {answersReducer} from "./AnswersReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    responses: answersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;