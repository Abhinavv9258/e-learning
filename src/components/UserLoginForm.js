import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from '../assets/images/566.jpg'
import {
    FormControl,
    FormGroup,
    InputLabel,
    Input,
    Button,
} from '@material-ui/core';
import '../assets/css/RegisterForm.css'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { useUser } from "../context/AuthContext"; // Import the useUser hook


const UserLoginForm = () => {
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

        if (username === '' || password === '') {
            toast.error("Both username and password are required!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } else {
            try{
                const data = await fetch("/api/auth/login", {
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
                    const res = await data.json();
                    console.log(res.user.username);
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


    return (
        <div>
            <div className='container main d-flex justify-content-space-between align-items-center'>
                <div className="card border-0">
                    <div className="content row no-gutters d-flex justify-content-center align-items-center">
                        <div className="register-image-col col">
                        <img src={login} style={{width:"50%"}} className="card-img img-fluid" alt="..."/>
                        </div>
                        <div className='form-col col'>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                <FormGroup className='d-flex justify-content-center align-items-center' style={{width:"75%"}}>
                                    <FormControl className='register-form-title card-title'>
                                        <h5 class="widget-title" style={{"margin-bottom": "20px"}}> Sign up and start learning 
                                            <span style={{"background": "#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"10px","position":"relative","width":"20%"}}></span>
                                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block",height:"1.5px","margin-top":"5px","width":"50%"}}></span>
                                        </h5>
                                    </FormControl>
                                    <FormControl className='register-input-label'>
                                        <InputLabel>User-Name/Email</InputLabel>
                                        <Input type="text" id="username" 
                                        onChange={handleChange}
                                        value={credentials.username} // Bind the input value to state
                                        />
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Password</InputLabel>
                                        <Input type="password" 
                                        id="password" 
                                        onChange={handleChange}
                                        value={credentials.password} // Bind the input value to state
                                        />
                                    </FormControl>
                                    <FormControl style={{display:"flex","justify-content":"space-evenly",alignItems:"center","flex-direction":"row"}}>
                                            <Button className='homepage-btn' type="submit" > LogIn </Button>
                                    </FormControl>
                                    <Button className='homepage-btn' type="submit" value="submit" > SignUp </Button>
                                </FormGroup>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserLoginForm;