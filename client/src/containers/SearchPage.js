import React from 'react'
import { SearchForm } from '../components/SearchForm';

export const SearchPage = (props) => {
    if (!props.loggedIn) {
        return (<div>Please log in or sign up.</div>)
    }
    else {
        return (
            <div>
                <h1>Search Courses</h1>
                <SearchForm
                    categoryDropdown={props.categoryDropdown}
                    all_courses={props.all_courses}
                    user_courses={props.user_courses}
                    updateUserState={props.updateUserState}
                    populateUserCourseData={props.populateUserCourseData}
                    saveCourse={props.saveCourse}
                />
            </div>
        )
    }
}
