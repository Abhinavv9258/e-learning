import React from 'react';
import './loading.css';
import './loadingSkeleton.css';
import {Box, Typography} from '@mui/material';

const LoadingComponent = () => {
    return (
        <Box

            display='flex'
            flexDirection='column'
            justifyContent='center'
            boxShadow={5}
            p={4}
            m={2}
            _hover={{ boxShadow: 10, cursor: 'pointer' }}
        >
            
            <span className='loaderSkeleton'></span>

            <Box>
                <Typography variant='h4' display='flex'
                    flexDirection='row'
                    alignItems='center'
                    >
                    L<Box className='loader'></Box>ading
                </Typography>
            </Box>
        </Box>
    );
};

export default LoadingComponent;