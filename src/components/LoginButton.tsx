// src/components/LoginButton.tsx
import React from 'react';
import { useLocation } from 'wouter'; // ✅ Changed from react-router-dom to wouter
import './LoginButton.css';
import { useAuth } from "./AuthContext.tsx";

const LoginButton: React.FC = () => {
    const { isLoggedIn, username, logout } = useAuth();
    const [location, navigate] = useLocation(); // ✅ Wouter's useLocation returns [location, navigate]

    const handleLoginClick = () => {
        navigate('/login'); // ✅ Same navigation, just from wouter
    };

    // If logged in, show user info and logout
    if (isLoggedIn) {
        return (
            <div className="user-section">
                <div className="user-info">
                    <div className="user-avatar">
                        {username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                        <span className="user-name">Welcome, {username}!</span>
                        <button className="logout-button" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // If not logged in, show login button
    return (
        <div className="login-section">
            <button className="home-login-button" onClick={handleLoginClick}>
                <span className="login-icon">👤</span>
                Sign In
            </button>
        </div>
    );
};

export default LoginButton;