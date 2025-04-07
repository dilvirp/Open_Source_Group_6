import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/UpdateProfile.css";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    address: "",
    profilePicture: "",
    dateOfBirth: "",
    bio: "",
    emailAddress: "",
    password: "",
    updatedAt: new Date().toISOString()  // Added timestamp
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5189/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setFormData(prevState => ({
          ...prevState,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          profilePicture: data.profilePicture || "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : "",
          bio: data.bio || "",
          emailAddress: data.emailAddress || "",
        }));
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      updatedAt: new Date().toISOString() // Update timestamp on each change
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Format date fields for backend
      const formattedData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
        updatedAt: new Date().toISOString(),
        updatedBy: "KPatel6272" // Current user's login
      };

      const response = await fetch("http://localhost:5189/api/auth/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        
        if (responseData.errors) {
          const errorMessages = Object.values(responseData.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        
        throw new Error(responseData.title || "Failed to update profile");
      }

      // Successfully updated, navigate to profile page
      navigate("/profile");
      
    } catch (err) {
      console.error("Update profile error:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container"><p className="loading">Loading...</p></div>;
  }

  return (
    <div className="container">
      <h2 className="heading">Update Profile</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Profile Picture URL</label>
          <input
            type="url"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            placeholder="Enter profile picture URL"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="4"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password to confirm changes"
            required
            disabled={isSubmitting}
          />
          <small className="helper-text">Required to confirm your changes</small>
        </div>

        <div className="form-group">
          <small className="update-info">
            Last updated: {new Date(formData.updatedAt).toLocaleString()}
          </small>
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={() => navigate("/profile")}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;