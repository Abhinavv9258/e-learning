import React from 'react';
import { useNavigate } from "react-router-dom";

import Typed from "react-typed";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    // CardActionArea, 
    CardActions,
    Button
} from '@mui/material';

// importing images
import adminLogin from './css/559-removebg.png'

// importing styles
import './css/section1.css'
import 'bootstrap/dist/css/bootstrap.css';

// importing icon
import { FaArrowRightLong } from "react-icons/fa6";


const Section1 = ({ toggleBackground }) => {
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
                        maxWidth="456px"
                        image={adminLogin}
                        alt="Admin Login"
                    />
                </div>
                <div className="section1-text">
                    <strong>
                        E-Learn&nbsp;
                        <Typed strings={['E-Learning', 'Online Course', 'Website.']} typeSpeed={200} backSpeed={70} loop />
                    </strong>
                    <p>
                        WELCOME TO, E-Learn
                        <br />
                        ONLINE LEARNING PORTAL FOR STUDENTS AND TEACHERS
                    </p>
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

                        <Button
                            className={`section1-btn ${isDarkBackground ? 'dark-mode' : 'light-mode'}`}
                            onClick={() => navigate("/AdminLoginPage")}
                        >
                            <Typography>
                                Admin LogIn &nbsp;
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