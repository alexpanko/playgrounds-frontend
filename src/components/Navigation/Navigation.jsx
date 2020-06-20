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
                <Navbar bg="white" expand="lg">
                    <Navbar.Brand className="highlight" href="/">Playgrounds in Amsterdam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/main-map">City map</Nav.Link>
                            <Nav.Link href="/addPG">Add playground</Nav.Link>
                            <Nav.Link href="/">
                                <button className="navLink" onClick={() => this.logoutUser()}>Logout</button>
                            </Nav.Link>
                            <Nav.Link href="/admin">Admin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


