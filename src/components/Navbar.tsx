// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter'; // ✅ Changed from react-router-dom to wouter
import './Navbar.css';
import { useAuth } from "./AuthContext.tsx";

const Navbar: React.FC = () => {
    const [location, navigate] = useLocation(); // ✅ Wouter's useLocation returns [location, navigate]
    const { isLoggedIn, username, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleUserIconClick = () => {
        if (!isLoggedIn) {
            navigate('/login'); // ✅ Same navigation function, just from wouter
        } else {
            setDropdownOpen(!dropdownOpen);
        }
    };

    const handleProfileClick = () => {
        setDropdownOpen(false);
        navigate('/profile'); // ✅ Wouter navigation
    };

    const handleLogoutClick = () => {
        setDropdownOpen(false);
        logout();
    };

    const isActive = (path: string) => {
        return location === path; // ✅ Wouter location is just a string, not an object
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-links">
                    <Link
                        href="/" // ✅ Changed 'to' to 'href' for wouter
                        className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/map" // ✅ Changed 'to' to 'href' for wouter
                        className={`navbar-link ${isActive('/map') ? 'active' : ''}`}
                    >
                        Map
                    </Link>
                    <Link
                        href="/history" // ✅ Changed 'to' to 'href' for wouter
                        className={`navbar-link ${isActive('/history') ? 'active' : ''}`}
                    >
                        History
                    </Link>
                    <Link
                        href="/food" // ✅ Changed 'to' to 'href' for wouter
                        className={`navbar-link ${isActive('/food') ? 'active' : ''}`}
                    >
                        Food
                    </Link>
                </div>

                <div className="navbar-user" ref={dropdownRef}>
                    <button
                        className="user-icon-button"
                        onClick={handleUserIconClick}
                    >
                        {isLoggedIn ? (
                            <div className="user-avatar-nav">
                                {username?.charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <div className="login-icon-nav">
                                👤
                            </div>
                        )}
                    </button>

                    {isLoggedIn && dropdownOpen && (
                        <div className="user-dropdown">
                            <div className="dropdown-header">
                                <div className="dropdown-user-info">
                                    <div className="dropdown-avatar">
                                        {username?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="dropdown-username">{username}</span>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-options">
                                <button
                                    className="dropdown-option"
                                    onClick={handleProfileClick}
                                >
                                    <span className="option-icon">👤</span>
                                    Go to Profile
                                </button>
                                <button
                                    className="dropdown-option logout"
                                    onClick={handleLogoutClick}
                                >
                                    <span className="option-icon">🚪</span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;