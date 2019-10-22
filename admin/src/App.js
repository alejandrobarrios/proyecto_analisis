import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from "./Home.js";
import Login from "./Login.js";
import Other from "./Other.js";


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
        <Redirect
            from="/"
            to="/home" />
          <Switch>
          <Route
            path="/home"
            component={Home} />
          <Route
            path="/login"
            component={Login} />
          <Route
            path="/other"
            component={Other} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
