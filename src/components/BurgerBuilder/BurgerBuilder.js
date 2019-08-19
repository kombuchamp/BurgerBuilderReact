import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../util/axios-orders';
import Progress from '../UI/Progress/Progress';
import withErrorHandler from '../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inOrderMode: false,
        };
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    isBurgerOrderable = () => {
        return Object.values(this.props.ingredients).every(amount => amount <= 0) // No ingredients chosen
            ? false
            : true;
    };

    orderButtonHandler = () => {
        if (this.props.isAuthenticated) {
            return this.setState({ inOrderMode: true });
        }
        this.props.history.push({ pathname: '/auth', search: '?order=true' });
    };

    orderModeOffHandler = () => {
        this.setState({ inOrderMode: false });
    };

    proceedToCheckout = async () => {
        this.props.inInitPurchase();
        this.props.history.push({ pathname: '/checkout' });
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <>
                <Modal isOpen={this.state.inOrderMode} closeHandler={this.orderModeOffHandler}>
                    {this.props.ingredients ? (
                        <OrderSummary
                            ingredients={this.props.ingredients}
                            price={this.props.totalPrice}
                            cancelButtonHandler={this.orderModeOffHandler}
                            okButtonHandler={this.proceedToCheckout}
                        />
                    ) : null // Progress spinner?
                    }
                </Modal>
                {this.props.error ? (
                    <p>Error occured while loading the ingredients. Try refreshing the page or check developer console for details.</p>
                ) : this.props.ingredients ? (
                    <>
                        <Burger ingredients={this.props.ingredients} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabledInfo={disabledInfo}
                            price={this.props.totalPrice}
                            isOrderable={this.isBurgerOrderable()}
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: !!state.auth.idToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredientName => {
            dispatch(actions.addIngredient(ingredientName));
        },
        onIngredientRemoved: ingredientName => {
            dispatch(actions.removeIngredient(ingredientName));
        },
        onInitIngredients: () => dispatch(actions.initIngredients()),
        inInitPurchase: () => dispatch(actions.purchaseInit()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
