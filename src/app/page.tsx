"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, Box, Card, CardContent, TextField, Grid, Paper, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowBack, FilterList } from '@mui/icons-material';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('buy');
  const [searchValue, setSearchValue] = useState('');

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

        <div className="container mx-auto p-4">
          <form method="get">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <Button
                  variant={category === 'buy' ? 'contained' : 'outlined'}
                  onClick={() => setCategory('buy')}
                  data-testid="buy-navigation"
                >
                  Buy
                </Button>
                <Button
                  variant={category === 'rent' ? 'contained' : 'outlined'}
                  onClick={() => setCategory('rent')}
                  data-testid="rent-navigation"
                >
                  Rent
                </Button>
                <Button
                  variant={category === 'houseandland' ? 'contained' : 'outlined'}
                  onClick={() => setCategory('houseandland')}
                  data-testid="houseandland-navigation"
                >
                  House & Land
                </Button>
                <Button
                  variant={category === 'newhomes' ? 'contained' : 'outlined'}
                  onClick={() => setCategory('newhomes')}
                  data-testid="newhomes-navigation"
                >
                  New Homes
                </Button>
                <Button
                  variant={category === 'sold' ? 'contained' : 'outlined'}
                  onClick={() => setCategory('sold')}
                  data-testid="sold-navigation"
                >
                  Sold
                </Button>
                <Button
                  variant={category === 'retirement' ? 'contained' : 'outlined'}
                  onClick={() => setCategory('retirement')}
                  data-testid="retirement-navigation"
                >
                  Retirement
                </Button>
                <Button
                  variant={category === 'rural' ? 'contained' : 'outlined'}
                  onClick={() => setCategory('rural')}
                  data-testid="rural-navigation"
                >
                  Rural
                </Button>
              </div>
            </div>

            <div className="relative flex items-center">
              <InputBase
                className="bg-gray-200 p-2 rounded-md w-full"
                placeholder="Try a location or a school or project name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton type='submit' className="ml-2 text-blue-600" aria-label="Search">
                <SearchIcon />
              </IconButton>
              <IconButton className="ml-2 text-gray-500" aria-label="Filters">
                <FilterList />
              </IconButton>
            </div>

          </form>

          <div className="mt-4">
            <div data-testid="messages__toast" className="hidden">
              {/* Toast messages would go here */}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
