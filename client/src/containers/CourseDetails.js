import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Container, Progress, Button, Form, Segment } from 'semantic-ui-react';

const CourseDetails = (props) => {

    const [title, setTitle] = useState('')
    const [source, setSource] = useState('')
    const [category, setCategory] = useState('')
    const [courseData, setCourseData] = useState({})
    const [categoryId, setCategoryId] = useState('')
    const [description, setDescription] = useState('')
    const [progress, setProgress] = useState(null)
    const [registeredCourse, setRegisteredCourse] = useState(false)
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
    }, [props.user_courses]);

    useEffect(() => {
        getRegistration()
    }, [props.user_courses]);

    const getCourse = () => {
        fetch(`/courses/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => {
            setCourseData(data);
            setTitle(data.title);
            setSource(data.source);
            setCategory(data.category.name);
            setDescription(data.description);
            getRegistration();
        })
    }

    const getRegistration = () => {
        const registration = props.user_courses.find(item => item.course_id == parseInt(props.match.params.id))

        if (registration) {

            setRegisteredCourse(true)

            fetch(`/registrations/${registration.registration_id}`)
            .then(res => res.json())
            .then(data => {
                setRegistrationData(data);
                setProgress(data.progress);
                setNotes(data.notes);
            })
        }
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

        const newProgressInt = parseInt(newProgress)

        fetch(`/registrations/${registrationData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: registrationData.id,
                progress: newProgressInt
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((data) => props.updateProgress(props.match.params.id, data))
                .then(setProgress(newProgressInt))
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

    const handleSave = (courseData) => {
        props.saveCourse({
            course_id: courseData.id
        });
    }

    if (!props.loggedIn) {
        return (<div>Please log in or sign up.</div>)
    }
    else {
            return (
                <Container className="page-container">
                    <h1>{title}</h1>
                    <Segment>
                        <h3 className="course-detail-headers">Source: {source}</h3>
                        <h3 className="course-detail-headers">Category: {category}</h3>
                    </Segment>
                    <Segment>
                        <p>Description:</p>
                        <p>{description}</p>
                    </Segment>

                    {

                        registeredCourse ?
                        <div>
                            <Segment>
                                <p>{progress === null ? "0" : progress}% completed</p>
                                <Progress percent={progress} color="blue"/>
                                {
                                    progressFormOpen ? 
                                    <Form>
                                        <Form.Input fluid id="progress-input" value={newProgress} onChange={(e) => setNewProgress(e.target.value)}/>
                                        <Button onClick={(e) => handleSubmitProgress(e)}>Submit</Button>
                                    </Form> : 
                                    <Button color="blue" onClick={() => toggleProgressForm()}>Update Progress</Button>
                                } 
                            </Segment>
                            <Segment>
                                <div className="course-details-dates">
                                    {
                                        startDateFormOpen ?
                                        <Form>
                                            <Form.Input value={newStartDate} onChange={e => setNewStartDate(e.target.value)}/>
                                            <Button color="blue" onClick={(e) => handleSubmitStartDate(e)}>Submit</Button>
                                        </Form> :
                                        <div>
                                            <p>Date Started: {registrationData.start_date === null ? "TBD" : registrationData.start_date}</p>
                                            <Button color="blue" onClick={() => toggleStartDateForm()}>Edit</Button>
                                        </div>
                                    }
                                </div>
                                <div className="course-details-dates">
                                    {
                                        endDateFormOpen ?
                                        <Form>
                                            <Form.Input value={newEndDate} onChange={e => setNewEndDate(e.target.value)}/>
                                            <Button color="blue" onClick={(e) => handleSubmitEndDate(e)}>Submit</Button>
                                        </Form> :
                                        <div>
                                            <p>Date Completed: {registrationData.end_date === null ? "TBD" : registrationData.end_date}</p>
                                            <Button color="blue" onClick={() => toggleEndDateForm()}>Edit</Button>
                                        </div>
                                    }
                                </div>
                            </Segment>
                            {
                                notesFormOpen ?
                                <Form>
                                    <Form.TextArea value={notes} onChange={e => setNotes(e.target.value)}/>
                                    <Button color="blue" onClick={(e) => handleSubmitNotes(e)}>Submit</Button>
                                </Form> :
                                <Segment>
                                    <div className="course-notes">
                                        {notes}
                                    </div>
                                    <br/>
                                    <Button color="blue" onClick={() => toggleNotesForm()}>Edit Notes</Button>
                                </Segment>
                            }
                        </div> :
                        <div>
                            <Button color="blue" onClick={() => handleSave(courseData)}>Sign up for this course!</Button>
                        </div>
                    }
                </Container>
            )
        }
    }

export default withRouter(CourseDetails);