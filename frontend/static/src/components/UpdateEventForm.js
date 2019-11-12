import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "../Css/Base.css";
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
        console.log(this.state)
        return(
            <div className="expand row no-gutters align-items-center">
                <Form className="col" onSubmit={this.handleSubmit}>
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

export default UpdateEventForm;
