import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Geocode from "react-geocode";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

Geocode.setApiKey("AAIzaSyD0Xm6jvI-eFVF8O9EYDFl3pjIIfF_TGyk");
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
                <input type="file" name="image" onChange={this.handleChange}/>
                </label>
                {this.state.image ? (
                    <img src={this.state.preview || this.state.image} alt="preview"/>
                ) : (
                    null
                )}

                <button>Update</button>
            </Form>
        )
    }
}

export default UpdateChurchForm;
