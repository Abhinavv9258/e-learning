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



const ViewUserDetails = ({ modal, toggle, userData }) => {

    const handleClose = () => modal(false);

    return (
        <>
            <Modal isOpen={modal}
                toggle={toggle}
                zIndex={2500}
                size='lg'>
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
                                    type="text"
                                    value={userData.name}
                                    disabled
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
                                    disabled
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
                                    disabled
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Admin</Label>
                            <Col sm={9}>
                                <Input
                                    type="select"
                                    name="admin"
                                    id="admin"
                                    value={userData.admin}
                                    disabled
                                >
                                    <option value={userData.admin}>{userData.admin}</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Status</Label>
                            <Col sm={9}>
                                <Input
                                    type="select"
                                    name="status"
                                    id="status"
                                    disabled
                                >
                                    <option value={userData.status}>{userData.status}</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Phone</Label>
                            <Col sm={9}>
                                <Input
                                    name="phone"
                                    id="phone"
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
                                    placeholder="Stream"
                                    type="text" />
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter style={{ display: 'flex', justifyContent: 'space-evenly', padding: '16px' }}>
                    <Button className='navbar-btn' type="submit" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ViewUserDetails;