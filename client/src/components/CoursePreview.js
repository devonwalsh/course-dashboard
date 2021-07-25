import React from 'react'
import { Card, Button } from 'semantic-ui-react';

export const CoursePreview = (props) => {

    const handleSubmit = (e) => {
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
                category_id: props.courseData.categoryid
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => console.log(data));
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
                <Button onClick={handleSubmit}>Save</Button>
            </Card>
        </div>
    )
}
