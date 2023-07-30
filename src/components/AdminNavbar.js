import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AddNewCourse from './modals/AddNewCourse'
import {Button} from '@mui/material'

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
            <Navbar expand="lg" className="bg-body-tertiary sticky-lg-top d-flex justify-content-center align-content-center" style={{padding:"15px 0 15px 0","box-shadow": "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Brand href="#home">E-Learn</Navbar.Brand>
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">User List</Nav.Link>
                            <Nav.Link href="#link">About Us</Nav.Link>
                                <NavDropdown title="Courses" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Add Course
                                        </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">All Course</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                      Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                          </Nav>
                    </Navbar.Collapse>
                    <Navbar.Brand href="#home"><Button type="submit" onClick={sendData}>Add New Course</Button></Navbar.Brand>
                </Container>
            </Navbar>
            <AddNewCourse toggle={toggle} modal={modal} save={saveTask}/>
        </>
    );
};

export default NavbarComponent;