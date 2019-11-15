import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "../Css/CreateProfile.css";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class UpdateEventForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            description:"",
            address:"",
            date:"",
            church:null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if(this.props.editEvent){
            this.setState({title:this.props.eventEdting.title,description:this.props.eventEdting.description,address:this.props.eventEdting.address,date:this.props.eventEdting.date,church:this.props.eventEdting.church})
        }


    }

    handleChange(e){
        // const target = e.target;
        const name = e.target.name;
        const value = e.target.value;


        this.setState({[name]: value});
        console.log({[name]: value})
    }

    handleSubmit(e){
        e.preventDefault();
        let updatedEvent = Object.assign({},this.state);
        updatedEvent.id = this.props.eventEdting.id
        delete updatedEvent.church
        this.props.updateEventSubmit(updatedEvent)
    }

    render(){
        return(
            <div className="d-flex create-profile-container">
                <Form className="profile-form d-flex" onSubmit={this.handleSubmit}>
                    <h2 className="d-flex justify-content-center"><span className="no-underline">{this.state.title} Event</span><span className="form-title ">(Edit Mode)</span></h2>

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

                    <button className="login-Btn">Update Event</button>
                </Form>
            </div>
        )
    }
}

export default UpdateEventForm;
