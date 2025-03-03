import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5189/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Ensure correct format
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            // Handle token expiration or invalid token
            localStorage.removeItem("token");
            navigate("/login"); // Use navigate instead of history.push
            setError("Session expired. Please log in again.");
            return;
          }
          throw new Error(`Failed to load profile: ${errorData.message}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]); // `navigate` is added to the dependency array

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2 className="heading">User Profile</h2>
      <div className="card">
        <p><strong>Email:</strong> {profile.emailAddress}</p>
      </div>
    </div>
  );
};

export default Profile;
