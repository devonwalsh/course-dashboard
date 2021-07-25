import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export const NavBar = (props) => {

    const handleLogout = () => {
        fetch('/logout', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        props.manageLogout()
    }

    return (
            <Menu>
                <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                <Menu.Item as={NavLink} to="/suggestions">Suggested Courses</Menu.Item>
                <Menu.Item as={NavLink} to="/search">Search Courses</Menu.Item>
                {props.loggedIn ? <Menu.Item as={NavLink} to="/logout" onClick={() => handleLogout()}>Log Out</Menu.Item> : null}
                {!props.loggedIn ? <Menu.Item as={NavLink} to="/login">Log In</Menu.Item> : null}
                {!props.loggedIn ? <Menu.Item as={NavLink} to="/signup-page">Sign Up</Menu.Item> : null}
            </Menu>
    )
}