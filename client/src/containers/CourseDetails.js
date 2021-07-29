import React from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

const CourseDetails = (props) => {

    const courseData = props.all_courses.find(
        course => course.id == props.match.params.courseId
    )

    return (
        <div>
            <h1>{courseData.title}</h1>
            <h3>Source: {courseData.source}</h3>
            <h3>Category: {courseData.category.name}</h3>
        </div>
    )
}

export default withRouter(CourseDetails);