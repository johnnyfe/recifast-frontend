import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/Recifast-Logo.png"
import "../style/Navbar.css"

function NavBar() {
    
    return (
        <div className="navbar">
                <img className="logo-image" src={logo} alt="recifast-logo"></img>
            <ul>
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/ingredients">Ingredients</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;

