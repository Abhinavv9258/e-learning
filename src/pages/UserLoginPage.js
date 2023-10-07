import React from 'react';

// importing components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLoginForm from '../components/UserLoginForm'

const UserLoginPage = ({ toggleBackground }) => {

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