import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

export const NewCourseForm = (props) => {

    const [newCategoryToggle, setNewCategoryToggle] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [title, setTitle] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState([]);

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
                res.json().then((data) => props.updateCategories(data.name));
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
                category_id: category
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => console.log(data));
            } else {
                res.json().then((errorData) => setErrors(errorData.errors));
            }
        })
        .catch(error => console.log(error))
      }

    return (
        <div>
            <Form>
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
                <Form.Select
                    fluid
                    label='Category'
                    options={props.categoryDropdown}
                    placeholder="Select..."
                    value={category}
                    onChange={(e, { value }) => setCategory({ value }.value)}
                />
                {
                    newCategoryToggle ? 
                    <Form>
                        <Form.Input fluid label='Category Name' id="category-name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                        <Form.Button onClick={(e) => addCategory(e)}>Submit</Form.Button>
                    </Form> : 
                    <Button onClick={toggleNewCategoryForm}>Add a New Category</Button>
                }
                </Form.Group>
                <Button onClick={createCourse}>Submit</Button>
            </Form>  
        </div>
    )
}
