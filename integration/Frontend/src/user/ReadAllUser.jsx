import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import { useAuth } from "../context/AuthContext"
import { formatDate } from "../config"

const ReadAllUser = () => {
  const { user: me } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    api.get("/user")
      .then((res) => setUsers(res.data.result))
      .catch((error) => toast.error(errMsg(error)))
      .finally(() => setLoading(false))
  }, [refresh])

  const handleDelete = async (u) => {
    if (!window.confirm(`Delete the account for ${u.email}?`)) return
    try {
      await api.delete(`/user/${u._id}`)
      toast.success("User deleted")
      setRefresh((n) => n + 1)
    } catch (error) {
      toast.error(errMsg(error))
    }
  }

  if (loading) return <div className="container page muted">Loading...</div>

  return (
    <div className="container page">
      <h1>Users</h1>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th></th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{formatDate(u.createdAt)}</td>
                <td className="actions">
                  {u._id !== me._id && (
                    <button className="link-button danger" onClick={() => handleDelete(u)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReadAllUser
