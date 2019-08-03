import React from 'react';
import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css';

const Toolbar = props => (
    <header className={styles.Toolbar}>
        <div>MENU BTN</div>
        <Logo />
        <nav>
            <ul>
                <li>NAV LINKS</li>
            </ul>
        </nav>
    </header>
);

export default Toolbar;
