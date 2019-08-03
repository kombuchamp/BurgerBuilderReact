import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import styles from './OrderSummary.module.css';

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => (
            <li key={igKey + this.props.ingredients[igKey]}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        ));

        return (
            <>
                <h3 className={styles.Header}>Your order</h3>
                <p>Burger with:</p>
                <ul>{ingredientSummary}</ul>
                <p>
                    Total Price: <strong>{this.props.price.toFixed(2)}$</strong>
                </p>
                <p>Proceed to checkout?</p>
                <Button type="danger" onClick={this.props.cancelButtonHandler}>
                    CANCEL
                </Button>
                <Button type="success" onClick={this.props.okButtonHandler}>
                    OK
                </Button>
            </>
        );
    }
}

export default OrderSummary;
