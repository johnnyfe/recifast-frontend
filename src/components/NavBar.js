import React from 'react';
import { BASE_URL } from '../constrains';
import { Link } from 'react-router-dom';

function NavBar({user, setUser}) {

    function handleLogoutClick() {
        fetch(BASE_URL + "logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setUser(null);
            }
          });
    }
    return (
        <div>
            <Link to="/">Recifast</Link>
            <button  to="/new">New Recipe</button>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
}

export default NavBar;