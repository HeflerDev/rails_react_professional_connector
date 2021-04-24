import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Home";
import Signup from '../Signup';
import Login from '../Login';
import ResultsPage from '../ResultsPage';
import ProfessionalProfile from '../ProfessionalProfile';
import Navbar from '../Navbar';
import UserProfile from '../UserProfile';
import Footer from '../subComponents/Footer';

const Router = () => (
  <BrowserRouter>
    <Navbar /> 
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route path="/results/:query" component={ResultsPage} />
      <Route path="/show/:id" component={ProfessionalProfile} />
      <Route path="/profile" component={UserProfile}/>
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Router;
