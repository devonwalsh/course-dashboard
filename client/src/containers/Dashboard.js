import React from 'react'
import { CourseList } from './CourseList';

export const Dashboard = (props) => {

    return (
        <div>
            {
                props.user_categories.map((item, idx) => 
                    <CourseList 
                        key={idx} 
                        category={item} 
                        user_courses={props.user_courses.filter(course => course.category === item)} 
                        updateUserState={props.updateUserState}
                    />
                )
            }
        </div>
    )
}
