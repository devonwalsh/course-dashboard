import React from 'react'
import { Card, Button, Progress } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const CoursePreview = (props) => {

    const saveCourse = (e) => {
        e.preventDefault()
        fetch("/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.courseData.id,
                title: props.courseData.title,
                source: props.courseData.source,
                category_id: props.courseData.category.id
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => props.updateUserState({
                    id: data.id,
                    source: data.source,
                    title: data.title,
                    category: data.category.name
                }));
            } else {
                res.json().then((errorData) => console.log(errorData));
            }
        })
        .catch(error => console.log(error))
    }

    const renderSaveButton = (course_id) => {
        let course_saved = props.user_courses.find(item =>  item.course_id === course_id)

        if (course_saved) {
            return (<Button color="red" onClick={() => unsaveCourse(course_id)}>Unsave</Button>)
        }
        else {
            return <Button color="green" onClick={() => props.saveCourse(props.courseData)}>Save</Button>
        }
    }

    const unsaveCourse = (course_id) => {
        fetch("/unsave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: course_id
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => props.populateUserCourseData(data));
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
