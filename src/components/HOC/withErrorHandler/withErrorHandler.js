import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        componentDidMount() {
            // Add middleware to axios instance:
            // Set error state to null on every new request
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            // Set error state to corresponding error if there is one in http response
            axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({ error });
                }
            );
        }

        render() {
            return (
                <>
                    <Modal isOpen={this.state.error} closeHandler={() => this.setState({ error: null })}>
                        {this.state.error && this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};

export default withErrorHandler;
