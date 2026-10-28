import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import ProductCard from "../components/ProductCard"

// the shop page. search, category, sort and page live in the url so links and the back button work
const ReadAllProduct = () => {
  const [params, setParams] = useSearchParams()
  const q = params.get("q") || ""
  const category = params.get("category") || ""
  const sort = params.get("sort") || "newest"
  const page = Number(params.get("page")) || 1

  const [data, setData] = useState({ result: [], total: 0, pages: 1, key: null })
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState(q)

  useEffect(() => {
    api.get("/product/categories").then((res) => setCategories(res.data.result)).catch(() => {})
  }, [])

  // data remembers which query it belongs to, so we know when a new one is still loading
  const key = `${q}|${category}|${sort}|${page}`
  const loading = data.key !== key

  useEffect(() => {
    api.get("/product", { params: { q, category, sort, page, limit: 12 } })
      .then((res) => setData({ ...res.data, key }))
      .catch((error) => {
        toast.error(errMsg(error))
        setData({ result: [], total: 0, pages: 1, key })
      })
  }, [q, category, sort, page, key])

  const update = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    if (!("page" in changes)) next.delete("page") // a new filter starts from page 1
    setParams(next)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    update({ q: search.trim() })
  }

  return (
    <div className="container page">
      <h1>Shop</h1>

      <div className="filters">
        <form onSubmit={handleSearch} className="row">
          <input
            type="search"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
          <button className="btn">Search</button>
        </form>
        <div className="row">
          <select value={category} onChange={(e) => update({ category: e.target.value })} aria-label="Category">
            <option value="">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => update({ sort: e.target.value })} aria-label="Sort by">
            <option value="newest">Newest</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : data.result.length === 0 ? (
        <p>No products match your search. <button className="link-button" onClick={() => setParams({})}>Clear filters</button></p>
      ) : (
        <>
          <p className="muted small">{data.total} {data.total === 1 ? "product" : "products"}</p>
          <div className="grid">
            {data.result.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
          {data.pages > 1 && (
            <div className="row pager">
              <button className="btn secondary" disabled={page <= 1} onClick={() => update({ page: page - 1 })}>Previous</button>
              <span>Page {page} of {data.pages}</span>
              <button className="btn secondary" disabled={page >= data.pages} onClick={() => update({ page: page + 1 })}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ReadAllProduct
