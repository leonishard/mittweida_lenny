// 1. Updated components/FoodTinder.tsx - ADD ONLY 3 LINES
import React from 'react';
import { useState, useRef } from 'react';
import './FoodTinder.css';
import { getRestaurants } from '../../data/locations';

import { useAuth } from "../../components/AuthContext.tsx";
import axios from 'axios';
import { useLocation } from 'wouter';
import type {Restaurant} from "../../types/dataTypes.ts"; // ADD this import

interface FoodTinderProps {
    onShowOnMap?: (restaurant: Restaurant) => void;
}

const FoodTinder = ({ onShowOnMap }: FoodTinderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
    const cardRef = useRef(null);
    const { isLoggedIn} = useAuth();
    const [setLocation] = useLocation(); // ADD this line

    const restaurants = getRestaurants();

    const handleShowOnMap = () => {
        const currentRestaurant = restaurants[currentIndex];

        // Navigate to map with restaurant ID
        // @ts-ignore
        setLocation(`/map?food=${currentRestaurant.id}`); // ADD this line

        if (onShowOnMap) {
            onShowOnMap(currentRestaurant);
        }
        console.log(`Show restaurant ${currentRestaurant.id} on map: ${currentRestaurant.name}`);
    };

    // ... ALL YOUR EXISTING CODE STAYS THE SAME ...
    // (keeping the rest of your component exactly as it is)

    const startX = useRef(0);
    const startY = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        const touch = e.touches[0];
        startX.current = touch.clientX;
        startY.current = touch.clientY;
        setDragOffset(0);
        setSwipeDirection(null);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX.current;
        const deltaY = Math.abs(touch.clientY - startY.current);

        if (deltaY < Math.abs(deltaX)) {
            setDragOffset(deltaX);
            setSwipeDirection(deltaX > 0 ? 'right' : 'left');
        }
    };

    const handleTouchEnd = (_e: React.TouchEvent) => {
        setIsDragging(false);
        const threshold = 80;
        const currentDragOffset = dragOffset;

        if (Math.abs(currentDragOffset) > threshold) {
            const isLike = currentDragOffset > 0;

            if (isLike) {
                const currentRestaurant = restaurants[currentIndex];
                console.log('🍽️ Liked restaurant:', currentRestaurant.name);
                console.log('🔍 Restaurant data:', currentRestaurant);

                if (isLoggedIn) {
                    const username = localStorage.getItem('username');
                    console.log('👤 Username:', username);

                    if (username) {
                        const existingLikes = JSON.parse(localStorage.getItem(`likes_${username}`) || '[]');
                        const newLike = {
                            id: currentRestaurant.id,
                            name: currentRestaurant.name,
                            type: 'food',
                            likedAt: new Date().toISOString()
                        };
                        const alreadyLiked = existingLikes.some(item => item.id === currentRestaurant.id && item.type === 'food');

                        console.log('🔄 Already liked?', alreadyLiked);
                        console.log('📝 Existing likes:', existingLikes);

                        if (!alreadyLiked) {
                            existingLikes.push(newLike);
                            localStorage.setItem(`likes_${username}`, JSON.stringify(existingLikes));
                            console.log('💾 Saved to localStorage');

                            const dataToSend = {
                                userId: username,
                                itemId: currentRestaurant.id,
                                itemName: currentRestaurant.name,
                                type: 'food',
                                likedAt: new Date().toISOString(),
                            };

                            console.log('📤 About to send to backend:', dataToSend);
                            console.log('🔢 ItemId type:', typeof currentRestaurant.id, 'Value:', currentRestaurant.id);

                            axios.post('http://localhost:3001/api/items', dataToSend)

                                .then((response) => {
                                    console.log('✅ SUCCESS: Like posted to backend!', response.data);
                                }).catch((error) => {
                                console.error('❌ ERROR: Failed to post like to backend:', error);
                                if (error.response) {
                                    console.error('📋 Error response:', error.response.data);
                                    console.error('🚫 Error status:', error.response.status);
                                }
                                if (error.request) {
                                    console.error('📡 Network error - no response received');
                                }
                            });
                        } else {
                            console.log('⏭️ Skipping backend call - already liked');
                        }
                    } else {
                        console.log('❌ No username found');
                    }
                } else {
                    console.log('❌ User not logged in');
                }
                console.log(`Liked: ${currentRestaurant.name}`);
            } else {
                console.log(`Passed on: ${restaurants[currentIndex].name}`);
            }
        }

        setDragOffset(0);
        setSwipeDirection(null);

        if (Math.abs(currentDragOffset) > threshold) {
            nextCard();
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);

        startX.current = e.clientX;
        startY.current = e.clientY;
        setSwipeDirection(null);

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX.current;
            const deltaY = Math.abs(e.clientY - startY.current);

            if (deltaY < Math.abs(deltaX)) {
                setDragOffset(deltaX);
                setSwipeDirection(deltaX > 0 ? 'right' : 'left');
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            const threshold = 80;
            const currentDragOffset = dragOffset;

            if (Math.abs(currentDragOffset) > threshold) {
                const isLike = currentDragOffset > 0;

                if (isLike) {
                    const currentRestaurant = restaurants[currentIndex];
                    console.log('🍽️ Liked restaurant (mouse):', currentRestaurant.name);
                    console.log('🔍 Restaurant data:', currentRestaurant);

                    if (isLoggedIn) {
                        const username = localStorage.getItem('username');
                        console.log('👤 Username:', username);

                        if (username) {
                            const existingLikes = JSON.parse(localStorage.getItem(`likes_${username}`) || '[]');
                            const newLike = {
                                id: currentRestaurant.id,
                                name: currentRestaurant.name,
                                type: 'food',
                                likedAt: new Date().toISOString()
                            };
                            const alreadyLiked = existingLikes.some(item => item.id === currentRestaurant.id && item.type === 'food');

                            console.log('🔄 Already liked?', alreadyLiked);
                            console.log('📝 Existing likes:', existingLikes);

                            if (!alreadyLiked) {
                                existingLikes.push(newLike);
                                localStorage.setItem(`likes_${username}`, JSON.stringify(existingLikes));
                                console.log('💾 Saved to localStorage');

                                const dataToSend = {
                                    userId: username,
                                    itemId: currentRestaurant.id,
                                    itemName: currentRestaurant.name,
                                    type: 'food',
                                    likedAt: new Date().toISOString(),
                                };

                                console.log('📤 About to send to backend:', dataToSend);
                                console.log('🔢 ItemId type:', typeof currentRestaurant.id, 'Value:', currentRestaurant.id);

                                axios.post('http://localhost:3001/api/items', dataToSend)
                                    .then((response) => {
                                        console.log('✅ SUCCESS: Like posted to backend!', response.data);
                                    }).catch((error) => {
                                    console.error('❌ ERROR: Failed to post like to backend:', error);
                                    if (error.response) {
                                        console.error('📋 Error response:', error.response.data);
                                        console.error('🚫 Error status:', error.response.status);
                                    }
                                    if (error.request) {
                                        console.error('📡 Network error - no response received');
                                    }
                                });
                            } else {
                                console.log('⏭️ Skipping backend call - already liked');
                            }
                        } else {
                            console.log('❌ No username found');
                        }
                    } else {
                        console.log('❌ User not logged in');
                    }
                    console.log(`Liked: ${currentRestaurant.name}`);
                } else {
                    console.log(`Passed on: ${restaurants[currentIndex].name}`);
                }
            }

            setDragOffset(0);
            setSwipeDirection(null);

            if (Math.abs(currentDragOffset) > threshold) {
                nextCard();
            }

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const nextCard = () => {
        setCurrentIndex(prev => (prev + 1) % restaurants.length);
    };

    const currentRestaurant = restaurants[currentIndex];
    const rotation = dragOffset * 0.1;
    const opacity = 1 - Math.abs(dragOffset) * 0.002;

    const getSwipeOverlay = () => {
        if (!isDragging || !swipeDirection || Math.abs(dragOffset) < 20) return null;
        return (
            <div className={`swipe-overlay ${swipeDirection}`}>
                <div className="swipe-text">
                    {swipeDirection === 'right' ? '❤️ LIKE' : '❌ PASS'}
                </div>
            </div>
        );
    };

    return (
        <div className="food-tinder-container">
            <div className="food-tinder-header">
                <h1 className="food-tinder-title">Food Finder</h1>
                <p className="food-tinder-subtitle">Swipe right to save, left to skip</p>
            </div>

            <div className="food-tinder-main">
                <div className="food-tinder-card-wrapper">
                    <div
                        ref={cardRef}
                        className="food-tinder-card"
                        style={{
                            transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
                            opacity: opacity,
                            transition: isDragging ? 'none' : 'all 0.3s ease-out',
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                    >
                        {getSwipeOverlay()}
                        <div className="food-tinder-content">
                            <h2 className="food-tinder-restaurant-name">
                                {currentRestaurant.name}
                            </h2>
                            {currentRestaurant.cuisine && (
                                <p className="cuisine-type">{currentRestaurant.cuisine}</p>
                            )}
                            <div className="food-images-section">
                                <div className="food-images-grid">
                                    {currentRestaurant.images.map((img, index) => (
                                        <div key={index} className="food-image-item">
                                            <img src={img} alt={`Food ${index + 1}`} className="food-image" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="restaurant-info-grid">
                                <div className="restaurant-details">
                                    <p className="restaurant-description">
                                        {currentRestaurant.description}
                                    </p>
                                    <div className="restaurant-meta">
                                        <p className="price-range">
                                            <span className="label">Price range:</span> {currentRestaurant.priceRange}
                                        </p>
                                        <div className="rating-section">
                                            <span className="label">Rating:</span>
                                            <div className="rating-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`star ${i < Math.floor(currentRestaurant.rating) ? 'star-filled' : 'star-empty'}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                                <span className="rating-text">
                                                    ({currentRestaurant.rating}/{currentRestaurant.maxRating})
                                                </span>
                                            </div>
                                        </div>
                                        {currentRestaurant.openingHours && (
                                            <p className="opening-hours">
                                                <span className="label">Hours:</span> {currentRestaurant.openingHours}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="restaurant-main-image">
                                    <img
                                        src={currentRestaurant.mainImage}
                                        alt="Restaurant"
                                        className="main-image"
                                    />
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="map-button" onClick={handleShowOnMap}>
                                    <span className="button-icon">📍</span>
                                    Show on map
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodTinder;