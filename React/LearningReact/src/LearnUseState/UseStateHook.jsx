import React, { useState } from 'react'


//UseState hook makes variable 
const UseStateHook = () => {

    //normally we do
    // let count = 0
    let [count, setCount] = useState(0)
    return (
        <div>
            <p>Count is {count}</p>
            <button onClick={() => {
                setCount(count + 1)
            }
            }>Count Up</button>

            <button onClick={() => {
                setCount(count - 1)
            }}>Count Down</button>
        </div>
    )
}

export default UseStateHook