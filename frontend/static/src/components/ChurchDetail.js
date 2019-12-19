import React , {Component} from 'react';
import {Button,  Modal , Card, Image} from "react-bootstrap";
import "../Css/ChurchDetail.css";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';

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
        this.subscribed = this.subscribed.bind(this);
    }

    subscribed = () => {
        NotificationManager.info("You're Subscribed!", "Complete", 3000);
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
            this.setState({phone_number:""})
            console.log(res)
            this.subscribed();

        })
        .catch()

    }

    render(){
        let thisChurch = this.props.events.filter(events => events.church === this.props.selectedChurch.id);

        let churchEvent = thisChurch.map(thisEvent =>(
            <li className="d-flex events-li" key={thisEvent.id}>
                <Card className="events" text="white">
                    <Card.Header className="event_title_date">{thisEvent.title}</Card.Header>
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
            <NotificationContainer/>
          <Modal.Header className="row no-gutters justify-content-center" closeButton>
            <div className="col d-flex justify-content-center ">
              <Image className="church-picture" src={this.props.selectedChurch.image} atl={this.props.selectedChurch.name} fluid />
            </div>
          </Modal.Header>
          <Modal.Body>

            <h3 className="church-name">{this.props.selectedChurch.name}</h3>
            <div className="address-link mb-2">
                <a className="detail-link" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${this.props.selectedChurch.lat},${this.props.selectedChurch.lng}`} target="_blank">{this.props.selectedChurch.address}</a>
            </div>
            <div>
                <p className="font-of-details"><span className="event-header">Denomination:</span> {this.props.selectedChurch.denomination}</p>
                <p className="font-of-details"><span className="event-header">Worship Style:</span> {this.props.selectedChurch.worship_type}</p>
            </div>
            <p className="church-description font-of-details">
             {this.props.selectedChurch.description}
            </p>
            <div className="d-flex mb-3">
                <a className="detail-link" rel="noopener noreferrer" href={this.props.selectedChurch.website} target="_blank">{this.props.selectedChurch.website}</a>
            </div>
            <div className="subscribe-container mb-3">
                <p className="d-flex justify-content-center want-to-subscribe-text event-header">{`Want to know when ${this.props.selectedChurch.name} posts a new event?`}</p>
                <form className="d-flex justify-content-center" onSubmit={this.onSubmit}>
                    <label htmlFor="phone_number">enter phone number
                    <input type="text" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} maxLength="10" placeholder="ex. 8641234567"></input>
                    <button>Follow!</button>
                    </label>
                </form>
            </div>
            <div className="event-detail-div d-flex justify-content-center">
                <p className="event-list-title event-header">Upcoming Events:</p>
                <ul className="event-list d-flex justify-content-center">
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
