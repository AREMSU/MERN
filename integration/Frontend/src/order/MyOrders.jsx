import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import { formatDate, money } from "../config"

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/order/mine")
      .then((res) => setOrders(res.data.result))
      .catch((error) => toast.error(errMsg(error)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container page muted">Loading...</div>

  return (
    <div className="container page">
      <h1>My orders</h1>
      {orders.length === 0 ? (
        <p>You haven't ordered anything yet. <Link to="/product">Browse the shop</Link>.</p>
      ) : (
        orders.map((o) => (
          <div key={o._id} className="order">
            <div className="between">
              <strong>Order {o._id.slice(-6)}</strong>
              <span className={`status ${o.status}`}>{o.status}</span>
            </div>
            <p className="muted small">Placed on {formatDate(o.createdAt)}</p>
            <table>
              <tbody>
                {o.items.map((i) => (
                  <tr key={i._id}>
                    <td>{i.name} x {i.qty}</td>
                    <td className="right">{money(i.price * i.qty)}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td className="right"><strong>{money(o.total)}</strong></td>
                </tr>
              </tbody>
            </table>
            <p className="muted small">Delivering to {o.shipping.name}, {o.shipping.address}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MyOrders
