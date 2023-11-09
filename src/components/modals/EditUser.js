import React from 'react';

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


const EditUser = ({ modal, toggle, userData, handleChange }) => {

    return (
        <>
            {userData &&
                <Modal
                    isOpen={modal}
                    toggle={toggle}
                    zIndex={2500}
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <ModalHeader toggle={toggle}>
                        Edit User
                    </ModalHeader>
                    <ModalBody>
                        <Form style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '16px' }}>
                            <FormGroup row>
                                <Label sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input
                                        name="name"
                                        id="name"
                                        placeholder='Name'
                                        type="text"
                                        value={userData.name}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        type="text"
                                        value={userData.email}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Username</Label>
                                <Col sm={9}>
                                    <Input
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        type="text"
                                        value={userData.username}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Admin</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="isAdmin"
                                        id="isAdmin"
                                        value={userData.isAdmin}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Status</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="status"
                                        id="status"
                                        value={userData.status}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Phone</Label>
                                <Col sm={9}>
                                    <Input
                                        name="phone"
                                        id="phone"
                                        placeholder="Phone"
                                        value={userData.phone}
                                        type="number"
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Address</Label>
                                <Col sm={9}>
                                    <Input
                                        name="address"
                                        id="address"
                                        placeholder="Address"
                                        value={userData.address}
                                        type="text"
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Stream</Label>
                                <Col sm={9}>
                                    <Input
                                        name="stream"
                                        id="stream"
                                        placeholder="Stream"
                                        value={userData.stream}
                                        type="text"
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter style={{ display: 'flex', justifyContent: 'space-evenly', padding: '16px' }}>
                        <Button className='navbar-btn' type="submit" onClick={toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>}

        </>
    );
};

export default EditUser;