import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api, { errMsg } from "../api"
import ProductForm from "./ProductForm"

const CreateProduct = () => {
  const navigate = useNavigate()

  const handleSave = async (data) => {
    try {
      await api.post("/product", data)
      toast.success("Product created")
      navigate("/admin/product")
    } catch (error) {
      toast.error(errMsg(error))
    }
  }

  return (
    <div className="container page narrow">
      <h1>Add product</h1>
      <ProductForm onSave={handleSave} submitLabel="Create product" />
    </div>
  )
}

export default CreateProduct
