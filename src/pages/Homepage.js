import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// importing components
import Section1 from '../components/landingPages/section1';
import Section2 from '../components/landingPages/section2';
// import Section3 from '../components/landingPages/section3';
// import Section4 from '../components/landingPages/section4';
// import Section5 from '../components/landingPages/section5';
// import Cards from '../components/landingPages/Cards';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// importing hooks
import { useUser } from '../context/AuthContext';

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing server side url
import { URL } from '../App';


const Homepage = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Homepage');
    const navigate = useNavigate();
    const { user } = useUser();

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    const dashboard = async() => {
        let token = localStorage.getItem("access_token");
        const res = await fetch(`${URL}/api/users/checkuser/${user.userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Set the authorization header correctly
            },
            credentials: 'include' // Include cookies
        });
        const data = await res.json();
        if (data.status === 500 || !data) {
            console.log("error");
        } else {
            navigate('/homepage');
        }
    }

    useEffect(() => {
        // Check if the user is logged in before running the dashboard function
        if (user) {
            dashboard();
        }
    }, [user]);

    return (
        <div className='app-container'>
            <Navbar toggleBackground={toggleBackground} />
            <Section1 toggleBackground={toggleBackground} />

            <Section2 toggleBackground={toggleBackground} />
            {/* <Section3 />
            <Section4 />
            <Section5 /> */}
            <Footer />
        </div>
    );
};

export default Homepage;