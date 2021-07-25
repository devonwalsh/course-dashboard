import React from 'react'
import { Segment } from 'semantic-ui-react';

export const CourseList = (props) => {
    return (
        <div>
            {
                props.categories.map((item, idx) => <Segment key={idx}>{item}</Segment>)
            }   
        </div>
    )
}
