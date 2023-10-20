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

import {URL} from '../../App';

const DashboardContent = ({ user, selectedItem, DrawerHeader }) => {

    // getting all user data
    const [tableData, setTableData] = React.useState();
    const [adminCount, setAdminCount] = React.useState(0);
    const [userCount, setUserCount] = React.useState(0);

    const getAllUserProfile = async () => {
        let token = localStorage.getItem('access_token');
        const res = await fetch(`${URL}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
        });
        const data = await res.json();
        const tempAdminCount = data.reduce((count, user) => {
            if (user.isAdmin) {
                return count + 1; // Increment count for admin users
            }
            return count; // No change for non-admin users
        }, 0);
        const tempUserCount = data.length - adminCount;
        setAdminCount(tempAdminCount);
        setUserCount(tempUserCount);
        setTableData(data);
    }
    React.useEffect(() => {
        if (user) {
            getAllUserProfile();
        }
    }, [user])

    // getting user and admin count

    const renderContent = () => {
        switch (selectedItem) {
            case 'Dashboard':
                return (
                    <Dashboard adminCount={adminCount} userCount={userCount} tableData={tableData} user={user} />
                )
            case 'Admin':
                return (
                    <Admin user={user} />
                )
            case 'User Profile':
                return (
                    <UserProfile tableData={tableData} user={user} />
                )
            case 'Courses':
                return (
                    <Courses user={user} />
                )
            case 'Orders':
                return (
                    <Orders user={user} />
                )
            case 'Notifications':
                return (
                    <Notifications user={user} />
                )
            case 'Profile':
                return (
                    <Profile user={user} />
                )
            case 'Settings':
                return (
                    <Settings user={user} />
                );
            default:
                return (
                    <Default user={user} />
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