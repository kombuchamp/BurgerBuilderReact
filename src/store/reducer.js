import * as actionTypes from './actions';

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
                  };
        default:
            return state;
    }
};

export default reducer;
