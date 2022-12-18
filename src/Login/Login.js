import React, { Component } from "react";
import "./Show.css";
require('dotenv').config()

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        email: props.email,
        Password: props.Password
      }
    }
  }


  handleEmailChanged(event) {
    var customer        = this.state.customer;
    customer.email  = event.target.value;
    this.setState({ customer: customer });
  }


  handlePasswordChanged(event) {
    var customer      = this.state.customer;
    customer.Password = event.target.value;
    this.setState({ customer: customer });
  }


  async handleButtonClicked() {
    let formData = JSON.parse(JSON.stringify(this.state.customer))
    console.log(formData.email)
    console.log(formData.Password)

    let res = await fetch("http://localhost:3030/api/login", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:formData.email,password:formData.Password}),
    });
    let rem = await res.json();
    if(rem["token"]){
      sessionStorage.setItem("token", rem["token"]);
      window.location = window.location.origin;
    }
  }


  render() {
    return (
      <div id="main">
        <input
          name="email"
          type="email"
          placeholder="Email.."
          value={this.state.customer.email} 
          onChange={this.handleEmailChanged.bind(this)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password.."
          value={this.state.customer.Password} 
          onChange={this.handlePasswordChanged.bind(this)}
        />
        <button onClick={this.handleButtonClicked.bind(this)}>Login</button>
      </div>
    );
  }
}

export default LogIn;
