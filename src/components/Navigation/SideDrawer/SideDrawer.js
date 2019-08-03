import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
    const classes = [styles.SideDrawer, props.isOpen ? styles.Open : styles.Close].join(' ');

    return (
        <>
            <Backdrop isOpen={props.isOpen} onClick={props.close} />
            <div className={classes}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;
