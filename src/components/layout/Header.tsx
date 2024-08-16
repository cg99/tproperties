"use client";

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" color="textPrimary" component="div">
              TProperties
            </Typography>
          </Link>
          <div>
            <Button color="inherit" component={Link} href="/">Home</Button>
            <Button color="inherit" component={Link} href="/properties">Properties</Button>
            <Button color="inherit" component={Link} href="/about">About</Button>
            <Button color="inherit" component={Link} href="/contact">Contact</Button>
            {status === 'authenticated' ? (
              <>
                <Button color="inherit" component={Link} href="/pricing">Pricing</Button>
                <Button color="inherit" component={Link} href="/dashboard">Dashboard</Button>
                <Button color="inherit" onClick={() => signOut()}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} href="/register">Register</Button>
                <Button color="inherit" component={Link} href="/login">Login</Button>
              </>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
