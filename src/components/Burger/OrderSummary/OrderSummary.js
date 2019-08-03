import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
        <li key={igKey + props.ingredients[igKey]}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
    ));

    return (
        <>
            <h3>Your order</h3>
            <p>Burger with:</p>
            <ul>{ingredientSummary}</ul>
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
