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

export const purchaseBurger = (orderData, idToken) => {
    return async dispatch => {
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post('/orders.json', orderData, {
                params: {
                    auth: idToken,
                },
            });
            console.log('Successfully posted an order', response);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } catch (err) {
            console.error(err);
            dispatch(purchaseBurgerFail(err));
        }
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders,
        },
    };
};

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: {
            error,
        },
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (idToken, userId) => {
    return async dispatch => {
        dispatch(fetchOrdersStart());
        const orders = [];
        try {
            const response = await axios.get('/orders.json', {
                params: {
                    auth: idToken,
                    orderBy: '"userId"',
                    equalTo: `"${userId}"`,
                },
            });
            // For some reason axios doesnt reject promise if response is 4xx. Catch it manualy
            if (!response) {
                throw Error();
            }
            for (let key in response.data) {
                orders.push({
                    ...response.data[key],
                    id: key,
                });
            }
            console.log(response);
            dispatch(fetchOrdersSuccess(orders));
        } catch (err) {
            console.error(err);
            dispatch(fetchOrdersFail(err));
        }
    };
};
