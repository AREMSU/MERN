import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import ProductForm from "./ProductForm"

const UpdateProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    api.get(`/product/${id}`)
      .then((res) => setProduct(res.data.result))
      .catch((error) => {
        toast.error(errMsg(error))
        navigate("/admin/product")
      })
  }, [id, navigate])

  const handleSave = async (data) => {
    try {
      await api.patch(`/product/${id}`, data)
      toast.success("Product updated")
      navigate("/admin/product")
    } catch (error) {
      toast.error(errMsg(error))
    }
  }

  if (!product) return <div className="container page muted">Loading...</div>

  return (
    <div className="container page narrow">
      <h1>Edit product</h1>
      <ProductForm initial={product} onSave={handleSave} submitLabel="Save changes" />
    </div>
  )
}

export default UpdateProduct
