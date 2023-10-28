import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    FormControl,
    InputLabel,
    Input,
    Button,
    Typography
} from '@mui/material';

// importing icons
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

// importing styles
import '../assets/css/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Footer.css'

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing server side url
import { URL } from '../App';



const Footer = () => {
    const [email, setEmail] = useState('');

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 200) {
                // Email sent successfully
                toast.success('Email sent successfully.', {
                    position: 'top-center'
                });
            } else {
                // Handle email sending failure
                toast.error('Failed to send the email. Please try again later.', {
                    position: 'top-center'
                });
            }
        } catch (error) {
            // Handle errors.
            console.error('Error:', error);
            console.log(error)
            toast.error('An error occurred while sending the email.', {
                position: 'top-center'
            });
        }
    };

    return (
        <>
            <footer id='footer'
                className={`footer-1 ${isDarkBackground ? 'dark-mode' : 'light-mode'}`}
            >
                <div className='main-footer widgets-dark typo-light'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-6 col-md-3'>
                                <div className='widget subscribe no-box'>
                                    <Typography style={{ marginBottom: 10 }} variant='h6' gutterBottom>
                                        E-Learn: Online Learning Portal
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </Typography>
                                    <Typography paragraph>
                                        E-Learn is an innovative online learning portal that utilizes a robust tech stack to deliver a seamless and engaging learning experience.
                                    </Typography>

                                </div>
                            </div>

                            <div className='col-xs-12 col-sm-6 col-md-3'>
                                <div className='widget no-box'>
                                    <Typography style={{ marginBottom: 10 }} variant='h6' gutterBottom>
                                        Company
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </Typography>
                                    <ul className='thumbnail-widget'>
                                        <li>
                                            <Typography>
                                                <Link className='thumb-content' to='/'>
                                                    About Us
                                                </Link>
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography>
                                                <Link className='thumb-content' to='/'>
                                                    Contact Us
                                                </Link>
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography>
                                                <Link className='thumb-content' to='/'>
                                                    Student Review
                                                </Link>
                                            </Typography>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='col-xs-12 col-sm-6 col-md-3'>
                                <div className='widget no-box'>
                                    <Typography style={{ marginBottom: 10 }} variant='h6' gutterBottom>
                                        Follow Us
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </Typography>
                                    <section className='social-section'>
                                        <Button className='social-btn btn-outline-dark btn-floating m-1' href='#!'><YouTubeIcon className='social-icon' /></Button>
                                        <Button className='social-btn btn-outline-dark btn-floating m-1' href='#!'><FacebookIcon className='social-icon' /></Button>
                                        <Button className='social-btn btn-outline-dark btn-floating m-1' href='#!'><TwitterIcon className='social-icon' /></Button>
                                    </section>
                                </div>
                            </div>
                            <br />
                            <br />

                            <div className='col-xs-12 col-sm-6 col-md-3'>
                                <div className='widget no-box'>
                                    <Typography style={{ marginBottom: 10 }} variant='h6' gutterBottom>
                                        Contact Us
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </Typography>
                                    <Typography paragraph style={{ margin: 0 }}>
                                        Subscribe us for daily updates and news.
                                    </Typography>
                                    <div className='emailField'>
                                        <FormControl className='footer-input-label'>
                                            <InputLabel className={`${isDarkBackground ? 'dark' : 'light'}`}>Email</InputLabel>
                                            <Input
                                                type='email'
                                                className={`${isDarkBackground ? 'dark' : 'light'}`}
                                                name='email'
                                                style={{ width: '100%', marginBottom: 10 }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </FormControl>
                                        <Button 
                                            className={`footer-btn ${isDarkBackground ? 'dark' : 'light'}`}
                                            style={{ width: '75%' }} 
                                            type='submit' 
                                            value='submit' 
                                            onClick={handleSubmit}
                                        >
                                            <Typography className={`${isDarkBackground ? 'dark' : 'light'}`}>
                                                Subscribe
                                            </Typography>
                                            
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='footer-copyright'>
                        <div className='container' >
                            <div className='row'>
                                <div className='col-md-12 text-center' >
                                    <Typography paragraph>
                                        Copyright Abhinav Verma © 2023. All rights reserved.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;