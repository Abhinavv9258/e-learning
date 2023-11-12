import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import {
    FormControl,
    FormGroup,
    InputLabel,
    Input,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    CardHeader,
    Box,
    Typography
} from '@mui/material';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing styles 
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'
import '../../assets/css/Form.css'

// importing images
import { URL } from '../../App';
import login from '../../assets/images/566-removebg.png'

// importing components
import { useApp } from '../../context/AuthContext';


const AdminLoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = useApp(); // Access the setUser function from the context
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
            toast.warning('Both username and password are required!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } else {
            try {
                const data = await fetch(`${URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
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
                            setUser(
                                res.user
                            );
                            toast.success(`Admin Logged In! Welcome, ${res.user.username}`, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });

                            localStorage.setItem('access_token', res.token);
                            navigate('/admin-dashboard');
                            // window.location.reload();
                        } else {
                            console.error('Unexpected response structure:', res);
                            toast.error('An error occurred during login. Please try again later.', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });
                        }
                    } catch (jsonError) {
                        // Handle JSON parsing error
                        console.error('Error parsing JSON response:', jsonError);
                        toast.error('An error occurred during login. Please try again later.', {
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
                        toast.error('Login failed. Please check your credentials and try again.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred during login. Please try again later.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        }
    }

    return (
        <>
            <Box className='container form-container'>
                <Card className='form-card'>
                    <Box className='content row no-gutters from-content'>
                        <CardMedia className='form-image col'>
                            <img src={login} className='card-img img-fluid' alt='...' />
                        </CardMedia>
                        <Box style={{ width: '100%' }} className='form-col col'>
                            <Card className='card-body'>
                                <CardHeader
                                    title="Login In to your account and start learning"
                                    subheader={
                                        <>
                                            <span className='upper-line'></span>
                                            <span className='lower-line'></span>
                                        </>
                                    }
                                />
                                <CardContent className='card-content'>
                                    <FormGroup>
                                        <FormControl className='form-input-label'>
                                            <InputLabel>User-Name/Email</InputLabel>
                                            <Input type='text' id='username'
                                                onChange={handleChange}
                                                value={credentials.username}
                                            />
                                        </FormControl>
                                        <FormControl className='form-input-label'>
                                            <InputLabel>Password</InputLabel>
                                            <Input type='password' id='password'
                                                onChange={handleChange}
                                                value={credentials.password}
                                            />
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup style={{ alignItems: 'flex-end', color: '#f76363' }}>
                                        <FormControl>
                                            <Typography sx={{ cursor: 'pointer' }}>
                                                Forgot your password?
                                            </Typography>
                                        </FormControl>
                                    </FormGroup>
                                </CardContent>
                                <CardActions sx={{ padding: '0 0 0 16px' }}>
                                    <FormControl>
                                        <Button className='navbar-btn' type='submit' onClick={handleSubmit}> LogIn </Button>
                                    </FormControl>
                                </CardActions>
                            </Card>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default AdminLoginForm;