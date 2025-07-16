// src/components/TourCard.tsx
import React from 'react';
import { useLocation } from 'wouter';
import './TourCard.css';

interface TourCardProps {
    title: string;
    description: string;
    stops: any[];
    estimatedTime: string;
    tourId?: number; // Add tour ID for navigation
    totalDistance?: string;
    difficulty?: string;
    highlights?: string[];
}

const TourCard: React.FC<TourCardProps> = ({
                                               title,
                                               description,
                                               stops,
                                               estimatedTime,
                                               tourId,
                                               totalDistance,
                                               difficulty,
                                               highlights
                                           }) => {
    const [location, navigate] = useLocation();

    const handleStartTour = () => {
        if (tourId) {
            // Navigate to map with tour parameter
            navigate(`/map?tour=${tourId}`);
        }
    };

    // Count food and history stops
    const foodStops = stops.filter(stop => stop.type === 'food').length;
    const historyStops = stops.filter(stop => stop.type === 'history').length;

    return (
        <div className="tour-card">
            <div className="tour-card-header">
                <h3 className="tour-title">{title}</h3>
                <div className="tour-badges">
                    {difficulty && (
                        <span className={`difficulty-badge ${difficulty.toLowerCase()}`}>
              {difficulty}
            </span>
                    )}
                    <span className="time-badge">{estimatedTime}</span>
                </div>
            </div>

            <p className="tour-description">{description}</p>

            <div className="tour-stats">
                <div className="stat-row">
                    <div className="stat-item">
                        <span className="stat-icon">📍</span>
                        <span className="stat-text">{stops.length} stops</span>
                    </div>
                    {totalDistance && (
                        <div className="stat-item">
                            <span className="stat-icon">🚶</span>
                            <span className="stat-text">{totalDistance}</span>
                        </div>
                    )}
                </div>

                <div className="stat-row">
                    <div className="stat-item">
                        <span className="stat-icon">🍽️</span>
                        <span className="stat-text">{foodStops} food stops</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">🏛️</span>
                        <span className="stat-text">{historyStops} historic sites</span>
                    </div>
                </div>
            </div>

            {highlights && highlights.length > 0 && (
                <div className="tour-highlights">
                    <p className="highlights-title">Highlights:</p>
                    <div className="highlights-tags">
                        {highlights.slice(0, 3).map((highlight, index) => (
                            <span key={index} className="highlight-tag">
                {highlight}
              </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="tour-stops-preview">
                <p className="stops-title">Tour Stops:</p>
                <div className="stops-list">
                    {stops.slice(0, 3).map((stop, index) => (
                        <div key={index} className="stop-preview">
              <span className="stop-icon">
                {stop.type === 'food' ? '🍽️' : '🏛️'}
              </span>
                            <span className="stop-name">{stop.name}</span>
                        </div>
                    ))}
                    {stops.length > 3 && (
                        <div className="more-stops">
                            +{stops.length - 3} more stops
                        </div>
                    )}
                </div>
            </div>

            <div className="tour-card-footer">
                <button
                    className="start-tour-button"
                    onClick={handleStartTour}
                >
                    <span className="button-icon">🗺️</span>
                    Start Tour
                </button>
            </div>
        </div>
    );
};

export default TourCard;