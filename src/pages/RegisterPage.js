import React from 'react';

// importing components 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';



const RegisterPage = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Register');

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

    return (
        <div className="app-container">
            <Navbar toggleBackground={toggleBackground} />
            <RegisterForm />
            <Footer />
        </div>
    );
};

export default RegisterPage;