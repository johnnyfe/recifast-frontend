import React from 'react';
import phone from "../images/phone-mockup.png"
import "../style/HomePage.css"

function HomePage() {
    return (
        <div className="homepage">
            <div className="text-box-homepage">
               <div className="details-homepage">
                    <h1>ReciFast</h1>
                    <h3>Welcome to the social media of recipes</h3>
                    <h3>Where you can create your own recipes</h3>
                    <h3>Share and Enjoy</h3>
                    <h3>Help others to make delicious food at home</h3>
                </div>
                <div className="about-homepage">
                    <h2>About</h2>
                    <h3>ReciFast is a great website to learn how to make your favorite recipes without any experience</h3>  
                </div> 
            </div>
            
            <img src ={phone} alt="phone-mockup"></img>
        </div>
    );
}

export default HomePage;