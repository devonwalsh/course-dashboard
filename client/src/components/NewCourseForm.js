import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { CoursePreview } from './CoursePreview';

export const NewCourseForm = (props) => {

    const [newCategoryToggle, setNewCategoryToggle] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [title, setTitle] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [newCourse, setNewCourse] = useState({});
    const [dummyOptions] = useState([{
        "key": '', 
        "text": '',
        "value": null
    }])

    const addCategory = (e) => {
        e.preventDefault();
        fetch("/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newCategory
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => props.updateCategories(data));
            } else {
                res.json().then((errorData) => setErrors(errorData.errors));
            }
        })
        .catch(error => console.log(error))

        toggleNewCategoryForm();
    }

    const toggleNewCategoryForm = () => {
        setNewCategoryToggle(!newCategoryToggle)
    }

   const createCourse = (e) => {
        e.preventDefault()
        fetch("/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                source: source,
                category_id: category,
                description: description
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((data) => saveNewCourseToState({
                    course_id: data.id,
                    title: data.title,
                    source: data.source,
                    description: data.description,
                    category_id: data.category.id,
                    category_name: data.category.name
                }))
                .then(resetForm());
            } else {
                res.json().then((errorData) => setErrors(errorData.errors));
            }
        })
        .catch(error => console.log(error))
      }

    const resetForm = () => {
        setTitle('');
        setSource('');
        setCategory('');
    }

    const saveNewCourseToState = (data) => {
        setNewCourse(data);
        props.addNewCourse(data);
    }

    const renderNewCoursePreview = () => {
        if (Object.keys(newCourse).length > 0) {
            return (
                <div>
                    <h1>Course created!</h1>
                    <CoursePreview 
                    courseData={newCourse} 
                    updateUserCourses={props.updateUserCourses} 
                    updateUserState={props.updateUserState}
                    user_courses={props.user_courses}
                    populateUserCourseData={props.populateUserCourseData}
                    saveCourse={props.saveCourse}
                    unsaveCourse={props.unsaveCourse}
                    />
                </div>
            )
        }
    }

    return (
        <div>
            <Form className="new-course-form">
                <Form.Input 
                    fluid 
                    label='Title' 
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Input
                    fluid
                    label='Source'
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
                <Form.Group>
                <Form.Select className="category-select"
                    fluid
                    label='Category'
                    options={Object.keys(props.categoryDropdown).length === 0 ? dummyOptions : props.categoryDropdown}
                    placeholder="Select..."
                    value={category}
                    onChange={(e, { value }) => setCategory({ value }.value)}
                />
                {
                    newCategoryToggle ? 
                    <Form className="new-category">
                        <Form.Input fluid label='Category Name' id="category-name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                        <Form.Button color="blue" onClick={(e) => addCategory(e)}>Submit</Form.Button>
                    </Form> : 
                    <Button className="new-category" color="blue" onClick={toggleNewCategoryForm}>Add a New Category</Button>
                }
                </Form.Group>
                <Form.TextArea
                    fluid
                    label='Description'
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button color="blue" onClick={createCourse}>Submit</Button>
            </Form>  
            {renderNewCoursePreview()}
        </div>
    )
}
