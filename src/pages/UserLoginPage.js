import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLoginForm from '../components/UserLoginForm'

const UserLoginPage = () => {
    return (
        <>
            <Navbar />
            <UserLoginForm />
            <Footer />            
        </>
    );
};

export default UserLoginPage;