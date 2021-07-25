import React from 'react'
import { SignupForm } from '../components/SignupForm';

export const SignupPage = (props) => {
    return (
        <SignupForm manageLogin={props.manageLogin}/>
    )
}
