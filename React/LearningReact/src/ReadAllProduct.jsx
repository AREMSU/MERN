import React from 'react'
import { useParams } from 'react-router-dom'

const ReadAllProduct = () => {
    let params = useParams()
    console.log(params.id)
    return (
        <div>ReadAllProduct</div>
    )
}

export default ReadAllProduct