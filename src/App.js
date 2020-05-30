import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import AddPG from './components/AddPG/AddPG';
import MainMap from './components/MainMap/MainMap';

export default class App extends Component {

  state = {
    user: false
  }

  setUser = (user) => {
    this.setState({user})
  }

  render() {

    return (
      <div>
        <Switch>
       { this.state.user && <Redirect exact from="/login" to="/main-map"/>}
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' render={() => <Login setUser={this.setUser} />} />  
          <Route exact path='/addPG' component={AddPG} />  
          <Route exact path='/main-map' component={MainMap} />     
        </Switch>
      </div>
    )
  }
}
