import React from 'react';
import phone from "../images/phone-mockup.png"

function HomePage() {
    return (
        <div className="homepage">
            <img src ={phone} alt="phone-mockup"></img>
            <h1>ReciFast</h1>
            <h4>Welcome to the social media of recipes</h4>
            <h4>Where you can create your own recipes</h4>
            <h4>Share and Enjoy</h4>
            <h4>Help others to make delicious food at home</h4>
        </div>
    );
}

export default HomePage;