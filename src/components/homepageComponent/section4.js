import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import { Typography, IconButton, Box } from '@mui/material';
import CourseCard from './Cards';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { URL } from '../../App'
import '../../assets/css/HomepageSection.css'


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


const Section4 = () => {

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const arr = [1, 2, 3, 4, 5];

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
                <div {...settings} style={{display:'flex','flex-wrap':'wrap'}}>
                    {!loading
                        ? course?.map(
                            (el, i) =>
                            (el.category === 'Web Development' || el.category === 'Development') &&
                            (<CourseCard {...el} course={course[i]} loading={loading} key={el._id} />)
                        ) : arr.map((el, i) => <LoadingComponent key={i} />)
                    }
                </div>
            </Box>
        </>
    );
};

export default Section4;