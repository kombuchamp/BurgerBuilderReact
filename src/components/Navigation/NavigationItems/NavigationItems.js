import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const NavigationItems = props => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/">Bugrer Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {props.isAuthenticated ? (
                <NavigationItem link="/logout">Log out</NavigationItem>
            ) : (
                <NavigationItem link="/auth">Sign Up</NavigationItem>
            )}
        </ul>
    );
};

export default NavigationItems;
