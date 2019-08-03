import React from 'react';
import styles from './Toolbar.module.css';

const Toolbar = props => (
    <header className={styles.Toolbar}>
        <div>MENU BTN</div>
        <div>LOGO</div>
        <nav>
            <ul>
                <li>NAV LINKS</li>
            </ul>
        </nav>
    </header>
);

export default Toolbar;
