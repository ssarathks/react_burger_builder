import React from 'react';
import { Route,Switch } from 'react-router-dom'
import classes from './App.css';
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

function App() {
  return (
      <div className={classes.App}>
        <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder}/>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/logout" component={Logout}/>
            </Switch>
        </Layout>
      </div>      
  );
}

export default App;
