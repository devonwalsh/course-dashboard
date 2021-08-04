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
    all_courses: [],
    all_categories: [],
    user_courses: [],
    user_categories: [],
    formattedData: [],
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
    .then(data => data.map(item => 
      this.setState({
        ...this.state, 
        all_courses: [...this.state.all_courses, {
          course_id: item.id,
          title: item.title,
          source: item.source,
          description: item.description,
          category_id: item.category.id,
          category_name: item.category.name
        }]
      })
    ))
  }

  getCategoryData = () => {
    fetch('/categories')
    .then(res => res.json())
    .then(data => this.populateCategoryData(data))
  }

  // getRegistrations = () => {
  //   fetch('/registrations')
  //   .then(res => res.json())
  //   .then(data => this.setState({...this.state, user_registrations: data}))
  // }

  getUserCourseData = () => {
    fetch('/registrations')
    .then(res => res.json())
    // .then(data => this.populateUserCourseData(data))
    .then(data => data.map(item =>
      this.setState({
        ...this.state,
        user_courses: [...this.state.user_courses, {
          user_id: item.user_id,
          course_id: item.course_id,
          registration_id: item.id,
          title: item.course.title,
          source: item.course.source,
          description: item.course.description,
          category_id: item.category.id,
          category_name: item.category.name,
          progress: item.progress,
          start_date: item.start_date,
          end_date: item.end_date
        }]
      })
    ))
    .then(() => this.populateUserCourseData(this.state.user_courses))
  }

  populateCategoryData = (data) => {
    let category_list = [];

    data.map(item => category_list.includes(item.name) ? null : category_list.push(item.name))
    category_list.sort();

    this.setState({...this.state, all_categories: category_list})
    this.populateCategoryDropdown(data);

  }

  populateUserCourseData = (data) => {

    let category_list = [];
    data.map(item => category_list.includes(item.category_name) ? null : category_list.push(item.category_name))
    category_list.sort();

    this.setState({...this.state, user_courses: data})
    this.setState({...this.state, user_categories: category_list})

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

    this.setState({...this.state, categoryDropdown: categoryObject})
  }

  /* User actions */

  manageLogin = (data) => {
    this.setState({
      ...this.state,
      loggedIn: true, 
      username: data.username
    })
    this.getAllCourseData();
    this.getUserCourseData();
    this.getCategoryData();
    // this.getRegistrations();
  }

  redirectToHome = () => {
    this.props.history.push("/");
  }

  manageLogout = () => {
    this.setState({...this.state, loggedIn: false})
    this.props.history.push("/")
  }

  updateCategories = (newCategory) => {
    const updatedCategories = [...this.state.all_categories, newCategory.name]
    const sortedCategories = updatedCategories.sort();
    this.setState({...this.state, all_categories: sortedCategories});

    const newDropdownItem = Object.assign({}, {"key": newCategory.id, "text": newCategory.name, "value": newCategory.id})
    const updatedCategoryDropdown = [...this.state.categoryDropdown, newDropdownItem]
    
    const sortedCategoryDropdown = updatedCategoryDropdown.sort((a, b) => {
      a = a.text.toUpperCase();
      b = b.text.toUpperCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    })

    this.setState({...this.state, categoryDropdown: sortedCategoryDropdown})
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
    this.setState({...this.state, all_courses: [...this.state.all_courses, newCourse]})
  }

  saveCourse = (courseData) => {
    fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: courseData.id,
            title: courseData.title,
            source: courseData.source,
            category_id: courseData.category.id
        })
    })
    .then(res => {
        if (res.ok) {
            // res.json().then((data) => this.updateUserState({
            //     id: data.id,
            //     source: data.source,
            //     title: data.title,
            //     category: data.category.name
            // }));
            res.json().then(data => console.log(data))
        } else {
            res.json().then((errorData) => console.log(errorData));
        }
    })
    .catch(error => console.log(error))
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
                  loggedIn={this.state.loggedIn} 
                  user_categories={this.state.user_categories}
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses} 
                  display_courses={this.state.user_courses}
                  updateUserState={this.updateUserState}
                  populateUserCourseData={this.populateUserCourseData}
                  saveCourse={this.saveCourse}
                />
              }/>
              <Route exact path="/suggestions" render={() => 
                <SuggestedCourses 
                  loggedIn={this.state.loggedIn} 
                  user_categories={this.state.user_categories}
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses} 
                  display_courses={this.state.all_courses}
                  updateUserState={this.updateUserState}
                  populateUserCourseData={this.populateUserCourseData}
                  saveCourse={this.saveCourse}
                />
              }/>
              <Route exact path="/search" render={() => 
                <SearchPage
                  loggedIn={this.state.loggedIn} 
                  categoryDropdown={this.state.categoryDropdown}
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses}
                  updateUserState={this.updateUserState}
                  populateUserCourseData={this.populateUserCourseData}
                  saveCourse={this.saveCourse}
                />
              }/>
              <Route exact path="/signup" render={() => 
                <SignupPage 
                  manageLogin={this.manageLogin}
                  redirectToHome={this.redirectToHome}
                />
              }/>
              <Route exact path="/login" render={() => 
                <Login 
                  manageLogin={this.manageLogin}
                  redirectToHome={this.redirectToHome}
                />
              }/>
              <Route exact path="/newcourse" render={() => 
                <NewCoursePage 
                loggedIn={this.state.loggedIn} 
                  categories={this.state.all_categories} 
                  updateCategories={this.updateCategories} 
                  categoryDropdown={this.state.categoryDropdown}
                  updateUserState={this.updateUserState}
                  user_courses={this.state.user_courses} 
                  populateUserCourseData={this.populateUserCourseData}
                  addNewCourse={this.addNewCourse}
                  saveCourse={this.saveCourse}
                />
              }/>
              <Route path="/courses/:id" render={(props) => 
                <CourseDetails 
                  loggedIn={this.state.loggedIn} 
                  all_courses={this.state.all_courses}
                  user_courses={this.state.user_courses}
                  updateProgress={this.updateProgress}
                  user_courses={this.state.user_courses}
                  saveCourse={this.saveCourse}
                />
              }/>
            </Switch>
            <div className="footer">
              <p>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
              <p><a target="_blank" href="https://icons8.com/icon/fH22K8x6Yvz6/book">Book</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></p>
            </div>
          </div>
      );
    }
  }

export default withRouter(App);

