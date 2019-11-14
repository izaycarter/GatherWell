import React, {Component} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import "../Css/Login.css";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('/api/v1/rest-auth/registration/', this.state)
    .then(res => {
        localStorage.setItem('my-app-user', JSON.stringify(res.data));
        this.props.history.push('/');
    })
    .catch(error => {
        console.log(error);
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
      console.log(this.props)
    return  (
        <div className="d-flex create-profile-container">
            <Form className="profile-form d-flex" onSubmit={this.handleSubmit}>
                <h2 className="form-title d-flex justify-content-center"><span>Sign Up</span></h2>
                <Form.Group className="d-flex" >
                    <Form.Label className="Form-label">Username:</Form.Label>
                    <Form.Control as="input" type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder='Enter username' required />
                </Form.Group>
                <Form.Group className="d-flex" >
                    <Form.Label className="Form-label">Email:</Form.Label>
                    <Form.Control as="input" type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder='Enter email' required />
                </Form.Group>
                <Form.Group className="d-flex" >
                    <Form.Label className="Form-label">Password:</Form.Label>
                    <Form.Control as="input" type="password1" name="password" value={this.state.password1} onChange={this.handleChange} placeholder='Enter password' required />
                </Form.Group>
                <Form.Group className="d-flex" >
                    <Form.Label className="Form-label">Password:</Form.Label>
                    <Form.Control as="input" type="password2" name="password" value={this.state.password} onChange={this.handleChange} placeholder='Enter password' required />
                </Form.Group>
                <button className="login-Btn">Sign Up</button>
            </Form>
      </div>
    )
  }
}

export default SignUp;
