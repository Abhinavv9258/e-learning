import React from 'react';
import Section1 from './landingPages/section1';
import Section2 from './landingPages/section2';
import Section3 from './landingPages/section3';
import Section4 from './landingPages/section4';
import Section5 from './landingPages/section5';
import Cards from './landingPages/Cards';
import Footer from './Footer';
import Navbar from './Navbar';

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <Section1 />
            <Section2 />
            {/* <Section3 />
            <Section4 />
            <Section5 /> */}
            <Footer />
        </div>
    );
};

export default Homepage;