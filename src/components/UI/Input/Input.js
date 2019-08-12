import React from 'react';
import styles from './Input.module.css';

const Input = props => {
    let inputElement = null;
    const inputStyles = [styles.InputElement];

    if (props.invalid) {
        inputStyles.push(styles.Invalid);
    }

    switch (props.elementType) {
        case 'select':
            inputElement = (
                <select onChange={props.onChange} className={inputStyles.join(' ')} value={props.value}>
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
            inputElement = (
                <input
                    onChange={props.onChange}
                    className={inputStyles.join(' ')}
                    type={props.elementType}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
