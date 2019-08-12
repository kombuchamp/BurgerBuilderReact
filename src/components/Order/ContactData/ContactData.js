import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Progress from '../../UI/Progress/Progress';
import axios from '../../../util/axios-orders';
import Input from '../../UI/Input/Input';

import styles from './ContactData.module.css';

export default class ContactData extends Component {
    state = {
        isLoading: false,
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: '',
        },
    };

    orderHandler = async ev => {
        ev.preventDefault();

        const order = {
            ingredients: this.props.ingredients,
            customer: {
                name: 'Test Name',
                adress: {
                    street: 'Test street',
                    zipCode: '123456',
                    country: 'Country Name',
                },
                email: 'test@example.com',
            },
            deliveryMethod: 'fastest',
        };
        try {
            this.setState({ isLoading: true });
            const response = await axios.post('/orders.json', order);
            console.log('Successfully posted an order', response);
            this.props.history.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {this.state.isLoading ? (
                    <Progress />
                ) : (
                    <form>
                        <Input label={'hellp'} autoFocus type="text" name="name" placeholder="Your Name" />
                        <input type="email" name="email" placeholder="Your Email" />
                        <input type="text" name="street" placeholder="Street" />
                        <input type="text" name="postal" placeholder="Postal Code" />
                        <Button type="success" onClick={this.orderHandler}>
                            {'ORDER'}
                        </Button>
                    </form>
                )}
            </div>
        );
    }
}
