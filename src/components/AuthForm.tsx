"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';

type LoginFormProps = {
  onLoginSuccess: () => void;
}

const AuthForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setError('');
      onLoginSuccess();
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" align="center" gutterBottom>Sign In</Typography>
          {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
