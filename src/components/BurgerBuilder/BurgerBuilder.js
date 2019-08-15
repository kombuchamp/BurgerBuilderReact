import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../util/axios-orders';
import Progress from '../UI/Progress/Progress';
import withErrorHandler from '../HOC/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // ingredients: null,
            // totalPrice: 4,
            // isOrderable: false,
            inOrderMode: false,
            isLoading: false,
            error: false,
        };
    }

    // componentDidMount() {
    //     (async () => {
    //         try {
    //             const response = await axios.get('/ingredients.json');
    //             this.setState(
    //                 {
    //                     ingredients: response.data,
    //                 },
    //                 this.updateIsOrderableState
    //             );
    //         } catch (err) {
    //             console.error(err);
    //             this.setState({ error: true });
    //         }
    //     })();
    // }

    // updateIsOrderableState = () => {
    //     this.setState({
    //         isOrderable: Object.values(this.state.ingredients).every(amount => amount <= 0) // No ingredients chosen
    //             ? false
    //             : true,
    //     });
    // };

    isBurgerOrderable = () => {
        return Object.values(this.props.ingredients).every(amount => amount <= 0) // No ingredients chosen
            ? false
            : true;
    };

    // addIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     this.setState(
    //         {
    //             ingredients: {
    //                 ...this.state.ingredients,
    //                 [type]: oldCount + 1,
    //             },
    //             totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
    //         },
    //         this.updateIsOrderableState
    //     );
    // };

    // removeIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) return;
    //     this.setState(
    //         {
    //             ingredients: {
    //                 ...this.state.ingredients,
    //                 [type]: oldCount - 1,
    //             },
    //             totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
    //         },
    //         this.updateIsOrderableState
    //     );
    // };

    orderButtonHandler = () => {
        this.setState({ inOrderMode: true });
    };

    orderModeOffHandler = () => {
        this.setState({ inOrderMode: false });
    };

    proceedToCheckout = async () => {
        // const query = [];
        // for (let i in this.state.ingredients) {
        //     const key = encodeURIComponent(i);
        //     const value = encodeURIComponent(this.state.ingredients[i]);
        //     query.push(`${key}=${value}`);
        // }
        // query.push(`price=${this.props.totalPrice}`);
        // const queryString = query.join('&');
        this.props.history.push({ pathname: '/checkout' /*, search: '?' + queryString */ });
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
                    {this.state.isLoading ? (
                        <Progress />
                    ) : this.props.ingredients ? (
                        <OrderSummary
                            ingredients={this.props.ingredients}
                            price={this.props.totalPrice}
                            cancelButtonHandler={this.orderModeOffHandler}
                            okButtonHandler={this.proceedToCheckout}
                        />
                    ) : null}
                </Modal>
                {this.state.error ? (
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredientName => {
            dispatch({
                type: actionTypes.ADD_INGREIDENT,
                payload: {
                    ingredientName,
                },
            });
        },
        onIngredientRemoved: ingredientName => {
            dispatch({
                type: actionTypes.REMOVE_INGREIDENT,
                payload: {
                    ingredientName,
                },
            });
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
