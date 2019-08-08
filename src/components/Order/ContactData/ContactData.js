import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import styles from './ContactData.module.css';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: '',
        },
    };

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postal" placeholder="Postal Code" />
                    <Button type="success">ORDER</Button>
                </form>
            </div>
        );
    }
}
