import React from 'react'
import { Form } from 'semantic-ui-react';

export const SearchForm = () => {
    return (
        <div>
            <Form>
            <Form.Input fluid label='Title' id="title"/>
                <Form.Select
                    fluid
                    label='Source'
                    placeholder="Select..."
                />
                <Form.Select
                    fluid
                    label='Category'
                    placeholder="Select..."
                />
            </Form>
        </div>
    )
}
