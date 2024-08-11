"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Property {
    Id: string;
    ListingType: string;
    ImageUrl: string;
    Suburb: string;
    State: string;
    NumberOfBedrooms: number;
    NumberOfBathrooms: number;
    NumberOfCarspaces: number;
    AgencyName: string;
    ListingUrl: string;
    nearestStation?: {
        name: string;
        lat: string;
        lon: string;
    };
    walkingDistance?: {
        distance: number;
        duration: number;
    };
}

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/api/properties');
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Property Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                    <div key={property.Id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={property.ImageUrl} alt={property.Suburb} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2">{property.Suburb}, {property.State}</h2>
                            <p className="text-gray-600">{property.NumberOfBedrooms} Beds | {property.NumberOfBathrooms} Baths | {property.NumberOfCarspaces} Car Spaces</p>
                            <p className="text-gray-600 mt-2">{property.AgencyName}</p>
                            {property.nearestStation && property.walkingDistance && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">Nearest Train Station: {property.nearestStation.name}</h3>
                                    <p className="text-gray-600">Distance: {property.walkingDistance.distance.toFixed(2)} km</p>
                                    <p className="text-gray-600">Duration: {Math.round(property.walkingDistance.duration)} mins</p>
                                </div>
                            )}
                            <a
                                href={property.ListingUrl}
                                className="mt-4 inline-block text-center w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Listing
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
