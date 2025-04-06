import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({ emailAddress: "", password: "" });
  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
        setErrors({
          emailAddress: data.errors?.EmailAddress
            ? data.errors.EmailAddress[0]
            : "",
          password: data.errors?.Password ? data.errors.Password[0] : "",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        emailAddress: "",
        password: "",
      });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errors.emailAddress && (
        <p style={{ color: "red" }}>{errors.emailAddress}</p>
      )}
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      <form onSubmit={submitForm}>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="emailAddress"
            placeholder="Enter your email"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
