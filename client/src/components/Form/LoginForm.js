import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import LoginContainer from "../../components/Grid/LoginContainer.js";
import API from "../../utils/API";



class LoginForm extends Component {

  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  loadPortfolio = res => {
    console.log(res);
    API.getPorfolio()
      .then(res =>
        this.setState({ portfolio: res.data })
      )
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Sumbit clicked");
    if (this.state.email && this.state.password) {
      API.login({
        email: this.state.email,
        password: this.state.password,
      })
        .then(res => this.loadPortfolio(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
      <Form>
      <Form.Field>
      <label>Email</label>
      <input 
          placeholder='Email'  
          value={this.state.email}
          onChange={this.handleInputChange}
          name="email"/>
      </Form.Field>
      <Form.Field>
      <label>Password</label>
      <input 
          type='password' 
          placeholder='Password' 
          value={this.state.password}
          onChange={this.handleInputChange}
          name="password"/>
      </Form.Field>
      <Button 
        type='submit'
        disabled={!(this.state.email && this.state.password)}
        onClick={this.handleFormSubmit}>
        Login</Button>
    </Form>
      </div>
    )};
  }

export default LoginForm


