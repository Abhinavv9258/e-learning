import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FormControl,
    FormGroup,
    InputLabel,
    Input
} from '@material-ui/core';

import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing styles 
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../assets/css/Form.css'

// importing images
import { URL } from '../App';
import login from '../assets/images/566-removebg.png'

// importing components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { useUser } from "../context/AuthContext";

const Login = ({ toggleBackground }) => {

    const navigate = useNavigate();
    const { setUser } = useUser(); // Access the setUser function from the context
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = credentials;
        if (username === undefined || password === undefined) {
            toast.warning("Both username and password are required!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });    
        } else {
            try {
                const data = await fetch(`${URL}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                });

                if (data.status === 200) {
                    // Login successful
                    try {
                        const res = await data.json();
                        if (res && res.user && res.token) {

                            // Assuming the server response includes the user's name
                            setUser({
                                username: res.user.username, // Adjust this according to your server response
                                token: res.token,
                            });
                            toast.success(`User Logged In! Welcome, ${res.user.username}`, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });

                            localStorage.setItem("access_token", res.token);

                            // Redirect to a different page, e.g., the user's dashboard
                            navigate("/");
                        } else {
                            // Handle unexpected response structure
                            console.error("Unexpected response structure:", res);
                            toast.error("An error occurred during login. Please try again later.", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });
                        }
                    } catch (jsonError) {
                        // Handle JSON parsing error
                        console.error("Error parsing JSON response:", jsonError);
                        toast.error("An error occurred during login. Please try again later.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                } else {
                    // Login failed, handle the error message from the server
                    const response = await data.json();
                    if (response && response.message) {
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    } else {
                        toast.error("Login failed. Please check your credentials and try again.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("An error occurred during login. Please try again later.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        }
    }

    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <>
            <div className="app-container">
                <Navbar toggleBackground={toggleBackground} />
                <div className='container form-container'>
                    <Card className="form-card">
                        <div className="content row no-gutters from-content">
                            <CardMedia className="form-image col">
                                <img src={login} className="card-img img-fluid" alt="..." />
                            </CardMedia>
                            <div style={{ width: '100%' }} className='form-col col d-flex'>
                                <Card className="card-body d-flex " style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <CardContent className='card-content'>
                                        <FormGroup>
                                            <FormControl>
                                                <h5>
                                                    Login In to your account and start learning
                                                    <span className="upper-line"></span>
                                                    <span className="lower-line"></span>
                                                </h5>
                                            </FormControl>
                                            <FormControl className='form-input-label'>
                                                <InputLabel>User-Name/Email</InputLabel>
                                                <Input type="text" id="username"
                                                    onChange={handleChange}
                                                    value={credentials.username} // Bind the input value to state
                                                />
                                            </FormControl>
                                            <FormControl className='form-input-label' >
                                                <InputLabel>Password</InputLabel>
                                                <Input type="password" id="password"
                                                    onChange={handleChange}
                                                    value={credentials.password} // Bind the input value to state
                                                />
                                            </FormControl>
                                            <FormControl style={{ display: "flex", "justify-content": "space-evenly", alignItems: "center", "flex-direction": "row" }}>
                                                <Button className='navbar-btn' type="submit" onClick={handleSubmit}> LogIn </Button>
                                            </FormControl>
                                            <Typography> New to E-Learn? <Link to='/registerPage'>SignUp</Link>  </Typography>
                                        </FormGroup>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Login;