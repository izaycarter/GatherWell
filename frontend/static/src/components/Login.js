import React, {Component} from 'react';
import {Card, Row} from 'react-bootstrap';
import "../Css/Login.css"
import axios from "axios";

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
            <section className="col">
                <Card bg="primary" text="white">
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                      <form onSubmit={this.handleSubmit}>
                        <p>
                          <label htmlFor="username">Username</label>
                          <input id='username' type='text' name='username' value={this.state.username} onChange={this.handleChange} placeholder='Enter username' required />
                        </p>
                        <p>
                          <label htmlFor="email">Email</label>
                          <input id='email' type='email' name='email' value={this.state.email} onChange={this.handleChange} placeholder='Enter email' required />
                        </p>
                        <p>
                          <label htmlFor="password">Password</label>
                          <input id='password' type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Enter password' required/>
                        </p>
                        <button>Login</button>
                      </form>
                    </Card.Body>
                    <Card.Footer>
                        <small>Don't have an acount? <a href="/signup/"><span>Click here to Sign up.</span></a></small>
                    </Card.Footer>
              </Card>
          </section>
    )
  }
}

export default Login;
