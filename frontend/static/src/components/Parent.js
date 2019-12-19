import React, {Component} from 'react';
// import ChurchDetail from "./ChurchDetail";
// import MapContainer from "./MapContainer";
import Map from "./Map";
import Row from 'react-bootstrap/Row';

class Parent extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }

    }

   

    render(){

        return(
            <Row>
                <Map className="col-sm-12" />
            </Row>
        )

    }
}

export default Parent;
