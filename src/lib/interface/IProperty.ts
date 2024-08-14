// Define Address interface for better structure
export interface Address {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
    country?: string; // Optional, default is 'Australia'
}

// Define Coordinates interface for location data
export interface Coordinates {
    lat: number;
    lon: number;
}

// Define Property interface
export interface IProperty {
    _id: string;
    title: string;
    description?: string;
    address: Address;
    coordinates: Coordinates;
    price: number;
    bedrooms: number;
    bathrooms: number;
    areaSize?: number; // Optional
    propertyType: 'House' | 'Apartment' | 'Commercial' | 'Land';
    features?: string[]; // Optional
    photos?: string[]; // Optional
    status?: 'Available' | 'Sold' | 'OffMarket'; // Optional, default is 'Available'
    agent: string; // Reference to the agent
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}
