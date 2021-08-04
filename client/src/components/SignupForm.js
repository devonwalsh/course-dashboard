import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export const SignupForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);

    const changeName = (e) => {
        const updatedName = e.target.value;
        setUsername(updatedName);
    }

    const changePassword = (e) => {
        const updatedPassword = e.target.value;
        setPassword(updatedPassword);
    }

    const changePasswordConfirmation = (e) => {
        const updatedPasswordConfirmation = e.target.value;
        setPasswordConfirmation(updatedPasswordConfirmation);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: password_confirmation
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((data) => props.manageLogin(data.username))
                .then(props.redirectToHome())
            } else {
                res.json().then((errorData) => setErrors(errorData.errors));
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="signup-form">
        <Form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" id="name" value={username} onChange={changeName}/>
            <br/>
            <label>Password</label>
            <input type="password" value={password} onChange={changePassword}/>
            <br/>
            <label>Confirm Password</label>
            <input type="password" value={password_confirmation} onChange={changePasswordConfirmation}/>
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
