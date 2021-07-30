import React, { useState, useEffect } from 'react'
import { CourseList } from './CourseList';

export const SuggestedCourses = (props) => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses();
      }, []);

    const getCourses = () => {
        fetch('/courses')
        .then(res => res.json())
        .then(data => setCourses(data))
    }

    return (
        <div>
            <h1>Your Suggested Courses</h1>
            {
                props.user_categories.map((item, idx) => 
                    <CourseList 
                        key={idx} 
                        category={item}
                        user_courses={props.user_courses}
                        display_courses={props.display_courses.filter(course => course.category.name === item)} 
                        updateUserState={props.updateUserState}
                        populateUserCourseData={props.populateUserCourseData}
                    />
                )
            }
        </div>
    )
}