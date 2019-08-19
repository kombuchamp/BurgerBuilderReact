import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const auth = (email, password, isSignUp) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true,
        };
        const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
        const url = isSignUp
            ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
            : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        try {
            const response = await axios.post(url, authData);
            dispatch(authSuccess(response.data));
        } catch (err) {
            console.error(err);
            dispatch(authError(err));
        }
    };
};
