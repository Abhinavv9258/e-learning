import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import { Typography, IconButton, Box } from '@mui/material';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import '../../assets/css/HomepageSection.css'

import CourseCard from './Cards';
import LoadingComponent from '../loadingComponent/LoadingComponent';

import { URL } from '../../App'


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


const Section4 = () => {

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const arr = [1, 2, 3, 4, 5];


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                }
            }
        ]
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
            console.error('Error:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);


    return (
        <>
            <Box style={{ padding: '2%' }} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h5'>
                    Development Course Details:
                </Typography>
                <Box className='slider-container' >
                    <Slider {...settings} >
                        {!loading
                            ? course?.map(
                                (el, i) =>
                                    (el.category === 'Web Development' || el.category === 'Development') &&
                                    (<CourseCard {...el} course={course[i]} loading={loading} key={el._id} />)
                            ) : arr.map(
                                (el, i) => <LoadingComponent key={i} />
                            )
                        }
                    </Slider>
                </Box>
            </Box>
        </>
    );
};

export default Section4;