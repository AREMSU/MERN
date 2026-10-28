import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

// <ProtectedRoute> needs a login, <ProtectedRoute admin> needs an admin login
const ProtectedRoute = ({ admin = false, children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p className="container page muted">Loading...</p>
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (admin && user.role !== "admin") return <Navigate to="/" replace />

  return children
}

export default ProtectedRoute
