import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth-service";
import "./Admin.css";
//import axios from "axios";
import UserService from "../../services/user-service";


export default class Admin extends Component {
  state = {
    playgrounds: [],
    playgroundsFilter: [],
  };

  service = new AuthService();
  userService = new UserService()

  componentDidMount() {
    this.userService.admin(this.data)
    // axios
    //   .get("http://localhost:4000/playground/admin")
    //   .then((result) => {
    //     this.setState({ playgrounds: result.data.PG });
    //   })
    //   .catch((error) => console.log(error));
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.props.setUser({});
    });
  };

  filterPlaygrounds(e, filter) {
    e.preventDefault();
    this.userService.filter(filter)
    .then((result) => {
          this.setState({ playgrounds: result.data.PG });
        })
        .catch((error) => console.log(error));

    // axios
    //   .get(
    //     `http://localhost:4000/playground/admin/filter?filterApproved=${filter}`
    //   )
    //   .then((result) => {
    //     this.setState({ playgrounds: result.data.PG });
    //   })
    //   .catch((error) => console.log(error));
  }

  handleDelete = (e, id) => {
    e.preventDefault()
    this.userService.deletePG(id)
    .then((result) => {
      const newList = this.state.playgrounds.filter(x => 
        x._id !== id
      )
      this.setState({ playgrounds: newList});

      console.log(result)
    })
    .catch((error) => console.log(error));
}
  

  render() {
    //console.log(this.state.playgrounds);
    // if (this.props.user && this.props.user.role === "ADMIN") {
    if (this.props.user) {
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
                <Link to="/">
                  <button
                    className="btn btn-link"
                    onClick={() => this.logoutUser()}
                  >
                    Logout
                  </button>
                </Link>
              </p>
              <div className="text-center">
                <div className="dropdown">
                  <button
                    className="btn btn-warning dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Filter playgrounds
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={(e) => {
                        this.filterPlaygrounds(e, "all");
                      }}
                    >
                      All
                    </button>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={(e) => {
                        this.filterPlaygrounds(e, false);
                      }}
                    >
                      New
                    </button>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={(e) => {
                        this.filterPlaygrounds(e, true);
                      }}
                    >
                      Approved
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-columns my-5">
                {!this.state.playgrounds
                  ? "Playgrounds are loading"
                  : this.state.playgrounds.map((pg, index) => (
                      <div className="card" key={index}>
                        <Link
                          className="link-none text-body text-decoration-none"
                          to={"/edit/" + pg._id}
                        >
                          <img
                            src={pg.photo[0]}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <h5 className="card-title">{pg.address}</h5>
                            <p className="card-text d-flex justify-content-between font-weight-bold">
                              {pg.attributes.slide && <strong>Slide</strong>}
                              {pg.attributes.swing && <strong>Swing</strong>}
                              {pg.attributes.rollerBungge && (
                                <strong>Zipline</strong>
                              )}
                              {pg.attributes.sander && <strong>Sand box</strong>}
                              {pg.attributes.pitch && <strong>Pitch</strong>}
                              {pg.attributes.toilet && <strong>Toilet</strong>}
                            </p>
                        
                          </div>
                        </Link>
                        <button onClick={(e) => this.handleDelete(e, pg._id)} className="btn btn-warning" type="submit">Delete</button>
                      </div>
                    ))}
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      );
    } else {
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
      );
    }
  }
}
