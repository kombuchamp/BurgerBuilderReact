import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Progress from '../../UI/Progress/Progress';
import axios from '../../../util/axios-orders';
import Input from '../../UI/Input/Input';

import styles from './ContactData.module.css';

export default class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'chipest', displayValue: 'Chipest' }],
                },
                value: '',
            },
        },
        isLoading: false,
    };

    orderHandler = async ev => {
        ev.preventDefault();

        const order = {
            ingredients: this.props.ingredients,
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

    inputChangeHandler = (ev, inputIdentifier) => {
        // Copy both objects to avoid corrupting state
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[inputIdentifier] };

        updatedElement.value = ev.target.value;
        updatedOrderForm[inputIdentifier] = updatedElement;
        this.setState({ orderForm: updatedOrderForm });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {this.state.isLoading ? (
                    <Progress />
                ) : (
                    <form>
                        {formElementsArray.map(formElem => (
                            <Input
                                key={formElem.id}
                                elementType={formElem.config.elementType}
                                elementConfig={formElem.config.elementConfig}
                                value={formElem.config.value}
                                onChange={ev => this.inputChangeHandler(ev, formElem.id)}
                            />
                        ))}
                        <Button type="success" onClick={this.orderHandler}>
                            {'ORDER'}
                        </Button>
                    </form>
                )}
            </div>
        );
    }
}
