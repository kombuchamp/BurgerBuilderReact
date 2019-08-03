import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = props => (props.isOpen ? <div className={styles.Backdrop} onClick={props.onClick} /> : null);

export default Backdrop;
