import React from 'react';

import { Link } from 'react-router-dom';

import {
    Typography,
    Button,
    CardMedia,
    CardContent,
    Card,
    CardActionArea,
    CardActions
} from '@mui/material';

// importing icons
import { FaArrowRightLong } from "react-icons/fa6";

// importing styles
import '../App.css';
import '../assets/css/Index.css'
import 'bootstrap/dist/css/bootstrap.css';

const LoginCard = ({cardImage, cardName, cardButton, cardUrl }) => {

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <>
            <Card className='index-cards' sx={{ maxWidth: 345 }}>
                <CardActionArea style={{ cursor: 'default' }}>
                    <CardMedia
                        className='index-card-media'
                        component='img'
                        height='auto'
                        image={cardImage}
                        alt={cardImage}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography className={`${isDarkBackground ? 'dark-mode-card' : 'light-mode-card'}`} sx={{display:'flex', flexDirection:'row'}} gutterBottom variant='h6' component='div'>
                        {cardName}
                    </Typography>
                </CardContent>
                <CardActions className='d-flex justify-content-center'>
                    <Link to={cardUrl}>
                        <Button className={`index-btn ${isDarkBackground ? 'dark-mode' : 'light-mode'}`} >
                            <Typography>
                                {cardButton} &nbsp;
                            </Typography>
                            <FaArrowRightLong />
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </>
    );
};

export default LoginCard;