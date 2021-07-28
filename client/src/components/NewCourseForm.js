import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';

export const NewCourseForm = (props) => {

    const [sources, setSources] = useState([]);
    const [categoryDropdown, setCategoryDropdown] = useState({key: "loading", text: "Loading...", value: "Loading"});
    const [newCategoryToggle, setNewCategoryToggle] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newSourceToggle, setNewSourceToggle] = useState(false);
    const [newSource, setNewSource] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

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
                    res.json().then((data) => props.updateCategories([...props.categories, data.name]));
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

    const toggleNewSourceForm = () => {
        setNewSourceToggle(!newSourceToggle)
    }

    return (
        <div>
            <Form>
                <Form.Input fluid label='Title' id="title"/>
                <Form.Group>
                <Form.Select
                    fluid
                    label='Source'
                    options={props.sourceDropdown}
                    placeholder="Select..."
                />
                {
                    newSourceToggle ? 
                    <Form>
                        <Form.Input fluid label='Source Name' id="source-name" value={newSource} onChange={(e) => setNewSource(e.target.value)}/>
                        <Form.Button onClick={(e) => addCategory(e)}>Submit</Form.Button>
                    </Form> : 
                    <Button onClick={toggleNewSourceForm}>Add a New Source</Button>
                }
                </Form.Group>
                <Form.Group>
                <Form.Select
                    fluid
                    label='Category'
                    options={props.categoryDropdown}
                    placeholder="Select..."
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
                <Button>Submit</Button>
            </Form>  
        </div>
    )
}
