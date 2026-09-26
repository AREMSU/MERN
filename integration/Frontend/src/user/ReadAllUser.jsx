import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReadAllUser = () => {
  let [users, setUsers] = useState([]);
  let navigate = useNavigate();

  let getData = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/user",
        method: "get",
      });

      setUsers(result.data.result);
    } catch (error) {
      console.error("Failed to fetch Users:", error);
      toast.error(error.response?.data?.message || "Failed to load Users");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8000/user/${id}`);
      toast.success("User deleted successfully");
      getData(); // Refresh user list instantly
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => navigate("/user/create")} style={{ margin: "10px" }}>
          Create
        </button>
      </div>
      {users.map((value) => (
        <div key={value._id} style={{ border: "solid red 1px", marginBottom: "10px", padding: "10px" }}>
          <p>User Name: {value.name}</p>
          <p>Email: {value.email}</p>
          <p>Password: {value.password}</p>
          <p>Address: {value.address}</p>
          <p>Phone: {value.phone}</p>

          <button style={{ marginRight: "10px" }} onClick={() => navigate(`/user/${value._id}`)}>
            View Details
          </button>
          <button style={{ marginRight: "10px" }} onClick={() => navigate(`/user/update/${value._id}`)}>
            Edit
          </button>
          <button style={{ marginRight: "10px", backgroundColor: "#ff4d4d", color: "white" }} onClick={() => handleDelete(value._id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReadAllUser;
