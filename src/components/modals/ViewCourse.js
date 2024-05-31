import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import {
    Button,
    Typography,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { URL } from '../../App';
import { useApp } from '../../context/AuthContext'

import './Modals.css';
import LoginPopUp from './LoginPopUp';


const Example = ({ modal, toggleCourse, courseDetails }) => {

    const { user } = useApp();
    const [loginPopUp, setLoginPopUp] = React.useState(false);

    // const sections = ['About', 'Instructor', 'Syllabus', 'Enrollment Options'];
    const [activeSection, setActiveSection] = useState('About');
    // const [underlineStyle, setUnderlineStyle] = useState({});
    const [clickedBox, setClickedBox] = useState('About');

    const handleSectionClick = (sectionName) => {
        setActiveSection(sectionName);
        setClickedBox(sectionName);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkout = async (price) => {
        setLoading(true);
        setError(null);
        if (!user) {
            setLoginPopUp(!loginPopUp);
        } else {
            try {
                const sessionOptions = {
                    customer_email: "customer@example.com",
                    metadata: {
                        courseId: "course123",
                        userId: "user123",
                    },
                };
                const response = await fetch(`${URL}/api/v1/create-checkout-course`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ price, sessionOptions }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create payment intent');
                }

                const { clientSecret } = await response.json();

                navigate('/payment', { state: { clientSecret, courseDetails } });
                setClientSecret(clientSecret);
            } catch (e) {
                console.error("Error during checkout:", e);
                setError(e.message || 'An error occurred during checkout. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        setLoading(false);
    };

    const handleClick = (price) => {
        setLoading(true);
        setTimeout(() => {
            checkout(price);
        }, 2000);
    };

    // const checkout = async (price) => {
    //     await fetch(`${URL}/api/v1/create-checkout-course`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         mode: "cors",
    //         // body: JSON.stringify({ price: price, userId: user._id }),
    //         body: JSON.stringify({ price: price }),

    //     })
    //         .then((res) => {
    //             if (res.ok) return res.json();
    //             console.log(res);
    //             return res.json().then((json) => Promise.reject(json));
    //         })
    //         .then(({ session }) => {
    //             window.location = session.url;
    //         })
    //         .catch((e) => {
    //             console.log("error: ", e);
    //         })
    // }

    return (
        <>
            {courseDetails ? (
                <Modal isOpen={modal}
                    toggle={toggleCourse}
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                            {courseDetails.title}
                        </Typography>
                        <Typography>
                            {courseDetails.category}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            ₹{courseDetails.price}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={toggleCourse}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                                fontSize: '2rem',
                                fontWeight: 'bold',
                            }}
                        >
                            <Tooltip title='Close'>
                                <CloseIcon sx={{ fontSize: '2rem' }} />
                            </Tooltip>
                        </IconButton>
                    </ModalHeader>
                    <ModalBody style={{ borderBottom: '1px solid #DEE2E6', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Box
                                className={clickedBox === 'About' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('About')}
                            >
                                About
                            </Box>
                            <Box
                                className={clickedBox === 'Instructor' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('Instructor')}
                            >
                                Instructor
                            </Box>
                            <Box
                                className={clickedBox === 'Syllabus' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('Syllabus')}
                            >
                                Syllabus
                            </Box>
                            <Box
                                className={clickedBox === 'Enrollment Options' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('Enrollment Options')}
                            >
                                Enrollment Options
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalBody>
                        {activeSection === 'About' && <>
                            <Typography>
                                {courseDetails.description}
                            </Typography>
                        </>}
                        {activeSection === 'Instructor' && <>
                            <Typography>
                            Our instructors are industry experts with extensive experience in software development. They bring real-world insights and practical knowledge to the classroom, ensuring that you learn the most relevant and up-to-date skills. Each instructor is passionate about teaching and committed to helping you succeed in your career.
                            </Typography>
                        </>}
                        {activeSection === 'Syllabus' && <>
                            <Typography>
                            This course covers fundamental and advanced topics in software development. You will learn programming languages, algorithms, data structures, software engineering principles, web development, and database management. The syllabus is designed to build a strong foundation and progressively introduce more complex concepts and technologies.
                            </Typography>
                        </>}
                        {activeSection === 'Enrollment Options' && <>
                            <Typography>
                            We offer flexible enrollment options to suit your needs. Choose from full-time or part-time schedules, with both in-person and online classes available. Enroll today to start your journey towards becoming a proficient software developer, with access to comprehensive resources and support throughout your learning experience.
                            </Typography>
                        </>}
                    </ModalBody>

                    <ModalFooter style={{ 'padding': '16px' }}>
                        <Button color="primary" disabled sx={{ border: 2 }}>
                            <AddShoppingCartIcon /> Add to Cart
                        </Button>{' '}
                        <Button
                            sx={{ border: 2 }}
                            color={loading ? 'primary' : 'secondary'}
                            onClick={() => handleClick(courseDetails.price)} disabled={loading}>
                            {loading ?
                                (
                                    <>
                                        <Box className="loader2"
                                            sx={{ mr: 1 }}
                                        ></Box> Processing...
                                    </>
                                ) : (
                                    <>
                                        <FlashOnIcon /> Checkout
                                    </>
                                )
                            }
                        </Button>
                    </ModalFooter>
                </Modal >
            ) : (null)}
            <LoginPopUp
                open={loginPopUp}
                onClose={checkout}
                setLoginPopUp={setLoginPopUp}
            />
        </>
    );
}

export default Example;