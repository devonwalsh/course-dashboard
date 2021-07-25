import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

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
                />
                <Form.Select
                    fluid
                    label='Category'
                    options={categories}
                />
            </Form>  
        </div>
    )
}
