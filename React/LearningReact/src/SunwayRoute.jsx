import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReadAllProduct from './ReadAllProduct'

const SunwayRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/product/:id" element={<ReadAllProduct></ReadAllProduct>}></Route>
                <Route path="/job" element={<div>This is Job page</div>}></Route>
                <Route path="/user" element={<div>This is User page</div>}></Route>
            </Routes>
        </div>
    )
}

export default SunwayRoute