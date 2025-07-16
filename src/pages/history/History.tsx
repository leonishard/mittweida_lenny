// src/components/HistoryTinder.tsx

import React from 'react';
import { useState, useRef } from 'react';
import './HistoryTinder.css';
import { getHistoricalPlaces } from '../../data/locations';

import { useAuth } from "../../components/AuthContext.tsx";
import axios from 'axios';
import { useLocation } from 'wouter';
import type {HistoricalPlace} from "../../types/dataTypes.ts";

interface HistoryTinderProps {
    onShowOnMap?: (place: HistoricalPlace) => void;
}

const HistoryTinder = ({ onShowOnMap }: HistoryTinderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

    const cardRef = useRef(null);
    const { isLoggedIn } = useAuth();
    const [setLocation] = useLocation();

    const historicalPlaces = getHistoricalPlaces();

    const handleShowOnMap = () => {
        const currentPlace = historicalPlaces[currentIndex];
        // @ts-ignore
        setLocation(`/map?history=${currentPlace.id}`);
        if (onShowOnMap) {
            onShowOnMap(currentPlace);
        }
        console.log(`Show historical place ${currentPlace.id} on map: ${currentPlace.name}`);
    };

    const startX = useRef(0);
    const startY = useRef(0);

    const likePlace = (place: HistoricalPlace) => {
        if (!isLoggedIn) {
            console.log('❌ User not logged in');
            return;
        }

        const username = localStorage.getItem('username');
        if (!username) {
            console.log('❌ No username found');
            return;
        }

        const existingLikes = JSON.parse(localStorage.getItem(`likes_${username}`) || '[]');
        const newLike = {
            id: place.id,
            name: place.name,
            type: 'history',
            likedAt: new Date().toISOString()
        };

        const alreadyLiked = existingLikes.some(item => item.id === place.id && item.type === 'history');

        if (!alreadyLiked) {
            existingLikes.push(newLike);
            localStorage.setItem(`likes_${username}`, JSON.stringify(existingLikes));
            console.log('💾 Saved to localStorage');

            const dataToSend = {
                userId: username,
                itemId: place.id,
                itemName: place.name,
                type: 'history',
                likedAt: new Date().toISOString(),
            };

            axios.post('http://localhost:3001/api/items', dataToSend)
                .then((response) => {
                    console.log('✅ SUCCESS: Historical place like posted to backend!', response.data);
                }).catch((error) => {
                console.error('❌ ERROR: Failed to post historical place like to backend:', error);
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
    };

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

    const handleTouchEnd = () => {
        setIsDragging(false);
        const threshold = 80;
        const currentDragOffset = dragOffset;

        if (Math.abs(currentDragOffset) > threshold) {
            const isLike = currentDragOffset > 0;

            if (isLike) {
                const currentPlace = historicalPlaces[currentIndex];
                console.log('🏛️ Liked historical place:', currentPlace.name);
                likePlace(currentPlace);
            } else {
                console.log(`Passed on: ${historicalPlaces[currentIndex].name}`);
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
                    const currentPlace = historicalPlaces[currentIndex];
                    console.log('🏛️ Liked historical place (mouse):', currentPlace.name);
                    likePlace(currentPlace);
                } else {
                    console.log(`Passed on: ${historicalPlaces[currentIndex].name}`);
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
        setCurrentIndex(prev => (prev + 1) % historicalPlaces.length);
    };

    const currentPlace = historicalPlaces[currentIndex];
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
        <div className="history-tinder-container">
            <div className="history-tinder-header">
                <h1 className="history-tinder-title">History Explorer</h1>
                <p className="history-tinder-subtitle">Swipe right to save, left to skip</p>
            </div>

            <div className="history-tinder-main">
                <div className="history-tinder-card-wrapper">
                    <div
                        ref={cardRef}
                        className="history-tinder-card"
                        style={{
                            transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
                            opacity: opacity,
                            transition: isDragging ? 'none' : 'all 0.3s ease-out',
                            backgroundColor: '#f8f9fa',
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                    >
                        {getSwipeOverlay()}

                        <div className="history-tinder-content">
                            <h2 className="history-tinder-place-name">
                                {currentPlace.name}
                            </h2>

                            {currentPlace.historicalPeriod && (
                                <p className="historical-period">
                                    {currentPlace.historicalPeriod}
                                    {currentPlace.yearBuilt && ` • Built in ${currentPlace.yearBuilt}`}
                                </p>
                            )}

                            <div className="historical-images-section">
                                <div className="historical-images-grid">
                                    {currentPlace.images.map((img, index) => (
                                        <div key={index} className="historical-image-item">
                                            <img
                                                src={img}
                                                alt={`Historical view ${index + 1}`}
                                                className="historical-image"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="place-info-grid">
                                <div className="place-details">
                                    <p className="place-description">
                                        {currentPlace.description}
                                    </p>

                                    <div className="place-meta">
                                        {currentPlace.entryFee && (
                                            <p className="entry-fee">
                                                <span className="label">Entry:</span> {currentPlace.entryFee}
                                            </p>
                                        )}

                                        <div className="rating-section">
                                            <span className="label">Rating:</span>
                                            <div className="rating-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`star ${i < Math.floor(currentPlace.rating) ? 'star-filled' : 'star-empty'}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                                <span className="rating-text">
                                                    ({currentPlace.rating}/{currentPlace.maxRating})
                                                </span>
                                            </div>
                                        </div>

                                        {currentPlace.openingHours && (
                                            <p className="opening-hours">
                                                <span className="label">Hours:</span> {currentPlace.openingHours}
                                            </p>
                                        )}

                                        {currentPlace.guidedTours !== undefined && (
                                            <p className="guided-tours">
                                                <span className="label">Guided Tours:</span> {currentPlace.guidedTours ? 'Available' : 'Self-guided only'}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="place-main-image">
                                    <img
                                        src={currentPlace.mainImage}
                                        alt="Historical place"
                                        className="main-image"
                                    />
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="map-button"
                                    onClick={handleShowOnMap}
                                >
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

export default HistoryTinder;
