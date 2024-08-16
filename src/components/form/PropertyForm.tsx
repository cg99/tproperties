import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid } from '@mui/material';

const PropertyForm = () => {
    return (
        <form style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Grid container spacing={2}>
                {/* Cadastre Type */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Cadastre Type</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Polygon">Polygon</MenuItem>
                            <MenuItem value="Parcel">Parcel</MenuItem>
                            {/* Add other cadastre types here */}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Status */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="OffMarket">OffMarket</MenuItem>
                            <MenuItem value="OnMarket">OnMarket</MenuItem>
                            {/* Add other statuses here */}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                    <TextField label="Address" fullWidth />
                </Grid>

                {/* Coordinates */}
                <Grid item xs={12} sm={6}>
                    <TextField label="Latitude" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Longitude" fullWidth />
                </Grid>

                {/* Bedrooms */}
                <Grid item xs={12} sm={4}>
                    <TextField label="Bedrooms" type="number" fullWidth />
                </Grid>

                {/* Bathrooms */}
                <Grid item xs={12} sm={4}>
                    <TextField label="Bathrooms" type="number" fullWidth />
                </Grid>

                {/* Car Spaces */}
                <Grid item xs={12} sm={4}>
                    <TextField label="Car Spaces" type="number" fullWidth />
                </Grid>

                {/* Property Type */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Property Type</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Commercial">Commercial</MenuItem>
                            <MenuItem value="Residential">Residential</MenuItem>
                            {/* Add other property types here */}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Zone */}
                <Grid item xs={12} sm={6}>
                    <TextField label="Zone" fullWidth />
                </Grid>

                {/* Add more fields following the same pattern */}

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PropertyForm;
