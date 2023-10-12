import React from 'react';
import { useNavigate } from "react-router-dom";

// importing ui components
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typed,
    Typography
} from '@mui/material';
import {
    Button,
} from '@material-ui/core';

// importing icons or logo
import duke from './css/duke.png'
import google from './css/google.png'
import ibm from './css/IBM.png'
import illinois from './css/illinois.png'
import imperial from './css/imperial.png'
import michigan from './css/michigan.jpeg'
import penn from './css/penn.png'
import stanford from './css/stanford.png'

// importing styles
import './css/section1.css'
import 'bootstrap/dist/css/bootstrap.css';


const Section2 = ({ toggleBackground }) => {
    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <div
            className={`section2-content ${isDarkBackground ? 'dark-mode' : ''}`}

        //   bg="#f5f5f5"
        >
            <Typography
            >
                <p className='section2-companies-head'>We collaborate with
                    {" "}
                    <a href="#" className='section2-companies' >
                        300+ leading universities and companies
                    </a>
                </p>
            </Typography>
            <div className="section2-grid" >
                <div className="d-flex" >
                    <CardMedia
                        image={duke}
                        sx={{ maxHeight: 32, maxWidth: 93, minHeight: 21.5, minWidth: 62.66 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
                <div className="d-flex">
                    <CardMedia
                        image={google}
                        sx={{ maxHeight: 37, maxWidth: 108, minHeight: 21.46, minWidth: 62.68 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
                <div className="d-flex">
                    <CardMedia
                        image={ibm}
                        sx={{ maxHeight: 32, maxWidth: 80, minHeight: 25.06, minWidth: 62.66 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
                <div className="d-flex">
                    <CardMedia
                        image={illinois}
                        sx={{ maxHeight: 32, maxWidth: 93, minHeight: 12.76, minWidth: 62.66 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
                <div className="d-flex">
                    <CardMedia
                        image={imperial}
                        sx={{ maxHeight: 31.81, maxWidth: 121.8, minHeight: 16.36, minWidth: 62.68 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
                <div className="d-flex">
                    <CardMedia
                        image={michigan}
                        sx={{ maxHeight: 55, maxWidth: 52, minHeight: 55, minWidth: 52 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
                <div className="d-flex">
                    <CardMedia
                        image={penn}
                        sx={{ maxHeight: 37, maxWidth: 112, minHeight: 20.7, minWidth: 62.66 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
                <div className="d-flex">
                    <CardMedia
                        image={stanford}
                        sx={{ maxHeight: 26.1, maxWidth: 121.8, minHeight: 13.43, minWidth: 62.66 }}
                        component="img"
                        alt="Chakra Logo"
                    />
                </div>
            </div>
        </div>
    );
};

export default Section2;