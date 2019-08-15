import * as actionTypes from './actionTypes';
import axios from '../../util/axios-orders';

export const addIngredient = ingredientName => {
    return {
        type: actionTypes.ADD_INGREIDENT,
        payload: {
            ingredientName,
        },
    };
};

export const removeIngredient = ingredientName => {
    return {
        type: actionTypes.REMOVE_INGREIDENT,
        payload: {
            ingredientName,
        },
    };
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients,
        },
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return async dispatch => {
        try {
            const response = await axios.get('/ingredients.json');
            dispatch(setIngredients(response.data));
        } catch (err) {
            console.error(err);
            dispatch(fetchIngredientsFailed());
        }
    };
};
