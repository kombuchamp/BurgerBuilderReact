import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => (
    <>
        <Toolbar />
        <SideDrawer />
        <main className={styles.Content}>{props.children}</main>
    </>
);

export default Layout;
