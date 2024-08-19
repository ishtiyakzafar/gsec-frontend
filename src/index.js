
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "./layouts/Admin.js";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import './index.css';

// import LoginPage
import LoginPage from './components/Login/LoginPage'
import { getUser } from "services/loginServices";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <ReactNotification />
    <Switch>
      <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      
      {getUser() ? <Redirect to="/admin/dashboard" />  : <Redirect to="/login" />}
      
    </Switch>
  </Router>,
  document.getElementById("root")
);
