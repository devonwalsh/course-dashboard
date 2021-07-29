import React, { useState } from 'react'
import { Search, Form, Button } from 'semantic-ui-react';

export const SearchForm = () => {

    const [title, setTitle] = useState('')
    const [source, setSource] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = () => {
        fetch(`/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title.toLowerCase(),
                source: source.toLowerCase(),
                category: category
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => console.log(data));
            } else {
                res.json().then((errorData) => console.log(errorData.errors));
            }
        })
        .catch(error => console.log(error))
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
                <Form.Input 
                    label="Category"
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                />
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </Form>
        </div>
    )
}
