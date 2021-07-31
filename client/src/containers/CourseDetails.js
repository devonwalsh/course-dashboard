import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Progress, Button, Form, Segment } from 'semantic-ui-react';

const CourseDetails = (props) => {

    const [courseData, setCourseData] = useState({})
    const [registrationData, setRegistrationData] = useState({})
    const [progressFormOpen, setToggleProgressFormOpen] = useState(false);
    const [notesFormOpen, setNotesFormOpen] = useState(false)
    const [startDateFormOpen, setStartDateFormOpen] = useState(false)
    const [endDateFormOpen, setEndDateFormOpen] = useState(false)
    const [newProgress, setNewProgress] = useState('');
    const [notes, setNotes] = useState('')
    const [newStartDate, setNewStartDate] = useState('')
    const [newEndDate, setNewEndDate] = useState('')

    useEffect(() => {
        getCourse()
    }, []);

    const getCourse = () => {
        fetch(`/courses/${props.match.params.courseId}`)
        .then(res => res.json())
        .then(data => {
            setCourseData(data[0]);
            getRegistration(data[0])
        })
    }

    const getRegistration = (data) => {
        const registration = props.user_registrations.find(item => item.course_id == data.id)
        
        fetch(`/registrations/${registration.id}`)
        .then(res => res.json())
        .then(data => {
            setRegistrationData(data);
            setNotes(data.notes);
        })
    }

    const toggleProgressForm = () => {
        setToggleProgressFormOpen(!progressFormOpen)
    }

    const toggleNotesForm = () => {
        setNotesFormOpen(!notesFormOpen);
    }

    const toggleStartDateForm = () => {
        setStartDateFormOpen(!startDateFormOpen);
    }

    const toggleEndDateForm = () => {
        setEndDateFormOpen(!endDateFormOpen);
    }

    const handleSubmitProgress = (e) => {
        e.preventDefault()
        fetch("/progress", {
            method: "PATCH",
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
                .then(setCourseData({...courseData, progress: newProgress}))
                .then(setNewProgress(''))
                .then(setToggleProgressFormOpen(false));
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    const handleSubmitNotes = (e) => {
        e.preventDefault()
        fetch(`/registrations/${registrationData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: registrationData.id,
                notes: notes
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((data) => setRegistrationData(data))
                .then(setNotesFormOpen(false))
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    const handleSubmitStartDate = (e) => {
        e.preventDefault()
        fetch(`/registrations/${registrationData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: registrationData.id,
                start_date: newStartDate
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((data) => setRegistrationData(data))
                .then(setNewStartDate(''))
                .then(setStartDateFormOpen(false))
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    const handleSubmitEndDate = (e) => {
        e.preventDefault()
        fetch(`/registrations/${registrationData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: registrationData.id,
                end_date: newEndDate
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((data) => setRegistrationData(data))
                .then(setNewEndDate(''))
                .then(setEndDateFormOpen(false))
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    if (!props.loggedIn) {
        return (<div>Please log in or sign up.</div>)
    }
    else {
            return (
                <div>
                    <h1>{courseData.title}</h1>
                    <h3>Source: {courseData.source}</h3>
                    <h3>Category: {courseData.category}</h3>
                    <Progress percent={courseData.progress} color="blue"/>
                    {
                        progressFormOpen ? 
                        <Form>
                            <Form.Input fluid id="progress-input" value={newProgress} onChange={(e) => setNewProgress(e.target.value)}/>
                            <Button onClick={(e) => handleSubmitProgress(e)}>Submit</Button>
                        </Form> : 
                        <Button onClick={() => toggleProgressForm()}>Update Progress</Button>
                    } 
                    <p>{courseData.description}</p>
                    {
                        startDateFormOpen ?
                        <Form>
                            <Form.Input value={newStartDate} onChange={e => setNewStartDate(e.target.value)}/>
                            <Button onClick={(e) => handleSubmitStartDate(e)}>Submit</Button>
                        </Form> :
                        <div>
                            <p>Date Started: {registrationData.start_date === null ? "TBD" : registrationData.start_date}</p>
                            <Button onClick={() => toggleStartDateForm()}>Edit</Button>
                        </div>
                    }
                    {
                        endDateFormOpen ?
                        <Form>
                            <Form.Input value={newEndDate} onChange={e => setNewEndDate(e.target.value)}/>
                            <Button onClick={(e) => handleSubmitEndDate(e)}>Submit</Button>
                        </Form> :
                        <div>
                            <p>Date Completed: {registrationData.end_date === null ? "TBD" : registrationData.end_date}</p>
                            <Button onClick={() => toggleEndDateForm()}>Edit</Button>
                        </div>
                    }
                    {
                        notesFormOpen ?
                        <Form>
                            <Form.TextArea value={notes} onChange={e => setNotes(e.target.value)}/>
                            <Button onClick={(e) => handleSubmitNotes(e)}>Submit</Button>
                        </Form> :
                        <Segment>
                            {notes}
                            <br/>
                            <Button onClick={() => toggleNotesForm()}>Edit Notes</Button>
                        </Segment>
                    }
                </div>
            )
        }
    }

export default withRouter(CourseDetails);