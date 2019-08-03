import React from 'react';
import styles from './Modal.module.css';

const Modal = props => (
    <div
        className={styles.Modal}
        style={{
            transform: props.isOpen ? 'translateX(0)' : 'translateX(-100vh)',
            opacity: props.isOpen ? '1' : '0',
        }}
    >
        {props.children}
    </div>
);

export default Modal;
