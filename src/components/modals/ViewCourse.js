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
    // const sections = ['About', 'Instructor', 'Syllabus', 'Enrollment Options'];
    const [activeSection, setActiveSection] = useState('About');
    // const [underlineStyle, setUnderlineStyle] = useState({});
    const [clickedBox, setClickedBox] = useState('About');

    const handleSectionClick = (sectionName) => {
        setActiveSection(sectionName);
        setClickedBox(sectionName);

    };


    return (
        <>
            {courseDetails ? (
                <Modal isOpen={modal}
                    toggle={toggleCourse}
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

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
                            <Box
                                className={clickedBox === 'About' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('About')}
                            >
                                About
                            </Box>
                            <Box
                                className={clickedBox === 'Instructor' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('Instructor')}
                            >
                                Instructor
                            </Box>
                            <Box
                                className={clickedBox === 'Syllabus' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('Syllabus')}
                            >
                                Syllabus
                            </Box>
                            <Box
                                className={clickedBox === 'Enrollment Options' ? 'clicked-box' : ''}
                                style={{ margin: 10, cursor: 'pointer' }}
                                onClick={() => handleSectionClick('Enrollment Options')}
                            >
                                Enrollment Options
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalBody>
                        {activeSection === 'About' && <>
                            <Typography>
                                {courseDetails.description}
                            </Typography>
                        </>}
                        {activeSection === 'Instructor' && <>Instructor</>}
                        {activeSection === 'Syllabus' && <>Syllabus</>}
                        {activeSection === 'Enrollment Options' && <>Enrollment Options</>}
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary">
                            Purchase
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