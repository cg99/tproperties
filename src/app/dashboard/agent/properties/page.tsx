"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IProperty } from '@/lib/interface/IProperty';

const PropertiesPage = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    // Add handleDelete function
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/properties/${id}`);
            setProperties(properties.filter((property) => property._id !== id));
        } catch (error) {
            console.error('Error deleting property:', error);
            setError('Failed to delete property.');
        }
    };

    return (
        <div>
            <h1>Manage Properties</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Link href="/dashboard/agent/properties/new">Add New Property</Link>
                    <ul>
                        {properties.map((property) => (
                            <li key={property?._id}>
                                <h2>{property?.title}</h2>
                                <p>{property?.description}</p>
                                <Link href={`/dashboard/agent/properties/${property._id}`}>Edit</Link>
                                <button onClick={() => handleDelete(property._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PropertiesPage;
