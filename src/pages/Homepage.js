import React from 'react';

// importing components
import Section1 from '../components/homepageComponent/section1';
import Section2 from '../components/homepageComponent/section2';
import Section3 from '../components/homepageComponent/section3';
import Section4 from '../components/homepageComponent/section4';
import Section5 from '../components/homepageComponent/section5';
import Section6 from '../components/homepageComponent/section6';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import {
    Divider
} from '@mui/material';

import { URL } from '../App';

// importing hooks
import { useApp } from '../context/AuthContext';

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing styles
import '../assets/css/HomepageSection.css'


const Homepage = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Homepage');
    // const navigate = useNavigate();
    const { user } = useApp();

    React.useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }, []); 

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    const [modal, setModal] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState();

    const toggleCourse = (course) => {
        setCourseDetails(course);
        setModal(!modal);
    }

    const [course, setCourse] = React.useState([]);
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
                })
                .catch((error) => {
                    console.error('Error:', error);
                    console.log('Error:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='app-container'>

            {/* Navbar */}
            <Navbar toggleBackground={toggleBackground} />

            {/* Homepage Section */}
            <Section1 id="section1" toggleBackground={toggleBackground} />

            {/* Company Section */}
            <Section2 id="section2" toggleBackground={toggleBackground} />

            {/* All Courses */}
            <Section3 id="section3" />
            <Divider style={{ 'border-color': 'black' }} />

            {/* Web Development Category Courses */}
            <Section4 id="section4" />
            <Divider style={{ 'border-color': 'black' }} />

            {/* Programming Language Category Courses */}
            <Section5 id="section5" />
            <Divider style={{ 'border-color': 'black' }} />

            {/* User Registered Courses */}
            {user ? (
                <>
                    <Section6 style={{ 'border-color': 'black' }} />
                </>
            ) : (
                null
            )}

            {/* Footer */}
            <Footer />
            
        </div>
    );
};

export default Homepage;