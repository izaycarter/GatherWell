import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import {Redirect ,Link} from "react-router-dom";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("my-app-user") ? `Token ${JSON.parse(localStorage.getItem("my-app-user")).token} ` : null;


// let isAuthenticated = localStorage.getItem("my-app-user") !== null ? true: false;
class Header extends Component{

    state = {
        navigate: false
    };

    logOut = () => {
        axios.post("/api/v1/rest-auth/logout/")
        .then( localStorage.clear("Token"),
        this.setState({navigate: true})).catch(error => {
        console.log(error);
    });

    }

    render(){
        const { navigate } = this.state;

        if(navigate){
            return <Redirect to="/" push={true} />;
        }
        return (
            <Row className="justify-content-center">
                <h1 className="d-flex col-sm-12 col-md justify-content-center">Gathering Well</h1>
                <nav className="row align-items-end">
                    <ul className="row no-gutters navlinks justify-content-center">
                        <li className="d-flex justify-content-center col-sm-12 col-md-auto pr-0 pl-0"><Link to="/">| Home |</Link></li>
                        <li className="d-flex justify-content-center col-sm-12 col-md-auto pr-0 pl-0"><Link to="/login/">| Church Login |</Link></li>
                        <li className="d-flex justify-content-center col-sm-12 col-md-auto pr-0 pl-0"><Link to="/profile/">| Profile |</Link></li>
                        <li className="d-flex justify-content-center col-sm-12 col-md-auto pr-0 pl-0"><Link to="/profile/create/">| Submit church profile |</Link></li>
                        <li className="d-flex justify-content-center col-sm-12 col-md-auto pr-0 pl-0"><button onClick={this.logOut} href="/">Log Out</button></li>
                    </ul>
                </nav>

            </Row>
        )
    }
}

export default Header;
