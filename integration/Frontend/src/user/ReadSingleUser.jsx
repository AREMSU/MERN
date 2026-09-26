import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ReadSingleUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/user/${id}`);
        setUser(res.data.result);
      } catch (err) {
        toast.error("Failed to load user details");
      }
    };
    getUser();
  }, [id]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <button onClick={() => navigate("/user")} style={{ marginBottom: "15px" }}>
        ← Back to Users
      </button>

      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h2>{user.name}</h2>
        <hr />
        {/* Fixed: Replaced product fields with user schema properties */}
        <p><strong>User ID:</strong> {user._id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={() => navigate(`/user/update/${id}`)}>Edit</button>
          <button onClick={() => navigate("/user")}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleUser;
