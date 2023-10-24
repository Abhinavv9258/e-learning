import React from 'react';
import './LoadingComponent.css';
import { Card, CardHeader, Box, Typography, CardContent } from '@mui/material';


const LoadingComponent = () => {
    return (
        <>
            <Card
                sx={{ m: 2, p: 2, boxShadow: 3, height: 380 }}
            >
                <CardHeader
                    title={
                        <Box
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                        >
                            <span className='loaderSkeleton'></span>
                        </Box>
                    }
                />
                <CardContent>
                    <Box>
                        <Typography variant='h5' display='flex'
                            flexDirection='row'
                            alignItems='center'
                        >
                            L<Box className='loader'></Box>ading
                        </Typography>
                    </Box>
                </CardContent>
            </Card></>
    );
};

export default LoadingComponent;