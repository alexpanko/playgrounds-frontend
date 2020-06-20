import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import AddPG from './components/AddPG/AddPG';
import MainMap from './components/MainMap/MainMap';
import Admin from './components/Admin/Admin'
import AuthService from './services/auth-service'
import Edit from './components/Edit PG/Edit';

export default class App extends Component {

  state = {
    user: null,
    loading: true
  }

  service = new AuthService()

  checkAuthenticated = () => {
    if(this.state.user === null) {
      this.service.isAuthenticated()
      .then(response => {
        this.setState({
        user: response,
        loading: false
      })
      })
      .catch( err => {
        this.setState({
          user: false,
          loading: false
        })
      })
    }
  }

  setUser = (user) => {
    this.setState({user})
  }

  render() {
    this.checkAuthenticated()
    // if(this.state.loading) {
    //   return <p>loading</p>
    // }

    // if(this.state.user) {
    //   return (
    //     <div>
    //       <h1>Welcome {this.state.user.username}</h1>
    //     </div>
    //   )
    // }

    return (
      <div>
        <Switch>
       { this.state.user && <Redirect exact from="/login" to="/main-map"/>}
       { this.state.user && <Redirect exact from="/" to="/main-map"/>}
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' render={() => <Login setUser={this.setUser} />} />  
          <Route exact path='/addPG' component={AddPG} />  
          <Route exact path='/main-map' component={MainMap} />     
          <Route exact path='/login' render={() => <Login setUser={this.setUser} />} />
          <Route exact path='/admin' render={() => <Admin user={this.state.user} setUser={this.setUser} />} /> 
          <Route exact path='/edit/:id' render={(props) => <Edit id={props.match.params.id} user={this.state.user} setUser={this.setUser} />} /> 
       
        </Switch>
      </div>
    )
  }
}
