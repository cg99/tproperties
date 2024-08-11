import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import propertiesData from '@/lib/data/properties.json'; // Import the local JSON file

const OSM_NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_URL = 'https://router.project-osrm.org/route/v1';

export async function GET(req: NextRequest) {
    try {
        const properties = propertiesData.Properties; // Use the data from the JSON file

        // Find the nearest train station and calculate walking distance for each property
        const propertiesWithStations = await Promise.all(
            properties.map(async (property: any) => {
                const nearestStation = await getNearestTrainStation(property.latitude, property.longitude);
                const walkingDistance = nearestStation
                    ? await getWalkingDistance(property.latitude, property.longitude, nearestStation.lat, nearestStation.lon)
                    : null;
                return { ...property, nearestStation, walkingDistance };
            })
        );

        return NextResponse.json(propertiesWithStations);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error processing property data' }, { status: 500 });
    }
}

// Function to find the nearest train station using OpenStreetMap Nominatim API
const getNearestTrainStation = async (latitude: number, longitude: number) => {
    try {
        const response = await axios.get(OSM_NOMINATIM_URL, {
            params: {
                q: 'train station',
                format: 'json',
                limit: 1,
                addressdetails: 1,
                extratags: 1,
                lat: latitude,
                lon: longitude,
                radius: 5000
            }
        });

        const stations = response.data;
        if (stations.length > 0) {
            const station = stations[0];
            return {
                name: station.display_name,
                lat: station.lat,
                lon: station.lon
            };
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Function to calculate walking distance using OSRM API
const getWalkingDistance = async (originLat: number, originLng: number, destLat: number, destLng: number) => {
    try {
        const response = await axios.get(`${OSRM_URL}/foot/${originLng},${originLat};${destLng},${destLat}`, {
            params: {
                overview: 'false',
                geometries: 'geojson'
            }
        });

        const route = response.data.routes[0];
        if (route) {
            return {
                distance: route.distance / 1000, // Convert to kilometers
                duration: route.duration / 60 // Convert to minutes
            };
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};
