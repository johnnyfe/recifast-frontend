import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/Recifast-Logo.png"
import "../style/Navbar.css"

function NavBar() {
    
    return (
        <div className="navbar">
                <img className="logo-image" src={logo} alt="recifast-logo"></img>
            <ul>
                <li><a><Link to="/">Homepage</Link></a></li>
                <li><a><Link to="/recipes">Recipes</Link></a></li>
                <li><a><Link to="/ingredients">Ingredients</Link></a></li>
            </ul>
        </div>
    );
}

export default NavBar;

