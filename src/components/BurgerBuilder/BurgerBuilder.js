import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../util/axios-orders';
import Progress from '../UI/Progress/Progress';
import withErrorHandler from '../HOC/withErrorHandler/withErrorHandler';

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
            ingredients: null,
            totalPrice: 4,
            isOrderable: false,
            inOrderMode: false,
            isLoading: false,
            error: false,
        };
    }

    componentDidMount() {
        (async () => {
            try {
                const response = await axios.get('/ingredients.json');
                this.setState({
                    ingredients: response.data,
                });
            } catch (err) {
                console.error(err);
                this.setState({ error: true });
            }
        })();
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

    orderModeOffHandler = () => {
        this.setState({ inOrderMode: false });
    };

    sendOrder = async () => {
        const order = {
            ingredients: this.state.ingredients,
            customer: {
                name: 'Test Name',
                adress: {
                    street: 'Test street',
                    zipCode: '123456',
                    country: 'Country Name',
                },
                email: 'test@example.com',
            },
            deliveryMethod: 'fastest',
        };

        try {
            this.setState({ isLoading: true });
            const response = await axios.post('/orders.json', order);
            console.log(response);
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ isLoading: false, inOrderMode: false });
        }
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
                <Modal isOpen={this.state.inOrderMode} closeHandler={this.orderModeOffHandler}>
                    {this.state.isLoading ? (
                        <Progress />
                    ) : this.state.ingredients ? (
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            cancelButtonHandler={this.orderModeOffHandler}
                            okButtonHandler={this.sendOrder}
                        />
                    ) : null}
                </Modal>
                {this.state.error ? (
                    <p>Error occured while loading the ingredients. Try refreshing the page or check developer console for details.</p>
                ) : this.state.ingredients ? (
                    <>
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
                ) : (
                    <Progress />
                )}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
