import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminLoginForm from '../components/AdminLoginForm'

const AdminLoginPage = () => {
    return (
        <>
            <Navbar />
            <AdminLoginForm />
            <Footer />            
        </>
    );
};

export default AdminLoginPage;