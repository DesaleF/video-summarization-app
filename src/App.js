import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme} from '@mui/material/styles';

// import components
import Navbar from './components/Navbar';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

// import user management
import AuthProvider from './userManagement/AuthProvider';


function App() {
    const [videos, setVideos] = useState([]);

    const addVideo = (newVideos) => {
        setVideos(prevVideos => {
            return [...prevVideos, ...newVideos];
        });
    };
    
    const deleteVideo = (id) => {
        const updatedVideos = videos.filter(video => video.id !== id);
        setVideos(updatedVideos);
    };

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
    const removeAllVideos = () => {
      setVideos([]); // Set the videos state to an empty array
    };

  return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Router>
            <Navbar position="static" />
            <Container>
                <Routes>
                    <Route path="/upload" element={
                        <Box className="content-wrapper" py={3}> {/* Add vertical padding */}
                            <VideoUpload onUpload={addVideo} videos={videos} />
                            <Box mt={3}> {/* Add margin-top to space out from VideoUpload */}
                                <VideoList videos={videos} onDelete={deleteVideo} onRemoveAll={removeAllVideos}/>
                            </Box>
                        </Box>
                    } />
                    <Route path="/upload" element={
                        <Box className="content-wrapper" py={3}> {/* Add vertical padding */}
                            <VideoUpload onUpload={addVideo} videos={videos} />
                            <Box mt={3}> {/* Add margin-top to space out from VideoUpload */}
                                <VideoList videos={videos} onDelete={deleteVideo} onRemoveAll={removeAllVideos}/>
                            </Box>
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
    </AuthProvider>
    );
}

export default App;
