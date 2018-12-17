import React, { Component } from "react";
import "./App.css";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import AppNavbar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import { Provider } from "react-redux";
import store from "./store";

import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import ClientDetails from "./components/clients/ClientDetails";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Dashboard}
                  // component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/login"
                  component={Login}
                  // component={UserIsAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={AddClient}
                  // component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={EditClient}
                  // component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path="/client/:id"
                  component={ClientDetails}
                  // component={UserIsNotAuthenticated(ClientDetails)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
