import React, {Component} from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Geocode from "react-geocode";
import {Card, ListGroup , ListGroupItem} from "react-bootstrap";

import "../Css/Profile.css";
import "../Css/About.css";

class About extends Component{

    render(){

        return(
            <div className="d-flex justify-content-center about-container" >
                    <h2 className=" d-flex Welcome justify-content-center">Welcome!</h2>

                <Card className="profile-card">

                  <Card.Body>
                    <Card.Text className="about-text">
                      The <span className="profile_topic_section" >Gathering Well</span> is a website designed to help people new to the Greenville area explore christian based chruches. A cental location of information provied by the churches directly through their profile on this site, prior to being visable to the public <span className="profile_topic_section" >every profile is verified</span> of its context and information. This in return allows churches to <span className="profile_topic_section" >showcase their personal characteristics</span> as well as beliefs.
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                      <Card.Text className="about-text">
                        <ul>
                            <li>
                                <span className="profile_topic_section" >Explore</span> through the churches on the map. Click an icon to see the church details
                            </li>
                            <li>
                                <span className="profile_topic_section" >Click</span> an icon to see the church details
                            </li>
                            <li>
                                <span className="profile_topic_section" >Connect</span> to new events by subscribing to a church via text
                            </li>
                        </ul>
                      </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <div className="developer-title d-flex justify-content-center"><span className="profile_topic_section pr-2">Developed By:</span> Isaiah Carter</div>
                    <div className=" icons-div d-flex justify-content-center">
                    <a href="http://www.linkedin.com/in/isaiah-c-gvl" target="_blank" className="icon-a d-flex pl-2" ><FontAwesomeIcon className="icon" icon={faLinkedin} size="lg"/></a> <a href="https://github.com/izaycarter" target="_blank" className="icon-a d-flex pl-2"><FontAwesomeIcon className="icon" icon={faGithub} size="lg" /></a>
                    </div>
                  </Card.Body>
                </Card>
            </div>
        )
    }
}

export default About;
