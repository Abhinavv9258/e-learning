import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    FormControl,
    FormGroup,
    InputLabel,
    Input,
    Button, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography,
    Box,
    CardHeader,
    CardActions
} from '@mui/material'

// importing toast
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
import { useApp } from '../context/AuthContext';



const RegisterForm = () => {
    const navigate = useNavigate();
    const { setUser } = useApp(); // Access the setUser function from the UserContext
    const [error, setError] = useState(null); // State to store registration error

    const [credentials, setCredentials] = useState({
        name: undefined,
        email: undefined,
        username: undefined,
        password: undefined,
        phone: undefined,
        address: undefined,
        stream: undefined,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, username, password, phone, address, stream } = credentials;

        if (!username) {
            toast.error('username is required!', {
                position: 'top-center'
            });
        } else if (!email) {
            toast.error('email is required!', {
                position: 'top-center'
            });
        } else if (!password) {
            toast.error('password is required!', {
                position: 'top-center'
            });
        } else {
            try {
                const data = await fetch(`${URL}/api/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        username,
                        password,
                        phone,
                        address,
                        stream
                    })
                });

                if (data.status === 201) {
                    // Registration successful
                    try {
                        const res = await data.json();
                        // console.log('res: ', res, '  res.user :  ', res.user, '  res.token :  ', res.user.tokens[0])
                        if (res && res.user && res.user.tokens[0]) {
                            setUser({
                                username: res.user.username,
                                token: res.user.tokens[0],
                                userId: res.user._id,
                            }); 
                            toast.success(`Registration Successfully 😃! Welcome, ${res.user.username}`, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });
                            localStorage.setItem('access_token', res.user.tokens[0]);
                            navigate('/homepage');
                        } else {
                            console.error('Unexpected response structure:', res);
                            toast.error('An error occurred during registration. Please try again later.', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });
                        }
                    } catch (jsonError) {
                        // Handle JSON parsing error
                        console.error('Error parsing JSON response:', jsonError);
                        toast.error('An error occurred during registration. Please try again later.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                } else {
                    // Registration failed, handle the error message from the server
                    const response = await data.json();
                    if (response && response.message) {
                        toast.error(response.message, {
                            position: 'top-center'
                        });
                    } else {
                        toast.error('Registration failed. Please try again.', {
                            position: 'top-center'
                        });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error);
                toast.error('An error occurred during registration. Please try again later.', {
                    position: 'top-center'
                });
            }
        }
    };

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <>
            {error && (
                <Box className='alert alert-danger' role='alert'>
                    {error}
                </Box>
            )}
            <Box className='container form-container'>
                <Card className='form-card'>
                    <Box className='content row no-gutters from-content'>
                        <CardMedia className='form-image col d-flex align-items-center'>
                            <img src={login} className='card-img img-fluid' alt='...' />
                        </CardMedia>
                        <Box style={{ width: '100%' }} className='form-col col'>
                            <Card className='card-body'>
                                <CardHeader
                                    title="Sign Up and start learning"
                                    subheader={
                                        <>
                                            <span className='upper-line'></span>
                                            <span className='lower-line'></span>
                                        </>
                                    }
                                />
                                <CardContent className='card-content'>
                                    <FormGroup>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Name</InputLabel>
                                            <Input type='text' id='name' onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Email</InputLabel>
                                            <Input type='text' id='email' onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Username</InputLabel>
                                            <Input type='text' id='username' onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Phone</InputLabel>
                                            <Input type='number' id='phone' onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Address</InputLabel>
                                            <Input type='text' id='address' onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Stream</InputLabel>
                                            <Input type='text' id='stream' onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Password</InputLabel>
                                            <Input type='password' id='password' onChange={handleChange} />
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
                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between',padding: '0 0 0 16px' }}>
                                    <FormControl sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                        <Button className='navbar-btn' type='submit' onClick={handleSubmit}> SignUp </Button>
                                    </FormControl>
                                    <Typography> Already have an account? {" "}
                                        <Link to='/user-login-page'>LogIn{" "}</Link>
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default RegisterForm;