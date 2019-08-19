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

export const auth = (email, password) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true,
        };
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
                authData
            );
            dispatch(authSuccess(response.data));
        } catch (err) {
            console.error(err);
            dispatch(authError(err));
        }
    };
};
