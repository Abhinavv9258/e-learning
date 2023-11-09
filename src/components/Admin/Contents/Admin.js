import React from 'react';
import { Typography, Box } from '@mui/material';

import {
    Form,
    Label,
    Col,
    Input,
    FormGroup,
} from 'reactstrap';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const Admin = ({ user }) => {

    return (
        <>
            <Box component="main" sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                // height: '100vh',
                overflow: 'auto',
                m: 1,
            }}>
                <Box>
                    <Typography paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                        Dashboard
                        <NavigateNextIcon sx={{ color: 'grey' }} />
                        Admin Details
                    </Typography>
                </Box>
                <Box sx={{ padding: '1.5rem', border: 1, borderRadius: 1 }}>
                    <Box>
                        <Typography variant='h6' sx={{ marginBottom: '1.5rem' }}>
                            Admin Details:
                        </Typography>
                    </Box>

                    <Box style={{ width: '100%' }}>
                        <Form style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '16px' }}>
                            <FormGroup row>
                                <Label sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input
                                        name="name"
                                        id="name"
                                        placeholder='Name'
                                        type="text"
                                        value={user.name}
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
                                        value={user.email}
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
                                        value={user.username}
                                        disabled
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Admin</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="admin"
                                        id="admin"
                                        value={user.isAdmin}
                                        disabled
                                    >
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Status</Label>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        name="status"
                                        id="status"
                                        value={user.status}
                                        disabled
                                    >
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
                                        type="number"
                                        value={user.phone}
                                        disabled
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
                                        type="text"
                                        value={user.address}
                                        disabled
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
                                        type="text"
                                        value={user.stream}
                                        disabled
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Admin;