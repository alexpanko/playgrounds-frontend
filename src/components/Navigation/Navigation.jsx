import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import AuthService from "../../services/auth-service";
//import Home from '../Home/Home';
//import { Route, Link, Switch, Redirect } from 'react-router-dom'
import "./Navigation.css";


export default class Navigation extends Component {

    service = new AuthService();

    logoutUser = () => {
        this.service.logout().then(() => {
          this.props.setUser({});
        });
    };


    render() {
        return (
            <div>
                <Navbar bg="blue" expand="lg">
                    <Navbar.Brand className="highlight" href="/">Playgrounds in Amsterdam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            {!this.props.user && <Nav.Link href="/signup">Signup</Nav.Link>}
                            {!this.props.user && <Nav.Link href="/login">Login</Nav.Link>}
                            {this.props.user && <Nav.Link href="/main-map">City map</Nav.Link>}
                            {this.props.user && <Nav.Link href="/addPG">Add playground</Nav.Link>}
                            {this.props.user && <Nav.Link href="/">
                                <button className="navLink" onClick={() => this.logoutUser()}>Logout</button>
                            </Nav.Link>}
                            {this.props.user && this.props.user.role === "ADMIN" && <Nav.Link href="/admin">Admin</Nav.Link>}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


