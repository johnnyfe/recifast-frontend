import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    
    return (
        <div className="navbar">
            <Link to="/">Recifast</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/ingredients">Ingredients</Link>
        </div>
    );
}

export default NavBar;