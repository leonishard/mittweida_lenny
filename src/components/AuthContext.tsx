// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    username: string | null;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    // Check for existing login on mount
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setIsLoggedIn(true);
            setUsername(savedUsername);
        }
    }, []);

    const login = (username: string) => {
        setIsLoggedIn(true);
        setUsername(username);
        localStorage.setItem('username', username);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername(null);
        localStorage.removeItem('username');
    };

    const value = {
        isLoggedIn,
        username,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};