import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { errMsg } from "../api"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate(location.state?.from || "/", { replace: true })
    } catch (error) {
      toast.error(errMsg(error))
    }
  }

  return (
    <div className="container page narrow">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn">Log in</button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link>.</p>
    </div>
  )
}

export default Login
