import React, {Component} from 'react';
import axios from "axios";
import Geocode from "react-geocode";
import {Card, ListGroup , ListGroupItem} from "react-bootstrap";

import "../Css/Profile.css";
import "../Css/About.css";

class About extends Component{

    render(){

        return(
            <div className="d-flex justify-content-center profile-li" >
                    <h2 className=" d-flex church-name justify-content-center">Welcome!</h2>

                <Card className="profile-card">

                  <Card.Body>
                    <Card.Text>
                      The Gathering Well is a website deigned to help people new to the Greenville area explore christian based chruches. A cental location of information provied by the churches directly through their profile on this site, prior to being visable to the public every profile is verified of its context and information. This in return allows churches to showcase their personal characteristics as well as beliefs.
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <div className="developer-title d-flex justify-content-center"><span className="profile_topic_section pr-2">Developer</span>Isaiah Carter</div>
                  </Card.Body>
                  <ListGroup className="profile-list-details">
                        <ListGroupItem><span className="profile_topic_section">Website: </span><a href="#" target="_blank">test</a></ListGroupItem>
                        <ListGroupItem><span className="profile_topic_section">Website: </span><a href="#" target="_blank">test</a></ListGroupItem>
                        <ListGroupItem><span className="profile_topic_section">Website: </span><a href="#" target="_blank">test</a></ListGroupItem>
                   </ListGroup>

                </Card>
            </div>
        )
    }
}

export default About;
