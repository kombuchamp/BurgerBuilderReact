import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            idToken,
            userId,
        },
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error,
        },
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
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
            const token = response.data.idToken;
            const userId = response.data.localId;
            const expirationTime = response.data.expiresIn;
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expirationTime));
        } catch (err) {
            console.error(err);
            dispatch(authFail(err.response.data.error));
        }
    };
};
