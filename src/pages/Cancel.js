import React from "react";

import Navbar from '../components/Navbar'

const Cancel = () => {

    React.useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }, []); 
    
    return (
        <>
            <div className='app-container'>
                <Navbar />
                <div>
                    <h1>Payment Cancel!</h1>
                    <h1>Payment Cancel!</h1>
                    <h1>Payment Cancel!</h1>
                    <h1>Payment Cancel!</h1>
                    <h1>Payment Cancel!</h1>
                </div>
            </div>
        </>
    );
};

export default Cancel;
