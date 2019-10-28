import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';

// let isAuthenticated = localStorage.getItem("my-app-user") !== null ? true: false;
class Header extends Component{
    render(){
        return (
            <Row className="justify-content-center">
                <h1>Gathering Well</h1>
            </Row>
        )
    }
}

export default Header;
