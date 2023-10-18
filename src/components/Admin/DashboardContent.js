import React from 'react';

import Box from '@mui/material/Box';

// importing contents
import Dashboard from './Contents/Dashboard'
import Admin from './Contents/Admin'
import UserProfile from './Contents/UserProfile'
import Courses from './Contents/Courses'
import Orders from './Contents/Orders'
import Notifications from './Contents/Notifications'
import Profile from './Contents/Profile'
import Settings from './Contents/Settings'
import Default from './Contents/Default'

const DashboardContent = ({ userData, selectedItem, DrawerHeader }) => {
    console.log(userData);

    const renderContent = () => {
        switch (selectedItem) {
            case 'Dashboard':
                return (
                    <Dashboard  />
                )
            case 'Admin':
                return (
                    <Admin />
                )
            case 'User Profile':
                return (
                    <UserProfile />
                )
            case 'Courses':
                return (
                    <Courses />
                )
            case 'Orders':
                return (
                    <Orders />
                )
            case 'Notifications':
                return (
                    <Notifications />
                )
            case 'Profile':
                return (
                    <Profile />
                )
            case 'Settings':
                return (
                    <Settings />
                );
            default:
                return (
                    <Default />
                );
        }
    };

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {renderContent()}
            </Box>
        </>
    );
};

export default DashboardContent;