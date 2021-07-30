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
import CourseDetails  from './containers/CourseDetails';

class App extends Component {

  state = {
    loggedIn: false,
    loading: true,
    username: '',
    all_courses: [],
    all_categories: [],
    user_courses: [],
    user_categories: [],
    categoryDropdown: {}
  }

  /* Startup stuff */

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
          res.json().then((data) => this.manageLogin(data))
      } else {
          res.json().then((errorData) => console.log(errorData.errors));
      }
    })
  }

  getAllCourseData = () => {
    fetch('/courses')
    .then(res => res.json())
    .then(data => this.populateCourseData(data))
  }

  getCategoryData = () => {
    fetch('/categories')
    .then(res => res.json())
    .then(data => this.populateCategoryData(data))
  }

  getUserCourseData = () => {
    fetch('/user_courses')
    .then(res => res.json())
    .then(data => this.populateUserCourseData(data))
  }

  populateCourseData = (data) => {

    let source_list = [];
    data.map(item => source_list.includes(item.source) ? null : source_list.push(item.source))
    source_list.sort();

    this.setState({all_courses: data})

  }

  populateCategoryData = (data) => {
    let category_list = [];

    data.map(item => category_list.includes(item.name) ? null : category_list.push(item.name))
    category_list.sort();

    this.setState({all_categories: category_list})
    this.populateCategoryDropdown(data);

  }

  populateUserCourseData = (data) => {

    let category_list = [];
    data.map(item => category_list.includes(item.category) ? null : category_list.push(item.category))
    category_list.sort();

    let source_list = [];
    data.map(item => source_list.includes(item.source) ? null : source_list.push(item.source))
    source_list.sort();

    this.setState({user_courses: data})
    this.setState({user_categories: category_list})

  }

  populateCategoryDropdown = (data) => {
    const categoryObject = data.map(item => 
      Object.assign({}, {"key": item.id, "text": item.name, "value": item.id})
    )

    categoryObject.sort((a, b) => {
      a = a.text.toUpperCase();
      b = b.text.toUpperCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    })

    this.setState({categoryDropdown: categoryObject})
  }

  /* User actions */

  manageLogin = (data) => {
    this.setState({
      loggedIn: true, 
      username: data.username
    })
    this.getAllCourseData();
    this.getUserCourseData();
    this.getCategoryData();
    this.props.history.push("/");
  }

  manageLogout = () => {
    this.setState({loggedIn: false})
    this.props.history.push("/")
  }

  updateCategories = (newCategory) => {
    const updatedCategories = [...this.state.all_categories, newCategory.name]
    const sortedCategories = updatedCategories.sort();
    this.setState({all_categories: sortedCategories});

    const newDropdownItem = Object.assign({}, {"key": newCategory.id, "text": newCategory.name, "value": newCategory.id})
    const updatedCategoryDropdown = [...this.state.categoryDropdown, newDropdownItem]
    
    const sortedCategoryDropdown = updatedCategoryDropdown.sort((a, b) => {
      a = a.text.toUpperCase();
      b = b.text.toUpperCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    })

    this.setState({categoryDropdown: sortedCategoryDropdown})
  }

  updateUserState = (data) => {
    const currentCategories = this.state.user_categories
    const updatedCategories = currentCategories.includes(data.category) ? currentCategories : [...currentCategories, data.category]
    const sortedCategories = updatedCategories.sort();
    
    this.setState({
      ...this.state,
      user_courses: [...this.state.user_courses, data], 
      user_categories: sortedCategories,
    })
  }

  addNewCourse = (newCourse) => {
    this.setState({all_courses: [...this.state.all_courses, newCourse]})
  }

  updateProgress = (courseId, updatedCourse) => {
    let course = this.state.user_courses.find(course => course.id == courseId)
    let filteredCourses = this.state.user_courses.filter(course => course.id != courseId)
    course.progress = updatedCourse.progress
    let updatedCourses = [...filteredCourses, course]
    this.setState({...this.state, user_courses: updatedCourses})
  }

  render() {
      return (
          <div className="App">
            <NavBar 
              loggedIn={this.state.loggedIn} 
              manageLogout={this.manageLogout}
            />
            <Switch>
              <Route exact path="/" render={() => 
                <Dashboard 
                  user_categories={this.state.user_categories}
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses} 
                  display_courses={this.state.user_courses}
                  updateUserState={this.updateUserState}
                  populateUserCourseData={this.populateUserCourseData}
                />
              }/>
              <Route exact path="/suggestions" render={() => 
                <SuggestedCourses 
                  user_categories={this.state.user_categories}
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses} 
                  display_courses={this.state.all_courses}
                  updateUserState={this.updateUserState}
                  populateUserCourseData={this.populateUserCourseData}
                />
              }/>
              <Route exact path="/search" render={() => 
                <SearchPage
                  categoryDropdown={this.state.categoryDropdown}
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses}
                  updateUserState={this.updateUserState}
                  populateUserCourseData={this.populateUserCourseData}
                />
              }/>
              <Route exact path="/signup-page" render={() => 
                <SignupPage 
                  manageLogin={this.manageLogin}
                />
              }/>
              <Route exact path="/login" render={() => 
                <Login 
                  manageLogin={this.manageLogin}
                />
              }/>
              <Route exact path="/newcourse" render={() => 
                <NewCoursePage 
                  categories={this.state.all_categories} 
                  updateCategories={this.updateCategories} 
                  categoryDropdown={this.state.categoryDropdown}
                  updateUserState={this.updateUserState}
                  user_courses={this.state.user_courses} 
                  populateUserCourseData={this.populateUserCourseData}
                  addNewCourse={this.addNewCourse}
                />
              }/>
              <Route exact path="/courses/:courseId" render={(props) => 
                <CourseDetails 
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses}
                  updateProgress={this.updateProgress}
                />
              }/>
            </Switch>
          </div>
      );
    }
  }

export default withRouter(App);

