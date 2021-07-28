import React from 'react'
import { Card, Button } from 'semantic-ui-react';

export const CourseDetails = (props) => {
    return (
        <div>
            <Card>
                {props.courseData.title}
            </Card>
        </div>
    )
}
