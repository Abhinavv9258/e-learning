import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import { Typography, IconButton } from '@mui/material';
import CourseCard from './Cards';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { URL } from '../../App'

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


const Section3 = () => {

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const arr = [1, 2, 3, 4];

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
                breakpoint:720,
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
            <div style={{padding:'5%'}}>
                <div>
                    <Typography variant='h5'>
                        Course Details: 
                    </Typography>
                    <Slider {...settings} style={{display:'flex', alignItems:'center'}}>
                        {/* {course?.map((el) => <CourseCard {...el} loading={loading} key={el._id} />)} */}
                        {!loading
                            ? course?.map((el,i) => <CourseCard {...el} course={course[i]} loading={loading} key={el._id} />)
                            : arr.map((el, i) => <LoadingComponent key={i} />)
                        }
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default Section3;