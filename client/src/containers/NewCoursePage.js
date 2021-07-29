import React from 'react'
import { NewCourseForm } from '../components/NewCourseForm';

export const NewCoursePage = (props) => {
    return (
        <div>
            <NewCourseForm 
                categories={props.categories} 
                updateCategories={props.updateCategories} 
                categoryDropdown={props.categoryDropdown}
                sources={props.sources} 
                sourceDropdown={props.sourceDropdown}
                updateUserState={props.updateUserState}
                user_courses={props.user_courses} 
                setUserData={props.setUserData}
            />
        </div>
    )
}
