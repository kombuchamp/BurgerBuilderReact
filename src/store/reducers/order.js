import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    isLoading: false,
    isPurchased: false,
    fetchError: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                isPurchased: false,
            };
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
                isPurchased: true,
                orders: [...state.orders, newOrder],
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders,
                isLoading: false,
                fetchError: false, // TODO: get error
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                isLoading: false,
                fetchError: true, // TODO: get error
            };
        default:
            return state;
    }
};

export default reducer;
