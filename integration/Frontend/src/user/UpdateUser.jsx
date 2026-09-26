import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fixed: Initialized state with user schema fields instead of product properties
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fixed: Swapped route to target user endpoint
        const res = await axios.get(`http://localhost:8000/user/${id}`);
        setFormData(res.data.result);
      } catch (err) {
        toast.error("Error fetching user data");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fixed: Updates user data using the PATCH request structure
      await axios.patch(`http://localhost:8000/user/${id}`, formData);
      toast.success("User updated successfully!");
      navigate("/user");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "400px" }}>
      <h3>Edit User</h3>
      <div>
        <label>Name: </label>
        <input name="name" value={formData.name} type="text" onChange={handleChange} />
      </div>
      <div>
        <label>Email: </label>
        <input name="email" value={formData.email} type="email" onChange={handleChange} />
      </div>
      <div>
        <label>Password: </label>
        <input name="password" value={formData.password} type="password" onChange={handleChange} />
      </div>
      <div>
        <label>Address: </label>
        <input name="address" value={formData.address} type="text" onChange={handleChange} />
      </div>
      <div>
        <label>Phone: </label>
        <input name="phone" value={formData.phone} type="number" onChange={handleChange} />
      </div>
      <button type="submit" style={{ marginTop: "10px" }}>Save Changes</button>
    </form>
  );
};

export default UpdateUser;
