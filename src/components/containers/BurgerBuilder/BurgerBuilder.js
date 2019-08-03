import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

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
            isOrderable: false,
            inOrderMode: false,
        };
    }

    updateIsOrderableState = () => {
        this.setState({
            isOrderable: Object.values(this.state.ingredients).every(amount => amount <= 0) // No ingredients chosen
                ? false
                : true,
        });
    };

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        this.setState(
            {
                ingredients: {
                    ...this.state.ingredients,
                    [type]: oldCount + 1,
                },
                totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
            },
            this.updateIsOrderableState
        );
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        this.setState(
            {
                ingredients: {
                    ...this.state.ingredients,
                    [type]: oldCount - 1,
                },
                totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
            },
            this.updateIsOrderableState
        );
    };

    orderButtonHandler = () => {
        this.setState({ inOrderMode: true });
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
                <Modal isOpen={this.state.inOrderMode}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    isOrderable={this.state.isOrderable}
                    orderButtonHandler={this.orderButtonHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;
