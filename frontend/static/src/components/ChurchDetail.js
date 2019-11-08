import React , {Component} from 'react';
import {Button,  Modal } from "react-bootstrap";
import "../CSS/ChurchDetail.css";
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
            <li key={thisEvent.id}>
                <p>{thisEvent.title}</p>
                <p>{thisEvent.description}</p>
                <p>{thisEvent.address}</p>
            </li>
        ));
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <img className="church-picture" src={this.props.selectedChurch.image} atl={this.props.selectedChurch.name} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <h3>{this.props.selectedChurch.name}</h3>

            <a href={`https://www.google.com/maps/search/?api=1&query=${this.props.selectedChurch.lat},${this.props.selectedChurch.lng}`} target="_blank">{this.props.selectedChurch.address}</a>
            <div>Denomination: {this.props.selectedChurch.denomination}</div>
            <div>Worship Style: {this.props.selectedChurch.worship_type}</div>
            <p>
             {this.props.selectedChurch.description}
            </p>

            <a href={this.props.selectedChurch.website} target="_blank">{this.props.selectedChurch.website}</a>
            <form onSubmit={this.onSubmit}>
                <p>{`want to know about new upcoming events for ${this.props.selectedChurch.name}?`}</p>
                <label htmlFor="phone_number">enter phone number
                <input type="text" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} maxLength="10" placeholder="ex. 8641234567"></input>
                <button>Follow!</button>
                </label>
            </form>
            <ul>
                {churchEvent}
            </ul>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
}

export default ChurchDetail;
