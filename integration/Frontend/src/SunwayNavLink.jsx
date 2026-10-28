import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { useCart } from "./context/CartContext"
import { STORE_NAME } from "./config"

const SunwayNavLink = () => {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header>
      <div className="header">
        <div className="container header-inner">
          <Link to="/" className="brand">{STORE_NAME}</Link>
          <nav className="nav">
            <NavLink to="/product">Shop</NavLink>
            <NavLink to="/cart">Cart ({count})</NavLink>
            {user ? (
              <>
                <NavLink to="/orders">My orders</NavLink>
                <button className="link-button" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <NavLink to="/login">Log in</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
      {user?.role === "admin" && (
        <div className="admin-bar">
          <div className="container header-inner">
            <span className="muted">Admin</span>
            <nav className="nav">
              <NavLink to="/admin/product">Products</NavLink>
              <NavLink to="/admin/order">Orders</NavLink>
              <NavLink to="/admin/user">Users</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default SunwayNavLink
