import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId,
            };
            return {
                ...state,
                isLoading: false,
                orders: [...state.orders, newOrder],
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;
