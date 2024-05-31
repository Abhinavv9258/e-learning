import React from 'react';

import './LoadingComponent.css';

import {
    Card,
    CardHeader,
    Box,
    Typography,
    CardContent,
    Divider,
    CardActions
} from '@mui/material';


const LoadingComponent = () => {
    return (
        <>
            <Box
                sx=
                {{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Card
                    className="course-card"
                    sx=
                    {{
                        p: 2.5,
                        m: 2.5,
                        boxShadow: 3,
                        height: 380,
                        width: 300
                    }}

                >
                    <CardHeader
                        sx=
                        {{
                            m: 0,
                            p: 0
                        }}
                        title=
                        {
                            <Box
                                display='flex'
                            >
                                <span className='loaderSkeleton'></span>
                            </Box>
                        }
                    />

                    <CardContent
                        sx=
                        {{
                            m: 0,
                            p: 0
                        }}
                    >
                        <Box
                            display='flex'
                        >
                            <span className='loaderSkeleton-2'></span>
                        </Box>
                    </CardContent>

                    <Divider sx={{ border: 1 }} />

                    <CardActions>
                        <Box>
                            <Typography
                                variant='h5'
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                            >
                                L<Box className='loader'></Box>ading
                            </Typography>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
};

export default LoadingComponent;