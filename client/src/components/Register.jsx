import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  if (user) {
    navigate("/");
  }

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
