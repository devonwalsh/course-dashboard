import React, { useState, useEffect } from 'react'
import { CourseList } from './CourseList';

export const Dashboard = () => {

    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getUserCategories();
    }, []);

    const getCategories = (data) => {
        let category_list = [];
        data.map(item => category_list.push(item.category.name))
        setCategories(category_list)
    }

    const getData = (data) => {
        setCourses(data);
        getCategories(data);
    }

    const getCourses = () => {
        fetch('/usercourses')
        .then(res => res.json())
        .then(data => getData(data))
    }

    const getUserCategories = () => {
        fetch('/usercategories')
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            {
                categories.map((item, idx) => <CourseList key={idx} categories={categories}/>)
            }
        </div>
    )
}
