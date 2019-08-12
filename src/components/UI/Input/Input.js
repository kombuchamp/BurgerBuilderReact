import React from 'react';
import styles from './Input.module.css';

const Input = props => {
    let inputElement = null;

    switch (props.elementType) {
        case 'select':
            inputElement = (
                <select className={styles.InputElement} value={props.value}>
                    {props.elementConfig.options.map(o => (
                        <option key={o.value} value={o.value}>
                            {o.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case 'input':
        default:
            inputElement = <input className={styles.InputElement} type={props.elementType} {...props.elementConfig} value={props.value} />;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
