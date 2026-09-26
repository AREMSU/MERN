import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/product/${id}`);
        setFormData(res.data.result);
      } catch (err) {
        toast.error("Error fetching product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/product/${id}`, formData);
      toast.success("Product updated successfully!");
      navigate("/product");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "400px" }}>
      <h3>Edit Product</h3>
      <div>
        <label>Name: </label>
        <input name="name" value={formData.name} type="text" onChange={handleChange} />
      </div>
      <div>
        <label>Price: </label>
        <input name="price" value={formData.price} type="number" onChange={handleChange} />
      </div>
      <div>
        <label>Quantity: </label>
        <input name="quantity" value={formData.quantity} type="number" onChange={handleChange} />
      </div>
      <div>
        <label>Description: </label>
        <textarea name="description" value={formData.description} type="textarea" onChange={handleChange} />
      </div>
      <button type="submit" style={{ marginTop: "10px" }}>Save Changes</button>
    </form>
  );
};

export default UpdateProduct;