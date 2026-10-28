import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { money } from "../config"

const ReadSingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    api.get(`/product/${id}`)
      .then((res) => setProduct(res.data.result))
      .catch((error) => {
        toast.error(errMsg(error))
        navigate("/product")
      })
  }, [id, navigate])

  if (!product) return <div className="container page muted">Loading...</div>

  const inStock = product.quantity > 0

  const handleAdd = () => {
    add(product, qty)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="container page">
      <p><Link to="/product">Back to shop</Link></p>
      <div className="detail">
        <div className="detail-image">
          {product.image ? <img src={product.image} alt={product.name} /> : <span>{product.name.charAt(0)}</span>}
        </div>
        <div>
          <div className="small muted">{product.category}</div>
          <h1>{product.name}</h1>
          <p className="price">{money(product.price)}</p>
          <p>{product.description}</p>
          <p className="muted">{inStock ? `${product.quantity} in stock` : "Out of stock"}</p>

          {inStock && (
            <div className="row">
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(Number(e.target.value) || 1, product.quantity)))}
                className="qty"
                aria-label="Quantity"
              />
              <button className="btn" onClick={handleAdd}>Add to cart</button>
            </div>
          )}

          {user?.role === "admin" && (
            <p><Link to={`/admin/product/update/${product._id}`}>Edit this product</Link></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReadSingleProduct
