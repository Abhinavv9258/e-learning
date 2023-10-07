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
import { useUser } from "../context/AuthContext";


const RegisterForm = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access the setUser function from the UserContext
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
            toast.error("username is required!", {
                position: "top-center"
            });
        } else if (!email) {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!password) {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else {
            try {
                const data = await fetch(`${URL}/api/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
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
                    navigate("/");
                    toast.success("Registration Successfully 😃!", {
                        position: "top-center"
                    });
                } else {
                    // Registration failed, handle the error message from the server
                    const response = await data.json();
                    if (response && response.message) {
                        toast.error(response.message, {
                            position: "top-center"
                        });
                    } else {
                        toast.error("Registration failed. Please try again.", {
                            position: "top-center"
                        });
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("An error occurred during registration. Please try again later.", {
                    position: "top-center"
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
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className='container form-container'>
                <Card className="form-card">
                    <div className="content row no-gutters from-content">
                        <CardMedia className="form-image col d-flex align-items-center">
                            <img src={login} className="card-img img-fluid" alt="..." />
                        </CardMedia>
                        <div style={{ width: '100%' }} className='form-col col d-flex'>
                            <Card className="card-body d-flex " style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <CardContent className='card-content'>
                                    <FormGroup>
                                        <FormControl>
                                            <Typography variant="h5">
                                                Sign Up and start learning
                                                <span className="upper-line"></span>
                                                <span className="lower-line"></span>
                                            </Typography>
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Name</InputLabel>
                                            <Input type="text" id="name" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Email</InputLabel>
                                            <Input type="text" id="email" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Username</InputLabel>
                                            <Input type="text" id="username" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Phone</InputLabel>
                                            <Input type="number" id="phone" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Address</InputLabel>
                                            <Input type="text" id="address" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Stream</InputLabel>
                                            <Input type="text" id="stream" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='form-input-label' >
                                            <InputLabel>Password</InputLabel>
                                            <Input type="password" id="password" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
                                            <Button className='navbar-btn' type="submit" onClick={handleSubmit}> SignUp </Button>
                                        </FormControl>
                                        <Typography> Already have an account?
                                            <Link to='/userLoginPage'>LogIn</Link>
                                        </Typography>
                                    </FormGroup>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default RegisterForm;