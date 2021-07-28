import React from 'react'
import { Card, Button } from 'semantic-ui-react';

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

    return (
        <div>
            <Card>
                {props.courseData.title}
                <br/>
                <Button onClick={saveCourse}>Save</Button>
                <Button>Unsave</Button>
            </Card>
        </div>
    )
}
