import React, { useState } from 'react'

const CreateUser = () => {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [address, setAddress] = useState("")
  let [phone, setPhone] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    let data = {
      name: name,
      email: email,
      password: password,
      address: address,
      phone: phone,
    }
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name</label>
          <input type="text"
            onChange={(e) => {
              setName(e.target.value)
            }
            }
            value={name}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }
            }
            value={email}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }
            }
            value={password}></input>
        </div>
        <div>
          <label>Address</label>
          <input type="text"
            onChange={(e) => {
              setAddress(e.target.value)
            }
            }
            value={address}></input>
        </div>
        <div>
          <label>Phone</label>
          <input type="number"
            onChange={(e) => {
              setPhone(e.target.value)
            }
            }
            value={phone}></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}
export default CreateUser