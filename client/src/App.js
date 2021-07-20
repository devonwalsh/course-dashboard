import './App.css';
import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { Dashboard } from './containers/Dashboard';
import { Signup } from './containers/Signup';
import { Login } from './containers/Login';
import { SuggestedCourses } from './containers/SuggestedCourses';
import { SearchPage } from './containers/SearchPage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path="/" render={() => <Dashboard/>}/>
        <Route exact path="/suggestions" render={() => <SuggestedCourses/>}/>
        <Route exact path="/search" render={() => <SearchPage/>}/>
        <Route exact path="/signup" render={() => <Signup/>}/>
        <Route exact path="/login" render={() => <Login/>}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
