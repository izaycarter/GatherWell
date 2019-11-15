import React, {Component} from 'react';
// import ChurchDetail from "./ChurchDetail";
// import MapContainer from "./MapContainer";
import Map from "./Map";
import Row from 'react-bootstrap/Row';

class Parent extends Component {
    constructor(props){
        super(props);
        this.state = {
            // isViewing: false
        }
        // this.showDetails = this.showDetails.bind(this);
    }

    // showDetails(){
    //     this.setState((prevState)=>({isViewing: !prevState.isViewing}));
    //     console.log(this.state.isViewing);
    // }

    render(){

        return(
            <div className="row">
                <Map className="col-sm-12" />
            </div>
        )

    }
}

export default Parent;
