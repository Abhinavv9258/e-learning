import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    FormControl,
    InputLabel,
    Input,
    Button,
} from '@material-ui/core';

// importing icons
import { FaYoutube, 
    FaTwitter, 
    FaFacebookSquare } from 'react-icons/fa';

// importing styles
import '../assets/css/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Footer.css'


const Footer = () => {
    const navigate = useNavigate();

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

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
                                    <h5 className='widget-title'>E-Learn: Online Learning Portal
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </h5>
                                    <p>E-Learn is an innovative online learning portal that utilizes a robust tech stack to deliver a seamless and engaging learning experience.  </p>
                                </div>
                            </div>

                            <div className='col-xs-12 col-sm-6 col-md-3'>
                                <div className='widget no-box'>
                                    <h5 className='widget-title'>Quick Links
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </h5>
                                    <ul className='thumbnail-widget'>
                                        <li>
                                            <div className='thumb-content' onClick={() => navigate('/')}>
                                                {/* &nbsp; */}
                                                Get Started
                                            </div>
                                        </li>
                                        <li>
                                            <div className='thumb-content' onClick={() => navigate('/')}>
                                                {/* &nbsp; */}
                                                Top Performers
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='col-xs-12 col-sm-6 col-md-3'>
                                <div className='widget no-box'>
                                    <h5 className='widget-title'>Follow up
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </h5>
                                    <section className='social-section'>
                                        <Button className='social-btn btn-outline-dark btn-floating m-1' href='#!'><FaYoutube className='social-icon' /></Button>
                                        <Button className='social-btn btn-outline-dark btn-floating m-1' href='#!'><FaFacebookSquare className='social-icon' /></Button>
                                        <Button className='social-btn btn-outline-dark btn-floating m-1' href='#!'><FaTwitter className='social-icon' /></Button>
                                    </section>
                                </div>
                            </div>
                            <br />
                            <br />

                            <div className='col-xs-12 col-sm-6 col-md-3'>
                                <div className='widget no-box'>
                                    <h5 className='widget-title'>Contact Us
                                        <span className='upper-line'></span>
                                        <span className='lower-line'></span>
                                    </h5>
                                    <p>Subscribe us for daily updates and news.</p>
                                    <div className='emailField'>
                                        <FormControl className='footer-input-label'>
                                            <InputLabel>Email</InputLabel>
                                            <Input type='email' name='email' style={{ width: '100%' }} />
                                        </FormControl>
                                        <Button className='navbar-btn' style={{ width: '75%' }} type='submit' value='submit'> Subscribe </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='footer-copyright'>
                        <div className='container' >
                            <div className='row'>
                                <div className='col-md-12 text-center' >
                                    <p>Copyright Abhinav Verma © 2023. All rights reserved.</p>
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