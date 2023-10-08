import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminLoginForm from '../components/AdminLoginForm'

const AdminLoginPage = ({ toggleBackground }) => {
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