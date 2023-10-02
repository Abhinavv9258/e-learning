import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLoginForm from '../components/UserLoginForm'
import { ToastContainer } from 'react-toastify';

const UserLoginPage = () => {
    return (
        <div className="app-container">
            <Navbar />
            <UserLoginForm />
            <ToastContainer />
            <Footer />            
        </div>
    );
};

export default UserLoginPage;