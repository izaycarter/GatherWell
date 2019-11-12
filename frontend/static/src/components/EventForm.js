import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "../Css/Base.css";

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
            <div className="expand row no-gutters align-items-center">
                <Form className="col" onSubmit={this.submitEvent}>
                    <label>Event Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </label>

                    <label>Description
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    </label>

                    <label>Address for event:
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </label>

                    <label>Date:
                    <input type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
                    </label>
                    <button>Create Event</button>
                </Form>
            </div>
        )
    }
}

export default EventForm;
