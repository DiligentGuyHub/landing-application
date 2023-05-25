// Define your action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Define your action creators
export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginSuccess = (token: string) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT,
});