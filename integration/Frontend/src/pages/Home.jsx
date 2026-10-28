import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import ProductCard from "../components/ProductCard"
import { STORE_NAME } from "../config"

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.get("/product", { params: { limit: 8 } }), api.get("/product/categories")])
      .then(([p, c]) => {
        setProducts(p.data.result)
        setCategories(c.data.result)
      })
      .catch((error) => toast.error(errMsg(error)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container page">
      <section className="intro">
        <h1>{STORE_NAME}</h1>
        <p>Everyday items for study, work and home. Order online and pay when it arrives.</p>
      </section>

      {categories.length > 0 && (
        <section>
          <h2>Categories</h2>
          <div className="row">
            {categories.map((c) => (
              <Link key={c} className="btn secondary" to={`/product?category=${encodeURIComponent(c)}`}>{c}</Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2>Newest products</h2>
        {loading ? (
          <p className="muted">Loading...</p>
        ) : products.length === 0 ? (
          <p className="muted">No products yet.</p>
        ) : (
          <div className="grid">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
        <p><Link to="/product">See all products</Link></p>
      </section>
    </div>
  )
}

export default Home
