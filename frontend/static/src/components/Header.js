import React, {Component} from 'react';
import { Navbar, Nav, Row} from 'react-bootstrap';
import axios from "axios";
import "../Css/Header.css"

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    logOut = () => {
        axios.post("/api/v1/rest-auth/logout/", {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`}})
        .then(res => {
            localStorage.removeItem("my-app-user")
            this.isAuthenticated()

        })
        .catch(error => {
            console.log(error);
        });

    }


    render(){
        let isAuthenticated = localStorage.getItem("my-app-user") !== null ? true: false;

        let isAdmin = () => {
            if(JSON.parse(localStorage.getItem("my-app-user")).username === "admin"){
                return <Nav.Link className="navlink" href="/admin/verify/">Pending Verification</Nav.Link>
            }

        }


        return (
            <Row>
            <Navbar className="col" collapseOnSelect expand="lg">
              <Navbar.Brand className="title" href="/">Gathering Well</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  { isAuthenticated ? (
                        <Nav className="ml-auto">
                          <Nav.Link className="navlink" href="/">Home</Nav.Link>
                          {isAdmin()}
                          <Nav.Link className="navlink" href="/profile/">Profile</Nav.Link>
                          <Nav.Link className="navlink" href="/profile/create/">Submit Church</Nav.Link>
                          <Nav.Link className="navlink" onClick={this.logOut} href="/">Log Out</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto">
                          <Nav.Link className="navlink" href="/">Home</Nav.Link>
                          <Nav.Link className="navlink" href="/login/">Church Login</Nav.Link>
                          <Nav.Link className="navlink" href="/profile/">Account</Nav.Link>
                          <Nav.Link className="navlink" href="/profile/create/">Submit Church</Nav.Link>
                        </Nav>
                    )
                    }
              </Navbar.Collapse>
            </Navbar>
            </Row>

        )
    }
}

export default Header;
