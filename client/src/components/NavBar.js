import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export const NavBar = () => {
    return (
            <Menu>
                <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                <br/>
                <Menu.Item as={NavLink} to="/suggestions">Suggested Courses</Menu.Item>
                <br/>
                <Menu.Item as={NavLink} to="/search">Search Courses</Menu.Item>
                <br/>
                <Menu.Item as={NavLink} to="/login">Log In</Menu.Item>
                <br/>
                <Menu.Item as={NavLink} to="/signup">Sign Up</Menu.Item>
            </Menu>
    )
}