import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const NavigationItem = props => (
    <li className={styles.NavigationItem}>
        <NavLink to={props.link} exact activeClassName={styles.active}>
            {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;
