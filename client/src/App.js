import './App.css';
import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { Dashboard } from './containers/Dashboard';
import { SignupPage } from './containers/SignupPage';
import { Login } from './containers/Login';
import { SuggestedCourses } from './containers/SuggestedCourses';
import { SearchPage } from './containers/SearchPage';
import { NewCoursePage } from './containers/NewCoursePage';

class App extends Component {

  state = {
    loggedIn: false,
    username: ''
  }

  getUser = () => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
          res.json().then((data) => this.setState({loggedIn: true, name: data.name}));
      } else {
          res.json().then((errorData) => console.log(errorData.errors));
      }
    })
  }

  componentDidMount() {
    this.getUser()
  }

  manageLogin = username => {
    this.setState({
      loggedIn: true, 
      username: username
    })
    this.props.history.push("/")
  }

  manageLogout = () => {
    this.setState({loggedIn: false})
    this.props.history.push("/")
  }

  render() {
    return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} manageLogout={this.manageLogout}/>
          <Switch>
            <Route exact path="/" render={() => <Dashboard/>}/>
            <Route exact path="/suggestions" render={() => <SuggestedCourses/>}/>
            <Route exact path="/search" render={() => <SearchPage/>}/>
            <Route exact path="/signup-page" render={() => <SignupPage manageLogin={this.manageLogin}/>}/>
            <Route exact path="/login" render={() => <Login manageLogin={this.manageLogin}/>}/>
            <Route exact path="/newcourse" render={() => <NewCoursePage/>}/>
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);

