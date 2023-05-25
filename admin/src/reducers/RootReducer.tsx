import {combineReducers} from "redux";
import {authorizationReducer} from "./AuthorizationReducer";

export const rootReducer = combineReducers({
    authorization: authorizationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;