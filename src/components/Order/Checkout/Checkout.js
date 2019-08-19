import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                {!this.props.ingredients ? (
                    <Redirect to="/" />
                ) : this.props.isPurchased ? (
                    <Redirect to="/orders" />
                ) : (
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutCancelled={this.checkoutCancelledHandler}
                        onCheckoutContinued={this.checkoutContinuedHandler}
                        price={this.props.totalPrice}
                    />
                )}

                <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        isPurchased: state.order.isPurchased,
    };
};

export default connect(
    mapStateToProps,
    null
)(Checkout);
