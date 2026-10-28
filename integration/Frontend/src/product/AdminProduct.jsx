import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import { money } from "../config"

const AdminProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    api.get("/product", { params: { limit: 48 } })
      .then((res) => setProducts(res.data.result))
      .catch((error) => toast.error(errMsg(error)))
      .finally(() => setLoading(false))
  }, [refresh])

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This can't be undone.`)) return
    try {
      await api.delete(`/product/${product._id}`)
      toast.success("Product deleted")
      setRefresh((n) => n + 1)
    } catch (error) {
      toast.error(errMsg(error))
    }
  }

  return (
    <div className="container page">
      <div className="between">
        <h1>Products</h1>
        <button className="btn" onClick={() => navigate("/admin/product/create")}>Add product</button>
      </div>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : products.length === 0 ? (
        <p>No products yet. Add your first product to start selling.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td><Link to={`/product/${p._id}`}>{p.name}</Link></td>
                  <td>{p.category}</td>
                  <td>{money(p.price)}</td>
                  <td>{p.quantity}</td>
                  <td className="actions">
                    <Link to={`/admin/product/update/${p._id}`}>Edit</Link>
                    <button className="link-button danger" onClick={() => handleDelete(p)}>Delete</button>
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

export default AdminProduct
