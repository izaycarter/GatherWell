import React, {Component} from 'react';
import axios from "axios";
import Geocode from "react-geocode";
import UpdateChurchForm from "./UpdateChurchForm";
import EventForm from "./EventForm";
import UpdateEventForm from "./UpdateEventForm";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
Geocode.setLanguage("en");


class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            editingChurch: false,
            church_list:[],
            church: {},
            addingEvent: false,
            editingEvent: false,
            events:[],
            eventEdting:{}
        }
        this.deleteChurch = this.deleteChurch.bind(this);
        this.editChurch = this.editChurch.bind(this);
        this.updateSubmit = this.updateSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.addingEvent = this.addingEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
        this.updateEventSubmit = this.updateEventSubmit.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }



    componentDidMount(){
        axios.get("/api/v1/user/churches/", {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`}})
        .then(res =>{
            this.setState({church_list: res.data});

        })
        .catch(error => {
            console.log(error);
        });
        axios.get("/api/v1/user/church/events/")
        .then(res =>{
            this.setState({events: res.data});

        })
        .catch(error => {
            console.log(error);
        });

    }

    handleImageChange(e){
        let file = e.target.files[0]
        // the way not using []
        let church = Object.assign({}, this.state.church);
        church.image = file;

        this.setState({image: file, church});

        // optional visual for users
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({preview: reader.result});
        };

        // asynconios
        reader.readAsDataURL(file);

    }



    deleteChurch(church){
        axios.delete(`/api/v1/churches/${church.id}/`, {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`}})
        .then(res =>{
            let church_list = [...this.state.church_list];
            let index = church_list.indexOf(res.data);
            church_list.splice(index, 1);
            this.setState({church_list});
        })
        .catch(error => {
            console.log(error);
        });
    }

    editChurch(church){
        this.setState((prevState)=>({editingChurch: !prevState.editingChurch , church:church ,name:church.name,description:church.description,denomination:church.denomination,website:church.website,worship_type:church.worship_type,address:church.address,lat:church.lat, lng:church.lng })
         )
    }

    updateSubmit(church){
        console.log('updated church', church);
        let updateChurch = () =>{
            let formData = new FormData();
            let church = Object.assign({}, this.state.church);

            if(typeof church.image === "string") {
                delete church.image
            }
            delete church.owner
            delete church.is_verified

            for (var key in church) {
                formData.append(key, church[key]);
            }

            axios.patch(`/api/v1/churches/${this.state.church.id}/`, formData, {
                headers: {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`,
                    "content-type": "multipart/form-data"
                }
            })
            .then(res => {
                let church_list = [...this.state.church_list];
                let church = church_list.find(church => {
                    return church.id === res.data.id
                });
                church = Object.assign(church, res.data);


                this.setState((prevState, props) => ({editingChurch: !prevState.editingChurch, church_list:church_list}));

            })
            .catch(error => {
                console.log(error)
            });

        }

        let geocode = () => {
            Geocode.fromAddress(this.state.address).then(
              response => {
                let { lat, lng } = response.results[0].geometry.location;
                let church = Object.assign({}, this.state.church);
                church["lat"]=lat;
                church["lng"]=lng;
                this.setState({lat:lat, lng:lng, church});
                updateChurch(this.state.church);
              },
              error => {
                console.error(error);
            });
        }

        this.setState({church}, geocode);
    }

    addingEvent(church){
        this.setState((prevState)=>({addingEvent: !prevState.addingEvent ,church}))

        // you have all the event details passed up from the EventForm
        // you have access to the church object in this component
        // take the information that is passed up and connect with the church id
    }

    submitEvent(newEvent){
        let formData = new FormData();
        for (var key in newEvent) {
            formData.append(key, newEvent[key]);
        }



        axios.post("/api/v1/user/church/events/", formData ,{
            headers: {
                'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`,
                "content-type": "multipart/form-data"
            }
        }).then(res =>{
            axios.post()
            this.setState((prevState)=>({addingEvent: !prevState.addingEvent}));
            // messageSubscribers();

        }).catch(error => {
            console.log(error)
        });



    }

    editEvent(churchEvent){
        this.setState((prevState)=>({editingEvent: !prevState.editingEvent ,eventEdting:churchEvent}))
    }

    updateEventSubmit(updatedEvent){
        let formData = new FormData();
        for (var key in updatedEvent) {
            formData.append(key, updatedEvent[key]);
        }

        axios.patch(`/api/v1/user/church/events/r-u-d/${this.state.eventEdting.id}/`, formData ,{
            headers: {
                'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`,
                "content-type": "multipart/form-data"
            }
        }).then(res =>{
            let events = [...this.state.events]
            let eventEdting = events.find(eventEdting => {
                return eventEdting.id === res.data.id
            });
            eventEdting = Object.assign(eventEdting, res.data);


            this.setState((prevState)=>({editingEvent: !prevState.editingEvent,eventEdting:{}, }));

        }).catch(error => {
            console.log(error)
        });

    }

    deleteEvent(churchEvent){
        axios.delete(`/api/v1/user/church/events/r-u-d/${churchEvent.id}/`, {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`}})
        .then(res =>{
            let events = [...this.state.events];
            let index = events.indexOf(res.data);
            events.splice(index, 1);
            this.setState({events});
        })
        .catch(error => {
            console.log(error);
        });
    }


    render(){
        let events = this.state.events.map( churchEvent =>(
            <div key={churchEvent.id}>
                <span>{churchEvent.title}</span>
                <button onClick={() => this.editEvent(churchEvent)}>Edit</button>
                <button onClick={() => this.deleteEvent(churchEvent)}>Delete</button>


            </div>
        ));

        let churchList = this.state.church_list.map(church => (
                <li key={church.id}>
                    <div>
                        <h2>{church.name}</h2>
                        <img src={church.image} alt="church profile" />
                        <p>{church.description}</p>
                        <p>{church.denomination}</p>
                        <p>{church.worship_type}</p>
                        <p>{church.website}</p>
                        <p>{church.address}</p>
                    </div>
                    <section>
                        <div>
                        <span>Events: </span>
                        <button onClick={() => this.addingEvent(church)}>Add Event</button>
                        </div>

                        {events}
                    </section>


                <button onClick={() => this.editChurch(church)}>Edit Church</button>
                <button onClick={() => this.deleteChurch(church)}>Delete Church</button>
                </li>
        ));

        console.log(this.state.events)

        if(this.state.editingChurch) {
            return <UpdateChurchForm church={this.state.church} updateSubmit={this.updateSubmit}/>
        }

        if(this.state.addingEvent) {
            return <EventForm addingEvent={this.state.addingEvent} church={this.state.church} submitEvent={this.submitEvent} />
        }
        if(this.state.editingEvent){
            return <UpdateEventForm editEvent={this.state.editingEvent} eventEdting={this.state.eventEdting} updateEventSubmit={this.updateEventSubmit}  />
        }
        return(
            <ul>
                {churchList}
            </ul>
        )
    }
}

export default Profile;
