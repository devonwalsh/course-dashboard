import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

export const NewCourseForm = () => {

    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);

    return (
        <div>
            <Form>
                <Form.Input fluid label='Title' id="title"/>
                <Form.Select
                    fluid
                    label='Source'
                    options={sources}
                    placeholder="Select..."
                />
                <Form.Group>
                <Form.Select
                    fluid
                    label='Category'
                    options={categories}
                    placeholder="Select..."
                />
                <Button>Add a New Category</Button>
                </Form.Group>
            </Form>  
        </div>
    )
}
