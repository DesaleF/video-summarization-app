import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

// import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home'

// import user management
import AuthProvider from './userManagement/AuthProvider';
import UserContext from './userManagement/userContext';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const theme = createTheme({
      components: {
        MuiContainer: {
          styleOverrides: {
            root: {
              display: 'flex',
              flexDirection: 'column',
            },
          },
        },
      },
    }); // Basic theme, can be customized further
  console.log(isAuthenticated)
  console.log(setIsAuthenticated)

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Router>
          <UserContext.Provider value={{ isAuthenticated, login: () => setIsAuthenticated(true), logout: () => setIsAuthenticated(false) }}>
              <Navbar position="static" />
            </UserContext.Provider>
            <Container>
                <Routes>
                  <Route path="*" element={
                    <Box className="content-wrapper" py={3}>
                      <Home />
                    </Box>
                  } />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </Container>
              <Footer />
            </Router>
          </div>
    </ThemeProvider>
  );
}

export default App;
