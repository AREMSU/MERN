import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReadAllProduct = () => {
  let [products, setProducts] = useState([]);

  let getData = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/product",
        method: "get",
      });

      setProducts(result.data.result);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error(error.response?.data?.message || "Failed to load products");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {products.map((value, i) => {
        return (
          <div
            style={{ border: "solid red 1px", marginBottom: "10px", padding: "10px" }}
          >
            <p>Product Name: {value.name}</p>
            <p>Price: {value.price}</p>
            <p>Avaliable Quantity: {value.quantity}</p>
            <p>Description: {value.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReadAllProduct;