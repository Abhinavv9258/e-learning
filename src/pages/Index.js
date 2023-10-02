import React from "react";
import Typed from "react-typed"; // You need to install 'react-typed' via npm or yarn
import '../assets/css/Index.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import {
    Button,
} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import { GrLinkNext } from "react-icons/gr";
import adminLogin from '../assets/images/561-removebg.png'
import userLogin from '../assets/images/558-removebg.png'
import { Link } from "react-router-dom";
import { useWebsiteTitle } from '../hooks/WebsiteTitle';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../App.css'; // Import your CSS


const Index = () => {
    
    // const adminSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(addActionList.addData(inputData));
    //     alert('Data added successfully');
    //     navigate('/');
    // }

    // return (
    //     <React.Fragment>
    //         <Navbar />
    //         <div className='body' style={body}>
    //             <div className='container'>
    //                 <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
    //                     <div className='w-50 border bg-light p-5 shadow mb-5 bg-white rounded'>
    //                         <form onSubmit={handleSubmit}>
    //                             <div className='form-group'>
    //                                 <label htmlFor='name'>Name: </label>
    //                                 <input type='text' className='form-control' name='name' onChange={(e) => setUserData({...userData, name: e.target.value})}/>
    //                             </div>
    //                             <div className='form-group'>
    //                                 <label>Email: </label>
    //                                 <input type='email' className='form-control' onChange={(e) => setUserData({...userData, email: e.target.value})}/>
    //                             </div>
    //                             <br />                             
    //                             <button type='submit' className='btn btn-info'>Submit</button>
    //                         </form>
    //                     </div>            
    //                 </div>
    //             </div>
    //         </div>

    //         {/* <div className='body' style={body}>
    //             <div className='container'>
    //                 <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
    //                     <div className='w-50 border bg-light p-5 shadow mb-5 bg-white rounded'>
    //                         <form onSubmit={adminSubmit}>
    //                             <div className='form-group'>
    //                                 <label htmlFor='name'>Name: </label>
    //                                 <input type='text' className='form-control' name='name' onChange={(e) => setAdminData({...adminData, name: e.target.value})}/>
    //                             </div>
    //                             <div className='form-group'>
    //                                 <label>Email: </label>
    //                                 <input type='email' className='form-control' onChange={(e) => setAdminData({...adminData, email: e.target.value})}/>
    //                             </div>
    //                             <br />
    //                             <div className='form-group'>
    //                                 <label>Username: </label>
    //                                 <input type='text' className='form-control' onChange={(e) => setUserData({...adminData, username: e.target.value})}/>
    //                             </div>
    //                             <br />
    //                             <div className='form-group'>
    //                                 <label>Password: </label>
    //                                 <input type='password' className='form-control' onChange={(e) => setUserData({...adminData, password: e.target.value})}/>
    //                             </div>
    //                             <br />   
    //                             <button type='submit' className='btn btn-info'>Submit</button>
    //                         </form>
    //                     </div>            
    //                 </div>
    //             </div>
    //         </div> */}
    //         <Footer />
    //     </React.Fragment>
    // );
    

    useWebsiteTitle("E-Learn");
    return (
        <div className ="app-container">
        <Navbar />
            <div className="index-body">
                <div className="index-text">
                    <strong>
                        E-Learn&nbsp;
                        <Typed strings={['E-Learning', 'Online Courses', 'Website.']} typeSpeed={200} backSpeed={70} loop />
                    </strong>
                    <p>
                        WELCOME TO, E-Learn
                        <br/> 
                        ONLINE LEARNING PORTAL FOR STUDENTS AND TEACHERS
                    </p>
                </div>

                <div className="d-flex index-card-deck" style={{width:"75%","justify-content":"space-evenly"}}>
                    <Card className="index-cards" sx={{ maxWidth: 345 }}  style={{background:"transparent","margin":"10px"}}>
                        <CardActionArea style={{cursor:"default"}}>
                            <CardMedia
                            className="index-card-media"
                            component="img"
                            height="auto"
                            image={adminLogin}
                            alt="Admin Login"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Admin Login
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className="d-flex justify-content-center">
                            <Link to='/AdminLoginPage'>
                                <Button className="index-btn" >
                                    Admin Login&nbsp;&nbsp;<GrLinkNext className="index-btn-icon"/>
                                </Button>
                            </Link>
                        </CardActions>
                        
                    </Card>

                    <Card className="index-cards" sx={{ maxWidth: 345 }} style={{background:"transparent","margin":"10px"}}>
                        <CardActionArea style={{cursor:"default"}}>
                            <CardMedia
                            className="index-card-media"
                            component="img"
                            height="auto"
                            image={userLogin}
                            alt="User Login"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    User Login
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <CardActions className="d-flex justify-content-center">
                            <Link to='/RegisterPage'>
                                <Button className="index-btn" >
                                    User Login&nbsp;&nbsp;<GrLinkNext/>
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Index;

