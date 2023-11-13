import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import { Typography, IconButton, Box } from '@mui/material';
import CourseCard from './Cards';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import '../../assets/css/HomepageSection.css'
import { URL } from '../../App'
import { useApp } from '../../context/AuthContext';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton onClick={onClick} className="slick-arrow next" >
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
    const arr = [1, 2, 3, 4];

    var settings = {
        // swipe: false,
        swipeToSlide: true,
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 2000,
        draggable: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
            // console.error('Error:', error);
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
                // console.log(data.enrolledCourseIds);
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

    return (
        <>
            <Box style={{ padding: '2%' }} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h5'>
                    My Course Details:
                </Typography>
                <Slider {...settings}>
                    {!loading
                        ? course
                            .filter((el) => userCourses.includes(el._id))
                            .map((el, i) => <CourseCard {...el} course={course[i]} loading={loading} key={el._id} />)
                        : arr.map((el, i) => <LoadingComponent key={i} />)
                    }
                </Slider>
            </Box>
        </>
    );
};

export default Section6;