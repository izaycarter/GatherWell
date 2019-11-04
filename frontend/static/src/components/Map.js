import React, {Component} from 'react';
import { compose } from "recompose"
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import axios from "axios";
import MyVerticallyCenteredModal from "./ChurchDetail";
const styles = require('./GoogleMapStyles.json')
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


// class ShowChurch extends Component {
//     constructor(props){
//         super(props);
//         this.state={
//
//
//         }
//     }
//
//     componentDidMount(){
//         axios.get("/api/v1/churches/").then(res =>{
//             console.log(res.data)
//         }
//         )
//     }
//     render(){
//         return(<div></div>)
//     }
// {this.state.churches.map(church => {
//     return(
//         <Marker
//             key={church.id}
//             position={{lat:church.lat, lng:church.lng}}
//         >
//
//         </Marker>
//     )
// })
//
// }
// }

const MyMap = compose(withScriptjs, withGoogleMap) ( props =>{
    return(

        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 34.8485, lng: -82.4000 }}
            defaultOptions={{
            disableDefaultUI: true, // disable default map UI
            draggable: true, // make map draggable
            keyboardShortcuts: false, // disable keyboard shortcuts
            scaleControl: true, // allow scale controle
            zoomControl: true,
            scrollwheel: false, // allow scroll wheel
            styles: styles // change default map styles
        }}>
            {props.churches.map(church =>{
                const onClick = props.onClick.bind(this,church)
                return(
                    <Marker
                        key={church.id}
                        onClick={onClick}
                        position={{ lat:church.lat, lng:church.lng }}
                    >
                    </Marker>
                )
            })}
        </GoogleMap>
    )
});






// const WrapppedMap = withScriptjs(withGoogleMap(MyMap));

export default class Map extends Component{
    constructor(props){
        super(props);
        this.state={
            churches:[],
            selctedMarker:false,
            selectedChurch: [],
            ShowModal: false
        }
    }

    componentDidMount() {
        axios.get("/api/v1/churches/")
        .then(res => {
            this.setState({churches: res.data})
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleClick = (church, event) => {
    this.setState({ selectedChurch: church })
    console.log(church)
    console.log('test',this.state.selectedChurch)
    this.setState({ ShowModal: true })
    }

    render(){
        let selectedChurch = this.state.ShowModal
        return(

            <div className="" style={{ width:"100vw", height:"100vh" }}>
                <MyMap
                    selectedMarker={this.state.selectedMarker}
                    churches={this.state.churches}
                    onClick={this.handleClick}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD0Xm6jvI-eFVF8O9EYDFl3pjIIfF_TGyk`}
                    loadingElement={<div style={{height: "100% "}} />}
                    containerElement={<div style={{height: "100% "}} />}
                    mapElement ={<div style={{height: "100% "}} />}
                    />
                {selectedChurch ?  <MyVerticallyCenteredModal
                    selectedChurch={this.state.selectedChurch}
                    show={this.state.ShowModal}
                    onHide={() => this.setState({ShowModal:false})}
                />: null
                }
            </div>
        )
    }
}
