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


const Example = ({ modal, toggleCourse, courseDetails }) => {
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
                            Instructor
                        </>}
                        {activeSection === 'Syllabus' && <>
                            Syllabus
                        </>}
                        {activeSection === 'Enrollment Options' && <>
                            Enrollment Options
                        </>}
                    </ModalBody>

                    <ModalFooter style={{ 'padding': '16px' }}>
                        <Button color="primary" disabled>
                            <AddShoppingCartIcon /> Add to Cart
                        </Button>{' '}
                        {/* <Button color="secondary"
                            onClick={() => checkout(Number(courseDetails.price))}
                        >
                            <FlashOnIcon /> Buy Now
                        </Button> */}
                        <Button color="secondary" onClick={() => checkout(courseDetails.price)} disabled={loading}>
                            {loading ? 'Processing...' : 'Checkout'}
                        </Button>
                    </ModalFooter>
                </Modal>
            ) : (null)}

        </>
    );
}

export default Example;