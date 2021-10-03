import React, { useState } from 'react';
import { BASE_URL } from '../constrains';

function SignupForm({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(BASE_URL + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        bio,
      }),
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
        <div>
            <label>Username:</label>
            <input type="text"id="username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label>Password:</label>
            <input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label>Password Confirmation:</label>
            <input type="password" id="password_confirmation" autoComplete="current-password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
            <label>Profile Image:</label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
            <label>Bio:</label>
            <input type="text" id="bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
            <label>Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            <button type="submit">{isLoading ? "Loading..." : "Singup"}</button>
            {/* {errors.map((error) => (<p key={error.id}>{error}</p>))} */}
        </div>
    );
}

export default SignupForm;