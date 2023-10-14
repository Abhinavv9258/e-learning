import React from 'react';
import Typed from 'react-typed';

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing images
import adminLogin from '../assets/images/561-removebg.png'
import guestLogin from '../assets/images/565-removebg.png'
import userLogin from '../assets/images/558-removebg.png'

// importing components
import Navbar from '../components/Navbar';
import LoginCard from '../components/LoginCard';
import Footer from '../components/Footer';

// importing styles
import '../App.css';
import '../assets/css/Index.css'
import 'bootstrap/dist/css/bootstrap.css';


const Index = ({ toggleBackground }) => { 

    useWebsiteTitle('E-Learn');

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <div className ='app-container'>
            <Navbar toggleBackground={toggleBackground}/>
            <div className='index-body'>
                <div className='index-text'>
                    <strong>
                        E-Learn&nbsp;
                        <Typed strings={['E-Learning', 'Online Courses', 'Website.']} typeSpeed={200} backSpeed={70} loop />
                    </strong>
                    <p>
                        WELCOME TO, E-Learn
                        <br/> 
                        ONLINE LEARNING PORTAL FOR STUDENTS AND TEACHERS
                    </p>
                </div>

                <div className='d-flex index-card-deck'>
                    
                    {/* Login As Guest */}
                    <LoginCard cardImage={guestLogin} cardName='Guest User' cardButton='Guest' cardUrl='/homepage' />

                    {/* Login As Admin */}
                    <LoginCard cardImage={adminLogin} cardName='Admin Login' cardButton='Admin Login' cardUrl='/admin-login-page' />

                    {/* Login As User */}
                    <LoginCard cardImage={userLogin} cardName='User Login' cardButton='User Login' cardUrl='/user-login-page' />

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Index;

