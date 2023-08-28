import React, { useState } from 'react';
import { IconButton, TextField, Button, Paper, Divider, InputBase, Badge } from '@mui/material';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchIcon from '@mui/icons-material/Search';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

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
                <Grid item justifyContent="center" xs={12} sm={6} md={3} key={file.id}>
                    <Badge
                        badgeContent={
                            <IconButton
                                edge="end"
                                variant="contained"
                                color='error'
                                aria-label="delete"
                                fontSize="large" 
                                onClick={() => onDelete(file.id)}
                            >
                                <RemoveCircleSharpIcon />
                            </IconButton>
                        }
                    >
                        <Card  size="lg">
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6" color="text.secondary" >{file.videoName}</Typography>
                                    <Typography color="textSecondary">Processed Date: {file.processedDate}</Typography>
                                </CardContent>
                            </CardActionArea>
                            {/* <IconButton edge="end" aria-label="delete" onClick={() => onDelete(file.id)}>
                                <DeleteRoundedIcon />
                            </IconButton> */}
                        </Card>
                    </Badge>
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
        },{
            id: 2,
            videoName: 'Video2.mp4',
            processedDate: '2022-04-15',
        },{
            id: 3,
            videoName: 'Video3.mp4',
            processedDate: '2022-04-15',
        },{
            id: 4,
            videoName: 'Video4.mp4',
            processedDate: '2022-04-15',
        },{
            id: 5,
            videoName: 'Video5.mp4',
            processedDate: '2022-04-15',
        },{
            id: 6,
            videoName: 'Video6.mp4',
            processedDate: '2022-04-15',
        },{
            id: 7,
            videoName: 'Video7.mp4',
            processedDate: '2022-04-15',
        },{
            id: 8,
            videoName: 'Video8.mp4',
            processedDate: '2022-04-15',
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
