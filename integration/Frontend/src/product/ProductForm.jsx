import { useState } from "react"
import { useNavigate } from "react-router-dom"

const emptyProduct = { name: "", price: "", quantity: "", category: "", image: "", description: "" }

// used by both CreateProduct and UpdateProduct
const ProductForm = ({ initial = emptyProduct, onSave, submitLabel }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ ...emptyProduct, ...initial })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      name: form.name,
      price: form.price,
      quantity: form.quantity,
      category: form.category || "General",
      image: form.image,
      description: form.description,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label htmlFor="name">Product name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="price">Price (Rs.)</label>
          <input id="price" name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="quantity">Quantity in stock</label>
          <input id="quantity" name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <input id="category" name="category" value={form.category} onChange={handleChange} placeholder="General" />
      </div>
      <div className="field">
        <label htmlFor="image">Image link</label>
        <input id="image" name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://" />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" value={form.description} onChange={handleChange} />
      </div>
      <div className="row">
        <button className="btn">{submitLabel}</button>
        <button type="button" className="btn secondary" onClick={() => navigate("/admin/product")}>Cancel</button>
      </div>
    </form>
  )
}

export default ProductForm
