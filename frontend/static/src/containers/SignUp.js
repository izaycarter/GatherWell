import React, {Component} from 'react';
import axios from "axios";

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
          <input id='password1' type='password' name='password1' value={this.state.password1} onChange={this.handleChange} placeholder='Enter password' required/>
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id='password2' type='password' name='password2' value={this.state.password2} onChange={this.handleChange} placeholder='Enter password' required/>
        </p>
        <button>Sign Up</button>
      </form>
    )
  }
}

export default SignUp;
