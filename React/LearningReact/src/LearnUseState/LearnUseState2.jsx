import React, { useState } from 'react'

const LearnUseState2 = () => {
    let [type, setType] = useState("password")

    return (
        <div>
            <input type={type} />
            <button onClick={() => {
                if (type === "password") {
                    setType("text")
                }
                else {
                    setType("password")
                }

            }}>eye</button>
        </div>
    )
}

export default LearnUseState2

// browser ma print garne variable usestate bata banaune