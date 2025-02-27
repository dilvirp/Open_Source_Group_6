import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../components/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({ emailAddress: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submissions
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5189/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful!");
        navigate("/login");
      } else {
        if (data.errors && data.errors.Password) {
          setError(data.errors.Password[0]);
        } else {
          setError(data.title || "Signup failed. Please try again.");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitForm}>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="emailAddress"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
