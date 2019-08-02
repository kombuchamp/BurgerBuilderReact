import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
        };
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: oldCount + 1,
            },
            totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
        });
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: oldCount - 1,
            },
            totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                />
            </>
        );
    }
}

export default BurgerBuilder;
