import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function MyMap(){
    return (
        <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 34.8485, lng: -82.4000 }}
        />
    );
}

const WrapppedMap = withScriptjs(withGoogleMap(MyMap));

export default function Map(){
    return(
        <div style={{ width:"100vh", height:"100vh" }}>
            <WrapppedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD0Xm6jvI-eFVF8O9EYDFl3pjIIfF_TGyk`}
                loadingElement={<div style={{height: "100% "}} />}
                containerElement={<div style={{height: "100% "}} />}
                mapElement ={<div style={{height: "100% "}} />}
                />
        </div>
    )
}
