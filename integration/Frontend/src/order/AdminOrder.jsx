import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import { STATUSES, formatDate, money } from "../config"

const AdminOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/order")
      .then((res) => setOrders(res.data.result))
      .catch((error) => toast.error(errMsg(error)))
      .finally(() => setLoading(false))
  }, [])

  const handleStatus = async (id, status) => {
    try {
      const res = await api.patch(`/order/${id}/status`, { status })
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: res.data.result.status } : o)))
      toast.success("Order status updated")
    } catch (error) {
      toast.error(errMsg(error))
    }
  }

  if (loading) return <div className="container page muted">Loading...</div>

  return (
    <div className="container page">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Order</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id.slice(-6)}</td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td>
                    {o.shipping.name}<br />
                    <span className="muted small">{o.shipping.phone}, {o.shipping.address}</span>
                  </td>
                  <td>{o.items.map((i) => `${i.name} x ${i.qty}`).join(", ")}</td>
                  <td>{money(o.total)}</td>
                  <td>
                    <select
                      value={o.status}
                      disabled={o.status === "cancelled"}
                      onChange={(e) => handleStatus(o._id, e.target.value)}
                      aria-label={`Status for order ${o._id.slice(-6)}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminOrder
