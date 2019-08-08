import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

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
            if (param[0] === 'price') continue; // workaround
            ingredients[param[0]] = +param[1];
        }
        this.state = {
            ingredients,
            totalPrice: query.get('price'),
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
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={props => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />}
                />
            </div>
        );
    }
}
