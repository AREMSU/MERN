//ternary operator

import React from 'react'

const Terneary = () => {
    let age = 17
    return (
        <div>
            {age >= 18 ? "can vote" : "cannot vote"}
        </div>
    )
}

export default Terneary