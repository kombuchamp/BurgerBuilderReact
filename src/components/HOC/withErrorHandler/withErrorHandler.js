import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal';

// TODO: Rewrite it for redux, 'connect' method messes up this HOC
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                error: null,
            };

            // Add middleware to axios instance:

            // Set error state to null on every new request
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            // Set error state to corresponding error if there is one in http response
            this.responseInterceptor = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({ error });
                }
            );
        }

        componentWillUnmount() {
            // Prevent memory leaks when using this HOC on multiple components
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }

        render() {
            return (
                <>
                    <Modal isOpen={!!this.state.error} closeHandler={() => this.setState({ error: null })}>
                        {this.state.error && this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};

export default withErrorHandler;
