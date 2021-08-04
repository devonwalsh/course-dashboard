import React from 'react'
import { Card, Button, Progress } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const CoursePreview = (props) => {

    const renderSaveButton = (course_id) => {
        let course_saved = props.user_courses.find(item =>  item.course_id === course_id)

        if (course_saved) {
            return (<Button color="red" onClick={() => handleUnsave(course_id)}>Unsave</Button>)
        }
        else {
            return <Button color="green" onClick={() => props.saveCourse(props.courseData)}>Save</Button>
        }
    }

    const handleUnsave = (course_id) => {

        const registration = props.user_courses.find(course => course.course_id == course_id)

        const updatedUserCourses = props.user_courses.filter(course => course.course_id != course_id)
        
        fetch(`/registrations/${registration.registration_id}`, {
            method: "DELETE",
        })
        .then(res => {
            if (res.ok) {
                props.unsaveCourse(updatedUserCourses);
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    return (
            <Card className="course-preview">
                <Card.Content>
                    <h3>{props.courseData.title}</h3>
                </Card.Content>
                <Card.Content>
                    <img src="../../online-learning.png" height="100" width="100"/>
                </Card.Content>
                <Card.Content>
                    <p>{props.courseData.progress > 0 ? props.courseData.progress : "0"}%</p>
                    {!props.courseData.progress ? <Progress percent="0" color="blue"/> : <Progress percent={props.courseData.progress} color="blue"/>}
                </Card.Content>
                <Card.Content>
                    <Button as={NavLink} exact to={`/courses/${props.courseData.course_id}`}>View Details</Button>
                    {renderSaveButton(props.courseData.course_id)}
                </Card.Content>
            </Card>
    )
}
