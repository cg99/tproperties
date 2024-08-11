"use client";

import { ChangeEvent, useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import axios from 'axios';

export default function AdminDashboard() {
    const [formData, setFormData] = useState({
        cadastreType: '',
        onMarketTypes: '',
        status: '',
        address: '',
        latitude: '',
        longitude: '',
        addressId: '',
        areaSize: '',
        bathrooms: '',
        bedrooms: '',
        carSpaces: '',
        claim: '',
        condition: '',
        created: '',
        ensuites: '',
        features: '',
        flatNumber: '',
        improvements: '',
        internalArea: '',
        isResidential: false,
        landUse: '',
        lotNumber: '',
        planNumber: '',
        postcode: '',
        propertyCategory: '',
        propertyCategoryId: '',
        propertyType: '',
        propertyTypeId: '',
        rooms: '',
        sectionNumber: '',
        state: '',
        storeys: '',
        streetAddress: '',
        streetName: '',
        streetNumber: '',
        streetType: '',
        streetTypeLong: '',
        suburb: '',
        suburbId: '',
        title: '',
        updated: '',
        urlSlug: '',
        urlSlugShort: '',
        zone: '',
        gnafIds: [{ monthNo: '', yearNo: '', gnafPID: '' }],
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };


    const handleGnafChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newGnafIds = formData.gnafIds.map((gnaf, i) =>
            i === index ? { ...gnaf, [name]: value } : gnaf
        );
        setFormData({ ...formData, gnafIds: newGnafIds });
    };

    const addGnafId = () => {
        setFormData({
            ...formData,
            gnafIds: [...formData.gnafIds, { monthNo: '', yearNo: '', gnafPID: '' }],
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/properties', formData);
            console.log('Property added:', response.data);
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Property
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="cadastre-type-label">Cadastre Type</InputLabel>
                                    <Select
                                        labelId="cadastre-type-label"
                                        id="cadastre-type-select"
                                        defaultValue=""
                                        label="Cadastre Type"
                                        name="cadastreTypes"
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="Polygon">Polygon</MenuItem>
                                        <MenuItem value="Parcel">Parcel</MenuItem>
                                        {/* Add other cadastre types here */}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="On Market Types"
                                name="onMarketTypes"
                                value={formData.onMarketTypes}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Condition"
                                name="condition"
                                value={formData.condition}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Latitude"
                                name="latitude"
                                type="number"
                                value={formData.latitude}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Longitude"
                                name="longitude"
                                type="number"
                                value={formData.longitude}
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
                                label="Car Spaces"
                                name="carSpaces"
                                type="number"
                                value={formData.carSpaces}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Ensuites"
                                name="ensuites"
                                type="number"
                                value={formData.ensuites}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Features"
                                name="features"
                                value={formData.features}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Claim"
                                name="claim"
                                value={formData.claim}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Lot Number"
                                name="lotNumber"
                                value={formData.lotNumber}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Plan Number"
                                name="planNumber"
                                value={formData.planNumber}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Internal Area"
                                name="internalArea"
                                type="number"
                                value={formData.internalArea}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                GNAF IDs
                            </Typography>
                            {formData.gnafIds.map((gnaf, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Month No."
                                            name="monthNo"
                                            type="number"
                                            value={gnaf.monthNo}
                                            onChange={(e) => handleGnafChange(index, e)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Year No."
                                            name="yearNo"
                                            type="number"
                                            value={gnaf.yearNo}
                                            onChange={(e) => handleGnafChange(index, e)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="GNAF PID"
                                            name="gnafPID"
                                            value={gnaf.gnafPID}
                                            onChange={(e) => handleGnafChange(index, e)}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                            <Button
                                variant="contained"
                                onClick={addGnafId}
                                sx={{ mt: 2 }}
                            >
                                Add GNAF ID
                            </Button>
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
        </Container>
    );
}
