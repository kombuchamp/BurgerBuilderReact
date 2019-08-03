import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

const Modal = props => (
    <>
        <Backdrop isOpen={props.isOpen} onClick={props.closeHandler} />
        <div
            className={styles.Modal}
            style={{
                transform: props.isOpen ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.isOpen ? '1' : '0',
            }}
        >
            {props.children}
        </div>
    </>
);

export default Modal;
