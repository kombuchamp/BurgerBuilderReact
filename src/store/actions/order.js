import * as actionTypes from './actionTypes';
import axios from '../../util/axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData,
        },
    };
};

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: {
            error,
        },
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = orderData => {
    return async dispatch => {
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post('/orders.json', orderData);
            console.log('Successfully posted an order', response);
            dispatch(purchaseBurgerSuccess(response.data, orderData));
        } catch (err) {
            console.error(err);
            dispatch(purchaseBurgerFail(err));
        }
    };
};
