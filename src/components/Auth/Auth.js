import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Adress',
                },
                value: '',
                validationRules: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) return isValid;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (ev, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: ev.target.value,
                valid: this.checkValidity(ev.target.value, this.state.controls[controlName].validationRules),
                touched: true,
            },
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = ev => {
        ev.preventDefault();
        const { email, password } = this.state.controls;
        this.props.onAuth(email, password);
    };

    render() {
        return (
            <div className={styles.Auth}>
                <form onSubmit={this.submitHandler}>
                    {this.formControls}
                    <Button type="success">SUBMIT</Button>
                </form>
            </div>
        );
    }

    get formControls() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        return formElementsArray.map(formElem => {
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
        });
    }
}

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
});

export default connect(
    null,
    mapDispatchToProps
)(Auth);
