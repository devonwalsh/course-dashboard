import React from 'react'
import { Segment } from 'semantic-ui-react';
import { CourseDetails } from './CourseDetails';

export const CourseList = (props) => {
    return (
        <div>
            <Segment>
                {props.category}
                {props.courses.map((item, idx) => <CourseDetails key={idx} courseData={item}/>)}
            </Segment>
        </div>
    )
}
