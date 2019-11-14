import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Geocode from "react-geocode";
import "../Css/CreateProfile.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
Geocode.setLanguage("en");

class UpdateChurchForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            name:"",
            image: null,
            preview: null,
            description:"",
            denomination:"",
            website:"",
            worship_type:"",
            address: "",
            lat:0,
            lng:0
        }

        this.handleChange = this.handleChange.bind(this);
        this.updateSubmit = this.updateSubmit.bind(this);
    }

    handleChange(e) {
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});

    }

    componentDidMount() {
        // console.log('mounted component', this.props);
        this.setState(this.props.church)
    }

    updateSubmit(e) {
        e.preventDefault();
        let church = Object.assign({},this.state);
        delete church.preview
        this.props.updateSubmit(church)
    }


    render(){

        return(
            <div className="d-flex create-profile-container">
                <Form className="profile-form d-flex" onSubmit={this.updateSubmit}>
                    <h2 className="d-flex justify-content-center"><span className="no-underline">{this.state.name}</span><span className="form-title ">(Edit Mode)</span></h2>
                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Church name:</Form.Label>
                        <Form.Control as="input" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Website Link:</Form.Label>
                        <Form.Control type="text" name="website" value={this.state.website} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Address:</Form.Label>
                        <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="Form-label">Denomination Type:</Form.Label>
                        <Form.Control as="select" name="denomination" defaultValue={this.state.denomination} onChange={this.handleChange}>
                            <option value="" disabled>Select denomination</option>
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
                            <option value="PRESBYTERIAN">Presbyterian</option>
                            <option value="ASSYRIAN">Assyrian</option>
                            <option value="EASTERN ORTHODOX">Eastern Orthodox</option>
                            <option value="JEHOVAH'S WITNESS">Jehovah's Witness</option>
                            <option value="LATTER DAY SAINT">Latter Day Saint</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="Form-label">Worship Type:</Form.Label>
                        <Form.Control as="select" name="worship_type" defaultValue={this.state.worship_type} onChange={this.handleChange}>
                            <option value="" disabled>Select style of worship</option>
                            <option value="LITURGICAL">Liturgical</option>
                            <option value="TRADITIONAL">Traditional</option>
                            <option value="BLENDED">Blended</option>
                            <option value="CONTEMPORARY">Contemporary</option>
                            <option value="MODERN">Modern</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Description:</Form.Label>
                        <Form.Control as="textarea" rows="4" type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="Form-label">Add Profile Picture</Form.Label>
                        <Form.Control type="file" name="image" onChange={this.handleImageChange}/>
                    </Form.Group>

                    {this.state.image ? (
                        <img className="preview-image" src={this.state.preview || this.state.image} alt="preview"/>
                    ) : (
                        null
                    )}

                    <button>Update</button>
                </Form>
            </div>
        )
    }
}

export default UpdateChurchForm;
