import React, {Component} from 'react';
import {Button, Card , Form} from "react-bootstrap";
import axios from "axios";
import "../Css/Base.css";


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
            <Card key={church.id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={church.image} />
              <Card.Body>
                <Card.Title>{church.name}</Card.Title>
                <Card.Text>{church.description}</Card.Text>
                <Card.Text>{church.address}</Card.Text>
                <a href={church.website}>{church.website}</a>
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
        ))


        return(
            <section className="expand">
                {this.state.churches.length !== 0 ? (
                    <h2>Pending Churches</h2>)
                    :(<h2>There are no Churches pendeing Verifaction</h2>)}
                {churchList}
            </section>
        )
    }
}
export default AdminVerifyPage;
