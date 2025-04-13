import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";
import "../Styles/DisplaySettings.css";

function DisplaySettings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

 

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

  return (
    <div className="display-settings-wrapper">
      <div className="container">
        <h2>Display Settings</h2>
        
        <div className="settings-section">
          <h3>Theme</h3>
          <div className="setting-option">
            <label htmlFor="theme-select">Select Theme:</label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="theme-select"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>
        </div>

        <div className="settings-info">
          <p>Current Date and Time : {formattedTime}</p>
        
        </div>
      </div>
    </div>
  );
}

export default DisplaySettings;