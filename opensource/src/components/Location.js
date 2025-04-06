import React, { useState } from "react";
import "../Styles/Location.css";

const locations = [
  {
    id: 1,
    name: "Downtown Bookstore",
    address: "123 Main St, Cityville",
    phone: "(123) 456-7890",
  },
  {
    id: 1,
    name: "Westside Books",
    address: "456 Elm St, Townsville",
    phone: "(987) 654-3210",
  },
  {
    id: 1,
    name: "East End Books",
    address: "789 Oak St, Villagetown",
    phone: "(555) 123-4567",
  },
];

const Location = () => {
  return (
    <div className="location-container">
      <h1>Our Store Locations</h1>
      <div className="location-list">
        {locations.map((location) => (
          <div key={location.id} className="location-card">
            <h2>{location.name}</h2>
            <p>{location.address}</p>
            <p>{location.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
