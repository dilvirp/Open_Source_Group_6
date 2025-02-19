import React from "react";
import { Link } from "react-router-dom";


function NavBar() {
    return (
        <div className="nav_bar">
            <nav>
                <Link to="/home">Home</Link>
            </nav>
        </div>
    );
}

export default NavBar;