import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { errMsg } from "../api"
import { useAuth } from "../context/AuthContext"

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(form)
      toast.success("Account created")
      navigate("/")
    } catch (error) {
      toast.error(errMsg(error))
    }
  }

  return (
    <div className="container page narrow">
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" minLength="6" value={form.password} onChange={handleChange} required />
          <span className="muted small">At least 6 characters.</span>
        </div>
        <button className="btn">Create account</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link>.</p>
    </div>
  )
}

export default Register
