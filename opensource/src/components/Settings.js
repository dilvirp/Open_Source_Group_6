import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Settings.css";

function Settings() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the provided path
  };

  return (
    <div className="settings-container">
      <h2 className="settings-header">Settings</h2>
      <div className="settings-options">
        {/* Profile Option */}
        <div
          className="settings-option"
          onClick={() => handleNavigation("/profile")} // Add navigation to Profile page
        >
          <p>Profile</p>
          <div className="settings-description">
            View and update your profile information.
          </div>
        </div>
        <div
          className="settings-option"
          onClick={() => handleNavigation("/display-settings")}
          role="button"
          tabIndex="0"
        >
          <p>Display Settings</p>
          <div className="settings-description">
            Customize your theme preferences.
          </div>
        </div>
        <div
          className="settings-option"
          onClick={() => handleNavigation("/add-book")} // Navigate to Add New Book page
          role="button"
          tabIndex="0"
        >
          <p>Add New Book</p>
          <div className="settings-description">
            Add a new book to your collection.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
