import React, {Component} from 'react';
import {Button, Card , Form, ListGroup, ListGroupItem} from "react-bootstrap";
import axios from "axios";
import "../Css/Profile.css";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class AdminVerifyPage extends Component{
    constructor(props){
        super(props);
        this.state={
            churches:[],
            church:{},
            verifyMode: false,
            is_verified: false
        }
        this.verifyChurch = this.verifyChurch.bind(this);
        this.submitVerifaction = this.submitVerifaction.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteChurch = this.deleteChurch.bind(this);
    }

    componentDidMount(){
        axios.get("/api/v1/churches/")
        .then(res => {
            let unverified = res.data.filter(church => church.is_verified === false);
            this.setState({churches: unverified})
        }).catch(error =>{
            console.log(error)
        })
    }

    deleteChurch(church){
        axios.delete(`/api/v1/admin/verify/${church.id}/`, {headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`}})
        .then(res =>{
            let churches= [...this.state.churches];
            let index = churches.indexOf(res.data);
            churches.splice(index, 1);
            this.setState({churches});
        })
        .catch(error => {
            console.log(error);
        });
    }

    onChange(e){
    let value = !this.state.is_verified
    this.setState({is_verified: value})

    }

    verifyChurch(church){
        this.setState({church:church, verifyMode: !this.state.verifyMode})

    }

    submitVerifaction(e){
        e.preventDefault();
        let formData = new FormData();
        let church = Object.assign({}, this.state.church);
        church.is_verified = this.state.is_verified;
        delete church.image
        delete church.subscribers


        for (var key in church) {
            formData.append(key, church[key]);
        }

        axios.patch(`/api/v1/admin/verify/${church.id}/`, formData,{
            headers: {
                'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).token}`,
                "content-type": "multipart/form-data"
            }
        }).then(res => {
            this.setState({church:{}, is_verified: false, verifyMode: false}, updatelist)

        }).catch(error =>{
            console.log(error)
        })

        let updatelist = () =>{
            axios.get("/api/v1/churches/")
            .then(res => {
                let unverified = res.data.filter(church => church.is_verified === false);
                this.setState({churches: unverified})
            }).catch(error =>{
                console.log(error)
            })
        }


    }

    render(){
        let verifyMode = !this.state.verifyMode;
        console.log(this.state.churches.length)
        let churchList = this.state.churches.map(church => (
            <li className="d-flex justify-content-center profile-li" key={church.id} >
                <div>
                    <h2 className=" d-flex church-name justify-content-center">{church.name}</h2>
                    <Card className="profile-card">
                        <Card.Img variant="top" src={church.image} atl="church profile picture"/>
                        <Card.Body>
                            <Card.Text className="profile-description">
                                {church.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="profile-list-details">
                            <ListGroupItem><span className="profile_topic_section">Denomination:</span> {church.denomination}</ListGroupItem>
                            <ListGroupItem><span className="profile_topic_section">Worship style: </span>{church.worship_type}</ListGroupItem>
                            <ListGroupItem><span className="profile_topic_section">Address: </span>{church.address}</ListGroupItem>
                            <ListGroupItem><span className="profile_topic_section">Website: </span><a href={church.website} target="_blank">{church.website}</a></ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                        {verifyMode ? (
                            <Button onClick={() => {this.verifyChurch(church)}}>Verify This Church</Button>
                        ) : (
                            <Form onSubmit={this.submitVerifaction}>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check name="is_verified" type="checkbox" label="Verified" value={this.state.is_verified} onChange={this.onChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )
                        }
                      </Card.Body>
                      <Card.Footer>
                          <Button variant="danger" onClick={() => {this.deleteChurch(church)}}>Delete profile</Button>
                      </Card.Footer>
                    </Card>
                </div>
            </li>
        ))


        return(
            <ul>
                {this.state.churches.length !== 0 ? (
                    <h2>Pending Churches</h2>)
                    :(<h2>There are no Churches pendeing Verifaction</h2>)}
                {churchList}
            </ul>
        )
    }
}
export default AdminVerifyPage;
