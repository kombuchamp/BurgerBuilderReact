import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = props => {
    return (
        <div className={styles.BuildControls}>
            <p>
                Price: <strong>{props.price.toFixed(2)}$</strong>
            </p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    moreButtonHandler={() => props.ingredientAdded(ctrl.type)}
                    lessButtonHandler={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]}
                />
            ))}
            <button className={styles.OrderButton} disabled={!props.isOrderable} onClick={props.orderButtonHandler}>
                ORDER
            </button>
        </div>
    );
};

export default BuildControls;
