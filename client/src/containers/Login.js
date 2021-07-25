import React from 'react';
import { LoginForm } from '../components/LoginForm';

export const Login = (props) => {
    return (
            <LoginForm manageLogin={props.manageLogin}/>
    )
}
