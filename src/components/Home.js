import * as React from 'react';
import {Route, Routes } from 'react-router-dom';
import {Box} from '@mui/material';
import ImageUpload from '../components/Upload'; // Assuming this is the modified ImageUpload component
import ImageList from '../components/ImageList'; // Assuming this is the modified ImageList component

export default function Home() {
    const [images, setImages] = React.useState([]);

    const addImage = (newImages) => {
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const deleteImage = (id) => {
        const updatedImages = images.filter(image => image.id !== id);
        setImages(updatedImages);
    };

    const removeAllImages = () => {
        setImages([]); // Set the images state to an empty array
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Routes>
                <Route path="/" element={
                    <Box className="content-wrapper" py={3}> {/* Add vertical padding */}
                        <ImageUpload onUpload={addImage} images={images} />
                        <Box mt={3}> {/* Add margin-top to space out from ImageUpload */}
                            <ImageList images={images} onDelete={deleteImage} onRemoveAll={removeAllImages}/>
                        </Box>
                    </Box>
                } />
            </Routes>
        </Box>
    );
}
