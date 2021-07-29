import React from 'react'
import { SearchForm } from '../components/SearchForm';

export const SearchPage = (props) => {
    return (
        <div>
            <h1>Search Courses</h1>
            <SearchForm
                categoryDropdown={props.categoryDropdown}
                all_courses={props.all_courses}
            />
        </div>
    )
}
