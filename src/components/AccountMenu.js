import * as React from 'react';
import {useContext} from 'react';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import UserContext from '../userManagement/userContext';


function AccountMenu() {
    const { auth, setAuth } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ mr: 1 }}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {auth ? (
            <>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </>
          ) : (
              <>
                <MenuItem onClick={handleClose}>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Sign Up
                    </Link>
                  </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Login
                  </Link>
                </MenuItem>
              </>
          )}
        </Menu>
      </>
    );
}

export default AccountMenu