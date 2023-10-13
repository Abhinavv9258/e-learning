import React from 'react';

// importing components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLoginForm from '../components/UserLoginForm'

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

const UserLoginPage = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Login')

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <div className="app-container">
            <Navbar toggleBackground={toggleBackground} />
            <UserLoginForm />
            <Footer />            
        </div>
    );
};

export default UserLoginPage;