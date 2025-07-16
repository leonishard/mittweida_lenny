// Base interface for common properties
export interface BaseLocation {
    id: number;
    name: string;
    description: string;
    coordinates: [number, number];
    address: string;
    rating: number;
    maxRating: number;
    images: string[];
    mainImage: string;
}

// Restaurant-specific interface
export interface Restaurant extends BaseLocation {
    type: 'restaurant';
    priceRange: string;
    backgroundColor: string;
    cuisine?: string; // Optional: type of cuisine
    openingHours?: string; // Optional: opening hours
    phoneNumber?: string; // Optional: contact info
    website?: string; // Optional: website URL
}

// Historical place interface
export interface HistoricalPlace extends BaseLocation {
    type: 'historical';
    yearBuilt?: number;
    historicalPeriod?: string;
    entryFee?: string;
    openingHours?: string;
    guidedTours?: boolean;
    accessibility?: string;
}


// Union type for all location types
export type Location = Restaurant | HistoricalPlace;

// Helper type to get only restaurants
export type RestaurantData = Extract<Location, { type: 'restaurant' }>;

// Helper type to get only historical places
export type HistoricalData = Extract<Location, { type: 'historical' }>;
