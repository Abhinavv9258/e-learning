import React from 'react';
import { useNavigate } from "react-router-dom";
import Typed from "react-typed";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import {
    Button,
} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import adminLogin from './css/559-removebg.png'
import  './css/section1.css'

const Section1 = () => {
    const navigate = useNavigate();
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
                        <br/> 
                        ONLINE LEARNING PORTAL FOR STUDENTS AND TEACHERS
                    </p>
                    <CardActions className="section1-btn-grp">
                        {/* <Link to='/RegisterPage'> */}
                            <Button
                                className="section1-btn"
                                onClick={() => navigate("/")}
                            >
                                Get Started
                            </Button>
                            <Button
                                className="section1-btn"
                                onClick={() => navigate("/Index")}
                            >
                                LogIn/SignUp
                            </Button>
                        {/* </Link> */}
                    </CardActions>
                </div>

            </div>

  
        </>
    );
};

export default Section1;