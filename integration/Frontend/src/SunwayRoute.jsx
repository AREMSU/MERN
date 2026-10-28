import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./user/Login"
import Register from "./user/Register"
import ReadAllUser from "./user/ReadAllUser"
import ReadAllProduct from "./product/ReadAllProduct"
import ReadSingleProduct from "./product/ReadSingleProduct"
import CreateProduct from "./product/CreateProduct"
import UpdateProduct from "./product/UpdateProduct"
import AdminProduct from "./product/AdminProduct"
import Cart from "./cart/Cart"
import Checkout from "./cart/Checkout"
import MyOrders from "./order/MyOrders"
import AdminOrder from "./order/AdminOrder"

const SunwayRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/product" element={<ReadAllProduct />} />
      <Route path="/product/:id" element={<ReadSingleProduct />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

      <Route path="/admin/product" element={<ProtectedRoute admin><AdminProduct /></ProtectedRoute>} />
      <Route path="/admin/product/create" element={<ProtectedRoute admin><CreateProduct /></ProtectedRoute>} />
      <Route path="/admin/product/update/:id" element={<ProtectedRoute admin><UpdateProduct /></ProtectedRoute>} />
      <Route path="/admin/order" element={<ProtectedRoute admin><AdminOrder /></ProtectedRoute>} />
      <Route path="/admin/user" element={<ProtectedRoute admin><ReadAllUser /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default SunwayRoute
