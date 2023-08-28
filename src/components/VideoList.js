import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

// Icons
import UploadIcon from '@mui/icons-material/Upload';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


function VideoList({ videos, onDelete, onRemoveAll}) {
    return (
        <div>
            {videos.length > 0 && (
                    <Grid  container direction="row"  spacing={3} >
                        <Grid item >
                            <Button variant="outlined" color="error" onClick={onRemoveAll} style={{ marginBottom: '20px' }}>
                                Remove All Videos
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button variant="outlined" startIcon={<UploadIcon />}>
                                Upload
                            </Button>
                    </Grid>
                </Grid>
            )}
        <Grid container spacing={5}>
            {[...videos].reverse().map(video => (
                <Grid item xs={12} sm={12} md={6} lg={4} key={video.id}>
                    {video && (<Card variant="outlined"
                        sx={{  minWidth: 360, flexGrow: 1 }}>
                        <video width="100%" controls src={video.url}></video>
                        <CardContent>
                            {/* <Box sx={{ width: '100%' }}>
                                <LinearProgress color="inherit"  />
                            </Box> */}
                            <Typography variant="h6">
                                {video.name}
                            </Typography>
                            <Typography color="textSecondary">
                                {video.status}
                            </Typography>
                            
                        </CardContent>
                        <CardActions sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Button size="small" variant="outlined" startIcon={<UploadIcon />}>
                                Upload
                            </Button>
                            <Button size="small" variant="outlined" color="primary" startIcon={<FileDownloadIcon />} component="a" href={video.url} download={video.name}>
                                Download
                            </Button>
                            <Button size="small" variant="outlined" color="error" startIcon={<DeleteOutlinedIcon />} onClick={() => onDelete(video.id)}>
                                Remove
                            </Button>
                        </CardActions>
                    </Card>)}
                </Grid>
            ))}
            </Grid>
        </div>
    );
}

export default VideoList;
