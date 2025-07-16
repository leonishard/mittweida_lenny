import { Restaurant, HistoricalPlace, Location } from '../../types/dataTypes';

// Restaurant data
export const restaurants: Restaurant[] = [
    {
        id: 1,
        type: 'restaurant',
        name: "Mittweidas Döner",
        description: "Authentic Italian cuisine with handmade pasta, stone-baked pizzas, and seasonal antipasti. Cozy atmosphere, perfect for a relaxed lunch or dinner.",
        priceRange: "€€ (Main dishes €10-€18)",
        rating: 4.5,
        maxRating: 5,
        backgroundColor: '#ffffff',
        coordinates: [50.9845, 12.9785], // Moved slightly southwest
        address: "Hauptstraße 15, 09648 Mittweida",
        images: [
            "public/Mittweida_pictures/food/döner/döner.jpg",
            "public/Mittweida_pictures/food/döner/döner4.jpg",
            "public/Mittweida_pictures/food/döner/döner1.webp"
        ],
        mainImage: "public/Mittweida_pictures/food/döner/döner2.png",
        cuisine: "Italian/Döner",
        openingHours: "Mon-Sat: 11:00-22:00, Sun: 12:00-21:00",
        phoneNumber: "+49 3727 123456"
    },
    {
        id: 2,
        type: 'restaurant',
        name: "Gasthaus Zur Alten Mühle",
        description: "Traditional German cuisine in a historic mill setting. Famous for their schnitzel and local beer selection. Family-owned for three generations.",
        priceRange: "€€ (Main dishes €12-€22)",
        rating: 4.8,
        maxRating: 5,
        backgroundColor: '#dbeafe',
        coordinates: [50.9860, 12.9815], // Moved slightly northeast
        address: "Mühlenstraße 8, 09648 Mittweida",
        images: [
            "public/Mittweida_pictures/food/gast/gast4.jpg",
            "public/Mittweida_pictures/food/gast/gast3.jpg",
            "public/Mittweida_pictures/food/gast/gast1.jpg"
        ],
        mainImage: "public/Mittweida_pictures/food/gast/gast2.jpg",
        cuisine: "Traditional German",
        openingHours: "Tue-Sun: 17:00-23:00, Closed Mondays",
        phoneNumber: "+49 3727 654321"
    },
    {
        id: 3,
        type: 'restaurant',
        name: "Café Lebensart",
        description: "Modern café with specialty coffee and homemade cakes. Great workspace atmosphere with free WiFi. Perfect for breakfast and afternoon coffee.",
        priceRange: "€ (Items €3-€12)",
        rating: 4.3,
        maxRating: 5,
        backgroundColor: '#dcfce7',
        coordinates: [50.9840, 12.9795], // Moved slightly southwest
        address: "Bahnhofstraße 22, 09648 Mittweida",
        images: [
            "public/Mittweida_pictures/food/cafe/cafe1.jpg.webp",
            "public/Mittweida_pictures/food/cafe/cafe2.jpg.webp",
            "public/Mittweida_pictures/food/cafe/cafe4.jpg"
        ],
        mainImage: "public/Mittweida_pictures/food/cafe/cafe3.jpg",
        cuisine: "Café/Coffee",
        openingHours: "Mon-Fri: 7:00-18:00, Sat-Sun: 8:00-17:00",
        phoneNumber: "+49 3727 987654",
        website: "www.cafe-lebensart-mittweida.de"
    },
    {
        id: 4,
        type: 'restaurant',
        name: "Restaurant Goldener Hirsch",
        description: "Upscale dining with seasonal menu featuring local ingredients. Elegant atmosphere perfect for special occasions and business dinners.",
        priceRange: "€€€ (Main dishes €18-€35)",
        rating: 4.7,
        maxRating: 5,
        backgroundColor: '#fce7f3',
        coordinates: [50.9870, 12.9805], // Moved slightly northwest
        address: "Marktplatz 5, 09648 Mittweida",
        images: [
            "public/Mittweida_pictures/food/rest/rest4.jpg",
            "public/Mittweida_pictures/food/rest/rest1.jpg",
            "public/Mittweida_pictures/food/rest/rest2.jpg"
        ],
        mainImage: "public/Mittweida_pictures/food/rest/rest3.jpg",
        cuisine: "Fine Dining/International",
        openingHours: "Wed-Sun: 18:00-22:00, Closed Mon-Tue",
        phoneNumber: "+49 3727 456789",
        website: "www.goldener-hirsch-mittweida.de"
    }
];

// Historical places data (ready for future expansion)
export const historicalPlaces: HistoricalPlace[] = [
    {
        id: 101,
        type: 'historical',
        name: "St. Afra Church",
        description: "The oldest sanctuary in Mittweida, this beautiful Gothic church has been the spiritual heart of the town for over 600 years. Features stunning stained glass windows and historic organ.",
        coordinates: [50.9853, 12.9800], // Center of town - church location
        address: "Kirchplatz 1, 09648 Mittweida",
        rating: 4.6,
        maxRating: 5,
        images: [
            "public/Mittweida_pictures/history/st_afra/church1.jpg",
            "public/Mittweida_pictures/history/st_afra/church3.jpg",
            "public/Mittweida_pictures/history/st_afra/church4.jpg"
        ],
        mainImage: "public/Mittweida_pictures/history/st_afra/church 2.jpeg",
        yearBuilt: 1350,
        historicalPeriod: "Medieval Gothic",
        entryFee: "Free",
        openingHours: "Daily: 9:00-17:00",
        guidedTours: true,
        accessibility: "Partially accessible"
    },
    {
        id: 102,
        type: 'historical',
        name: "Mittweida Castle Ruins",
        description: "Medieval fortress ruins overlooking the town, offering panoramic views and insights into the region's defensive history. Archaeological excavations continue to reveal new discoveries.",
        coordinates: [50.9875, 12.9840], // Higher up - castle on hill
        address: "Burgstraße 15, 09648 Mittweida",
        rating: 4.3,
        maxRating: 5,
        images: [
            "public/Mittweida_pictures/history/castel/castel1.webp",
            "public/Mittweida_pictures/history/castel/castel2.jpg",
            "public/Mittweida_pictures/history/castel/castel4.webp"
        ],
        mainImage: "public/Mittweida_pictures/history/castel/castel3.jpg",
        yearBuilt: 1150,
        historicalPeriod: "High Medieval",
        entryFee: "Free",
        openingHours: "Always accessible",
        guidedTours: false,
        accessibility: "Limited accessibility"
    },
    {
        id: 103,
        type: 'historical',
        name: "Historic University Building",
        description: "Founded in 1867 as a technical college, this impressive building represents the birthplace of technical education in Saxony. Beautiful neo-Renaissance architecture with historical lecture halls.",
        coordinates: [50.9865, 12.9825], // University area - east side
        address: "Technikumplatz 17, 09648 Mittweida",
        rating: 4.5,
        maxRating: 5,
        images: [
            "public/Mittweida_pictures/history/uni/uni1.jpg",
            "public/Mittweida_pictures/history/uni/uni3.jpg",
            "public/Mittweida_pictures/history/uni/uni4.jpg"
        ],
        mainImage: "public/Mittweida_pictures/history/uni/uni2.jpg",
        yearBuilt: 1867,
        historicalPeriod: "Industrial Revolution",
        entryFee: "€3 for tours",
        openingHours: "Mon-Fri: 8:00-18:00",
        guidedTours: true,
        accessibility: "Fully accessible"
    },
    {
        id: 104,
        type: 'historical',
        name: "Old Market Square",
        description: "The historic heart of Mittweida's commerce for over 500 years. Surrounded by beautifully preserved merchant houses and featuring the original market well from 1456.",
        coordinates: [50.9850, 12.9790], // Market square - central but distinct
        address: "Marktplatz, 09648 Mittweida",
        rating: 4.4,
        maxRating: 5,
        images: [
            "public/Mittweida_pictures/history/market/market1.jpg",
            "public/Mittweida_pictures/history/market/market3.jpg",
            "public/Mittweida_pictures/history/market/market4.jpg"
        ],
        mainImage: "public/Mittweida_pictures/history/market/market2.jpg",
        yearBuilt: 1456,
        historicalPeriod: "Late Medieval",
        entryFee: "Free",
        openingHours: "Always accessible",
        guidedTours: true,
        accessibility: "Fully accessible"
    }
];

// Updated helper functions
export const getHistoricalPlaces = (): HistoricalPlace[] => historicalPlaces;
export const getHistoricalPlaceById = (id: number): HistoricalPlace | undefined =>
    historicalPlaces.find(place => place.id === id);

// Combined data for easy access
export const allLocations: Location[] = [...restaurants, ...historicalPlaces];

// Helper functions to filter data
export const getRestaurants = (): Restaurant[] => restaurants;

export const getLocationById = (id: number): Location | undefined =>
    allLocations.find(location => location.id === id);
export const getRestaurantById = (id: number): Restaurant | undefined =>
    restaurants.find(restaurant => restaurant.id === id);