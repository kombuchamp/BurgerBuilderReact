import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Your order</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type="danger" onClick={() => ''}>
                CANCEL
            </Button>
            <Button type="success" onClick={() => ''}>
                OK
            </Button>
        </div>
    );
};

export default CheckoutSummary;
