import React, { Component } from 'react';
import Order from '../Order/Order';
import axios from '../../util/axios-orders';
import withErrorHandler from '../HOC/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true,
    };

    componentDidMount() {
        this.updateOrders();
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
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
