"use client";

import { ChangeEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import mongoose from 'mongoose';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';

type Address = {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
};

type Coordinates = {
    lat: string;
    lon: string;
};

type FormData = {
    title: string;
    description: string;
    address: Address;
    coordinates: Coordinates;
    price: string;
    bedrooms: string;
    bathrooms: string;
    carSpaces: string;
    landSize: string;
    propertyType: string;
    status: string;
    agent: string | null;
    features: string;
    photos: string;
    areaSize: string;
};


export default function NewProperty() {
    const { data: session } = useSession();

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        address: {
            streetAddress: '',
            suburb: '',
            state: '',
            postcode: '',
            country: 'Australia',
        },
        coordinates: {
            lat: '',
            lon: '',
        },
        price: '',
        bedrooms: '',
        bathrooms: '',
        carSpaces: '',
        landSize: '',
        areaSize: '',
        propertyType: '',
        features: '',
        photos: '',
        status: 'Available',
        agent: session?.user?.id!,  // Assign the valid ObjectId or null
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        if (name.includes('.')) {
            const [mainKey, subKey] = name.split('.');

            setFormData((prevData) => {
                const mainKeyData = prevData[mainKey as keyof FormData] as Address | Coordinates;

                if (typeof mainKeyData === 'object' && mainKeyData !== null) {
                    return {
                        ...prevData,
                        [mainKey]: {
                            ...mainKeyData,
                            [subKey]: type === 'checkbox' ? checked : value,
                        },
                    };
                }
                return prevData;
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/properties', formData);
            console.log('Property added:', response.data);
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    return (


        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Property
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Street Address"
                            name="address.streetAddress"
                            value={formData.address.streetAddress}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Suburb"
                            name="address.suburb"
                            value={formData.address.suburb}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="State"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Postcode"
                            name="address.postcode"
                            value={formData.address.postcode}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Latitude"
                            name="coordinates.lat"
                            type="number"
                            value={formData.coordinates.lat}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Longitude"
                            name="coordinates.lon"
                            type="number"
                            value={formData.coordinates.lon}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Bedrooms"
                            name="bedrooms"
                            type="number"
                            value={formData.bedrooms}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Bathrooms"
                            name="bathrooms"
                            type="number"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Area Size"
                            name="areaSize"
                            type="number"
                            value={formData.areaSize}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="property-type-label">Property Type</InputLabel>
                            <Select
                                labelId="property-type-label"
                                id="property-type-select"
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleSelectChange}
                                label="Property Type"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="House">House</MenuItem>
                                <MenuItem value="Apartment">Apartment</MenuItem>
                                <MenuItem value="Commercial">Commercial</MenuItem>
                                <MenuItem value="Land">Land</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Features"
                            name="features"
                            value={formData.features}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Photos (URLs)"
                            name="photos"
                            value={formData.photos}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status-select"
                                name="status"
                                value={formData.status}
                                onChange={handleSelectChange}
                                label="Status"
                            >
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Sold">Sold</MenuItem>
                                <MenuItem value="OffMarket">OffMarket</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
