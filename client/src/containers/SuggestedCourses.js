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
                        courses={props.all_courses.filter(course => course.category.name === item)} 
                        updateUserState={props.updateUserState}
                        setUserData={props.setUserData}
                    />
                )
            }
        </div>
    )
}