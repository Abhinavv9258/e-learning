import React from 'react';

// importing components 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
    return (
        <div className="app-container">
            <Navbar />
            <RegisterForm />
            <Footer />
        </div>
    );
};

export default RegisterPage;