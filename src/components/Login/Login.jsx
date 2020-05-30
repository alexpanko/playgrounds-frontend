import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../services/auth-service";
import "./Login.css";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    service: new AuthService(),
    
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.state.service
      .login(username, password)
      .then((response) => {
        this.setState({ username: "", password: ""});
        this.props.setUser(response);
        
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-brown text-center">
              <span className="highlight">Playgrounds in Amsterdam</span>
            </h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <h1 className="text-center">Login</h1>
            <p className="text-center">
              Don't have an account yet?
              <span> </span>
              <Link className="" to="/signup">
                Sign up here
              </Link>
            </p>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="text-center">
              <Link className="btn btn-info my-3 width-300" to="/google">
                Login with Google
              </Link>
            </div>
            <div className="hr-text text-center">
              <hr />
              <span className="bg-white text-secondary font-italic px-2">
                or...
              </span>
            </div>
            <form
              className="mt-5 d-flex flex-column align-items-center"
              onSubmit={this.handleFormSubmit}
            >
              <div className="form-group">
                <label htmlFor="username">Email address:</label>
                <input
                  type="email"
                  className="form-control width-300"
                  name="username"
                  value={this.state.username}
                  placeholder="Enter email"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control width-300"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-secondary width-300">
                Login
              </button>
            </form>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    );
  }
}
