import React, { useState } from 'react';
import { IconButton, TextField, Button, Paper, Divider, InputBase } from '@mui/material';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchIcon from '@mui/icons-material/Search';


function SearchAndFilters({ onSearch, onFilterChange, onClearFilters }) {
    return (
        <Grid  container direction="row" alignItems="center" justifyContent="center" spacing={3} >
            <Grid item xs={12} sm={6} md={4}>
                <Paper
                    component="form"
                    sx={{ m: 1, p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Processed Videos"
                        inputProps={{ 'aria-label': 'search for videos' }}
                    />
                    <IconButton onChange={(e) => onSearch(e.target.value)} type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <TextField type="date" onChange={(e) => onFilterChange('date', e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Button 
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    sx={{ m: 1 }}
                    onClick={onClearFilters}
                >
                    Clear Filters
                </Button>
            </Grid>
        </Grid>
    );
}


function FileList({ files, onDelete }) {
    return (
         <Grid container spacing={3}>
            {files.map(file => (
                <Grid item justifyContent="center" xs={12} sm={6} md={4} key={file.id}>
                    <Card variant="outlined">
                        <CardActionArea>
                        <CardContent>
                            <Typography variant="h6">{file.videoName}</Typography>
                            <Typography color="textSecondary">Processed Date: {file.processedDate}</Typography>
                            <Typography color="textSecondary">Keyframes: {file.summary.keyframes}</Typography>
                            <Typography color="textSecondary">Shots: {file.summary.shots}</Typography>
                            <Typography color="textSecondary">
                                Processing Option: {file.processingOption.sampleFrame ? 'Sample Frame' : 'All Frames'}
                            </Typography>
                            <Typography color="textSecondary">
                                Summary Visualization: {file.summaryVisualization.keyFrame ? 'Key Frame' : 'Short Clip'}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(file.id)}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

function ProcessedVideos() {
    const [files, setFiles] = useState([{
            id: 1,
            videoName: 'Video1.mp4',
            processedDate: '2022-04-15',
            summary: {
                keyframes: 10,
                shots: 5
            },
            processingOption: {
                sampleFrame: true,
                allFrames: false
            },
            summaryVisualization: {
                keyFrame: true,
                shortClip: false
            }
        },{
            id: 2,
            videoName: 'Video1.mp4',
            processedDate: '2022-04-15',
            summary: {
                keyframes: 10,
                shots: 5
            },
            processingOption: {
                sampleFrame: true,
                allFrames: false
            },
            summaryVisualization: {
                keyFrame: true,
                shortClip: false
            }
        },{
            id: 3,
            videoName: 'Video1.mp4',
            processedDate: '2022-04-15',
            summary: {
                keyframes: 10,
                shots: 5
            },
            processingOption: {
                sampleFrame: true,
                allFrames: false
            },
            summaryVisualization: {
                keyFrame: true,
                shortClip: false
            }
        },{
            id: 4,
            videoName: 'Video1.mp4',
            processedDate: '2022-04-15',
            summary: {
                keyframes: 10,
                shots: 5
            },
            processingOption: {
                sampleFrame: true,
                allFrames: false
            },
            summaryVisualization: {
                keyFrame: true,
                shortClip: false
            }
        },{
            id: 6,
            videoName: 'Video1.mp4',
            processedDate: '2022-04-15',
            summary: {
                keyframes: 10,
                shots: 5
            },
            processingOption: {
                sampleFrame: true,
                allFrames: false
            },
            summaryVisualization: {
                keyFrame: true,
                shortClip: false
            }
        },{
            id: 20,
            videoName: 'Video1.mp4',
            processedDate: '2022-04-15',
            summary: {
                keyframes: 10,
                shots: 5
            },
            processingOption: {
                sampleFrame: true,
                allFrames: false
            },
            summaryVisualization: {
                keyFrame: true,
                shortClip: false
            }
        },]); // You can add your initial file data here
    const [filters, setFilters] = useState({ search: '', date: '', status: '' });

    const handleSearch = (searchTerm) => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
        // Implement search logic here...
    };

    const handleFilterChange = (filter, value) => {
        setFilters(prev => ({ ...prev, [filter]: value }));
        // Implement filter logic here...
    };

    const handleClearFilters = () => {
        setFilters({ search: '', date: '', status: '' });
        // Clear filters logic here...
    };

    const handleDelete = (fileId) => {
        setFiles(prev => prev.filter(file => file.id !== fileId));
    };

    return (
        <div>
            <SearchAndFilters
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters} />
            <Divider sx={{m: 2}} />
            <FileList files={files} onDelete={handleDelete} />
        </div>
    );
}

export default ProcessedVideos;
