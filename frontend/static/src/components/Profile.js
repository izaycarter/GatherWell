import React, {Component} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Geocode from "react-geocode";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

Geocode.setApiKey("AIzaSyD0Xm6jvI-eFVF8O9EYDFl3pjIIfF_TGyk");
Geocode.setLanguage("en");


class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            image: null,
            preview: null,
            description:"",
            denomination:"",
            website:"",
            worship_type:"",
            address: "",
            lat:0,
            lng:0,
            isEditing: false,
            church_list:[],
            church: {},
        }
        this.deleteChurch = this.deleteChurch.bind(this);
        this.editChurch = this.editChurch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.updateSubmit = this.updateSubmit.bind(this);
    }



    componentDidMount(){
        axios.get("/api/v1/user/churches/", {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`}})
        .then(res =>{
            this.setState({church_list: res.data});

        })
        .catch(error => {
            console.log(error);
        });

    }

    handleChange(e){
        // const target = e.target;
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        let church = Object.assign({}, this.state.church);
        church[e.target.name] = e.target.value;

        this.setState({[name]: value, church});
        console.log(church)
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
        console.log('church', church);
        axios.delete(`/api/v1/churches/${church.id}/`)
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
        this.setState((prevState)=>({isEditing: !prevState.isEditing , church:church ,name:church.name,description:church.description,denomination:church.denomination,website:church.website,worship_type:church.worship_type,address:church.address,lat:church.lat, lng:church.lng })
         )
    }

    updateSubmit(e){
        e.preventDefault();


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
                    "content-type": "multipart/form-data"
                }
            })
            .then(res => {
                console.log(res);
                // update the profile inside your profiles array on state
                let church_list = [...this.state.church_list];
                let church = church_list.find(church => {
                    return church.id === res.data.id
                });
                church = Object.assign(church, res.data);

                this.setState((prevState, props) => ({isEditing: !prevState.isEditing, church_list:church_list}));

            })
            .catch(error => {
                console.log(error)
            });

        }

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

    render(){
        console.log('profile is rendering');
        const isEditing = this.state.isEditing;

        let church_list = this.state.church_list.map(church => (
                <li key={church.id}>
                <h2>{church.name}</h2>
                <img src={church.image} alt="church profile" />
                <p>{church.description}</p>
                <p>{church.denomination}</p>
                <p>{church.worship_type}</p>
                <p>{church.website}</p>
                <p>{church.address}</p>

                <button onClick={() => this.editChurch(church)}>Edit Church</button>
                <button onClick={() => this.deleteChurch(church)}>Delete Church</button>
                </li>
        ));
        return(
            <section>
                {isEditing ? (
                    <Form onSubmit={this.updateSubmit}>
                        <label>Church name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </label>

                        <label>Website Link
                        <input type="text" name="website" value={this.state.website} onChange={this.handleChange}/>
                        </label>

                        <label>Address:
                        <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                        </label>

                        <Form.Group>
                            <Form.Label>Denomination Type</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.denomination} name="denomination" onChange={this.handleChange}>
                                <option value="" disabled>Please Choose selcetion:</option>
                                <option value="NON DENOMINATIONAL">Non Denominational</option>
                                <option value="CATHOLIC">Catholic</option>
                                <option value="ADVENTIST">Adventist</option>
                                <option value="ANABAPTIST">Anabaptist</option>
                                <option value="ANGLICAN">Anglican</option>
                                <option value="BAPTIST">Baptist</option>
                                <option value="CALVINIST">Calvinist</option>
                                <option value="EVANGELICAL">Evangelical</option>
                                <option value="HOLINESS">Holiness</option>
                                <option value="LUTHERAN">Lutheran</option>
                                <option value="METHODIST">Methodist</option>
                                <option value="PENTECOSTAL">Pentecostal</option>
                                <option value="ASSYRIAN">Assyrian</option>
                                <option value="EASTERN ORTHODOX">Eastern Orthodox</option>
                                <option value="JEHOVAH'S WITNESS">Jehovah's Witness</option>
                                <option value="LATTER DAY SAINT">Latter Day Saint</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Worship Type</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.worship_type}  name="worship_type" onChange={this.handleChange}>
                                <option value=""  disabled>Please Choose selcetion:</option>
                                <option value="NON LITURGICAL">Liturgical</option>
                                <option value="TRADITIONAL">Traditional</option>
                                <option value="BLENDED">Blended</option>
                                <option value="CONTEMPORARY">Contemporary</option>
                                <option value="MODERN">Modern</option>
                            </Form.Control>
                        </Form.Group>

                        <label>description
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                        </label>

                        <label>Add Profile Picture
                        <input type="file" name="image" onChange={this.handleImageChange}/>
                        </label>
                        {this.state.image ? (
                            <img src={this.state.preview} alt="preview"/>
                        ) : (
                            null
                        )}

                        <button>Update</button>
                    </Form>
                ) : (
                    <ul>
                        {church_list}
                    </ul>)}

            </section>

        )
    }
}

export default Profile;
