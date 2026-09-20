import React, { useState } from 'react'

const CreateProduct = () => {
  let [name, setName] = useState("")
  let [price, setPrice] = useState("")
  let [quantity, setQuantity] = useState("")
  let [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    let data = {
      name: name,
      price: price,
      quantity: quantity,
      description: description,
    }
    console.log(data)
  }

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