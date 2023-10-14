import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Typography } from '@mui/material';

const NotFound = ({ toggleBackground }) => {

    // for theme
    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );
    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <>
            <div className='app-container'>
                <Navbar toggleBackground={toggleBackground} />
                <div style={{alignItems:'center', display:'flex',justifyContent:'center', flexDirection:'column', height:'56vh'}}>
                    <Typography variant='h4'>404 - Not Found | Page Not Found</Typography>
                    <Typography paragraph>The requested page could not be found.</Typography>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default NotFound;
