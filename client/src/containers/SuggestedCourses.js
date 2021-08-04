import React from 'react'
import { CourseList } from './CourseList';
import { Container } from 'semantic-ui-react';

export const SuggestedCourses = (props) => {

    if (!props.loggedIn) {
        return (<div>Please log in or sign up.</div>)
    }

    else {
            return (
            <Container className="page-container">
                <h1>Your Suggested Courses</h1>
                {
                    props.user_categories.map((item, idx) => 
                        <CourseList 
                            key={idx} 
                            category={item}
                            user_courses={props.user_courses}
                            display_courses={props.display_courses.filter(course => course.category_name === item)} 
                            updateUserState={props.updateUserState}
                            populateUserCourseData={props.populateUserCourseData}
                            saveCourse={props.saveCourse}
                            unsaveCourse={props.unsaveCourse}
                        />
                    )
                }
            </Container>
        )
    }
}