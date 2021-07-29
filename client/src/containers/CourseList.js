import React from 'react'
import { Segment } from 'semantic-ui-react';
import { CourseDetails } from './CourseDetails';
import { CoursePreview } from '../components/CoursePreview';

export const CourseList = (props) => {
    return (
        <div>
            <Segment>
                {props.category}
                {props.display_courses.map((item, idx) => 
                    <CoursePreview 
                        key={idx} 
                        courseData={item} 
                        updateUserCourses={props.updateUserCourses} 
                        updateUserState={props.updateUserState}
                        user_courses={props.user_courses}
                        setUserData={props.setUserData}
                    />
                )}
            </Segment>
        </div>
    )
}
