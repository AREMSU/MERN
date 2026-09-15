import React from 'react'

const LearnUseState1 = () => {
    return (
        <div>
            <button onClick={() => {
                console.log("increment button has been clicked")
            }}>
                Increment
            </button>
            <button onClick={() => {
                console.log("decrement button has been clicked")
            }}>
                Decrement
            </button>
        </div>
    )
}

export default LearnUseState1