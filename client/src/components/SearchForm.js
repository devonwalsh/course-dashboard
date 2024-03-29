import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { CoursePreview } from './CoursePreview';

export const SearchForm = (props) => {

    const [title, setTitle] = useState('')
    const [source, setSource] = useState('')
    const [category, setCategory] = useState('')
    const [results, setResults] = useState([]);
    const [dummyOptions] = useState([{
        "key": '', 
        "text": '',
        "value": null
    }]);

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
                res.json().then((data) => data.map(item => 
                    setResults(prev => {
                      return [...prev, {
                        course_id: item.id,
                        title: item.title,
                        source: item.source,
                        description: item.description,
                        category_id: item.category.id,
                        category_name: item.category.name
                      }]
                    }
                    )
                  ));
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    const displayResults = () => {
        if (Object.keys(results).length > 0) {
            return (
                <div className="search-results">
                {results.map((course, idx) => 
                    <CoursePreview 
                        key={idx} 
                        courseData={course} 
                        user_courses={props.user_courses} 
                        updateUserState={props.updateUserState}
                        populateUserCourseData={props.populateUserCourseData}
                        saveCourse={props.saveCourse}
                        unsaveCourse={props.unsaveCourse}
                    />)}
                </div>
            )
        }
    }

    return (
        <div className="search-form">
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
                    options={Object.keys(props.categoryDropdown).length === 0 ? dummyOptions : props.categoryDropdown}
                    placeholder="Select..."
                    value={category}
                    onChange={(e, { value }) => setCategory({ value }.value)}
                />
                <Button color="blue" onClick={() => handleSubmit()}>Submit</Button>
            </Form>
            {displayResults()}
        </div>
    )
}
