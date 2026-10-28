import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { money } from "../config"

const Cart = () => {
  const { items, setQty, remove, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container page">
        <h1>Cart</h1>
        <p>Your cart is empty. <Link to="/product">Browse the shop</Link>.</p>
      </div>
    )
  }

  return (
    <div className="container page">
      <h1>Cart</h1>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id}>
                <td><Link to={`/product/${i._id}`}>{i.name}</Link></td>
                <td>{money(i.price)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max={i.stock}
                    value={i.qty}
                    onChange={(e) => setQty(i._id, Number(e.target.value))}
                    className="qty"
                    aria-label={`Quantity for ${i.name}`}
                  />
                </td>
                <td>{money(i.price * i.qty)}</td>
                <td><button className="link-button danger" onClick={() => remove(i._id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <p>Total: <strong>{money(total)}</strong></p>
        <button className="btn" onClick={() => navigate("/checkout")}>Go to checkout</button>
      </div>
    </div>
  )
}

export default Cart
