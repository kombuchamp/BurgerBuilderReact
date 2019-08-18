import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            authData,
        },
    };
};

export const authError = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error,
        },
    };
};

export const auth = (email, password) => {
    return async dispatch => {
        dispatch(authStart());
    };
};

//TODO: 6
