import React from 'react'
import { Segment } from 'semantic-ui-react';
import { CoursePreview } from '../components/CoursePreview';

export const CourseList = (props) => {
    return (
            <Segment className="course-list">
                <h2>{props.category}</h2>
                <br/>
                {props.display_courses.map((item, idx) => 
                    <CoursePreview 
                        key={idx}
                        courseData={item} 
                        updateUserCourses={props.updateUserCourses} 
                        updateUserState={props.updateUserState}
                        user_courses={props.user_courses}
                        populateUserCourseData={props.populateUserCourseData}
                        saveCourse={props.saveCourse}
                    />
                )}
            </Segment>
    )
}
