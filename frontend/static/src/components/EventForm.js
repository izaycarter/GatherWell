import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "../Css/CreateProfile.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class EventForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            description:"",
            address:"",
            date:"",
        }
        this.submitEvent = this.submitEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange(e){
        // const target = e.target;
        const name = e.target.name;
        const value = e.target.value;


        this.setState({[name]: value});
        console.log({[name]: value})
    }

    submitEvent(e){
        e.preventDefault();
        let newEvent = Object.assign({},this.state);
        newEvent.church = this.props.church.id;
        this.props.submitEvent(newEvent);
    }


    render(){

        return(
            <div className="d-flex create-profile-container">
                <Form className="profile-form d-flex" onSubmit={this.submitEvent}>
                    <h2 className="form-title d-flex justify-content-center">Create Event for {this.props.church.title}</h2>

                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Event Title:</Form.Label>
                        <Form.Control as="input" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Description:</Form.Label>
                        <Form.Control as="textarea" type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Address for event:</Form.Label>
                        <Form.Control as="input" type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </Form.Group>


                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Date:</Form.Label>
                        <Form.Control as="input" type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
                    </Form.Group>
            
                    <button>Create Event</button>
                </Form>
            </div>
        )
    }
}

export default EventForm;
