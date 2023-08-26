import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Box } from '@mui/material';
import UserContext from '../userManagement/userContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here...
        const loginStatus = login(formData.username, formData.password)
        console.log(loginStatus)
        navigate("/upload")
    };

    return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '80vh',  // ensures vertical centering
                maxWidth: '400px', 
                margin: '0 auto'   // ensures the form is centered
            }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username or Email"
                                name="username"
                                autoComplete="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ 
                            mt: 3, 
                            width: '50%',  // Make the button take up half the width of its container
                            marginLeft: '25%',  // Add left margin to center the button
                            marginRight: '25%'  // Add right margin for symmetry
                        }}
                    >
                        Login
                    </Button>
                    <Button href="#text-buttons"
                        sx={{ 
                                    mt: 3, 
                                    width: '50%',  // Make the button take up half the width of its container
                                    marginLeft: '25%',  // Add left margin to center the button
                                    marginRight: '25%'  // Add right margin for symmetry
                            }}
                        >
                        forgot password
                    </Button>
                    
                    <Button href="/signup"
                        sx={{ 
                                    mb: 3, 
                                    width: '50%',  // Make the button take up half the width of its container
                                    marginLeft: '25%',  // Add left margin to center the button
                                    marginRight: '25%'  // Add right margin for symmetry
                            }}
                        >
                        Register
                    </Button>
                </Box>
            </Box>
    );
}

export default Login;
