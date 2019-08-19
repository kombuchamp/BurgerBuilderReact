import React, { Component } from 'react';
import Order from '../Order/Order';
import axios from '../../util/axios-orders';
import withErrorHandler from '../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Progress from '../UI/Progress/Progress';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken);
    }

    updateOrders = async () => {
        const orders = [];
        try {
            const response = await axios.get('/orders.json');
            for (let key in response.data) {
                orders.push({
                    ...response.data[key],
                    id: key,
                });
            }
            console.log(response);
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ isLoading: false, orders });
        }
    };

    render() {
        return this.props.error ? (
            <p>Error occured</p>
        ) : this.props.isLoading ? (
            <Progress />
        ) : (
            <div>
                {this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        idToken: state.auth.idToken,
        isLoading: state.order.isLoading,
        error: state.order.fetchError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: idToken => dispatch(actions.fetchOrders(idToken)),
    };
};

export default withErrorHandler(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Orders),
    axios
);
