import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        isSideDrawerOpen: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ isSideDrawerOpen: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({
            isSideDrawerOpen: !prevState.isSideDrawerOpen,
        }));
    };

    render() {
        return (
            <>
                <Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    isOpen={this.state.isSideDrawerOpen}
                    close={this.sideDrawerClosedHandler}
                />
                <main className={styles.Content}>{this.props.children}</main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.idToken,
    };
};

export default connect(
    mapStateToProps,
    null
)(Layout);
