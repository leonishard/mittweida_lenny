// src/components/Login.tsx
import React, { useState } from 'react';
import { useLocation } from 'wouter'; // ✅ Changed from react-router-dom to wouter
import './Login.css';
import { useAuth } from "./AuthContext.tsx";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const [location, navigate] = useLocation(); // ✅ Wouter's useLocation returns [location, navigate]

    // Simple hardcoded users - you can expand this easily
    const validUsers = [
        { username: 'admin', password: 'admin123' },
        { username: 'user', password: 'password' },
        { username: 'guest', password: 'guest' },
        { username: 'demo', password: 'demo' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate loading time
        setTimeout(() => {
            const user = validUsers.find(
                u => u.username === username && u.password === password
            );

            if (user) {
                login(username);
                navigate('/'); // ✅ Navigate back to home after login (same syntax)
            } else {
                setError('Invalid username or password');
            }
            setIsLoading(false);
        }, 500);
    };

    const handleBack = () => {
        navigate('/'); // ✅ Same navigation, just from wouter
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <button className="back-button" onClick={handleBack}>
                        ← Back
                    </button>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="demo-credentials">
                    <p>Demo credentials:</p>
                    <div className="credentials-list">
                        <span>admin / admin123</span>
                        <span>user / password</span>
                        <span>guest / guest</span>
                        <span>demo / demo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;