import React, { Component } from 'react';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        const params = query.entries();
        const ingredients = {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0,
        };
        for (let param of params) {
            ingredients[param[0]] = param[1];
        }
        this.state = {
            ingredients,
        };
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
            </div>
        );
    }
}
