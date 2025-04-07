import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    address: "",
    profilePicture: "",
    dateOfBirth: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});
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
        setErrors(data.errors || {});
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

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
          {errors.emailAddress && (
            <p style={{ color: "red" }}>{errors.emailAddress}</p>
          )}
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
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Profile Picture URL</label>
          <input
            type="text"
            name="profilePicture"
            placeholder="Enter URL for profile picture"
            value={formData.profilePicture}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
