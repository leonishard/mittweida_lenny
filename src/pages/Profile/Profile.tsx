import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import './Profile.css';
import { useAuth } from "../../components/AuthContext.tsx";
import axios from 'axios';
import {API_BASE_URL} from "../../config.ts";

const Profile: React.FC = () => {
    const { isLoggedIn, username, logout } = useAuth();
    const [navigate] = useLocation();
    const [localLikedItems, setLocalLikedItems] = useState<any[]>([]);
    const [backendLikedItems, setBackendLikedItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            // @ts-ignore
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const loadBackendLikes = async () => {
        if (!username) return;
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/items/${username}`);
            console.log('✅ Loaded from backend:', response.data);
            if (Array.isArray(response.data)) {
                setBackendLikedItems(response.data);
            } else if (response.data.success && Array.isArray(response.data.data)) {
                setBackendLikedItems(response.data.data);
            } else {
                console.warn('⚠️ Unexpected backend format:', response.data);
            }
        } catch (error) {
            console.error('❌ Backend load failed, falling back to localStorage:', error);
            loadLocalStorageLikes();
        } finally {
            setLoading(false);
        }
    };

    const loadLocalStorageLikes = () => {
        if (username) {
            const savedLikes = localStorage.getItem(`likes_${username}`);
            setLocalLikedItems(savedLikes ? JSON.parse(savedLikes) : []);
        }
    };

    useEffect(() => {
        if (username) {
            loadBackendLikes();
            loadLocalStorageLikes();
            const interval = setInterval(loadBackendLikes, 10000);
            return () => clearInterval(interval);
        }
    }, [username]);

    const [, setLocation] = useLocation();
    const handleLogout = () => {
        logout();
        setLocation('/');
    };

    const handleRemoveLike = async (itemId: number, type: 'food' | 'history') => {
        if (!username) return;

        console.log('🧪 Attempting to remove:', { itemId, type });

        try {
            const backendItem = backendLikedItems.find(
                item => (item.itemId === itemId || item.id === itemId) && item.type === type
            );

            if (backendItem && backendItem.id) {
                console.log('📤 Sending DELETE to backend for id:', backendItem.id);
                const res = await axios.delete(`${API_BASE_URL}/api/items/${backendItem.id}`);
                console.log('✅ Backend delete response:', res.data);

                setBackendLikedItems(prev =>
                    prev.filter(item => item.id !== backendItem.id)
                );
            }

            const updatedLocalLikes = localLikedItems.filter(
                item => !(item.id === itemId && item.type === type)
            );
            localStorage.setItem(`likes_${username}`, JSON.stringify(updatedLocalLikes));
            setLocalLikedItems(updatedLocalLikes);

        } catch (error) {
            console.error('❌ Failed to remove item:', error);
        }
    };

    const displayItems = backendLikedItems.length > 0 ? backendLikedItems : localLikedItems;

    const normalizedItems = displayItems.map(item => ({
        id: item.itemId || item.id,
        name: item.itemName || item.name,
        type: item.type,
        likedAt: item.likedAt
    }));

    const foodLikes = normalizedItems.filter(item => item.type === 'food');
    const historyLikes = normalizedItems.filter(item => item.type === 'history');


    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">{username?.charAt(0).toUpperCase()}</div>
                    <div className="profile-info">
                        <h2 className="profile-name">{username}</h2>
                        <p className="profile-status">
                            {backendLikedItems.length > 0 ? 'Synced with Backend' : 'Local Data Only'}
                            {loading && ' • Loading...'}
                        </p>
                    </div>
                    <button className="logout-button-header" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <h3>Account Summary</h3>
                        <div className="summary-stats">
                            <div className="stat-item">
                                <span className="stat-number">{normalizedItems.length}</span>
                                <span className="stat-label">Total Likes</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{foodLikes.length}</span>
                                <span className="stat-label">Food Places</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{historyLikes.length}</span>
                                <span className="stat-label">Historical Sites</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3>My Preferences</h3>

                        {loading && <p>🔄 Loading your preferences...</p>}

                        <div className="preferences-tabs">
                            <div className="preference-category">
                                <h4 className="category-title">🍽️ Food Preferences</h4>
                                {foodLikes.length > 0 ? (
                                    <div className="preference-items">
                                        {foodLikes.map(item => (
                                            <div key={`food-${item.id}`} className="preference-card">
                                                <div className="preference-content">
                                                    <span className="preference-icon">🍽️</span>
                                                    <span className="preference-name">{item.name}</span>
                                                </div>
                                                <button
                                                    className="remove-button"
                                                    onClick={() => handleRemoveLike(item.id, 'food')}
                                                    disabled={loading}
                                                    title="Remove from favorites"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-preferences">
                                        <p>No food preferences yet</p>
                                        <small>Swipe right on the Food page to add favorites</small>
                                    </div>
                                )}
                            </div>

                            <div className="preference-category">
                                <h4 className="category-title">🏛️ History Preferences</h4>
                                {historyLikes.length > 0 ? (
                                    <div className="preference-items">
                                        {historyLikes.map(item => (
                                            <div key={`history-${item.id}`} className="preference-card">
                                                <div className="preference-content">
                                                    <span className="preference-icon">🏛️</span>
                                                    <span className="preference-name">{item.name}</span>
                                                </div>
                                                <button
                                                    className="remove-button"
                                                    onClick={() => handleRemoveLike(item.id, 'history')}
                                                    disabled={loading}
                                                    title="Remove from favorites"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-preferences">
                                        <p>No history preferences yet</p>
                                        <small>Swipe right on the History page to add favorites</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
