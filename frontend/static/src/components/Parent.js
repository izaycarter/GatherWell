import React, {Component} from 'react';
import ChurchDetail from "./ChurchDetail";
// import MapContainer from "./MapContainer";
import Map from "./Map";
import Row from 'react-bootstrap/Row';

class Parent extends Component {
    constructor(props){
        super(props);
        this.state = {
            isViewingDetails: false,
        }
    }

    render(){
        let viewing = this.isViewingDetails;
        return(
            <Row className="justify-content-center">
                {viewing ? (
                    <div>
                        <Map/>
                        <ChurchDetail className="col-sm-12 col-md-6"/>
                    </div>
                ) : (
                    <div>
                        <Map/>
                    </div>
                )}
            </Row>
        )

    }
}

export default Parent;
