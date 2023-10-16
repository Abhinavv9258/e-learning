import React from 'react';

import Box from '@mui/material/Box';

import Dashboard from './Contents/Dashboard'
import Admin from './Contents/Admin'
import UserProfile from './Contents/UserProfile'
import Courses from './Contents/Courses'
import Orders from './Contents/Orders'
import Notifications from './Contents/Notifications'
import Profile from './Contents/Profile'
import Settings from './Contents/Settings'
import Default from './Contents/Default'

const DashboardContent = ({ open, selectedItem, DrawerHeader }) => {

    const renderContent = () => {
        switch (selectedItem) {
            case 'Dashboard':
                return (
                    // <Dashboard open={open} />
                    <UserProfile open={open} />
                )
            case 'Admin':
                return (
                    <Admin open={open} />
                )
            case 'User Profile':
                return (
                    <UserProfile open={open} />
                )
            case 'Courses':
                return (
                    <Courses open={open} />
                )
            case 'Orders':
                return (
                    <Orders open={open} />
                )
            case 'Notifications':
                return (
                    <Notifications open={open} />
                )
            case 'Profile':
                return (
                    <Profile open={open} />
                )
            case 'Settings':
                return (
                    <Settings open={open} />
                );
            default:
                return (
                    <Default open={open} />
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