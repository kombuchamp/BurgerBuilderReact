import React from 'react';
import styles from './Button.module.css';

const Button = props => (
    <button
        className={[styles.Button, props.type === 'success' ? styles.Success : props.type === 'danger' ? styles.Danger : ''].join(' ')}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);

export default Button;
