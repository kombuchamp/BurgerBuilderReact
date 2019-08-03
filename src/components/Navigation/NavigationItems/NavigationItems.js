import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const NavigationItems = () => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem href="/" active>
                Bugrer Builder
            </NavigationItem>
            <NavigationItem href="/">Checkout</NavigationItem>
        </ul>
    );
};

export default NavigationItems;
