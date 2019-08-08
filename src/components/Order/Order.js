import React from 'react';
import styles from './Order.module.css';

const Order = props => {
    return (
        <div className={styles.Order}>
            <p>Ingredients: </p>
            <p>
                Price: <strong>100$</strong>
            </p>
        </div>
    );
};

export default Order;
