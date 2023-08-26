import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';


function VideoUpload({ onUpload, videos }) {
    const [uploading, setUploading] = React.useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        // Extract the existing video names
        const existingVideoNames = videos.map(video => video.name);

        // Filter out files that have already been uploaded
        const newFiles = acceptedFiles.filter(file => !existingVideoNames.includes(file.name));

        if (newFiles.length !== acceptedFiles.length) {
            alert('Some videos have already been uploaded and were skipped.');
        }
        // Only proceed if there are new files to upload
        if (newFiles.length === 0) {
            return;
        }
        // Simulate the upload process
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            const newVideos = newFiles.map(file => ({
                id: Date.now() + Math.random(),
                name: file.name,
                status: 'Ready to Upload',
                url: URL.createObjectURL(file)
            }));
            onUpload(newVideos);
        }, 2000);}, [onUpload, videos]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'video/*'
    });

    return (
        <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} md={6}>
                <Card {...getRootProps()} variant="soft" style={{ textAlign: 'center', padding: '20px', border: '2px dashed #cccccc' }}>
                    {/* Specify the accept attribute here */}
                    <input {...getInputProps()} accept="video/*" />
                    <CardContent>
                        <CloudUploadIcon style={{ fontSize: 50, marginBottom: '10px' }} />
                        <Typography variant="h6" gutterBottom>
                            Drag & Drop your videos here
                        </Typography>
                        <Typography color="textSecondary">
                            or
                        </Typography>
                        <Button variant="contained" color="primary" component="span">
                            Browse Videos
                        </Button>
                    </CardContent>
                </Card>
                {uploading && (
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <CircularProgress />
                        <Typography variant="caption" display="block" gutterBottom>
                            Loading...
                        </Typography>
                    </div>
                )}
            </Grid>
        </Grid>
    );
}

export default VideoUpload;