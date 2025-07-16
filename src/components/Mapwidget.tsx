// src/components/MapWidget.tsx

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './mapwidget.css';
import { getRestaurants, getHistoricalPlaces, getLocationById } from '../data/locations';

import { getTourById } from '../data/toursData';
import type {HistoricalPlace, Restaurant} from "../types/dataTypes.ts";
import WeatherWidget from "./Weatherwidget.tsx";


// Props interface for the MapWidget
interface MapWidgetProps {
    selectedLocationId?: number | null;
    showRestaurants?: boolean;
    showHistoricalPlaces?: boolean;
}

// Component to handle routing control
function RoutingControl({ tour, currentStop, onRouteFound }) {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if (!tour || !map) return;

        // Remove existing routing control
        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

        // Create waypoints from tour stops
        const waypoints = tour.stops.map(stop =>
            L.latLng(stop.coordinates[0], stop.coordinates[1])
        );

        // Create routing control

        const routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            addWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
            lineOptions: {
                styles: [
                    {
                        color: '#3b82f6',
                        weight: 4,
                        opacity: 0.8
                    }
                ],
                extendToWaypoints: false,
                missingRouteTolerance: 0
            },
            // @ts-ignore
            createMarker: function(i, waypoint, ) {
                const stop = tour.stops[i];
                const isCurrentStop = i === currentStop;

                const icon = L.divIcon({
                    html: `
                        <div class="tour-marker ${isCurrentStop ? 'current' : ''} ${stop.type}">
                            <div class="tour-marker-circle">
                                <span class="tour-marker-number">${i + 1}</span>
                            </div>
                        </div>
                    `,
                    className: 'tour-marker-container',
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                });

                return L.marker(waypoint.latLng, { icon }).bindPopup(`
                    <div class="tour-popup">
                        <h4>${stop.name}</h4>
                        <p>${stop.description}</p>
                        <small>Estimated time: ${stop.estimatedTime}</small>
                    </div>
                `);
            }
        });

        // Add to map
        routingControl.addTo(map);
        routingControlRef.current = routingControl;

        // Handle route found
        routingControl.on('routesfound', function(e) {
            const routes = e.routes;
            if (routes.length > 0 && onRouteFound) {
                onRouteFound(routes[0]);
            }
        });

        // Cleanup
        return () => {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [tour, map, currentStop]);

    return null;
}

const position: [number, number] = [50.9853, 12.9800];

export default function MapWidget({
                                      selectedLocationId,
                                      showRestaurants = true,
                                      showHistoricalPlaces = true
                                  }: MapWidgetProps) {
    const mapRef = useRef<any>(null);
    const [location] = useLocation();
    const [selectedTour, setSelectedTour] = useState(null);
    const [currentStop, setCurrentStop] = useState(0);
    const [routeInfo, setRouteInfo] = useState(null);
    const routingControlRef = useRef(null);

    // Get data from centralized storage
    const restaurants = getRestaurants();
    const historicalPlaces = getHistoricalPlaces();

    // Debug: Log restaurant names to see what's actually loaded
    console.log('Loaded restaurants:', restaurants.map(r => r.name));

    // Create custom icons for regular markers
    const createRegularIcon = (type: 'food' | 'history', isInTour: boolean = false) => {
        return L.divIcon({
            html: `
                <div class="regular-marker ${isInTour ? 'dimmed' : ''} ${type}">
                    <div class="regular-marker-circle"></div>
                </div>
            `,
            className: 'regular-marker-container',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
    };

    // Parse URL parameters to get tour ID
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tourId = urlParams.get('tour');

        if (tourId) {
            const tour = getTourById(parseInt(tourId));
            if (tour) {
                setSelectedTour(tour);
                setCurrentStop(0);
                console.log('🗺️ Loading tour:', tour.title);
            }
        } else {
            setSelectedTour(null);
            setCurrentStop(0);
        }
    }, [location]);

    // Find the selected location by ID
    const selectedLocation = selectedLocationId
        ? getLocationById(selectedLocationId)
        : null;

    // Effect to pan to selected location when ID changes or tour starts
    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            const map = mapRef.current;
            // @ts-ignore
            map.flyTo(selectedLocation.coordinates, 15, {
                duration: 1.5
            });
            // @ts-ignore
            console.log(`Map panning to: ${selectedLocation.name}`);
        } else if (selectedTour && mapRef.current) {
            // When tour starts, fit map to show all tour stops
            const map = mapRef.current;
            if (selectedTour.stops.length > 0) {
                const bounds = L.latLngBounds(
                    selectedTour.stops.map(stop => [stop.coordinates[0], stop.coordinates[1]])
                );
                // Add some padding and animate to the bounds
                setTimeout(() => {
                    map.fitBounds(bounds, {
                        padding: [50, 50],
                        maxZoom: 16,
                        animate: true,
                        duration: 1.5
                    });
                }, 100); // Small delay to ensure routing control is ready
            }
        }
    }, [selectedLocationId, selectedTour]);

    // Navigation functions
    const handleNextStop = () => {
        if (selectedTour && currentStop < selectedTour.stops.length - 1) {
            setCurrentStop(currentStop + 1);
            // Pan to next stop
            if (mapRef.current) {
                const nextStop = selectedTour.stops[currentStop + 1];
                mapRef.current.flyTo(nextStop.coordinates, 16, { duration: 1 });
            }
        }
    };

    const handlePrevStop = () => {
        if (currentStop > 0) {
            setCurrentStop(currentStop - 1);
            // Pan to previous stop
            if (mapRef.current) {
                const prevStop = selectedTour.stops[currentStop - 1];
                mapRef.current.flyTo(prevStop.coordinates, 16, { duration: 1 });
            }
        }
    };

    const clearTour = () => {
        setSelectedTour(null);
        setCurrentStop(0);
        setRouteInfo(null);
        // Remove tour parameter from URL
        window.history.replaceState({}, '', '/map');
    };

    // Handle directions button click - Modified to use Leaflet routing
    const handleDirections = (location: Restaurant | HistoricalPlace) => {
        // Clear any existing tour to show single route
        setSelectedTour(null);
        setCurrentStop(0);

        // Create a simple routing control from city center to location
        if (mapRef.current) {
            const map = mapRef.current;

            // Remove any existing routing control
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }

            // Mittweida city center coordinates
            const cityCenter: [number, number] = [50.9853, 12.9800];

            // Create waypoints from city center to destination
            const waypoints = [
                L.latLng(cityCenter[0], cityCenter[1]),
                L.latLng(location.coordinates[0], location.coordinates[1])
            ];

            // Create routing control

            const routingControl = L.Routing.control({
                waypoints: waypoints,
                routeWhileDragging: false,
                addWaypoints: false,

                fitSelectedRoutes: true,
                showAlternatives: false,
                lineOptions: {
                    styles: [
                        {
                            color: '#ef4444', // Red color for directions
                            weight: 4,
                            opacity: 0.8
                        }
                    ],
                    extendToWaypoints: false,
                    missingRouteTolerance: 0
                },
                // @ts-ignore
                createMarker: function(i, waypoint, ) {
                    if (i === 0) {
                        // Start marker (city center)
                        const startIcon = L.divIcon({
                            html: `
                                <div class="direction-marker start">
                                    <div class="direction-marker-circle">
                                        <span class="direction-marker-icon">🏛️</span>
                                    </div>
                                </div>
                            `,
                            className: 'direction-marker-container',
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        });
                        return L.marker(waypoint.latLng, { icon: startIcon }).bindPopup(`
                            <div class="direction-popup">
                                <h4>Mittweida City Center</h4>
                                <p>Starting point</p>
                            </div>
                        `);
                    } else {
                        // End marker (destination)
                        const endIcon = L.divIcon({
                            html: `
                                <div class="direction-marker end">
                                    <div class="direction-marker-circle">
                                        <span class="direction-marker-icon">📍</span>
                                    </div>
                                </div>
                            `,
                            className: 'direction-marker-container',
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        });
                        return L.marker(waypoint.latLng, { icon: endIcon }).bindPopup(`
                            <div class="direction-popup">
                                <h4>${location.name}</h4>
                                <p>Destination</p>
                            </div>
                        `);
                    }
                }
            });

            // Add to map
            routingControl.addTo(map);
            routingControlRef.current = routingControl;

            // Handle route found
            routingControl.on('routesfound', function(e) {
                const routes = e.routes;
                if (routes.length > 0) {
                    setRouteInfo(routes[0]);
                }
            });

            // Fit map to show the route
            setTimeout(() => {
                map.fitBounds(L.latLngBounds([cityCenter, location.coordinates]), {
                    padding: [50, 50],
                    maxZoom: 16
                });
            }, 100);
        }
    };

    // Render restaurant popup content
    const renderRestaurantPopup = (restaurant: Restaurant) => {
        // Add specific images for each restaurant by name
        let imageSrc = "";
        switch(restaurant.name) {
            case "Mittweidas Döner":
                imageSrc = "public/Mittweida_pictures/food/döner/döner2.png";
                break;
            case "Gasthaus Zur Alten Mühle":
                imageSrc = "public/Mittweida_pictures/food/gast/gast2.jpg";
                break;
            case "Café Lebensart":
                imageSrc = "public/Mittweida_pictures/food/cafe/cafe3.jpg";
                break;
            case "Restaurant Goldener Hirsch":
                imageSrc = "public/Mittweida_pictures/food/rest/rest3.jpg";
                break;
            // Add more restaurant cases here
            default:
                imageSrc = "";
                console.log("Restaurant not found in switch:", restaurant.name);
        }

        // @ts-ignore
        return (
            <div className="location-popup">
                <div className="popup-image-container">
                    <img
                        src={imageSrc}
                        alt={restaurant.name}
                        className="popup-image"
                    />
                </div>
                <div className="popup-content">
                    <h3 className="popup-title">
                        {restaurant.name}

                    </h3>
                    <div className="popup-buttons">
                        <button
                            className="popup-btn directions-btn"
                            onClick={() => handleDirections(restaurant)}
                        >
                            Directions
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render historical place popup content
    const renderHistoricalPopup = (place: HistoricalPlace) => {
        // Add specific images for each historical place by name
        let imageSrc = "";
        switch(place.name) {
            case "St. Afra Church":
                imageSrc = "public/Mittweida_pictures/history/st_afra/church 2.jpeg";
                break;
            case "Mittweida Castle Ruins":
                imageSrc = "public/Mittweida_pictures/history/castel/castel3.jpg";
                break;
            case "Historic University Building":
                imageSrc = "public/Mittweida_pictures/history/uni/uni2.jpg";
                break;
            case "Old Market Square":
                imageSrc = "public/Mittweida_pictures/history/market/market2.jpg";
                break;
            // Add more historical place cases here
            default:
                imageSrc = "";
        }


        return (
            <div className="location-popup">
                <div className="popup-image-container">
                    <img
                        src={imageSrc}
                        alt={place.name}
                        className="popup-image"
                    />
                </div>
                <div className="popup-content">
                    <h3 className="popup-title">
                        {place.name}
                    </h3>
                    <div className="popup-buttons">
                        <button
                            className="popup-btn directions-btn"
                            onClick={() => handleDirections(place)}
                        >
                            Directions
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="map-section">
            {/* Tour Header - Simplified for mobile */}
            {selectedTour && (
                <div className="tour-header-mobile">
                    <div className="tour-title-mobile">{selectedTour.title}</div>
                    <div className="tour-progress-mobile">
                        <span className="progress-text-mobile">
                            {currentStop + 1}/{selectedTour.stops.length}
                        </span>
                        <div className="progress-bar-mobile">
                            <div
                                className="progress-fill-mobile"
                                style={{ width: `${((currentStop + 1) / selectedTour.stops.length) * 100}%` }}
                            />
                        </div>
                        <button className="clear-tour-btn-mobile" onClick={clearTour}>
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Weather widget positioned absolutely */}
            <div className="weather-overlay">
                <WeatherWidget />
            </div>

            {/* Map Container */}
            <MapContainer
                className="map"
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Tour Routing Control */}
                {selectedTour && (
                    <RoutingControl
                        tour={selectedTour}
                        currentStop={currentStop}
                        onRouteFound={setRouteInfo}
                    />
                )}

                {/* Restaurant markers (show ALL from your data) */}
                {showRestaurants && restaurants.map((restaurant) => {
                    const isInTour = selectedTour?.stops.some(stop =>
                        stop.id === restaurant.id ||
                        stop.name === restaurant.name ||
                        (stop.itemId === restaurant.id && stop.type === 'food')
                    );

                    return (
                        <Marker
                            key={`restaurant-${restaurant.id}`}
                            position={restaurant.coordinates}
                            icon={createRegularIcon('food', isInTour)}
                        >
                            <Popup>
                                {renderRestaurantPopup(restaurant)}
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Historical place markers (show ALL from your data) */}
                {showHistoricalPlaces && historicalPlaces.map((place) => {
                    const isInTour = selectedTour?.stops.some(stop =>
                        stop.id === place.id ||
                        stop.name === place.name ||
                        (stop.itemId === place.id && stop.type === 'history')
                    );

                    return (
                        <Marker
                            key={`historical-${place.id}`}
                            position={place.coordinates}
                            icon={createRegularIcon('history', isInTour)}
                        >
                            <Popup>
                                {renderHistoricalPopup(place)}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Current Stop Info - Redesigned for mobile */}
            {selectedTour && (
                <div className="current-stop-mobile">
                    <div className="stop-card-mobile">
                        <div className="stop-header-mobile">
                            <div className="stop-type-indicator">
                                <div className={`stop-dot ${selectedTour.stops[currentStop].type}`}></div>
                                <span className="stop-name-mobile">{selectedTour.stops[currentStop].name}</span>
                            </div>
                            <div className="stop-time-mobile">
                                {selectedTour.stops[currentStop].estimatedTime}
                            </div>
                        </div>

                        <p className="stop-description-mobile">
                            {selectedTour.stops[currentStop].description}
                        </p>

                        {routeInfo && (
                            <div className="route-info-mobile">
                                <span>📍 {(routeInfo.summary.totalDistance / 1000).toFixed(1)}km</span>
                                <span>⏱️ {Math.round(routeInfo.summary.totalTime / 60)}min</span>
                            </div>
                        )}

                        <div className="stop-navigation-mobile">
                            <button
                                className="nav-btn-mobile prev"
                                onClick={handlePrevStop}
                                disabled={currentStop === 0}
                            >
                                ←
                            </button>

                            <div className="stop-counter-mobile">
                                <div className="counter-dots">
                                    {selectedTour.stops.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`counter-dot ${index === currentStop ? 'active' : ''} ${index < currentStop ? 'completed' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                className="nav-btn-mobile next"
                                onClick={handleNextStop}
                                disabled={currentStop === selectedTour.stops.length - 1}
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}