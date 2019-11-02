import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import {Redirect ,Link} from "react-router-dom";
import axios from "axios";
import "../CSS/Header.css"

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("my-app-user") ? `Token ${JSON.parse(localStorage.getItem("my-app-user")).token} ` : null;


// let isAuthenticated = localStorage.getItem("my-app-user") !== null ? true: false;
class Header extends Component{



    logOut = () => {
        axios.post("/api/v1/rest-auth/logout/")
        .then( localStorage.clear("Token"),
        this.setState({navigate: true})).catch(error => {
        console.log(error);
    });

    }

    render(){

        return (
            <Row className="justify-content-center header">
                <h1 className="title d-flex col-sm-12 col-md-6 justify-content-center">Gathering Well</h1>
                <nav className="row align-items-center">
                    <ul className="row no-gutters navlinks justify-content-center">
                        <li className="navlink d-flex justify-content-center col-md-auto pr-0 pl-0"><Link className="navlink" to="/">| Home |</Link></li>
                        <li className="navlink d-flex justify-content-center col-md-auto pr-0 pl-0"><Link className="navlink" to="/login/">| Church Login |</Link></li>
                        <li className="navlink d-flex justify-content-center col-md-auto pr-0 pl-0"><Link className="navlink" to="/profile/">| Profile |</Link></li>
                        <li className="navlink d-flex justify-content-center col-md-auto pr-0 pl-0"><Link className="navlink" to="/profile/create/">| Submit church profile |</Link></li>
                        <li className="d-flex justify-content-center col-md-auto pr-0 pl-0"><Link className="navlink" onClick={this.logOut} to="/" >Log Out</Link></li>
                    </ul>
                </nav>

            </Row>
        )
    }
}

export default Header;
