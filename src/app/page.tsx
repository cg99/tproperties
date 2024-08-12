"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, Box, Card, CardContent, TextField, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('buy');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  const handleSearch = () => {
    // Implement search logic here
    console.log(`Searching for ${searchQuery} in ${category}`);
  };

  return (
    <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            TProperties
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Find top-notch quality properties
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Box mb={4} p={2} component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                      <SearchIcon />
                    </Button>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Button
                fullWidth
                variant="contained"
                color={category === 'buy' ? 'primary' : 'secondary'}
                onClick={() => setCategory('buy')}
              >
                Buy
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Button
                fullWidth
                variant="contained"
                color={category === 'rent' ? 'primary' : 'secondary'}
                onClick={() => setCategory('rent')}
              >
                Rent
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Button
                fullWidth
                variant="contained"
                color={category === 'sell' ? 'primary' : 'secondary'}
                onClick={() => setCategory('sell')}
              >
                Sell
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* New Properties Section */}
        <Typography variant="h4" component="h2" gutterBottom align="center">
          New Properties
        </Typography>
        <Grid container spacing={4} mb={4}>
          {/* Add Card components for new properties here */}
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Property Title {item}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Description of Property {item}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Promotions Section */}
        <Box mb={4} p={2} component={Paper} elevation={3} sx={{ borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h5" component="div" gutterBottom>
            Special Promotions
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Check out our latest promotions and offers on property listings.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
            Explore Promotions
          </Button>
        </Box>
      </Container>
    </main>
  );
}
