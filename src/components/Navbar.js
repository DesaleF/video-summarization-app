import * as React from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Hidden} from '@mui/material';
import AccountMenu from './AccountMenu';
// user management import
import UserContext from '../userManagement/userContext';

function Navbar() {
    const { auth, setAuth } = useContext(UserContext);

    return (
        <AppBar position="static">
            <Toolbar>
                
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Video Summarization
                    </Link>
                </Typography>
                
                <Hidden smUp implementation="css">
                     <AccountMenu />
                </Hidden>
                <Hidden smDown implementation="css">
                    {auth ? (
                        <AccountMenu />
                    ): (
                        <div>
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
                        </div>
                    )}
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
