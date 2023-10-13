import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {
    Button,
    Switch,
    FormControlLabel,
    Typography,
} from '@mui/material'

// importing icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// importing images
import logo from '../assets/images/logo.png'

// importing components
import { useUser } from '../context/AuthContext';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing styles
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Navbar.css'

// importing server side url
// import { URL } from '../App';


const NavbarComponent = ({ toggleBackground }) => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [isDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    const handleLogout = async () => {
        setUser(null);
        localStorage.removeItem('access_token');
        toast.success('Successfully Logged Out');
        navigate('/');

        // try {
        //     const token = localStorage.getItem("access_token");
        //     const res = await fetch(`${URL}/api/auth/logout`, {
        //         method: 'GET',
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${token}`,
        //             Accept: "application/json",
        //         },
        //         credentials: "include"
        //     });
        //
        //     const data = await res.json();
        //
        //     if (data.status === 201) {
        //         toast.success('User successfully logged out.', {
        //             position: toast.POSITION.TOP_RIGHT,
        //             autoClose: 3000,
        //         });
        //         localStorage.removeItem('access_token');
        //         setUser(null); // Set user to null to log out
        //         navigate('/');
        //     } else {
        //         console.log("error");
        //         toast.warning('Error', {
        //             position: toast.POSITION.TOP_RIGHT,
        //             autoClose: 3000,
        //         });
        //     }
        // } catch (error) {
        //     console.error('Error during logout:', error);
        //     toast.warning('Error', {
        //         position: toast.POSITION.TOP_RIGHT,
        //         autoClose: 3000,
        //     });
        // }
    };

    return (
        <>
            <Navbar expand='lg' className={`main-navbar sticky-lg-top ${isDarkBackground ? 'dark-mode' : 'light-mode'}`} >
                <Container>
                    {isDarkBackground ? (
                        <Navbar.Toggle className='dark-toggle' aria-controls='responsive-navbar-nav'>
                            <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff", }} />
                        </Navbar.Toggle>
                    ) : (
                        <Navbar.Toggle className='light-toggle' aria-controls='responsive-navbar-nav'>
                            <FontAwesomeIcon icon={faBars} />
                        </Navbar.Toggle>
                    )}

                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='me-auto'>
                            <Navbar.Brand style={{ marginBottom: "5px"}}>
                                <Link className='navbar-brand-link' to='/'>
                                    <img src={logo} className='e-learn-logo' alt='logo' />
                                    E-Learn
                                </Link>
                            </Navbar.Brand>
                            <Nav.Link className='navbar-link' as={Link} to='/homepage'>Home</Nav.Link>
                            <Nav.Link className='navbar-link' as={Link} to='/'>About Us</Nav.Link>
                            <NavDropdown style={{ display: 'flex', flexDirection:'column',justifyContent:'center', alignItems:'flex-start' }} className='navbar-link-dropdown' title='Courses' id='basic-nav-dropdown' >
                                    <div>
                                        <NavDropdown.Item href='#action/3.1' className='nav-dropdown-item'>
                                            <Link className='navbar-action-link' to='/'>All Courses</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='#action/3.2' className='nav-dropdown-item'>Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href='#action/3.3' className='nav-dropdown-item'>
                                            Separated link
                                        </NavDropdown.Item>
                                    </div>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Brand>
                        <div>
                            <FormControlLabel
                                control={<Switch checked={isDarkBackground} onChange={toggleBackground} />}
                                label={
                                    isDarkBackground ? (
                                        <span style={{ color: 'white' }}>Dark Mode</span>
                                    ) : (
                                        <span style={{ color: 'black' }}>Light Mode</span>
                                    )
                                }
                            />
                        </div>
                    </Navbar.Brand>

                    {user ? (
                        <Button className={`navbar-btn navbar-user-dropdown  ${isDarkBackground ? 'dark-mode' : 'light-mode'} `}>
                            <Navbar.Brand className='navbar-user-dropdown'>
                                <NavDropdown
                                    className={`navbar-user-dropdown-items `}
                                    title={<>
                                        <Typography className={`${isDarkBackground ? 'dark' : 'light'}`}>
                                            {
                                                user.username.charAt(0).toUpperCase() + user.username.slice(1)
                                            }
                                        </Typography>
                                    </>
                                    }
                                    id='user-dropdown'
                                >
                                    <NavDropdown.Item className='nav-dropdown-item'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item className='nav-dropdown-item' onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Brand>
                        </Button>

                    ) : (
                        <Navbar.Brand><Link to='/Index'><Button className={`navbar-btn ${isDarkBackground ? ' dark-mode' : 'light-mode'}`}>
                            <Typography className={`${isDarkBackground ? 'dark' : 'light'}`}>
                                LogIn/SignUp
                            </Typography>
                        </Button></Link></Navbar.Brand>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;