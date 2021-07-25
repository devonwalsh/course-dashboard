import React, { useState, useEffect } from 'react'
import { CoursePreview } from '../components/CoursePreview';

export const SuggestedCourses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses();
      }, []);

    const getCourses = () => {
        fetch('/courses')
        .then(res => res.json())
        .then(data => setCourses(data))
    }

    return (
        <div>
            {
                courses.map((item, idx) => <CoursePreview key={idx} courseData={item}/>)
            }
        </div>
    )
}