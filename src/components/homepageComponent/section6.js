import React from 'react';
import {
    //Card
    // CardActionArea, 
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button
} from '@mui/material';

const section6 = () => {
    return (
        <>
            <div className='section6-content'>
                <CardMedia
                    className="section1-card-media"
                    component="img"
                    style={{ maxWidth: "456px" }}
                    alt="Admin Login"
                />
                <CardContent>

                </CardContent>
                <Button>
                    Become Teacher
                </Button>
            </div>
        </>
    );
};

export default section6;