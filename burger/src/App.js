import React, { Component } from 'react';
import './App.css';
import { Switch, Route,withRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});


class App extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){
    this.props.onInitLogin();
  }

  render() {

    return (
      <div>
        <Layout>

          <Switch>
           <Route path='/auth' component={asyncAuth} />
            <Route path='/checkout' component={asyncCheckout} />
            <Route path='/logout' component={Logout} />
            <Route exact path='/orders' component={asyncOrders} />
            <Route exact path='/' component={BurgerBuilder} />
          </Switch>

        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onInitLogin:() =>dispatch(actions.authCheckSate())
  } 
}
export default withRouter(connect(null,mapDispatchToProps)(App));