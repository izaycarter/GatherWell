import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';

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

    componentDidMount() {
        // console.log('mounted component', this.props);
        this.setState({church:this.props.church.id})
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
        this.props.submitEvent(newEvent);
    }


    render(){
        return(
            <Form onSubmit={this.submitEvent}>
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
        )
    }
}

export default EventForm;
