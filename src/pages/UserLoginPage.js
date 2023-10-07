import React from 'react';

// importing components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLoginForm from '../components/UserLoginForm'

const UserLoginPage = () => {
    return (
        <div className="app-container">
            <Navbar />
            <UserLoginForm />
            <Footer />            
        </div>
    );
};

export default UserLoginPage;