import React from 'react';

import Navbar from '../components/Navbar'

const Success = () => {

    React.useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }, []); 
    
    return (
        <>
            <div className='app-container'>
                <Navbar />
                <div>
                    <h1>Payment Successful!</h1>
                    <h2>Checkout Summary:</h2>
                    Display other checkout summary properties
                    <h2>Subscription Details:</h2>
                    Display other subscription details properties
                </div>
            </div>
        </>

    );
};

export default Success;
