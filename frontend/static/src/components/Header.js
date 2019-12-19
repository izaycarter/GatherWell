import React, {Component} from 'react';
import { Navbar, Nav, Row, Button} from 'react-bootstrap';
import axios from "axios";
import "../Css/Header.css"

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

let isAuthenticated = localStorage.getItem("my-app-user") !== null ? true: false;

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            // isAuthenticated: false
        }

    }

    componentDidMount(){
        // this.setState({isAuthenticated: localStorage.getItem("my-app-user") !== null ? true: false})
    }

   

    logOut = () => {
        axios.post("/api/v1/rest-auth/logout/", {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`}})
        .then(res => {
            localStorage.removeItem("my-app-user")
            window.location.reload(false);

        })
        .catch(error => {
            console.log(error);
        });

    }


    render(){
        // let isAuthenticated = localStorage.getItem("my-app-user") !== null ? true: false;

        let isAdmin = () => {
            if(JSON.parse(localStorage.getItem("my-app-user")).username === "admin"){
                return <Nav.Link className="" href="/admin/verify/">Admin</Nav.Link>
            }else{
                return <Nav.Link className="" href="/about/">About</Nav.Link>
            }

        }


        return (
            <Row className="header">
            <div className="navContainer">

            <h1 className="title ml-3 col-sm-12 col-md-5 col-lg-4"><a href="/">Gathering Well</a></h1>
            <Navbar className="col mr-3" collapseOnSelect expand="lg">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse className="col justify-content-end" id="responsive-navbar-nav">
                  { isAuthenticated ? (
                        <Nav className="justify-content-end">
                          <Nav.Link className="" href="/">Explore</Nav.Link>
                          {isAdmin()}
                          <Nav.Link className="" href="/profile/">Profile</Nav.Link>
                          <Nav.Link className="" href="/profile/create/">Submit Church</Nav.Link>
                          <Nav.Link className="" onClick={this.logOut} >Log Out</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="justify-content-end">
                          <Nav.Link className="" href="/">Explore</Nav.Link>
                          <Nav.Link className="" href="/about/">About</Nav.Link>
                          <Nav.Link className="" href="/login/">Church Login</Nav.Link>
                          <Nav.Link className="" href="/profile/create/">Submit Church</Nav.Link>
                        </Nav>
                    )
                    }
              </Navbar.Collapse>
            </Navbar>
            </div>
            </Row>

        )
    }
}

export default Header;
