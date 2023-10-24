import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// importing toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing pages 
import Index from './pages/Index'
import RegisterPage from './pages/RegisterPage'
import UserLoginPage from './pages/UserLoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
// import AdminDemo from './pages/AdminDemo'
import Homepage from './pages/Homepage';
import NotFound from "./components/Error/NotFound";

// importing styles
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                <Route path='/homepage' element={<Homepage toggleBackground={toggleBackground} />} />
                <Route path='/index' element={<Index toggleBackground={toggleBackground} />} />
                <Route path='/register-page' element={<RegisterPage toggleBackground={toggleBackground} />} />
                <Route path='/user-login-page' element={<UserLoginPage toggleBackground={toggleBackground} />} />
                <Route path='/admin-login-page' element={<AdminLoginPage toggleBackground={toggleBackground} />} />
                <Route path='/admin-dashboard' element={<AdminDashboard toggleBackground={toggleBackground} />} />
                {/* <Route path='/admin-demo' element={<AdminDemo toggleBackground={toggleBackground} />} /> */}
                <Route path='*' element={<NotFound toggleBackground={toggleBackground} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
