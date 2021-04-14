import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Home";
import Signup from '../Signup';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </BrowserRouter>
);

export default Router;
