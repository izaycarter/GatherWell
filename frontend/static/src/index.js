import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Parent from "./components/Parent";
import SignUp from "./containers/SignUp";
import BaseLayout from "./components/BaseLayout";
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

ReactDOM.render(
    <Router>
        <BaseLayout>
            <Switch>
                <Route path="/signup/" component={SignUp}/>
                <Route path='/login/' component={Login}/>
                <Route exact path="/" component={Parent}/>
            </Switch>
        </BaseLayout>
    </Router>
, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
