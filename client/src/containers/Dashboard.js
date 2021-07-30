import React from 'react'
import { CourseList } from './CourseList';

export const Dashboard = (props) => {

    return (
        <div>
            <h1>Your Courses</h1>
            {
                props.user_categories.map((item, idx) => 
                    <CourseList 
                        key={idx} 
                        category={item}
                        user_courses={props.user_courses}
                        display_courses={props.display_courses.filter(course => course.category === item)} 
                        updateUserState={props.updateUserState}
                        populateUserCourseData={props.populateUserCourseData}
                    />
                )
            }
        </div>
    )
}
