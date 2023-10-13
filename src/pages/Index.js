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

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing icons
import { FaArrowRightLong } from "react-icons/fa6";

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


const Index = ({ toggleBackground }) => { 

    useWebsiteTitle('E-Learn');

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <div className ='app-container'>
            <Navbar toggleBackground={toggleBackground}/>
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

                <div className='d-flex index-card-deck'>
                    
                    {/* Login As Guest */}
                    <Card className='index-cards' sx={{ maxWidth: 345 }}>
                        <CardActionArea style={{cursor:'default'}}>
                            <CardMedia
                            className='index-card-media'
                            component='img'
                            height='auto'
                                image={guestLogin}
                            alt='Admin Login'
                            />
                        </CardActionArea>
                        <CardContent>
                            <Typography className={`${isDarkBackground ? 'dark-mode' : 'light-mode'}`} gutterBottom variant='h6' component='div'>
                                Guest User
                            </Typography>
                        </CardContent>
                        <CardActions className='d-flex justify-content-center'>
                                <Button href='/Homepage' className={`index-btn ${isDarkBackground ? 'dark-mode' : 'light-mode'}`} >
                                    <Typography>
                                    Guest &nbsp;
                                    </Typography>
                                    <FaArrowRightLong />
                                </Button>
                        </CardActions>
                    </Card>

                    {/* Login As Admin */}
                    <Card className='index-cards' sx={{ maxWidth: 345 }}>
                        <CardActionArea style={{ cursor: 'default' }}>
                            <CardMedia
                                className='index-card-media'
                                component='img'
                                height='auto'
                                image={adminLogin}
                                alt='Admin Login'
                            />
                        </CardActionArea>
                        <CardContent>
                            <Typography className={`${isDarkBackground ? 'dark-mode' : 'light-mode'}`} gutterBottom variant='h6' component='div'>
                                Admin Login
                            </Typography>
                        </CardContent>
                        <CardActions className='d-flex justify-content-center'>
                                <Button href='/AdminLoginPage' className={`index-btn ${isDarkBackground ? 'dark-mode' : 'light-mode'}`} >
                                    <Typography>
                                        Admin Login &nbsp;
                                    </Typography>
                                    <FaArrowRightLong />
                                </Button>
                        </CardActions>
                    </Card>

                    {/* Login As User */}
                    <Card className='index-cards' sx={{ maxWidth: 345 }}>
                        <CardActionArea style={{cursor:'default'}}>
                            <CardMedia
                            className='index-card-media'
                            component='img'
                            height='auto'
                            image={userLogin}
                            alt='User Login'
                            />
                        </CardActionArea>
                        <CardContent>
                            <Typography className={`${isDarkBackground ? 'dark-mode' : 'light-mode'}`} gutterBottom variant='h6' component='div'>
                                User Login
                            </Typography>
                        </CardContent>
                        <CardActions className='d-flex justify-content-center'>
                                <Button href='/RegisterPage' className={`index-btn ${isDarkBackground ? 'dark-mode' : 'light-mode'}`} >
                                <Typography>
                                    User Login &nbsp;
                                </Typography>
                                <FaArrowRightLong />
                                </Button>
                        </CardActions>
                    </Card>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Index;

