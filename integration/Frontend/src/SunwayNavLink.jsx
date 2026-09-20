import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const SunwayNavLink = () => {
    const navigate = useNavigate()

    return (
        <div>
            <NavLink style={{ marginRight: "20px" }} to="/product/create"> Create Product </NavLink>
            <NavLink style={{ marginRight: "20px" }} to="/product"> Product </NavLink>
            <NavLink style={{ marginRight: "20px" }} to="/user/create"> Create User </NavLink>
            <NavLink style={{ marginRight: "20px" }} to="/user"> User </NavLink>

        </div>
    )
}

export default SunwayNavLink