

import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Home from "./layouts/Home";
import Login from "./views/MajelViews/Login/MajelLogin";

import 'chartist/dist/chartist.min.css'
import "assets/css/material-dashboard-react.css?v=1.8.0 ";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "components/auth/ProtectedRoute";
import LoggedInRoute from "components/auth/LoggedInRoute";

// core components
 
import Majel from "layouts/Majel.js";
import Logout from "layouts/Logout";

const store = require("./reducers").init();

const hist = createBrowserHistory();

ReactDOM.render(
 <Provider store={store}> 
    <Router history={hist}>
    <Switch>
   
      <ProtectedRoute path="/majel" component={Majel} />
 
      <LoggedInRoute path="/login" component={Login} /> 
    
      <LoggedInRoute path="/home" component={Home} /> 
      <Route path="/logout" component={Logout} /> 
      
      {/* <Route path="/redirect" component={RedirectRoute} />  */}

      <Redirect from="/" to="/home" />
    </Switch>
  </Router>
 </Provider>,
  document.getElementById("root") 
);
