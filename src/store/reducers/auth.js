import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.payload.idToken,
                userId: action.payload.userId,
                error: null,
                isLoading: false,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null,
            };
        default:
            return state;
    }
};

export default reducer;
