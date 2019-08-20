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
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            console.warn('User token has been expired');
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
            const { idToken: token, localId: userId, expiresIn: expirationTime } = response.data;

            localStorage.setItem('idToken', token);
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + expirationTime * 1000));
            localStorage.setItem('userId', userId);

            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expirationTime));
        } catch (err) {
            console.error(err);
            dispatch(authFail(err.response.data.error));
        }
    };
};

export const authCheckStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        const expirationDateString = localStorage.getItem('expirationDate');
        const userId = localStorage.getItem('userId');

        const expirationDate = expirationDateString && new Date(expirationDateString);
        const currentDate = new Date();
        if (!token || !expirationDateString || !userId || (expirationDate && expirationDate < currentDate)) {
            return dispatch(logout());
        }
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationDate / 1000 - currentDate / 1000));
    };
};
