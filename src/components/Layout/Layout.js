import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        isSideDrawerOpen: true,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ isSideDrawerOpen: false });
    };

    render() {
        return (
            <>
                <Toolbar />
                <SideDrawer isOpen={this.state.isSideDrawerOpen} close={this.sideDrawerClosedHandler} />
                <main className={styles.Content}>{this.props.children}</main>
            </>
        );
    }
}

export default Layout;
