import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ImageList({ images, onDelete }) {
    const theme = useTheme();
    const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const getColumnSize = () => {
        if (isXSmall) {
          return 12;
        } // full width for extra small screens
        if (isSmall) {
          return 6;
        }  // half width for small screens
        return 4;  // one third for medium and larger screens
    };

    return (
        <Grid container spacing={2}>
            {images.map(image => (
                <Grid item xs={12} sm={4} md={6} lg={getColumnSize()} key={image.id}>
                    <Card variant="outlined">
                        <img src={image.url} alt={image.name} style={{ width: '100%', height: 'auto' }} />
                        <CardContent>
                            <Typography variant="h6">{image.name}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="small" 
                                variant="outlined" 
                                color="error" 
                                startIcon={<DeleteOutlinedIcon />} 
                                onClick={() => onDelete(image.id)}
                            >
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default ImageList;
