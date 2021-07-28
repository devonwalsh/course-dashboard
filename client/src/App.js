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
    all_courses: [],
    all_categories: [],
    all_sources: [],
    user_courses: [],
    user_categories: [],
    user_sources: [],
    categoryDropdown: {},
    sourceDropdown: {}
  }

  /* Startup stuff */

  componentDidMount() {
    this.getUser();
    this.getData();
    this.getUserData();
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
    fetch('/courses')
    .then(res => res.json())
    .then(data => this.setData(data))
  }

  setData = (data) => {
    this.setState({all_courses: data})
    this.getSources(data);
    this.getCategories();
  }

  populateCategories = (data) => {
    let category_list = [];
    data.map(item => category_list.includes(item.name) ? null : category_list.push(item.name))
    category_list.sort();
    this.setState({all_categories: category_list})
    this.populateCategoryDropdown(category_list)
  }

  getCategories = () => {
    fetch('/categories')
    .then(res => res.json())
    .then(data => this.populateCategories(data))
  }

  getSources = (data) => {
    let source_list = [];
    data.map(item => source_list.includes(item.source) ? null : source_list.push(item.source))
    source_list.sort();
    this.setState({all_sources: source_list})
    this.populateSourceDropdown(source_list)
}

  getUserData = () => {
      fetch('/user_courses')
      .then(res => res.json())
      .then(data => this.setUserData(data))
  }

  setUserData = (data) => {
      this.setState({user_courses: data});
      this.getUserCategories(data);
      this.getUserSources(data);
  }

  getUserCategories = (data) => {
      let category_list = [];
      data.map(item => category_list.includes(item.category) ? null : category_list.push(item.category))
      category_list.sort();
      this.setState({user_categories: category_list})
  }

  getUserSources = (data) => {
    let source_list = [];
    data.map(item => source_list.includes(item.source) ? null : source_list.push(item.source))
    source_list.sort();
    this.setState({user_sources: source_list})
  }

  populateCategoryDropdown = (data) => {
    const categoryObject = data.map(item => 
      Object.assign({}, {"key": item, "text": item, "value": item})
    )

    this.setState({categoryDropdown: categoryObject})
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
    const sortedCategories = newCategories.sort();
    this.setState({categories: sortedCategories});
    this.populateSourceDropdown(sortedCategories)
  }

  render() {
    return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} manageLogout={this.manageLogout}/>
          <Switch>
            <Route exact path="/" render={() => <Dashboard categories={this.state.user_categories} courses={this.state.user_courses}/>}/>
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

