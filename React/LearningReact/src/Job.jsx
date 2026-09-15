import React from 'react'

const Job = ({ title, location, salary }) => {
    return (
        <div>
            <p>My job title is {title}</p>
            <p>My job location is {location}</p>
            <p>My job salary is {salary}</p>
        </div>
    )
}

export default Job