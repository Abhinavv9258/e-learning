import React from 'react';

// import { useNavigate } from 'react-router-dom';

// importing components
import Section1 from '../components/homepageComponent/section1';
import Section2 from '../components/homepageComponent/section2';
import Section3 from '../components/homepageComponent/section3';
import Section4 from '../components/homepageComponent/section4';
import Section5 from '../components/homepageComponent/section5';
import Section6 from '../components/homepageComponent/section6';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import {
    Box,
    Typography,
    Card,
    Button,
    Divider,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia
} from '@mui/material';

import { URL } from '../App';

// importing hooks
import { useApp } from '../context/AuthContext';

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing server side url
// import { URL } from '../App';
import { TbDiscountCheckFilled } from "react-icons/tb";

import ViewCourse from '../components/modals/ViewCourse'

import '../assets/css/HomepageSection.css'

import Slider from 'react-slick';



const Homepage = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Homepage');
    // const navigate = useNavigate();
    const { user } = useApp();

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    // const dashboard = async() => {
    //     let token = localStorage.getItem("access_token");
    //     const res = await fetch(`${URL}/api/users/checkuser/${user._id}`, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}` // Set the authorization header correctly
    //         },
    //         credentials: 'include' // Include cookies
    //     });
    //     const data = await res.json();
    //     if (data.status === 500 || !data) {
    //         console.log("error");
    //     } else {
    //         navigate('/homepage');
    //     }
    // }
    //
    // useEffect(() => {
    //     // Check if the user is logged in before running the dashboard function
    //     if (user) {
    //         dashboard();
    //     }
    //     // eslint-disable-next-line
    // }, [user]);


    const [modal, setModal] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState();

    const toggleCourse = (course) => {
        setCourseDetails(course);
        setModal(!modal);
    }

    const [course, setCourse] = React.useState([]);
    const fetchData = () => {
        try {
            fetch(`${URL}/api/courses/`, {
                method: 'GET',
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error: ' + response.status);
                    }
                })
                .then((data) => {
                    setCourse(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    console.log('Error:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    var settings = {
        swipe: false,
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='app-container'>

            {/* Navbar */}
            <Navbar toggleBackground={toggleBackground} />

            {/* Homepage Section */}
            <Section1 id="section1" toggleBackground={toggleBackground} />

            {/* Company Section */}
            <Section2 id="section2" toggleBackground={toggleBackground} />

            {/* All Courses */}
            {/* <Section3 id="section3" /> */}

            {/* Web Development Category Courses */}
            {/* <Section4 id="section4" /> */}

            {/* Programming Language Category Courses */}
            {/* <Section5 id="section5" />   */}

            {/* User Registered Courses */}
            {/* {user ? (
                <>
                    <Section6 />
                </>
            ) : (
                null
            )} */}

            <Box style={{ padding: '5%' }}>
                <Typography variant='h5'>
                    Course Details:
                </Typography>
                <Slider {...settings}
                    className='course-list'>
                    {
                        course?.map((el, i) =>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}
                                {...el} course={course[i]} key={el._id} >
                                <Card className="course-card">
                                    <CardHeader sx={{ height: '160px', p: 0 }}
                                        title={
                                            <CardMedia
                                                component="img"
                                                alt={course[i].title}
                                                image={JSON.parse(course[i].thumbnail).base64}
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: '5px',
                                                    border: '1px solid '
                                                }}
                                            />
                                        }
                                    />
                                    <CardContent
                                        sx={{ padding: 0, width: '250px', height: '120px' }}
                                    >
                                        <Typography
                                            fontSize="sm"
                                            fontWeight="bold"
                                            color="#a7a7a7"
                                            textTransform={"capitalize"}
                                        >
                                            {course[i].category}
                                        </Typography>
                                        <Typography
                                            fontSize="sm"
                                        >
                                            {course[i].subCategory}
                                        </Typography>
                                        <Typography
                                            fontSize="lg"
                                            fontWeight="bold"
                                            mb={2}
                                            textTransform={"capitalize"}
                                        >
                                            {course[i].title}
                                        </Typography>
                                    </CardContent>
                                    <Divider sx={{ border: 1 }} />
                                    <CardActions sx={{ justifyContent: 'space-between' }}>
                                        <Button
                                            sx={{ color: '#970C10' }}
                                            onClick={() => toggleCourse(course[i])}
                                        >
                                            View Course
                                        </Button>
                                        {course[i].price === 0 ? (
                                            <>
                                                <Button variant="contained" color="success">
                                                    <Box><TbDiscountCheckFilled size={20} /> FREE</Box>
                                                </Button>

                                            </>
                                        ) : (
                                            <>
                                                <Button variant="contained" color="primary">
                                                    <Box><TbDiscountCheckFilled size={20} />{course[i].price}</Box>
                                                </Button>
                                            </>
                                        )}
                                    </CardActions>
                                </Card>
                            </Box>)
                    }
                </Slider>
            </Box>

            <ViewCourse modal={modal} courseDetails={courseDetails} toggleCourse={toggleCourse} />


            {/* Footer */}
            <Footer />

        </div>
    );
};

export default Homepage;