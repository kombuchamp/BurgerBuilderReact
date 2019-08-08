import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Checkout from './components/Order/Checkout/Checkout';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <BurgerBuilder />
                    <Checkout />
                </Layout>
            </div>
        );
    }
}

export default App;
