import React from 'react';
import {Redirect , Route} from "react-router-dom";


let isAuthenticated = localStorage.getItem("my-app-user") !== null ? true: false;


const PrivateRoute = ({component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: "/login/",
                state: {from: props.location}
            }}/>
        )
    )}/>
);

export default PrivateRoute;
