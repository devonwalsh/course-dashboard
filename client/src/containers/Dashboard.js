import React from 'react'
import { CourseList } from './CourseList';

export const Dashboard = (props) => {

    return (
        <div>
            {
                props.categories.map((item, idx) => <CourseList key={idx} category={item} courses={props.courses.filter(course => course.category === item)} updateUserState={props.updateUserState}/>)
            }
        </div>
    )
}
