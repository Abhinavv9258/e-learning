import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import login from '../assets/images/566.jpg'
import {
    FormControl,
    FormGroup,
    InputLabel,
    Input,
    Button,
} from '@material-ui/core';
import '../assets/css/RegisterForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "../context/AuthContext";
import { URL } from '../App';


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


    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     // await addUser(credentials);
    //     navigate("/userLoginPage");
    //     alert('Data added successfully');
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const { email, username, password } = credentials;

    //     // if (!name) {
    //     //     toast.warning("name is required!", {
    //     //         position: "top-center"
    //     //     });
    //     // } else 
    //     if (!username) {
    //         toast.error("username is required!", {
    //             position: "top-center"
    //         });
    //     } else if (!email) {
    //         toast.error("email is required!", {
    //             position: "top-center"
    //         });
    //     } else if (!password) {
    //         toast.error("password is required!", {
    //             position: "top-center"
    //         });
    //     } else {
    //         const data = await fetch("/api/auth/register", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 username, email, password
    //             })
    //         });

    //         const res = await data.json();

    //         if (res.status === 201) {
    //             // Registration successful, set the user data in the context
    //             setUser({
    //                 username: res.username, // Assuming the response contains the user's name
    //                 token: res.token, // Assuming the response contains the JWT token
    //             });
    //             navigate("/userLoginPage");
    //             alert("Data added successfully");
    //         } else {
    //             // Registration failed, set the error message
    //             setError("Registration failed. Please try again."); // Customize the error message as needed
    //         }

    //         // console.log(res.status);
    //         // navigate("/userLoginPage");
    //         // alert('Data added successfully');


    //         // if (res.status === 201) {
    //         //     toast.success("Registration Successfully done 😃!", {
    //         //         position: "top-center"
    //         //     });
    //         //     setCredentials({ ...credentials, name: "", email: "", password: "", username: "" });
    //         // }
    //     }
    // }

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
                    alert('Registration successful!');
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
            <div className='container main'>
                <div className="card border-0">
                    <div className="content row no-gutters">
                        <div className="register-image-col col">
                            <img src={login} className="card-img img-fluid" alt="..." />
                        </div>
                        <div className='form-col col'>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <FormControl className='register-form-title card-title'>
                                            <h5 class="widget-title" style={{ "margin-bottom": "20px" }}> Sign up and start learning
                                                <span style={{ "background": "#839FAD none repeat scroll 0 0", "display": "block", "height": "1.5px", "margin-top": "10px", "position": "relative", "width": "20%" }}></span>
                                                <span style={{ "background": "#839FAD none repeat scroll 0 0", "display": "block", height: "1.5px", "margin-top": "5px", "width": "50%" }}></span>
                                            </h5>
                                        </FormControl>
                                        <FormControl className='register-input-label' >
                                            <InputLabel>Name</InputLabel>
                                            <Input type="text" id="name" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='register-input-label' >
                                            <InputLabel>Email</InputLabel>
                                            <Input type="text" id="email" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='register-input-label' >
                                            <InputLabel>Username</InputLabel>
                                            <Input type="text" id="username" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='register-input-label' >
                                            <InputLabel>Phone</InputLabel>
                                            <Input type="number" id="phone" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='register-input-label' >
                                            <InputLabel>Address</InputLabel>
                                            <Input type="text" id="address" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='register-input-label' >
                                            <InputLabel>Stream</InputLabel>
                                            <Input type="text" id="stream" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl className='register-input-label' >
                                            <InputLabel>Password</InputLabel>
                                            <Input type="password" id="password" onChange={handleChange} />
                                        </FormControl>
                                        <FormControl style={{ display: "flex", "justify-content": "space-evenly", alignItems: "center", "flex-direction": "row" }}>
                                            <Button className='register-myBtn' variant="contained" type="submit" value="submit" > SignUp </Button>
                                            {/* <Button className='register-myBtn' variant="contained" type="submit" value="submit" > LogIn </Button> */}
                                        </FormControl>
                                        <h5 class="widget-title" style={{ "margin-bottom": "20px" }}> Already have an account? <Link to='/userLoginPage' style={{ backgroundColor: "white" }}>SignIn</Link>  </h5>
                                    </FormGroup>
                                </form>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;