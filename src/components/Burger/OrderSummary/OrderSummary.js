import React from 'react';

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
            <button>CANCEL</button>
            <button>OK</button>
        </>
    );
};

export default OrderSummary;
