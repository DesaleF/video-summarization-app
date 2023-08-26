import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, useMediaQuery, useTheme, Hidden} from '@mui/material';

import { IconButton, Drawer, List, ListItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <List>
                <ListItem button>
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Sign Up
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Login
                    </Link>
                </ListItem>
            </List>
            <Divider />
            {/* Add other sections if needed */}
        </div>
        );

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Video Summarization
                    </Link>
                </Typography>

                <Hidden smUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Button color="inherit">
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Sign Up
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Login
                        </Link>
                    </Button>
                </Hidden>
            </Toolbar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                >
                {drawer}
            </Drawer>
        </AppBar>
    );
}

export default Navbar;
