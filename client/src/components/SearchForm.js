import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { CoursePreview } from './CoursePreview';

export const SearchForm = (props) => {

    const [title, setTitle] = useState('')
    const [source, setSource] = useState('')
    const [category, setCategory] = useState('')
    const [results, setResults] = useState([]);

    const handleSubmit = () => {
        fetch(`/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title.toLowerCase(),
                source: source.toLowerCase(),
                category_id: category
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => setResults(data));
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    const displayResults = () => {
        if (Object.keys(results).length > 0) {
            return (
                <div>
                {results.map((course, idx) => 
                    <CoursePreview 
                        key={idx} 
                        courseData={course} 
                        user_courses={props.user_courses} 
                        updateUserState={props.updateUserState}
                        populateUserCourseData={props.populateUserCourseData}
                    />)}
                </div>
            )
        }
    }

    return (
        <div>
            <Form>
                <Form.Input 
                    label="Title"
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                />
                <Form.Input 
                    label="Source"
                    value={source} 
                    onChange={e => setSource(e.target.value)}
                />
                <Form.Select
                    fluid
                    clearable
                    label='Category'
                    options={props.categoryDropdown}
                    placeholder="Select..."
                    value={category}
                    onChange={(e, { value }) => setCategory({ value }.value)}
                />
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </Form>
            {displayResults()}
        </div>
    )
}
