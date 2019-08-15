import * as actionTypes from './actionTypes';

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
