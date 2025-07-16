// src/pages/Home/Home.tsx
import React from 'react';
import TourCard from '../../components/TourCard';
import { getTourById } from '../../data/toursData';
import './Home.css';

const Home: React.FC = () => {
    // Get tour data from the centralized data file
    const tour1 = getTourById(1);
    const tour2 = getTourById(2);
    const tour3 = getTourById(3);
    const tour4 = getTourById(4);

    return (
        <div className="home-container">
            {/* Centered Title */}
            <section className="hero">
                <h1 className="main_title">Explore Mittweida</h1>
                <p className="history_food">History and taste combined</p>
            </section>

            {/* Auto-Scrolling Slider - UNCHANGED */}
            <section className="slider-wrapper">
                <div className="slider-track">
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img1.webp" alt="Place 1" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img2.jpg" alt="Place 2" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img3.avif" alt="Place 3" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img4.jpg" alt="Place 4" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img5.jpg" alt="Place 5" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img6.jpg" alt="Place 6" /><p></p></div>
                    {/* Duplicated for seamless loop */}
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img1.webp" alt="Place 1" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img2.jpg" alt="Place 2" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img3.avif" alt="Place 3" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img4.jpg" alt="Place 4" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img5.jpg" alt="Place 5" /><p></p></div>
                    <div className="place-card"><img src="public/Mittweida_pictures/home_img6.jpg" alt="Place 6" /><p></p></div>
                </div>
            </section>

            &nbsp;
            <hr></hr>

            <section className="intro">
                <div className="intro-section">
                    <h2 className="intro-title">
                        Welcome to the Mittweida Local Guide — your new favorite way to doomscroll.
                    </h2>
                    <p className="intro-text1">
                        We all waste time scrolling... so why not scroll for something that actually feeds your soul and your stomach?
                        Whether you're a student dodging deadlines, a resident hunting for hidden gems, or just visiting (and already lost),
                        our app lets you swipe through the best places to eat, chill, study, or soak up some local history — all without the
                        existential dread.
                    </p>
                    <p className="intro-text2">
                        Save your faves with a tap, use the map to find your way, and explore Mittweida like a pro-level procrastinator with taste.
                    </p>
                </div>
            </section>

            <hr></hr>
            &nbsp;

            <section className="tours-section">
                <div className="tours-header">
                    <h2>Curated Tours</h2>
                    <p>Choose your perfect adventure through Mittweida</p>
                </div>

                {/* Tour 1: Historic Highlights */}
                {tour1 && (
                    <TourCard
                        title={tour1.title}
                        description={tour1.description}
                        stops={tour1.stops}
                        estimatedTime={tour1.estimatedTime}
                        tourId={tour1.id}
                        totalDistance={tour1.totalDistance}
                        difficulty={tour1.difficulty}
                        highlights={tour1.highlights}
                    />
                )}

                {/* Tour 2: Culinary Journey */}
                {tour2 && (
                    <TourCard
                        title={tour2.title}
                        description={tour2.description}
                        stops={tour2.stops}
                        estimatedTime={tour2.estimatedTime}
                        tourId={tour2.id}
                        totalDistance={tour2.totalDistance}
                        difficulty={tour2.difficulty}
                        highlights={tour2.highlights}
                    />
                )}

                {/* Tour 3: The Perfect Mix */}
                {tour3 && (
                    <TourCard
                        title={tour3.title}
                        description={tour3.description}
                        stops={tour3.stops}
                        estimatedTime={tour3.estimatedTime}
                        tourId={tour3.id}
                        totalDistance={tour3.totalDistance}
                        difficulty={tour3.difficulty}
                        highlights={tour3.highlights}
                    />
                )}

                {/* Tour 4: Discovery Walk */}
                {tour4 && (
                    <TourCard
                        title={tour4.title}
                        description={tour4.description}
                        stops={tour4.stops}
                        estimatedTime={tour4.estimatedTime}
                        tourId={tour4.id}
                        totalDistance={tour4.totalDistance}
                        difficulty={tour4.difficulty}
                        highlights={tour4.highlights}
                    />
                )}
            </section>
        </div>
    );
};

export default Home;