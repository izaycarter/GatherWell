import React , {Component} from 'react';
import {Button,  Modal , Card} from "react-bootstrap";
import "../Css/ChurchDetail.css";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class ChurchDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone_number:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e){
        let key = e.target.name;
        let value = e.target.value;
        this.setState({[key]: value});
        console.log()
    }

    onSubmit(e){
        e.preventDefault()

        axios.post(`/api/v1/churches/subscribers/add/`, {phone_number: this.state.phone_number, selected_church_id:this.props.selectedChurch.id})
        .then(res =>{
            console.log(res)
        })
        .catch()

    }

    render(){
        let thisChurch = this.props.events.filter(events => events.church === this.props.selectedChurch.id);

        let churchEvent = thisChurch.map(thisEvent =>(
            <li className="d-flex events-li" key={thisEvent.id}>
                <Card className="events" text="white">
                    <Card.Header className="event_title_date">{thisEvent.title} on {thisEvent.date}</Card.Header>
                    <Card.Title className="event_address">location: {thisEvent.address}</Card.Title>
                    <Card.Body>{thisEvent.description}</Card.Body>
                </Card>
            </li>
        ));
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="row no-gutters justify-content-center" closeButton>
            <div className="col d-flex justify-content-center ">
              <img className="church-picture" src={this.props.selectedChurch.image} atl={this.props.selectedChurch.name} />
            </div>
          </Modal.Header>
          <Modal.Body>

            <h3 className="church-name">{this.props.selectedChurch.name}</h3>
            <div className="address-link mb-2">
                <a href={`https://www.google.com/maps/search/?api=1&query=${this.props.selectedChurch.lat},${this.props.selectedChurch.lng}`} target="_blank">{this.props.selectedChurch.address}</a>
            </div>
            <div>
                <p>Denomination: {this.props.selectedChurch.denomination}</p>
                <p>Worship Style: {this.props.selectedChurch.worship_type}</p>
            </div>
            <p className="church-description">
             {this.props.selectedChurch.description}
            </p>
            <div className="d-flex mb-3">
                <a href={this.props.selectedChurch.website} target="_blank">{this.props.selectedChurch.website}</a>
            </div>
            <div className="subscribe-container mb-3">
                <p className="d-flex justify-content-center want-to-subscribe-text">{`Want to know when ${this.props.selectedChurch.name} posts a new event?`}</p>
                <form className="d-flex justify-content-center" onSubmit={this.onSubmit}>
                    <label htmlFor="phone_number">enter phone number
                    <input type="text" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} maxLength="10" placeholder="ex. 8641234567"></input>
                    <button>Follow!</button>
                    </label>
                </form>
            </div>
            <div>
                <p className="event-list-title">Upcoming Events</p>
                <ul className="d-flex justify-content-center">
                    {churchEvent}
                </ul>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
}

export default ChurchDetail;
