import React from 'react'
import { NewCourseForm } from '../components/NewCourseForm';

export const NewCoursePage = (props) => {
    if (!props.loggedIn) {
        return (<div>Please log in or sign up.</div>)
    }
    else {
        return (
            <div>
                <h1>Add a New Course</h1>
                <NewCourseForm 
                    categories={props.categories} 
                    updateCategories={props.updateCategories} 
                    categoryDropdown={props.categoryDropdown}
                    updateUserState={props.updateUserState}
                    user_courses={props.user_courses} 
                    populateUserCourseData={props.populateUserCourseData}
                    addNewCourse={props.addNewCourse}
                    saveCourse={props.saveCourse}
                />
            </div>
        )
    }
}
