// src/data/toursData.ts

export interface TourStop {
    id: number;
    name: string;
    type: 'food' | 'history';
    coordinates: [number, number]; // [lat, lng]
    description: string;
    estimatedTime: string; // Time to spend at this location
}

export interface Tour {
    id: number;
    title: string;
    description: string;
    stops: TourStop[];
    estimatedTime: string;
    totalDistance: string;
    difficulty: 'Easy' | 'Moderate' | 'Challenging';
    highlights: string[];
    route: [number, number][]; // Coordinates for the route path
}

// Tour stops data - using your existing locations
const tourStops: TourStop[] = [
    // Historical Places (from your HistoryTinder)
    {
        id: 1,
        name: "Mittweida Castle",
        type: 'history',
        coordinates: [50.9833, 12.9833],
        description: "Historic castle dating back to 1200s",
        estimatedTime: "45 min"
    },
    {
        id: 2,
        name: "St. Nikolai Church",
        type: 'history',
        coordinates: [50.9845, 12.9820],
        description: "Beautiful Gothic church from the 15th century",
        estimatedTime: "30 min"
    },
    {
        id: 3,
        name: "Old Town Hall",
        type: 'history',
        coordinates: [50.9840, 12.9825],
        description: "Renaissance town hall with historical significance",
        estimatedTime: "20 min"
    },
    {
        id: 4,
        name: "Historic Market Square",
        type: 'history',
        coordinates: [50.9838, 12.9828],
        description: "Traditional market square with medieval charm",
        estimatedTime: "25 min"
    },
    {
        id: 5,
        name: "Mittweida University Historic Building",
        type: 'history',
        coordinates: [50.9850, 12.9840],
        description: "Historical university building from 1867",
        estimatedTime: "30 min"
    },

    // Food Places (from your FoodTinder)
    {
        id: 101,
        name: "Mittweidas Döner",
        type: 'food',
        coordinates: [50.9835, 12.9830],
        description: "Authentic Turkish cuisine with handmade pasta",
        estimatedTime: "30 min"
    },
    {
        id: 102,
        name: "Gasthaus Zur Alten Mühle",
        type: 'food',
        coordinates: [50.9842, 12.9815],
        description: "Traditional German cuisine in historic mill setting",
        estimatedTime: "45 min"
    },
    {
        id: 103,
        name: "Café Lebensart",
        type: 'food',
        coordinates: [50.9837, 12.9832],
        description: "Cozy café with local specialties and coffee",
        estimatedTime: "25 min"
    },
    {
        id: 104,
        name: "Brauhaus Mittweida",
        type: 'food',
        coordinates: [50.9848, 12.9818],
        description: "Local brewery with traditional German beer and food",
        estimatedTime: "60 min"
    },
    {
        id: 105,
        name: "Restaurant Goldener Hirsch",
        type: 'food',
        coordinates: [50.9841, 12.9835],
        description: "Fine dining with modern Saxon cuisine",
        estimatedTime: "75 min"
    }
];

// Define the 4 tours
const tours: Tour[] = [
    // Tour 1: Historic Highlights (Mostly Historical)
    {
        id: 1,
        title: "Historic Highlights",
        description: "Journey through Mittweida's rich medieval and Renaissance history",
        stops: [
            tourStops.find(s => s.id === 1)!, // Mittweida Castle
            tourStops.find(s => s.id === 2)!, // St. Nikolai Church
            tourStops.find(s => s.id === 3)!, // Old Town Hall
            tourStops.find(s => s.id === 4)!, // Historic Market Square
            tourStops.find(s => s.id === 103)! // Café Lebensart (refreshment stop)
        ],
        estimatedTime: "3 hours",
        totalDistance: "2.1 km",
        difficulty: "Easy",
        highlights: ["Medieval Castle", "Gothic Architecture", "Renaissance Buildings", "Traditional Market"],
        route: [
            [50.9833, 12.9833], // Castle
            [50.9845, 12.9820], // Church
            [50.9840, 12.9825], // Town Hall
            [50.9838, 12.9828], // Market Square
            [50.9837, 12.9832]  // Café
        ]
    },

    // Tour 2: Culinary Journey (Mostly Food)
    {
        id: 2,
        title: "Culinary Journey",
        description: "Taste your way through Mittweida's best restaurants and traditional cuisine",
        stops: [
            tourStops.find(s => s.id === 102)!, // Gasthaus Zur Alten Mühle
            tourStops.find(s => s.id === 104)!, // Brauhaus Mittweida
            tourStops.find(s => s.id === 101)!, // Mittweidas Döner
            tourStops.find(s => s.id === 105)!, // Restaurant Goldener Hirsch
            tourStops.find(s => s.id === 4)!   // Historic Market Square (digestive walk)
        ],
        estimatedTime: "4.5 hours",
        totalDistance: "1.8 km",
        difficulty: "Easy",
        highlights: ["Traditional German Food", "Local Brewery", "International Cuisine", "Historic Dining"],
        route: [
            [50.9842, 12.9815], // Gasthaus
            [50.9848, 12.9818], // Brauhaus
            [50.9835, 12.9830], // Döner
            [50.9841, 12.9835], // Restaurant
            [50.9838, 12.9828]  // Market Square
        ]
    },

    // Tour 3: The Perfect Mix (Balanced History & Food)
    {
        id: 3,
        title: "The Perfect Mix",
        description: "Experience the best of both worlds - history and cuisine in perfect harmony",
        stops: [
            tourStops.find(s => s.id === 1)!,   // Mittweida Castle
            tourStops.find(s => s.id === 102)!, // Gasthaus Zur Alten Mühle
            tourStops.find(s => s.id === 5)!,   // University Historic Building
            tourStops.find(s => s.id === 103)!, // Café Lebensart
            tourStops.find(s => s.id === 3)!,   // Old Town Hall
            tourStops.find(s => s.id === 101)!  // Mittweidas Döner
        ],
        estimatedTime: "4 hours",
        totalDistance: "2.5 km",
        difficulty: "Moderate",
        highlights: ["Castle & Cuisine", "University Heritage", "Local Flavors", "Architectural Gems"],
        route: [
            [50.9833, 12.9833], // Castle
            [50.9842, 12.9815], // Gasthaus
            [50.9850, 12.9840], // University
            [50.9837, 12.9832], // Café
            [50.9840, 12.9825], // Town Hall
            [50.9835, 12.9830]  // Döner
        ]
    },

    // Tour 4: Discovery Walk (Focus on Hidden Gems)
    {
        id: 4,
        title: "Discovery Walk",
        description: "Uncover hidden gems and local secrets off the beaten path",
        stops: [
            tourStops.find(s => s.id === 5)!,   // University Historic Building
            tourStops.find(s => s.id === 104)!, // Brauhaus Mittweida
            tourStops.find(s => s.id === 2)!,   // St. Nikolai Church
            tourStops.find(s => s.id === 105)!, // Restaurant Goldener Hirsch
            tourStops.find(s => s.id === 4)!    // Historic Market Square
        ],
        estimatedTime: "3.5 hours",
        totalDistance: "2.0 km",
        difficulty: "Moderate",
        highlights: ["Academic Heritage", "Craft Beer", "Sacred Architecture", "Fine Dining"],
        route: [
            [50.9850, 12.9840], // University
            [50.9848, 12.9818], // Brauhaus
            [50.9845, 12.9820], // Church
            [50.9841, 12.9835], // Restaurant
            [50.9838, 12.9828]  // Market Square
        ]
    }
];

// Helper function to get tour by ID
export const getTourById = (id: number): Tour | undefined => {
    return tours.find(tour => tour.id === id);
};

// Get all tours
export const getAllTours = (): Tour[] => {
    return tours;
};

// Get all available locations (for map display)
export const getAllTourStops = (): TourStop[] => {
    return tourStops;
};