import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { money } from "../config"

const Checkout = () => {
  const { user, setUser } = useAuth()
  const { items, total, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })
  const [placing, setPlacing] = useState(false)

  if (items.length === 0) return <Navigate to="/cart" replace />

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPlacing(true)
    try {
      await api.post("/order", {
        items: items.map((i) => ({ product: i._id, qty: i.qty })),
        shipping: form,
      })
      // remember phone and address for next time. not important if it fails
      api.patch("/auth/me", { phone: form.phone, address: form.address })
        .then((res) => setUser(res.data.result))
        .catch(() => {})

      toast.success("Order placed")
      navigate("/orders")
      clear()
    } catch (error) {
      toast.error(errMsg(error))
      setPlacing(false)
    }
  }

  return (
    <div className="container page">
      <h1>Checkout</h1>
      <div className="checkout">
        <form onSubmit={handleSubmit} className="form">
          <h2>Delivery details</h2>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="address">Delivery address</label>
            <textarea id="address" name="address" rows="3" value={form.address} onChange={handleChange} required />
          </div>
          <p className="muted">Payment: cash on delivery.</p>
          <button className="btn" disabled={placing}>{placing ? "Placing order..." : "Place order"}</button>
        </form>

        <div>
          <h2>Your order</h2>
          <table>
            <tbody>
              {items.map((i) => (
                <tr key={i._id}>
                  <td>{i.name} x {i.qty}</td>
                  <td className="right">{money(i.price * i.qty)}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td className="right"><strong>{money(total)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Checkout
