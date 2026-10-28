/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import api from "../api"

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!localStorage.getItem("token"))

  // if a token is saved, find out who it belongs to
  useEffect(() => {
    if (!localStorage.getItem("token")) return
    api.get("/auth/me")
      .then((res) => setUser(res.data.result))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false))
  }, [])

  const saveSession = (data) => {
    localStorage.setItem("token", data.token)
    setUser(data.result)
  }

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password })
    saveSession(res.data)
  }

  const register = async (body) => {
    const res = await api.post("/auth/register", body)
    saveSession(res.data)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
