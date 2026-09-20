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
        <button>Submit</button>
      </form>
    </div>
  )
}

export default CreateProduct