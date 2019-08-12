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
                validationRules: { required: true },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validationRules: { required: true },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validationRules: { required: true },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validationRules: { required: true },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validationRules: { required: true },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'chipest', displayValue: 'Chipest' }],
                },
                value: '',
                validationRules: {},
                valid: false,
                touched: false,
            },
        },
        isLoading: false,
    };

    orderHandler = async ev => {
        ev.preventDefault();
        this.setState({ isLoading: true });
        const formData = {};
        for (let formElemId in this.state.orderForm) {
            formData[formElemId] = this.state.orderForm[formElemId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            orderData: formData,
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

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() === '';
        }

        return isValid;
    }

    inputChangeHandler = (ev, inputIdentifier) => {
        // Copy both objects to avoid corrupting state
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[inputIdentifier] };

        updatedElement.value = ev.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validationRules);
        updatedElement.touched = true;
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
                    <form onSubmit={this.orderHandler}>
                        {formElementsArray.map(formElem => (
                            <Input
                                key={formElem.id}
                                elementType={formElem.config.elementType}
                                elementConfig={formElem.config.elementConfig}
                                value={formElem.config.value}
                                onChange={ev => this.inputChangeHandler(ev, formElem.id)}
                                invalid={!!formElem.config.validationRules && formElem.config.touched && formElem.config.valid}
                            />
                        ))}
                        <Button type="success">{'ORDER'}</Button>
                    </form>
                )}
            </div>
        );
    }
}
