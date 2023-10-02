import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'
import { ToastContainer } from 'react-toastify';

const RegisterPage = () => {
    return (
        <div className="app-container">
            <Navbar />
            <RegisterForm />
            <ToastContainer/>
            <Footer />
        </div>
    );
};

export default RegisterPage;