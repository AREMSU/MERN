import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateProduct from './product/CreateProduct'
import ReadAllProduct from './product/ReadAllProduct'
import ReadSingleUser from './user/ReadSingleUser'
import UpdateProduct from './product/UpdateProduct'
import CreateUser from './user/CreateUser'
import UpdateUser from './user/UpdateUser'
import ReadSingleProduct from './product/ReadSingleProduct'
import ReadAllUser from './user/ReadAllUser'

const SunwayRoute = () => {
    return (
        <div>
            <Routes>
                <Route path = '/product/create' element = {<CreateProduct/>}></Route>
                <Route path = '/product' element = {<ReadAllProduct/>}></Route>
                <Route path = '/product/:id' element = {<ReadSingleProduct/>}></Route>
                <Route path = '/product/update/:id' element = {<UpdateProduct/>}></Route>
                
                <Route path = '/user/create' element = {<CreateUser/>}></Route>
                <Route path = '/user' element = {<ReadAllUser/>}></Route>
                <Route path = '/user/:id' element = {<ReadSingleUser/>}></Route>
                <Route path = '/user/update/:id' element = {<UpdateUser/>}></Route>
            </Routes>
        </div>
    )
}

export default SunwayRoute

