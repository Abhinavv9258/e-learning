import React from 'react';

// import { useNavigate } from 'react-router-dom';

// importing components
import Section1 from '../components/homepageComponent/section1';
import Section2 from '../components/homepageComponent/section2';
import Section3 from '../components/homepageComponent/section3';
import Section4 from '../components/homepageComponent/section4';
import Section5 from '../components/homepageComponent/section5';
// import Section6 from '../components/homepageComponent/section6';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// importing hooks
// import { useApp } from '../context/AuthContext';

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing server side url
// import { URL } from '../App';


const Homepage = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Homepage');
    // const navigate = useNavigate();
    // const { user } = useApp();

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    // const dashboard = async() => {
    //     let token = localStorage.getItem("access_token");
    //     const res = await fetch(`${URL}/api/users/checkuser/${user._id}`, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}` // Set the authorization header correctly
    //         },
    //         credentials: 'include' // Include cookies
    //     });
    //     const data = await res.json();
    //     if (data.status === 500 || !data) {
    //         console.log("error");
    //     } else {
    //         navigate('/homepage');
    //     }
    // }

    // useEffect(() => {
    //     // Check if the user is logged in before running the dashboard function
    //     if (user) {
    //         dashboard();
    //     }
    //     // eslint-disable-next-line
    // }, [user]);

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

            {/* Web Development Category Courses */}
            <Section4 id="section4" />

            {/* Programming Language Category Courses */}
            <Section5 id="section5" />  

            {/* User Registered Courses */}
            {/* {user ? (
                <>
                    <Section6 />
                </>
            ) : (
                null
            )} */}

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default Homepage;