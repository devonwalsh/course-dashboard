import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export const LoginForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const changeName = (e) => {
        const updatedName = e.target.value;
        setUsername(updatedName);
    }

    const changePassword = (e) => {
        const updatedPassword = e.target.value;
        setPassword(updatedPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => props.manageLogin(data));
            } else {
                res.json().then((errorData) => setErrors([errorData.errors]));
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" id="name" value={username} onChange={changeName}/>
            <br/>
            <label>Password</label>
            <input type="password" value={password} onChange={changePassword}/>
            <br/>
            <input className="ui button submit-button" type="submit"/>
        </Form>
        {
            errors.length > 0 ? 
                <div className="error-list">
                    {errors.map((error, idx) => 
                        <li key={idx}>{error}</li>
                    )}
                </div> : 
            null
        }
        </div>
    )
}
