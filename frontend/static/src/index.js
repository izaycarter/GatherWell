import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import Login from './components/Login';
import Parent from "./components/Parent";
import SignUp from "./containers/SignUp";
import Profile from "./components/Profile";
import CreateProfile from "./containers/CreateProfile";
import AdminVerifyPage from "./containers/AdminVerifyPage";
import About from "./components/About";
import BaseLayout from "./components/BaseLayout";
import PrivateRoute from "./components/PrivateRoute";
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


ReactDOM.render(
    <Router>
        <BaseLayout>
            <Switch>
                <PrivateRoute path="/profile/create/" component={CreateProfile}/>
                <PrivateRoute path="/profile/" component={Profile}/>
                <PrivateRoute path="/admin/verify/" component={AdminVerifyPage}/>
                <Route path='/about/' component={About}/>
                <Route path="/signup/" component={SignUp}/>
                <Route path='/login/' component={Login}/>
                <Route exact path="/" component={Parent}/>
            </Switch>
        </BaseLayout>
        <link href="https://fonts.googleapis.com/css?family=Sirin+Stencil&display=swap" rel="stylesheet"/>
    </Router>
, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
