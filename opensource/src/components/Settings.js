import { useState } from 'react';
import '../components/Settings.css';

function Settings() {
    const [notifications, setNotifications] = useState(true);

    const toggleNotifications = () => {
        setNotifications(!notifications);
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <div className="profile-section">
                <h3>User Profile</h3>
                <p><strong>Username:</strong> JohnDoe</p>
                <p><strong>Email:</strong> johndoe@example.com</p>
            </div>
            
            <div className="deals-section">
                <h3>Exclusive Deals</h3>
                <ul>
                    <li>50% off on new arrivals</li>
                    <li>Buy 1 Get 1 Free on selected books</li>
                    <li>Free shipping for premium members</li>
                </ul>
            </div>
            
            <div className="notification-section">
                <h3>Notifications</h3>
                <label>
                    <input type="checkbox" checked={notifications} onChange={toggleNotifications} />
                    Enable Notifications
                </label>
            </div>
            
            <button className="logout-button">Logout</button>
        </div>
    );
}

export default Settings;
