import React from "react";
import { Link } from "react-router-dom";

function NavBar()
{
    return(
        <div className="nav_bar">
           <nav>
            <a href="/login">Login</a>
            <a href="/Home">Home</a>
            <a href="/Signup">Sign up</a>
            </nav> 
        </div>
    )
}

export default NavBar;