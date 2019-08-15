import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // constructor(props) {
    //     super(props);

    //     const query = new URLSearchParams(this.props.location.search);
    //     const params = query.entries();
    //     const ingredients = {
    //         meat: 0,
    //         salad: 0,
    //         bacon: 0,
    //         cheese: 0,
    //     };
    //     for (let param of params) {
    //         if (param[0] === 'price') continue; // workaround
    //         ingredients[param[0]] = +param[1];
    //     }
    //     // Redirect to start page if no ingredients provided
    //     if (Object.values(ingredients).reduce((sum, val) => (sum += val)) <= 0) {
    //         this.props.history.replace('/');
    //     }
    //     this.state = {
    //         ingredients,
    //         totalPrice: query.get('price'),
    //     };
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                {this.props.ingredients ? (
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutCancelled={this.checkoutCancelledHandler}
                        onCheckoutContinued={this.checkoutContinuedHandler}
                        price={this.props.totalPrice}
                    />
                ) : (
                    <Redirect to="/" />
                )}

                <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
    };
};

export default connect(
    mapStateToProps,
    null
)(Checkout);
