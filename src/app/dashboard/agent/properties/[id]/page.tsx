"use client"

import { IProperty } from '@/lib/interface/IProperty';
import { Container, Box, Typography, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const PropertyForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const [property, setProperty] = useState<IProperty | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);


    useEffect(() => {
        if (id) {
            const fetchProperty = async () => {
                try {
                    const response = await axios.get(`/api/properties/${id}`);
                    setProperty(response.data);
                } catch (error) {
                    console.error('Error fetching property:', error);
                    setError('Failed to fetch property.');
                } finally {
                    setLoading(false);
                }
            };

            fetchProperty();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            if (id) {
                const response = await axios.put(`/api/properties/${id}`, data);
                if (response.status === 200) {
                    setSuccessMsg('Updated the property.');
                }
            }
        } catch (error) {
            console.error('Error saving property:', error);
            setError('Failed to save property.');
        }
    };

    const handleDeleteProperty = async () => {
        try {
            if (id) {
                const response = await axios.delete(`/api/properties/${id}`);
                if (response.status === 204) {
                    setSuccessMsg('Deleted the property.');
                }
                router.push('/dashboard/agent/properties');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            setError('Failed to delete property.');
        }
    }

    return (
        <Container maxWidth="md" className="mt-10">
            <Box className="bg-white p-8 rounded-lg shadow-lg">
                <Typography variant="h4" component="h1" className="mb-6 text-center">
                    Edit Property
                </Typography>
                {loading ? (
                    <Box className="flex justify-center items-center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            fullWidth
                            name="title"
                            label="Title"
                            variant="outlined"
                            defaultValue={property?.title || ''}
                            required
                        />
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            defaultValue={property?.description || ''}
                        />
                        <TextField
                            fullWidth
                            name="price"
                            label="Price"
                            variant="outlined"
                            type="number"
                            defaultValue={property?.price || ''}
                            required
                        />
                        <TextField
                            fullWidth
                            name="bedrooms"
                            label="Bedrooms"
                            variant="outlined"
                            type="number"
                            defaultValue={property?.bedrooms || ''}
                            required
                        />
                        <TextField
                            fullWidth
                            name="bathrooms"
                            label="Bathrooms"
                            variant="outlined"
                            type="number"
                            defaultValue={property?.bathrooms || ''}
                            required
                        />
                        <TextField
                            fullWidth
                            name="areaSize"
                            label="Area Size (sq ft)"
                            variant="outlined"
                            type="number"
                            defaultValue={property?.areaSize || ''}
                        />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Property Type</InputLabel>
                            <Select
                                name="propertyType"
                                label="Property Type"
                                defaultValue={property?.propertyType || ''}
                                required
                            >
                                <MenuItem value="House">House</MenuItem>
                                <MenuItem value="Apartment">Apartment</MenuItem>
                                <MenuItem value="Commercial">Commercial</MenuItem>
                                <MenuItem value="Land">Land</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            name="features"
                            label="Features (comma separated)"
                            variant="outlined"
                            defaultValue={property?.features?.join(', ') || ''}
                        />
                        <TextField
                            fullWidth
                            name="photos"
                            label="Photos (comma separated URLs)"
                            variant="outlined"
                            defaultValue={property?.photos?.join(', ') || ''}
                        />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                label="Status"
                                defaultValue={property?.status || 'Available'}
                            >
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Sold">Sold</MenuItem>
                                <MenuItem value="OffMarket">Off Market</MenuItem>
                            </Select>
                        </FormControl>
                        <Box className="flex justify-center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="mt-4 w-1/2"
                            >
                                Save Property
                            </Button>
                        </Box>
                        <Box className="flex justify-center">

                            <Button
                                type="button"
                                variant="contained"
                                color="error"
                                className="mt-4 w-1/2"
                                onClick={handleDeleteProperty}
                            >
                                Delete
                            </Button>
                        </Box>
                    </form>
                )}
                {error && (
                    <Typography color="error" className="mt-4 text-center">
                        {error}
                    </Typography>
                )}
                {successMsg && (
                    <Typography color="primary" className="mt-4 text-center">
                        {successMsg}
                    </Typography>
                )}

            </Box>
        </Container>
    );
};

export default PropertyForm;
