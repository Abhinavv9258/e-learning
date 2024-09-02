import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { Typography, IconButton, Box } from '@mui/material';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import '../../assets/css/HomepageSection.css';

import CourseCard from './Cards';
import LoadingComponent from '../loadingComponent/LoadingComponent';

import { URL } from '../../App';
import { useApp } from '../../context/AuthContext';


const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton onClick={onClick} className="slick-arrow next">
            <KeyboardDoubleArrowRightIcon className="slick-next-arrow" />
        </IconButton>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton onClick={onClick} className="slick-arrow prev">
            <KeyboardDoubleArrowLeftIcon className="slick-prev-arrow" />
        </IconButton>
    );
};

const Section6 = () => {
    const { user } = useApp();
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const arr = [1, 2, 3, 4, 5];

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
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    console.log('Error:', error);
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
        }
    };

    const fetchUserEnrolledCourses = async () => {
        try {
            const userId = user._id;
            const token = localStorage.getItem('access_token');

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            };

            const response = await fetch(`${URL}/api/users/${userId}/enrolled-courses`, requestOptions);

            if (response.ok) {
                const data = await response.json();
                setUserCourses(data.enrolledCourseIds);
            } else {
                setUserCourses([]);
            }
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
            setUserCourses([]);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
        fetchUserEnrolledCourses();
    }, [user]);

    const enrolledCourses = course.filter((el) => userCourses.includes(el._id));
    const slidesToShow = loading ? 4 : Math.min(enrolledCourses, 4);
    const infinite = loading || enrolledCourses > 4;
    const autoplay = loading || enrolledCourses > 1;

    // Adjust the slider settings
    const settings = {
        infinite,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: loading ? 3 : Math.min(enrolledCourses, 3),
                    slidesToScroll: 1,
                    infinite: loading || enrolledCourses > 3,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: loading ? 3 : Math.min(enrolledCourses, 3),
                    slidesToScroll: 1,
                    infinite: loading || enrolledCourses > 3,
                }
            },
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: loading ? 2 : Math.min(enrolledCourses, 2),
                    slidesToScroll: 1,
                    infinite: loading || enrolledCourses > 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: loading ? 1 : Math.min(enrolledCourses, 1),
                    slidesToScroll: 1,
                    infinite: loading || enrolledCourses > 1,
                }
            }
        ]
    };

    return (
        <>
            <Box style={{ padding: '2%' }} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h5'>
                    My Course Details: {enrolledCourses.length}
                </Typography>
                <Box className='slider-container'>
                    {!loading ? (
                        enrolledCourses.length > 0 ? (
                            <Slider {...settings}>
                                {enrolledCourses.map((el, i) => (
                                    <CourseCard {...el} course={course[i]} loading={loading} key={el._id} />
                                ))}
                            </Slider>
                        ) : (
                            <Box style={{ padding: '20px', textAlign: 'center' }}>
                                <Typography variant='h6'>
                                    You have not enrolled in any courses yet.
                                </Typography>
                                <Typography variant='body1'>
                                    Please add courses to view them here.
                                </Typography>
                            </Box>
                        )
                    ) : (
                        <Slider {...settings}>
                            {arr.map((el, i) => <LoadingComponent key={i} />)}
                        </Slider>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Section6;
