import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function LinearProgressWithLabel({ value }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

function VideoList({ videos, onDelete, onRemoveAll }) {
    const [progresses, setProgresses] = useState({});
    const eventSources = useRef({}); // To keep track of EventSource connections

    useEffect(() => {
        videos.forEach(video => {
            if (!eventSources.current[video.id]) { // Only create a new connection if it doesn't exist
                const es = new EventSource(`http://localhost:5000/progress/${video.id}`);
                es.onmessage = (event) => {
                    console.log("Received progress for video:", video.id, "progress:", event.data);
                    setProgresses(prev => ({ ...prev, [video.id]: parseFloat(event.data) }));
                };
                eventSources.current[video.id] = es;
            }
        });

        // Cleanup connections
        return () => {
            Object.values(eventSources.current).forEach(es => es.close());
        };
    }, [videos]);

    const handleStartProcessing = (videoId) => {
        fetch('http://localhost:5000/start_processing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ video_id: videoId })
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
    };

    return (
        <div>
            {videos.length > 0 && (
                <Grid container direction="row" spacing={3}>
                    <Grid item>
                        <Button variant="outlined" color="error" onClick={onRemoveAll} style={{ marginBottom: '20px' }}>
                            Remove All Videos
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<UploadIcon />}>
                            Upload
                        </Button>
                    </Grid>
                </Grid>
            )}
            <Grid container spacing={5}>
                {[...videos].reverse().map(video => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={video.id}>
                        <Card variant="outlined" sx={{ minWidth: 360, flexGrow: 1 }}>
                            <video width="100%" controls src={video.url}></video>
                            <CardContent>
                                <Typography variant="h6">{video.name}</Typography>
                                <Typography color="textSecondary">{video.status}</Typography>
                                {progresses[video.id] && (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography color="textSecondary">Uploading</Typography>
                                        <Box sx={{ width: '100%', ml: 2 }}>
                                            <LinearProgressWithLabel value={progresses[video.id] || 0} />
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                            <CardActions sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    startIcon={<UploadIcon />}
                                    onClick={() => handleStartProcessing(video.id)}
                                >
                                    Upload
                                </Button>
                                <Button size="small" variant="outlined" color="primary" startIcon={<FileDownloadIcon />} component="a" href={video.url} download={video.name}>
                                    Download
                                </Button>
                                <Button size="small" variant="outlined" color="error" startIcon={<DeleteOutlinedIcon />} onClick={() => onDelete(video.id)}>
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default VideoList;
