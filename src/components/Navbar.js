import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from '@mui/material'
import {Link}  from 'react-router-dom'
import '../assets/css/Navbar.css'
import { useUser } from '../context/AuthContext'; // Import the AuthContext
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    const { user, setUser } = useUser(); // Access user data and setUser function from the context
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Clear the user data and token
        setUser(null);
        // Remove the token from local storage
        localStorage.removeItem("access_token");
        // Redirect to the home page or any other page as needed
        navigate("/");
    };

    return (
        <>
            <Navbar expand="lg" className="main-navbar bg-body-tertiary sticky-lg-top" >
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Brand href="#home"><Link className='navbar-brand-link' to='/'>E-Learn</Link></Navbar.Brand>
                            <Nav.Link href="#home"><Link className='navbar-link' to='/'>Home</Link></Nav.Link>
                            <Nav.Link href="#link"><Link className='navbar-link' to='/'>About Us</Link></Nav.Link>
                                <NavDropdown title="Courses" id="basic-nav-dropdown" >
                                <div >
                                    <NavDropdown.Item href="#action/3.1" className='nav-dropdown-item'>
                                        <Link className='navbar-action-link' to='/'>All Courses</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" className='nav-dropdown-item'>Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.3" className='nav-dropdown-item'>
                                      Separated link
                                    </NavDropdown.Item>
                                </div>
                                </NavDropdown>
                          </Nav>
                    </Navbar.Collapse>
                    {/* <Navbar.Brand><Link to='/Index'><Button className='navbar-btn'>LogIn/SignUp</Button></Link></Navbar.Brand> */}
                    {/* Conditional rendering based on user login */}
                    {user ? (
                        <Navbar.Brand >
                            <NavDropdown title={user.username} id="user-dropdown">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Brand>
                    ) : (
                        <Navbar.Brand><Link to='/Index'><Button className='navbar-btn'>LogIn/SignUp</Button></Link></Navbar.Brand>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;