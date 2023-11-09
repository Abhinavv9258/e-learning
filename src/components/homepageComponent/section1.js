import React from 'react';
import { useNavigate } from "react-router-dom";

import Typed from "react-typed";
import {
    CardMedia,
    Typography,
    CardActions,
    Button
} from '@mui/material';

// importing images
import adminLogin from '../../assets/images/559-removebg.png'

// importing styles
import '../../assets/css/HomepageSection.css'
import 'bootstrap/dist/css/bootstrap.css';

// importing icon
import { FaArrowRightLong } from "react-icons/fa6";


const Section1 = () => {
    const navigate = useNavigate();

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <>
            <div className="section1-content">
                <div className="section1-image">
                    <CardMedia
                        className="section1-card-media"
                        component="img"
                        style={{ maxWidth:"456px" }}   
                        image={adminLogin}
                        alt="Admin Login"
                    />
                </div>
                <div className="section1-text">
                    <strong>
                        E-Learn&nbsp;
                        <Typed strings={['E-Learning', 'Online Course', 'Website.']} typeSpeed={200} backSpeed={70} loop />
                    </strong>
                    <Typography style={{ textAlign: 'center' }}>
                        WELCOME TO E-Learn,
                    </Typography>
                    <Typography style={{ textAlign: 'center' }}>
                        ONLINE LEARNING PORTAL FOR STUDENTS AND TEACHERS
                    </Typography>
                    <CardActions className="section1-btn-grp d-flex justify-content-center">
                        <Button
                            className={`section1-btn ${isDarkBackground ? 'dark-mode' : 'light-mode'}`}
                            onClick={() => navigate("/Index")}
                        >
                            <Typography>
                                Get Started &nbsp;
                            </Typography>
                            <FaArrowRightLong />
                        </Button>
                    </CardActions>
                </div>
            </div>
        </>
    );
};

export default Section1;