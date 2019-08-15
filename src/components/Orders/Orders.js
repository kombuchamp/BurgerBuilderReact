import React, { Component } from 'react';
import Order from '../Order/Order';
import axios from '../../util/axios-orders';
import withErrorHandler from '../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Progress from '../UI/Progress/Progress';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     isLoading: true,
    // };

    componentDidMount() {
        //this.updateOrders();
        this.props.onFetchOrders();
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
        return this.props.isLoading ? (
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
        isLoading: state.order.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
