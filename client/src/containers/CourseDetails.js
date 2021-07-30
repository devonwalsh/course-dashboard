import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Progress, Button, Form } from 'semantic-ui-react';

const CourseDetails = (props) => {

    const [progressUpdateOpen, setToggleProgressUpdateOpen] = useState(false);
    const [newProgress, setNewProgress] = useState('');

    const courseData = props.all_courses.find(
        course => course.id == props.match.params.courseId
    )

    const userData = props.user_courses.find(
        course => course.id == props.match.params.courseId
    )

    const toggleProgressUpdate = () => {
        setToggleProgressUpdateOpen(!progressUpdateOpen)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.match.params.courseId,
                progress: parseInt(newProgress)
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((data) => props.updateProgress(props.match.params.courseId, data))
                .then(setNewProgress(''))
                .then(setToggleProgressUpdateOpen(false));
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h1>{courseData.title}</h1>
            <h3>Source: {courseData.source}</h3>
            <h3>Category: {courseData.category.name}</h3>
            <Progress percent={userData.progress} color="blue"/>
            {
                    progressUpdateOpen ? 
                    <Form>
                        <Form.Input fluid id="progress-input" value={newProgress} onChange={(e) => setNewProgress(e.target.value)}/>
                        <Form.Button onClick={(e) => {handleSubmit(e)}}>Submit</Form.Button>
                    </Form> : 
                    <Button onClick={() => toggleProgressUpdate()}>Update Progress</Button>
                } 
        </div>
    )
}

export default withRouter(CourseDetails);