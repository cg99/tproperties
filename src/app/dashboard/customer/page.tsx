"use client";

import { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

type Property = {
    title: string;
    description: string;
    address: {
        streetAddress: string;
        suburb: string;
        state: string;
        postcode: string;
        country: string;
    };
    coordinates: {
        lat: number;
        lon: number;
    };
    price: number;
    bedrooms: number;
    bathrooms: number;
    areaSize?: number;
    propertyType: string;
    features: string[];
    photos: string[];
    status: string;
};

type User = {
    name: string;
    email: string;
    // Add other user fields as needed
};

const sidebarWidth = 240;

export default function CustomerDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('/api/user');
                const propertiesResponse = await axios.get('/api/user/properties');
                setUser(userResponse.data);
                setProperties(propertiesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ display: 'flex' }}>
            <Container
                maxWidth="md"
                sx={{ marginLeft: sidebarWidth }} // Adjust for the sidebar width
            >
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome, {user?.name}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Your Information
                    </Typography>
                    <Typography variant="body1">
                        Email: {user?.email}
                        {/* Display other user information here */}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                        Your Saved Properties
                    </Typography>
                    <Grid container spacing={3}>
                        {properties.map((property, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={property.photos[0] || 'default-image-url'}
                                        alt={property.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {property.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {property.address?.streetAddress}, {property.address.suburb}, {property.address?.state} {property.address.postcode}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ${property.price.toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
