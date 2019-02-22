import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import store from "../store";
import Header from "./layout/Header";
import Dashboard from "./stocks/Dashboad";
import Alerts from "./layout/Alerts";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../actions/auth";
const alertOptions = {
  timeout: 3000,
  position: "top right"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container main">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
