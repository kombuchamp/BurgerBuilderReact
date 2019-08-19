import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Progress from '../UI/Progress/Progress';
import { Redirect } from 'react-router-dom';
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
        isSignUp: true,
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
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSignUp = this.state.isSignUp;
        this.props.onAuth(email, password, isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
            };
        });
    };

    render() {
        if (this.props.isAuthenticated) {
            // If query params are present, then checkout (no need to parse them since we have only one scenario of using them)
            return <Redirect to={this.props.history.location.search ? '/checkout' : '/'} />;
        }
        return (
            <div className={styles.Auth}>
                {this.errorMessage}
                <form onSubmit={this.submitHandler}>
                    <h1>{this.state.isSignUp ? 'Create New Account' : 'Sign In'}</h1>
                    {this.props.isLoading ? <Progress /> : this.formControls}
                    <Button type="success">SUBMIT</Button>
                </form>
                <p>{this.state.isSignUp ? 'Already have an account?' : 'Dont have an account?'} </p>
                <Button onClick={this.switchAuthModeHandler} type="info">
                    {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
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

    get errorMessage() {
        return this.props.error && <p>{this.props.error.message}</p>;
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        isAuthenticated: !!state.auth.idToken,
        isBuilderTouched: state.burgerBuilder.isTouched,
    };
};

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
