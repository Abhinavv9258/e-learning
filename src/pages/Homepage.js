import React from 'react';

// importing components
import Section1 from '../components/landingPages/section1';
import Section2 from '../components/landingPages/section2';
// import Section3 from '../components/landingPages/section3';
// import Section4 from '../components/landingPages/section4';
// import Section5 from '../components/landingPages/section5';
// import Cards from '../components/landingPages/Cards';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const Homepage = ({ toggleBackground }) => {

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <div className='app-container'>
            <Navbar toggleBackground={toggleBackground} />
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