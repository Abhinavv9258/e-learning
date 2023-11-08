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

import { URL } from '../../App';

const DashboardContent = ({ user, DrawerHeader }) => {

    // getting all user data
    const [userCountData, setUserCountData] = React.useState({
        adminCount: 0,
        userCount: 0,
        activeUserCount: 0,
    });

    const [courseCountData, setCourseCountData] = React.useState({
        progCourseCount: 0,
        webCourseCount: 0,
        courseCount: 0
    });


    const [courseTableData, setCourseTableData] = React.useState();

    const selectedItem = localStorage.getItem("selectedItem");
    let selectedBoard = null;

    if (selectedItem) {
        selectedBoard = selectedItem.replace(/"/g, '');
    } else {
        selectedBoard = selectedItem;
    }

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
                return count + 1;
            }
            return count;
        }, 0);
        const tempValidUserCount = data.reduce((count, user) => {
            if (user.status) {
                return count + 1;
            }
            return count;
        }, 0);
        setUserCountData({
            adminCount: tempAdminCount,
            userCount: data.length,
            activeUserCount: tempValidUserCount
        })
    }
    React.useEffect(() => {
        if (user) {
            getAllUserProfile();
        }
        // eslint-disable-next-line
    }, [user])


    // get courses list 
    const allCourseDetails = async () => {
        // let token = localStorage.getItem('access_token');
        const res = await fetch(`${URL}/api/courses/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        const tempProgCourseCount = data.reduce((count, course) => {
            if (course.category === "Programming Language") {
                return count + 1;
            }
            return count;
        }, 0);
        const tempWebCourseCount = data.reduce((count, course) => {
            if (course.category === "Web Development") {
                return count + 1;
            }
            return count;
        }, 0);
        const tempCourseCount = data.reduce((count, course) => {
            if (course.category === "Course") {
                return count + 1;
            }
            return count;
        }, 0);

        setCourseCountData({
            progCourseCount: tempProgCourseCount,
            webCourseCount: tempWebCourseCount,
            courseCount: tempCourseCount
        })
        setCourseTableData(data);
    }

    React.useEffect(() => {
        if (user) {
            allCourseDetails();
        }
        // eslint-disable-next-line
    }, [user])


    const renderContent = () => {
        switch (selectedBoard) {
            case 'Dashboard':
                return (
                    <Dashboard courseCountData={courseCountData} userCountData={userCountData} courseTableData={courseTableData} user={user} />
                )
            case 'Admin':
                return (
                    <Admin user={user} />
                )
            case 'User Profile':
                return (
                    <UserProfile user={user} />
                )
            case 'Courses':
                return (
                    <Courses courseTableData={courseTableData} user={user} />
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
                    // <Default user={user} />
                    <Dashboard courseCountData={courseCountData} userCountData={userCountData} courseTableData={courseTableData} user={user} />
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