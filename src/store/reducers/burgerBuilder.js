import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isTouched: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREIDENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
                isTouched: true,
            };
        case actionTypes.REMOVE_INGREIDENT:
            return state.ingredients[action.payload.ingredientName] <= 0
                ? state
                : {
                      ...state,
                      ingredients: {
                          ...state.ingredients,
                          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1,
                      },
                      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
                      isTouched: true,
                  };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.payload.ingredients.salad,
                    bacon: action.payload.ingredients.bacon,
                    cheese: action.payload.ingredients.cheese,
                    meat: action.payload.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
                isTouched: false,
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;
