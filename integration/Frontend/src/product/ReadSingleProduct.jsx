import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ReadSingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/product/${id}`);
        setProduct(res.data.result);
      } catch (err) {
        toast.error("Failed to load product details");
      }
    };
    getProduct();
  }, [id]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <button onClick={() => navigate("/product")} style={{ marginBottom: "15px" }}>
        ← Back to Products
      </button>

      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h2>{product.name}</h2>
        <hr />
        <p><strong>Product ID:</strong> {product._id}</p>
        <p><strong>Price:</strong> Rs.{product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity} units</p>
        <p><strong>Description:</strong> {product.description}</p>
        
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={() => navigate(`/product/update/${id}`)}>Edit</button>
          <button onClick={() => navigate("/product")}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleProduct;