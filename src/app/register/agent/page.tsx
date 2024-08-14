"use client";

import { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function AgentRegistrationForm() {
    const [company, setCompany] = useState('');
    const [abn, setAbn] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { data: session } = useSession();

    const user = session?.user;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!session && !user) {
            setError('You must be logged in to register as an agent.');
            return;
        }

        try {
            const response = await axios.post('/api/register_agent', { user, company, abn });
            setSuccess(response.data.message);
        } catch (err) {
            setError('Failed to register as an agent. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register as an Agent
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Company"
                                name="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="ABN"
                                name="abn"
                                value={abn}
                                onChange={(e) => setAbn(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                        )}
                        {success && (
                            <Grid item xs={12}>
                                <Typography color="success">{success}</Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Register as Agent
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}
