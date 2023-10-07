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

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/RegisterPage' element={<RegisterPage />} />
                <Route path='/Homepage' element={<Homepage />} />
                <Route path='/Index' element={<Index />} />
                <Route path='/userLoginPage' element={<UserLoginPage />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
