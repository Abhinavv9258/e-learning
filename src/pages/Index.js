import React from 'react';
import Typed from 'react-typed';
import { 
    Typography, 
    Button, 
    CardMedia, 
    CardContent, 
    Card, 
    CardActionArea, 
    CardActions } from '@mui/material';
import { GrLinkNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing images
import adminLogin from '../assets/images/561-removebg.png'
import guestLogin from '../assets/images/565-removebg.png'
import userLogin from '../assets/images/558-removebg.png'

// importing components
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// importing styles
import '../App.css';
import '../assets/css/Index.css'
import 'bootstrap/dist/css/bootstrap.css';


const Index = () => { 
    useWebsiteTitle('E-Learn');

    return (
        <div className ='app-container'>
        <Navbar />
            <div className='index-body'>
                <div className='index-text'>
                    <strong>
                        E-Learn&nbsp;
                        <Typed strings={['E-Learning', 'Online Courses', 'Website.']} typeSpeed={200} backSpeed={70} loop />
                    </strong>
                    <p>
                        WELCOME TO, E-Learn
                        <br/> 
                        ONLINE LEARNING PORTAL FOR STUDENTS AND TEACHERS
                    </p>
                </div>

                <div className='d-flex index-card-deck' style={{width:'75%',justifyContent:'space-evenly'}}>

                    {/* Login As Guest */}
                    <Card className='index-cards' sx={{ maxWidth: 345 }}  style={{background:'transparent','margin':'10px'}}>
                        <CardActionArea style={{cursor:'default'}}>
                            <CardMedia
                            className='index-card-media'
                            component='img'
                            height='auto'
                                image={guestLogin}
                            alt='Admin Login'
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h6' component='div'>
                                    Guest User
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className='d-flex justify-content-center'>
                            <Link to='/Homepage'>
                                <Button className='index-btn' >
                                    Guest&nbsp;&nbsp;<GrLinkNext className='index-btn-icon'/>
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>

                    {/* Login As Admin */}
                    <Card className='index-cards' sx={{ maxWidth: 345 }} style={{ background: 'transparent', 'margin': '10px' }}>
                        <CardActionArea style={{ cursor: 'default' }}>
                            <CardMedia
                                className='index-card-media'
                                component='img'
                                height='auto'
                                image={adminLogin}
                                alt='Admin Login'
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h6' component='div'>
                                    Admin Login
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className='d-flex justify-content-center'>
                            <Link to='/Index'>
                                <Button className='index-btn' >
                                    Admin Login&nbsp;&nbsp;<GrLinkNext className='index-btn-icon' />
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>

                    {/* Login As User */}
                    <Card className='index-cards' sx={{ maxWidth: 345 }} style={{background:'transparent','margin':'10px'}}>
                        <CardActionArea style={{cursor:'default'}}>
                            <CardMedia
                            className='index-card-media'
                            component='img'
                            height='auto'
                            image={userLogin}
                            alt='User Login'
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h6' component='div'>
                                    User Login
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <CardActions className='d-flex justify-content-center'>
                            <Link to='/RegisterPage'>
                                <Button className='index-btn' >
                                    User Login&nbsp;&nbsp;<GrLinkNext/>
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Index;

