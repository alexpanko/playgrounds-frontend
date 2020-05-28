import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'

export default class App extends Component {

  state = {
    user: false
  }

  setUser = (user) => {
    this.setState({user})
  }

  render() {

    if(this.state.user) {
      return <h1>Welcome {this.state.user.username}</h1>
    }

    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' render={() => <Login setUser={this.setUser} />} />           
        </Switch>
      </div>
    )
  }
}
