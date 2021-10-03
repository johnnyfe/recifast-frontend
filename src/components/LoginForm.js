import React from 'react';
import { useState } from 'react'
import { BASE_URL } from '../constrains';

function LoginForm({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(BASE_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
    return (
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text"id="username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label>Password:</label>
            <input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
            {/* {errors.map((error) => (<p key={error.id}>{error}</p>))} */}
        </form>
    );
}

export default LoginForm;