import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/Recifast-Logo.png"

function NavBar() {
    
    return (
        <div className="navbar">
            <Link to="/"><img src={logo} alt="recifast-logo"></img></Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/ingredients">Ingredients</Link>
        </div>
    );
}

export default NavBar;

