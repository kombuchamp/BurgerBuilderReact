import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Progress from '../../UI/Progress/Progress';
import axios from '../../../util/axios-orders';
import Input from '../../UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import checkValidity from '../../../util/checkValidity';
import styles from './ContactData.module.css';

class ContactData extends Component {
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
                    options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }],
                },
                value: 'fastest',
                validationRules: null,
                valid: true,
                touched: false,
            },
        },
        isFormValid: false,
    };

    orderHandler = async ev => {
        ev.preventDefault();
        const formData = {};
        for (let formElemId in this.state.orderForm) {
            formData[formElemId] = this.state.orderForm[formElemId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            orderData: formData,
            userId: this.props.userId,
        };

        this.props.onOrderBurger(order, this.props.idToken);
    };

    inputChangeHandler = (ev, inputIdentifier) => {
        // Copy both objects to avoid corrupting state
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[inputIdentifier] };

        updatedElement.value = ev.target.value;
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validationRules);
        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid });
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
                {this.props.isLoading ? (
                    <Progress />
                ) : (
                    <form onSubmit={this.orderHandler}>
                        {formElementsArray.map(formElem => {
                            return (
                                <Input
                                    key={formElem.id}
                                    elementType={formElem.config.elementType}
                                    elementConfig={formElem.config.elementConfig}
                                    value={formElem.config.value}
                                    onChange={ev => this.inputChangeHandler(ev, formElem.id)}
                                    invalid={formElem.config.validationRules && formElem.config.touched && !formElem.config.valid}
                                />
                            );
                        })}
                        <Button type="success" disabled={!this.state.formIsValid}>
                            {'ORDER'}
                        </Button>
                    </form>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        isLoading: state.order.isLoading,
        idToken: state.auth.idToken,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, idToken) => dispatch(actions.purchaseBurger(orderData, idToken)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
