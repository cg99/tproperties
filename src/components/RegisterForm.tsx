'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

// Define the type for the onRegisterSuccess prop
type RegisterFormProps = {
  onRegisterSuccess: () => void;
};

const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('User registered successfully');
      onRegisterSuccess();
    } else {
      setError(data.error);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="background.default">
      <Box component="form" onSubmit={handleSubmit} bgcolor="background.paper" p={4} borderRadius={2} boxShadow={3} maxWidth={400} width="100%">
        <Typography variant="h5" component="h2" gutterBottom textAlign="center">
          Register
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
