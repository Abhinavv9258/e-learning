import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AddNewCourse from './modals/AddNewCourse'
import {Button} from '@mui/material'
import {Link}  from 'react-router-dom'

const NavbarComponent = () => {
    const [modal, setModal] = useState(false);
    const [courseList,setCourseList] = useState([]);

    const sendData = (e) => {
        setModal(true)
    }
    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (cardObject) => {
        let tempList = courseList
        tempList.push(cardObject)
        localStorage.setItem("CourseList: ", JSON.stringify(tempList))
        setModal(false)
    }

    return (
        <>
            <Navbar expand="lg" className="main-navbar bg-body-tertiary sticky-lg-top d-flex justify-content-center align-content-center" style={{padding:"15px 0 15px 0","box-shadow": "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}}>
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
                    <Navbar.Brand><Button className='navbar-btn' onClick={sendData}>Add New Course</Button></Navbar.Brand>
                </Container>
            </Navbar>
            <AddNewCourse toggle={toggle} modal={modal} save={saveTask}/>
        </>
    );
};

export default NavbarComponent;