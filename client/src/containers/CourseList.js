import React from 'react'
import { Segment } from 'semantic-ui-react';
import { CourseDetails } from './CourseDetails';
import { CoursePreview } from '../components/CoursePreview';

export const CourseList = (props) => {
    return (
        <div>
            <Segment>
                {props.category}
                {props.user_courses.map((item, idx) => 
                    <CoursePreview 
                        key={idx} 
                        courseData={item} 
                        updateUserCourses={props.updateUserCourses} 
                        user_courses={props.user_courses}
                        setUserData={props.setUserData}
                    />
                )}
            </Segment>
        </div>
    )
}
