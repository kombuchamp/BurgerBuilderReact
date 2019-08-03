import React from 'react';
import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => (
    <header className={styles.Toolbar}>
        <div>MENU BTN</div>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;
