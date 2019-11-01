import React, {Component} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import axios from "axios";
const styles = require('./GoogleMapStyles.json')
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("my-app-user") ? `Token ${JSON.parse(localStorage.getItem("my-app-user")).token} ` : null;


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
// }

class MyMap extends Component {

    constructor(props) {
        super(props);
            this.state={
            churches:[]
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

    render(){
        // let church_list = this.state.church_list[0];
        // console.log(church_list)

        return(

            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 34.8485, lng: -82.4000 }}
                defaultOptions={{
                disableDefaultUI: true, // disable default map UI
                draggable: true, // make map draggable
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: true, // allow scale controle
                scrollwheel: false, // allow scroll wheel
                styles: styles // change default map styles
            }}>

            {this.state.churches.map(church => {
                return(
                    <Marker
                        key={church.id}
                        position={{lat:church.lat, lng:church.lng}}
                    />
                )
            })

            }



            </GoogleMap>
        );
    }

}

const WrapppedMap = withScriptjs(withGoogleMap(MyMap));

export default class Map extends Component{
    render(){
        return(
            <div style={{ width:"100vw", height:"100vh" }}>
                <WrapppedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD0Xm6jvI-eFVF8O9EYDFl3pjIIfF_TGyk`}
                    loadingElement={<div style={{height: "100% "}} />}
                    containerElement={<div style={{height: "100% "}} />}
                    mapElement ={<div style={{height: "100% "}} />}
                    />
            </div>
        )
    }
}
