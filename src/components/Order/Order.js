import React from 'react';
import styles from './Order.module.css';

const Order = props => {
    const ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push({ name: key, count: props.ingredients[key] });
    }
    return (
        <div className={styles.Order}>
            <p>Ingredients: </p>
            {ingredients.map(ig => (
                <span
                    key={ig.name}
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        padding: '3px',
                        margin: '0 8px',
                        border: '1px solid gray',
                    }}
                >
                    {ig.name} ({ig.count})
                </span>
            ))}
        </div>
    );
};

export default Order;
