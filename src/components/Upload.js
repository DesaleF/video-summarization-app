import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

function ImageUpload({ onUpload, images }) {
    const [uploading, setUploading] = React.useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        // Extract the existing image names
        const existingImageNames = images.map(image => image.name);

        // Filter out files that have already been uploaded
        const newFiles = acceptedFiles.filter(file => !existingImageNames.includes(file.name));

        if (newFiles.length !== acceptedFiles.length) {
            alert('Some images have already been uploaded and were skipped.');
        }
        // Only proceed if there are new files to upload
        if (newFiles.length === 0) {
            return;
        }
        // Simulate the upload process
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            const newImages = newFiles.map(file => ({
                id: Date.now() + Math.random(),
                name: file.name,
                url: URL.createObjectURL(file)
            }));
            onUpload(newImages);
        }, 2000);}, [onUpload, images]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} md={6}>
                <Card {...getRootProps()} variant="outlined" style={{ textAlign: 'center', padding: '20px', border: '2px dashed #cccccc' }}>
                    <input {...getInputProps()} accept="image/*" />
                    <CardContent>
                        <CloudUploadIcon style={{ fontSize: 50, marginBottom: '10px' }} />
                        <Typography variant="h6" gutterBottom>
                            Drag & Drop your image here
                        </Typography>
                        <Typography color="textSecondary">
                            or
                        </Typography>
                        <Button variant="contained" color="primary" component="span">
                            Browse Image
                        </Button>
                    </CardContent>
                </Card>
                {uploading && (
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <CircularProgress />
                        <Typography variant="caption" display="block" gutterBottom>
                            Uploading...
                        </Typography>
                    </div>
                )}
            </Grid>
        </Grid>
    );
}

export default ImageUpload;
