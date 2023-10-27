import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import {
    Button,
    Typography,
    Box,
} from '@mui/material';


const Example = ({ modal, toggleCourse, courseDetails }) => {

    return (
        <>
            {courseDetails ? (
                <Modal isOpen={modal} toggle={toggleCourse} centered size='lg'>

                    <ModalHeader toggle={toggleCourse}>
                        <Typography variant='h6'>
                            {courseDetails.title}
                        </Typography>
                        <Typography>
                            {courseDetails.category}
                        </Typography>
                    </ModalHeader>
                    <ModalBody style={{ borderBottom: '1px solid #DEE2E6', display: 'flex', paddingTop: 5, paddingBottom: 5 }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Box style={{ padding: 4 }} >About</Box>
                            <Box style={{ padding: 4 }} >Instructor</Box>
                            <Box style={{ padding: 4 }}>Syllabus</Box>
                            <Box style={{ padding: 4 }}>Enrollment Options</Box>
                        </Box>
                    </ModalBody>
                    <ModalBody>
                        Body
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={toggleCourse}>
                            Do Something
                        </Button>{' '}
                        <Button color="secondary" onClick={toggleCourse}>
                            Cancel
                        </Button>
                    </ModalFooter>

                </Modal>
            ) : (null)}

        </>
    );
}

export default Example;