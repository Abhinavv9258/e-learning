import React, { useState } from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    Label,
    Col,
    Input,
    FormGroup,
} from 'reactstrap';
import { Button } from '@mui/material';

// importing styles 
import 'bootstrap/dist/css/bootstrap.css';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { URL } from '../../App';

const initialUserDetails = {
    name: "",
    email: "",
    username: "",
    password: "",
    status: "",
    isAdmin: "",
    phone: "",
    address: "",
    stream: "",
};


const AddUserProfile = ({ modal, toggle }) => {

    const [userDetails, setUserDetails] = useState(initialUserDetails);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('access_token');
        const {
            name,
            email,
            username,
            password,
            status,
            isAdmin,
            phone,
            address,
            stream,
        } = userDetails;
        console.log(userDetails);
        try {
            const res = await fetch(`${URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password,
                    status,
                    isAdmin,
                    phone,
                    address,
                    stream,
                }),
                credentials: 'include',
            });
            if (res.ok) {
                try {
                    const data = await res.json();
                    if (data) {
                        window.location.reload();
                        toast.success(`Successfully Added Course 😃!`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    } else {
                        console.error('Unexpected response structure:', res);
                        console.log('Unexpected response structure:', res);
                        toast.error('An error occurred during Course Entry. Please try again later.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                } catch (jsonError) {
                    console.error('Error parsing JSON response:', jsonError);
                    console.log('Error parsing JSON response:', jsonError);
                    toast.error('An error occurred during Course Entry. Please try again later.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            } else {
                // Course entry failed, handle the error message from the server
                const data = await res.json();
                if (data && data.message) {
                    toast.error(data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error('Course entry failed. Please try again.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            }
        } catch (error) {
            console.log("Error while hitting Api: ", error);
            toast.error('An error occurred while hitting Api. Please try again later.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }

    const handleChange = (e) => {
        setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    // const handleReset = (e) => {
    //     setUserDetails(initialUserDetails);
    // }

    return (
        <>
            <Modal isOpen={modal}
                toggle={toggle}
                zIndex={2500}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <ModalHeader toggle={toggle}>
                    Add User
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit} style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '16px' }}>
                        <FormGroup row>
                            <Label sm={3}>Name</Label>
                            <Col sm={9}>
                                <Input
                                    name="name"
                                    id="name"
                                    placeholder='Name'
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input
                                    name="email"
                                    id="email"
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    placeholder="Email"
                                    type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Username</Label>
                            <Col sm={9}>
                                <Input
                                    name="username"
                                    id="username"
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    placeholder="Username"
                                    type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='isAdmin' sm={3}>Admin</Label>
                            <Col sm={9}>
                                <Input
                                    type="select"
                                    name="isAdmin"
                                    id="isAdmin"
                                    onChange={(e) => handleChange(e)}
                                    value={userDetails.isAdmin}  // Set the value to the state value

                                >
                                    <option value="">Choose...</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='status' sm={3}>Status</Label>
                            <Col sm={9}>
                                <Input
                                    type="select"
                                    name="status"
                                    id="status"
                                    onChange={(e) => handleChange(e)}
                                    value={userDetails.status}  // Set the value to the state value

                                >
                                    <option value="">Choose...</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Phone</Label>
                            <Col sm={9}>
                                <Input
                                    name="phone"
                                    id="phone"
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    placeholder="Phone"
                                    type="number" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Address</Label>
                            <Col sm={9}>
                                <Input
                                    name="address"
                                    id="address"
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    placeholder="Address"
                                    type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Stream</Label>
                            <Col sm={9}>
                                <Input
                                    name="stream"
                                    id="stream"
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    placeholder="Stream"
                                    type="text" />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={3}>Password</Label>
                            <Col sm={9}>
                                <Input
                                    name="password"
                                    id="password"
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    placeholder="Password"
                                    type="password" />
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter style={{ display: 'flex', justifyContent: 'space-evenly', padding: '16px' }}>
                    <Button className='navbar-btn' type="submit" onClick={handleSubmit}>
                        Add User
                    </Button>
                    {/* <Button className='navbar-btn' onClick={handleReset}>
                        Reset
                    </Button> */}
                </ModalFooter>
            </Modal>
        </>
    );
};

export default AddUserProfile;