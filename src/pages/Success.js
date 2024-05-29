import React from 'react';

import Navbar from '../components/Navbar'

const Success = () => {
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
