import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { useNavigate } from 'react-router-dom';

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing hooks
import { useUser } from '../context/AuthContext';

// importing server side url
import { URL } from '../App';


const AdminDashboard = ({ toggleBackground }) => {

    useWebsiteTitle('E-Learn || Admin Dashboard');

    const navigate = useNavigate();
    const { user } = useUser();

    // for theme
    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );
    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    // admin validation
    const adminDashboard = async () => {
        let token = localStorage.getItem("access_token");
        const res = await fetch(`${URL}/api/users/checkadmin/${user._id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: 'include' // Include cookies
        });
        const data = await res.json();

        if(data.ok){
            navigate('/admin-dashboard');
        }
    }

    useEffect(() => {
        // Check if the admin is logged in before running the dashboard function
        if (user) {
            adminDashboard();
        }
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div className='app-container'>
                <Navbar toggleBackground={toggleBackground} />
                {user.isAdmin ? (<>
                    Admin Dashboard
                </>):(
                    null
                )}
                <Footer />
            </div>
        </>
    );
};

export default AdminDashboard;