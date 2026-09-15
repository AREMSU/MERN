import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

const SunwayNavLink = () => {
    let navigate = useNavigate()
    return (
        <div>
            <NavLink style={{ marginRight: "10px" }} to="/product"> Product </NavLink>
            <NavLink style={{ marginRight: "10px" }} to="/job"> Job </NavLink>
            <NavLink style={{ marginRight: "10px" }} to="/user"> User </NavLink>

            <button
                onClick={() => {
                    navigate("/login")
                }}>
                Login
            </button>
        </div>
    )
}

export default SunwayNavLink