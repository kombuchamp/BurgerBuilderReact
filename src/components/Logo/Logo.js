import React from 'react';
import logo from '../../assets/images/logo.png';
import styles from './Logo.module.css';

const Logo = props => (
    <div className={styles.Logo}>
        <img src={logo} alt="BurgerBuilder" />
    </div>
);

export default Logo;
