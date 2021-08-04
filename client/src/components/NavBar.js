import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export const NavBar = (props) => {

        if (!props.loggedIn) {
            return (
                <Menu inverted>
                    <Menu.Item as={NavLink} to="/login">Log In</Menu.Item>
                    <Menu.Item as={NavLink} to="/signup">Sign Up</Menu.Item>
                </Menu>
            )
        }
        else {
            return (
                <Menu inverted>
                    <Menu.Item as={NavLink} to="/">My Courses</Menu.Item>
                    <Menu.Item as={NavLink} to="/newcourse">Add a Course</Menu.Item>
                    <Menu.Item as={NavLink} to="/suggestions">Suggested Courses</Menu.Item>
                    <Menu.Item as={NavLink} to="/search">Search Courses</Menu.Item>
                    <Menu.Item as={NavLink} to="/logout" onClick={() => props.manageLogout()}>Log Out</Menu.Item>
                </Menu>
            )
        }
}