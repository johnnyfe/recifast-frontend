import React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Login({onLogin}) {

    const [showLogin, setShowLogin] = useState(true);

    
    return (
        <div>
            <h1>Recifast</h1>
            {showLogin ? (
                <>
                <LoginForm onLogin={onLogin}/>
                <button onClick={()=> setShowLogin(false)}>Signup</button>
                </>
            ): (
                <>
                <SignupForm onLogin={onLogin}/>
                <button onClick={()=> setShowLogin(true)}>Login</button>
                </>
            )}
        </div>
    );
}

export default Login;