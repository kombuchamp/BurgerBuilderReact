import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Checkout from './components/Order/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout';
import * as actions from './store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckStatus()),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(App);
