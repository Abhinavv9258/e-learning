import React, { useEffect, useState } from "react";
// import { Box, Flex, Heading } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./LandingPageComponent.css";
import CourseCard from "./Cards";
import LoadingComponent from "../loadingComponent/LoadingComponent";

const LandingPageCarousel = () => {
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const arr = [1, 2, 3, 4];
    var settings = {
        swipe: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
            breakpoint: 800,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            },
        },
        {
            breakpoint: 500,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            },
        },
        ],
    };

    useEffect(() => {
        const url = `http://localhost:3030/courses/all`;
        setLoading(true);
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error: " + response.status);
            }
          })
          .then((data) => {
            setCourse(data.course);
            // console.log(data.course);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
          });
    }, []);


    return (
        <>
            <div className="section3-content" > 
                <Slider {...settings}>
                    {!loading
                    ? course?.map((el) => <CourseCard {...el} key={el._id} />)
                    : arr.map((el, i) => <LoadingComponent key={i} />)}
               </Slider> 
            </div> 
        </>
    );
};

export default LandingPageCarousel;