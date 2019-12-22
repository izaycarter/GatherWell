import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import "../Css/Login.css";
import "../Css/Base.css";
import axios from "axios";
// import Header from "./Header";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/v1/rest-auth/login/', this.state)
    .then(res => {
        localStorage.setItem('my-app-user', JSON.stringify(res.data));
        this.props.history.push('/');
        window.location.reload(false);
    })
    .catch(error => {
        console.log(error);
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {


    return  (
            <div className="d-flex create-profile-container">
                <Form className="profile-form d-flex" onSubmit={this.handleSubmit}>
                    <h2 className="form-title d-flex justify-content-center">Login</h2>
                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Username:</Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder='Enter username' required />
                    </Form.Group>
                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Email:</Form.Label>
                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder='Enter email' required />
                    </Form.Group>

                    <Form.Group className="d-flex" >
                        <Form.Label className="Form-label">Password:</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder='Enter password' required />
                    </Form.Group>
                    <Form.Group className="d-flex" >
                        <small>Don't have an acount? <a  href="/signup/"><span className="login-Btn SignUp-btn">Click here to Sign up.</span></a></small>
                    </Form.Group>
                    <button className="login-Btn">Login</button>
                </Form>
            </div>
    )
  }
}

export default Login;
