import React from 'react';
import Button from '../../UI/Button/Button';
import styles from './OrderSummary.module.css';

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
        <li key={igKey + props.ingredients[igKey]}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
    ));

    return (
        <>
            <h3 className={styles.Header}>Your order</h3>
            <p>Burger with:</p>
            <ul>{ingredientSummary}</ul>
            <p>
                Total Price: <strong>{props.price.toFixed(2)}$</strong>
            </p>
            <p>Proceed to checkout?</p>
            <Button type="danger" onClick={props.cancelButtonHandler}>
                CANCEL
            </Button>
            <Button type="success" onClick={props.okButtonHandler}>
                OK
            </Button>
        </>
    );
};

export default OrderSummary;
