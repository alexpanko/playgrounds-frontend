import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service'
import './Admin.css';

export default class Admin extends Component {

    // state = {
    //     user: this.props.user & ,
    //     // service: new AuthService()
    // }

    service = new AuthService()

    logoutUser = () =>{
        this.service.logout()
        .then(() => {
            this.props.setUser({})
        })
      }

    render() {

        // console.log(this.state)
        if (this.props.user && this.props.user.role === "ADMIN") {
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
                            <h1 className="text-center">Admin page</h1>
                            <p className="text-center"> 
                                <Link to='/'>
                                    <button className="btn btn-link" onClick={() => this.logoutUser()}>Logout</button>
                                </Link>
                            </p>
                            <div className="text-center">
                                <div className="dropdown">
                                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Filter playgrounds
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button className="dropdown-item" type="button">All</button>
                                        <button className="dropdown-item" type="button">New</button>
                                        <button className="dropdown-item" type="button">Approved</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
            ) 
        }
        else {
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
                            <h1 className="text-center">Access denied</h1>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
            ) 
        }        

    }
}
