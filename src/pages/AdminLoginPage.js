import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminLoginForm from '../components/Admin/AdminLoginForm'

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';



const AdminLoginPage = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Admin Login');

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
        <>
            <div className='app-container'>
                <Navbar toggleBackground={toggleBackground} />
                <AdminLoginForm />
                <Footer />
            </div>
        </>
    );
};

export default AdminLoginPage;