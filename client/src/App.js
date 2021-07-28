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
    username: '',
    courses: [],
    categories: [],
    categoryDropdown: {},
    sources: [],
    sourceDropdown: {}
  }

  /* Startup stuff */

  componentDidMount() {
    this.getUser()
    this.getData()
  }

  getUser = () => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
          res.json().then((data) => this.setState({loggedIn: true, username: data.username}));
      } else {
          res.json().then((errorData) => console.log(errorData.errors));
      }
    })
  }

  getData = () => {
      fetch('/categories')
      .then(res => res.json())
      .then(data => this.setData(data))
  }

  setData = (data) => {
      this.setState({courses: data});
      this.getCategories(data);
      this.getSources(data);
  }

  getCategories = (data) => {
      let category_list = [];
      data.map(item => category_list.includes(item.category) ? null : category_list.push(item.category))
      category_list.sort();
      this.setState({categories: category_list})
      this.populateCategoryDropdown(category_list)
  }

  populateCategoryDropdown = (data) => {
    const categoryObject = data.map(item => 
      Object.assign({}, {"key": item, "text": item, "value": item})
    )

    this.setState({categoryDropdown: categoryObject})
  }

  getSources = (data) => {
    let source_list = [];
    data.map(item => source_list.includes(item.source) ? null : source_list.push(item.source))
    source_list.sort();
    this.setState({sources: source_list})
    this.populateSourceDropdown(source_list)
}

  populateSourceDropdown = (data) => {
  const sourceObject = data.map(item => 
    Object.assign({}, {"key": item, "text": item, "value": item})
  )

  this.setState({sourceDropdown: sourceObject})
}

  /* User actions */

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

  updateCategories = (newCategories) => {
    this.setState({categories: newCategories})
  }

  render() {
    return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} manageLogout={this.manageLogout}/>
          <Switch>
            <Route exact path="/" render={() => <Dashboard categories={this.state.categories} courses={this.state.courses}/>}/>
            <Route exact path="/suggestions" render={() => <SuggestedCourses/>}/>
            <Route exact path="/search" render={() => <SearchPage/>}/>
            <Route exact path="/signup-page" render={() => <SignupPage manageLogin={this.manageLogin}/>}/>
            <Route exact path="/login" render={() => <Login manageLogin={this.manageLogin}/>}/>
            <Route exact path="/newcourse" render={() => <NewCoursePage 
              categories={this.state.categories} 
              updateCategories={this.updateCategories} 
              categoryDropdown={this.state.categoryDropdown}
              sources={this.state.sources} 
              sourceDropdown={this.state.sourceDropdown}/>}
            />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);

