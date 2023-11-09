import React from 'react';
import { Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const Notifications = ({ toDashboard }) => {
    return (
        <>
            <Box component="main" sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                m: 1,
                overflow: 'auto',
            }}
            >
                <Box>
                    <Typography paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ cursor: 'pointer' }} onClick={toDashboard} >Dashboard</Box>
                        <NavigateNextIcon sx={{ color: 'grey' }} />
                        Notifications Content
                    </Typography>
                </Box>

                <Box sx={{ padding: '1.5rem', border: 1, borderRadius: 1 }}>
                    <Box>
                        <Typography variant='h6' sx={{ marginBottom: '1.5rem' }}>
                            Notifications Content: This is the content for the Notifications page.
                        </Typography>
                    </Box>
                    <Box style={{ width: '100%' }}></Box>
                </Box>
            </Box>
        </>
    );
};

export default Notifications;