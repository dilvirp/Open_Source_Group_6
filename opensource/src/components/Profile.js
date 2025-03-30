import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.warn("No token found. Redirecting to login...");
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5189/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.warn("Token expired or invalid. Redirecting to login...");
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }

          const contentType = response.headers.get("content-type");
          let errorMessage = `Error ${response.status}: ${response.statusText}`;

          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          }

          throw new Error(errorMessage);
        }

        const data = await response.json();
        if (!data) throw new Error("Profile data is empty");

        setProfile(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2 className="heading">User Profile</h2>
      
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-image">
          <img
            src={profile.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        </div>

        <div className="profile-details">
          <p><strong>Full Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.emailAddress}</p>
          <p><strong>Phone Number:</strong> {profile.phoneNumber || "N/A"}</p>
          <p><strong>Address:</strong> {profile.address || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {profile.dateOfBirth || "N/A"}</p>
          <p><strong>Bio:</strong> {profile.bio || "No bio provided."}</p>
        </div>

        {/* Edit Profile Button */}
        <button className="edit-profile-btn" onClick={() => navigate("/update-profile")}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
