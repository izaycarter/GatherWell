import React, {Component} from 'react';
import ChurchDetail from "./ChurchDetail";
// import MapContainer from "./MapContainer";
import Map from "./Map";
import Row from 'react-bootstrap/Row';

class Parent extends Component {

    render(){
        return(
            <Row>
            <Map/>
            <ChurchDetail className="col-sm-12 col-md-6" />
            </Row>
        )

    }
}

export default Parent;
