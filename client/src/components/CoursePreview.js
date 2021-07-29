import React from 'react'
import { Card, Button } from 'semantic-ui-react';
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
        let course_saved = props.user_courses.find(item =>  item.id === course_id)

        if (course_saved) {
            return (<Button onClick={() => unsaveCourse(course_id)}>Unsave</Button>)
        }
        else {
            return <Button onClick={saveCourse}>Save</Button>
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
                res.json().then((data) => props.setUserData(data));
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <Card>
                {props.courseData.title}
                <br/>
                <Button as={NavLink} exact to={`/courses/${props.courseData.id}`}>View Details</Button>
                {renderSaveButton(props.courseData.id)}
            </Card>
        </div>
    )
}
