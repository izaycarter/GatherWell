import React, {Component} from 'react';
import { compose } from "recompose"
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import axios from "axios";
import ChurchDetail from "./ChurchDetail";
import MapFilter from "./MapFilter";
const styles = require('./GoogleMapStyles.json')
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";



const MyMap = compose(withScriptjs, withGoogleMap) ( props =>{
    return(

        <GoogleMap
            defaultZoom={12}
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
                const isVerified = church.is_verified
                    if (isVerified){
                        return(
                                <Marker
                                    key={church.id}
                                    onClick={onClick}
                                    position={{ lat:church.lat, lng:church.lng }}
                                    icon = {{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
                                >
                                </Marker>
                        )
                    }

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
            filteredChurches: [],
            selctedMarker:false,
            selectedChurch: [],
            ShowModal: false,
            events:[],
            worship_type:'Any',
            denomination:'Any',
        }
    }

    componentDidMount() {
        axios.get("/api/v1/churches/")
        .then(res => {
            this.setState({churches: res.data, filteredChurches: res.data})
        })
        .catch(error => {
            console.log(error)
        });
        axios.get("/api/v1/user/church/events/")
        .then(res =>{
            this.setState({events: res.data});
            console.log(this.state.events)
        }).catch(error => {
            console.log(error)
        });
    }

    handleClick = (church, event) => {
        this.setState({ selectedChurch: church })
        this.setState({ ShowModal: true })
    }

    handleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        let churches = [...this.state.churches];
        let filter



        let runfilter = (filter) => {

            if(this.state.worship_type !== 'Any'){

                if(this.state.denomination !== 'Any') {
                    filter = churches.filter(church => {
                        return church["worship_type"] === this.state.worship_type && church["denomination"] === this.state.denomination
                    });

                } else {
                    filter = churches.filter(church => {
                        return church["worship_type"] === this.state.worship_type
                    })
                }

            } else if(this.state.denomination !== 'Any') {

                    filter = churches.filter(church => {
                        return church["denomination"] === this.state.denomination
                    })

            }

             else {
                 filter = churches.filter(church => {
                     return true
                 })
            }
            this.setState({filteredChurches: filter})

        }
        this.setState({[key]:value},runfilter)





        // console.log('filtered', filteredChurches);

        // update this.state.filteredChurches based on filter results
    }


    render(){
        let selectedChurch = this.state.ShowModal

        return(

            <div style={{ width:"100vw", height:"85vh" }}>
                <MapFilter handleChange={this.handleChange}/>
                <MyMap
                    selectedMarker={this.state.selectedMarker}
                    churches={this.state.filteredChurches}
                    onClick={this.handleClick}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                    loadingElement={<div style={{height: "100% "}} />}
                    containerElement={<div style={{height: "100% "}} />}
                    mapElement ={<div style={{height: "100% "}} />}

                    />
                {selectedChurch ?  <ChurchDetail
                    selectedChurch={this.state.selectedChurch}
                    show={this.state.ShowModal}
                    onHide={() => this.setState({ShowModal:false})}
                    events={this.state.events}
                />: null
                }
            </div>
        )
    }
}
