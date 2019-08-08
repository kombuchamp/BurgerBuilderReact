import React from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styles from './Toolbar.module.css';

const Toolbar = props => (
    <header className={styles.Toolbar}>
        <DrawerToggle onClick={props.drawerToggleClicked} />
        <Logo onClick={() => props.history.push('/')} />
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default withRouter(Toolbar);
