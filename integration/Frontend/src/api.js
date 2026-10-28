import axios from "axios"

// one axios instance so the url and the login token are set in a single place
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const errMsg = (error) => error.response?.data?.message || "Something went wrong. Please try again."

export default api
