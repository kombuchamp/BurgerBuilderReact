import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 1,
        meat: 1,
    },
    totalPrice: 4,
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
                  };
        default:
            return state;
    }
};

export default reducer;
