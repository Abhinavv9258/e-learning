// import React from 'react';
import { Typography, Box, Card, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import Groups2Icon from '@mui/icons-material/Groups2';

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';


const chartsParams = {
    margin: { bottom: 20, left: 25, right: 5 },
    height: 300,
};
const Dashboard = ({ courseTableData, adminCount, userCount, user, tableData }) => {
    const data = [
        { label: 'User', value: userCount, color: '#FFCE56' },
        { label: 'Admin', value: adminCount, color: '#36A3EA' },
    ];

    // 


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
                                    {adminCount}
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
                                    {userCount}
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
                            lif
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


                    <Box>
                        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                            <LineChart
                                xAxis={[
                                    { 
                                        data: [1, 2, 3, 5, 8] 
                                    }
                                ]}
                                series={[
                                    {
                                        data: [15, 23, 18, 19, 13],
                                        label: 'Example',
                                        // color: '#59a14f',
                                        // color: '#af7aa1',
                                        color: '#edc949',
                                    },
                                ]}
                                width={600}
                                height={300}
                            />
                        </Stack>
                    </Box>
                </Box>
            }
        </>
    );
};

export default Dashboard;