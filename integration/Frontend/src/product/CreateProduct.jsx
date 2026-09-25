import React, { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify'

const CreateProduct = () => {
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [quantity, setQuantity] = useState("");
  let [description, setDescription] = useState("");

  // Add async right before the function parameter
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      name: name,
      price: price,
      quantity: quantity,
      description: description,
    };

    try {
      let result = await axios({
        url: "http://localhost:8000/product", // Fixed URL protocol
        method: "post", // Method should be a string
        data: data,
      });

      console.log(result);

      // Reset form on success
      setName("");
      setPrice("");
      setQuantity("");
      setDescription("");

      toast.success("Product created sucessfully")
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  /* 
  send data to backend through api

  url = localhost:8000/product
  <product>method = post
  */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input type="text"
            onChange={(e) => {
              setName(e.target.value)
            }
            }
            value={name}></input>
        </div>
        <div>
          <label>Price</label>
          <input type="number"
            onChange={(e) => {
              setPrice(e.target.value)
            }
            }
            value={price}></input>
        </div>
        <div>
          <label>Quantity</label>
          <input type="number"
            onChange={(e) => {
              setQuantity(e.target.value)
            }
            }
            value={quantity}></input>
        </div>
        <div>
          <label>Description</label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value)
            }
            }
            value={description}></textarea>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default CreateProduct