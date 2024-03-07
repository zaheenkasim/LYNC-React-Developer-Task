import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { Logout, ShoppingCart, Bookmark, Assignment } from '@mui/icons-material'; // Import Assignment icon for orders

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  
  // Handler function to navigate to the orders component
  const handleOpenOrders = () => {
    navigate('/orders');
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLogin');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton component={Link} to="/home" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </IconButton>
          <IconButton component={Link} to="/bookmarks" color="inherit">
            <Bookmark />
          </IconButton>
          <IconButton component={Link} to="/cart" color="inherit">
            <ShoppingCart />
          </IconButton>
          <IconButton onClick={handleOpenOrders} color="inherit"> {/* Add IconButton for orders */}
            <Assignment />
          </IconButton>
          <IconButton onClick={handleSignOut} color="inherit">
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default NavBar;
