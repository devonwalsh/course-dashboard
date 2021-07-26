import React, { useState, useEffect } from 'react'
import { CourseList } from './CourseList';

export const Dashboard = () => {

    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch('/categories')
        .then(res => res.json())
        .then(data => setData(data))
    }

    const setData = (data) => {
        setCourses(data);
        getCategories(data);
    }

    const getCategories = (data) => {
        let category_list = [];
        data.map(item => category_list.push(item.category))
        setCategories(category_list)
    }

    return (
        <div>
            {
                categories.map((item, idx) => <CourseList key={idx} categories={categories} courses={courses}/>)
            }
        </div>
    )
}
