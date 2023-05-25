import {RootState} from "./RootReducer";
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from "../actions/authorizationActions";

const initialState = {
    token: null,
    loading: false,
    error: null,
    isAuthorized: false,
};


export const authorizationReducer = (
    state = initialState,
    action: { type: string; payload: any }
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                loading: false,
                error: null,
                isAuthorized: true,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthorized: false,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                loading: false,
                error: null,
                isAuthorized: false,
            };
        default:
            return state;
    }
}