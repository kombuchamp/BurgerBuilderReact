import React from 'react';
import styles from './Button.module.css';

const Button = props => (
    <button
        className={[
            styles.Button,
            props.type === 'success' ? styles.Success : props.type === 'danger' ? styles.Danger : props.type === 'info' ? styles.Info : '',
        ].join(' ')}
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.children}
    </button>
);

export default Button;
