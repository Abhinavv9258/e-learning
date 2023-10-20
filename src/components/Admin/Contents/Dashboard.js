import React from 'react';
import { Typography, Box, Card } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';



const Dashboard = ({ adminCount, userCount, user, tableData }) => {
    const data = [
        { label: 'User', value: userCount, color: '#FFCE56' },
        { label: 'Admin', value: adminCount, color: '#36A3EA' },
    ];
    
    return (
        <>
            {user &&
                <Box>
                    <Typography paragraph>
                        Dashboard Content: This is the content for the Dashboard page.
                        {tableData && (<>{tableData.length}</>)}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
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
                </Box>
            }
        </>
    );
};

export default Dashboard;