import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import { Typography } from '@mui/material';
import CourseCard from './Cards';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { URL } from '../../App'

const Section4 = () => {

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const arr = [1, 2, 3, 4];

    var settings = {
        swipe: true,
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
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
            <div style={{ padding: '5%' }}>
                <div>
                    <Typography variant='h5'>
                        Web Development Course Details:
                    </Typography>
                    <Slider {...settings}>
                        {/* {course?.map((el) => <CourseCard {...el} loading={loading} key={el._id} />)} */}
                        {!loading
                            ? course?.map((el) =>
                                el.category === 'Web Development' &&
                                (<CourseCard {...el} loading={loading} key={el._id} />)

                            )
                            : arr.map((el, i) => <LoadingComponent key={i} />)
                        }
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default Section4;