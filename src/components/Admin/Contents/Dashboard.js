// import React from 'react';
import { Typography, Box, Card, Divider } from '@mui/material';
import { PieChart, BarChart } from '@mui/x-charts';
import Groups2Icon from '@mui/icons-material/Groups2';

import * as React from 'react';


const Dashboard = ({ courseCountData, userCountData, courseTableData, user }) => {

    const data = [
        { label: 'User', value: userCountData.userCount - userCountData.adminCount, color: '#FFCE56' },
        { label: 'Admin', value: userCountData.adminCount, color: '#36A3EA' },
    ];

    const activeUser = [
        { label: 'Active', value: userCountData.activeUserCount, color: '#21d64a' },
        { label: 'Disabled', value: userCountData.userCount - userCountData.activeUserCount, color: '#f76363' }
    ]

    const courseData = [
        { label: 'Programming Language', value: courseCountData.progCourseCount, color: '#8ED9B6' },
        { label: 'Core Subject', value: courseCountData.courseCount, color: '#B6BFC6' },
        { label: 'Web Development', value: courseCountData.webCourseCount, color: '#C899F4' },
        { label: 'Android Development', value: courseCountData.andCourseCount, color: '#6B8CEF' }
    ]

    return (
        <>
            {user &&
                <Box>
                    <Typography sx={{ m: 1 }} paragraph>
                        Dashboard Content:
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Card sx={{ m: 1, width: 335, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                                <Box className='dashboard-logo-1'>
                                    <Groups2Icon sx={{ color: '#36A3EA', fontSize: 48 }} />
                                </Box>
                            </Box>
                            <Divider sx={{ border: 1, height: '80%', alignItems: 'center' }} />
                            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography>
                                    Admin
                                </Typography>
                                <Typography>
                                    {userCountData.adminCount}
                                </Typography>
                            </Box>
                        </Card>
                        <Card sx={{ m: 1, width: 335, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                                <Box className='dashboard-logo-2' >
                                    <Groups2Icon sx={{ color: '#FFCE56', fontSize: 48 }} />
                                </Box>
                            </Box>
                            <Divider sx={{ border: 1, height: '80%', alignItems: 'center' }} />
                            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography>
                                    Students
                                </Typography>
                                <Typography>
                                    {userCountData.userCount - userCountData.adminCount}
                                </Typography>
                            </Box>
                        </Card>
                        <Card sx={{ m: 1, width: 335, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                                <Box className='dashboard-logo-3'>
                                    <Groups2Icon sx={{ color: '#BFAEC1', fontSize: 48 }} />
                                </Box>
                            </Box>
                            <Divider sx={{ border: 1, height: '80%', alignItems: 'center' }} />
                            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography>
                                    Courses
                                </Typography>
                                <Typography>
                                    {courseTableData && courseTableData.length}
                                </Typography>
                            </Box>
                        </Card>
                        <Card sx={{ m: 1, width: 335, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                                <Box className='dashboard-logo-4'>
                                    <Groups2Icon sx={{ color: '#F76363', fontSize: 48 }} />
                                </Box>
                            </Box>
                            <Divider sx={{ border: 1, height: '80%', alignItems: 'center' }} />
                            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography>
                                    Orders
                                </Typography>
                                <Typography>
                                    0
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Card sx={{ width: '49%' }}>
                            <PieChart
                                series={[
                                    {
                                        innerRadius: 40,
                                        outerRadius: 80,
                                        data: activeUser,
                                    },
                                ]}
                                height={200}
                            />
                        </Card>
                        <Card sx={{ width: '49%' }}>
                            <PieChart
                                series={[
                                    {
                                        innerRadius: 40,
                                        outerRadius: 80,
                                        data,
                                    },
                                ]}
                                height={200}
                            />
                        </Card>
                    </Box>
                    <Box sx={{ m: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Card sx={{ width: "49%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <PieChart
                                series={[
                                    {
                                        innerRadius: 40,
                                        outerRadius: 80,
                                        data: courseData,
                                    },
                                ]}
                                height={200}
                            />
                        </Card>
                        <Card sx={{ width: '49%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'barCategories',
                                        data: [
                                            'Course',
                                        ],
                                        scaleType: 'band',
                                    },
                                ]}
                                series={[
                                    {
                                        data: [
                                            courseCountData.progCourseCount,

                                        ],
                                        label: 'Programming Language',
                                        color: '#F1F197',
                                    },
                                    {
                                        data: [
                                            courseCountData.courseCount,
                                        ],
                                        label: 'Core Subject',
                                        color: '#af7aa1',
                                    },
                                    {
                                        data: [
                                            courseCountData.andCourseCount + courseCountData.webCourseCount
                                        ],
                                        label: 'Development',
                                        color: '#9B9BE3',
                                    },
                                ]}
                                width={600}
                                height={265}
                            />
                        </Card>
                    </Box>
                </Box>
            }
        </>
    );
};

export default Dashboard;