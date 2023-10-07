import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing pages 
import Index from './pages/Index'
import RegisterPage from './pages/RegisterPage'
import UserLoginPage from './pages/UserLoginPage'
import Homepage from './pages/Homepage';
import Login from './pages/Login';

// importing styles
import './App.css';

// exporting server URL
export const URL = process.env.REACT_APP_SERVER_URL;

const App = () => {

    const [isDarkBackground, setIsDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    const toggleBackground = () => {
        window.location.reload();
        const newMode = !isDarkBackground;
        setIsDarkBackground(newMode);
        localStorage.setItem('isDarkBackground', newMode);
    };

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Index toggleBackground={toggleBackground} />} />
                <Route path='/RegisterPage' element={<RegisterPage toggleBackground={toggleBackground} />} />
                <Route path='/Homepage' element={<Homepage toggleBackground={toggleBackground} />} />
                <Route path='/Index' element={<Index toggleBackground={toggleBackground} />} />
                <Route path='/userLoginPage' element={<UserLoginPage toggleBackground={toggleBackground} />} />
                <Route path='/login' element={<Login toggleBackground={toggleBackground} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
