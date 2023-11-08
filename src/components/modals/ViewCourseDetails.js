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

// importing toast
import 'react-toastify/dist/ReactToastify.css';


const ViewCourseDetails = ({ modal, toggle, courseData, base64Thumbnail }) => {

    const handleClose = () => modal(false);

    return (
        <>
            {courseData &&
                <Modal isOpen={modal}
                    toggle={toggle}
                    scrollable
                    zIndex={2500}
                    size='lg'
                    onHide={handleClose}>
                    <ModalHeader toggle={toggle}>
                        Course Details
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>Admin Username</Label>
                                <Col sm={9}>
                                    <Input name="adminUsername"
                                        disabled
                                        placeholder={courseData.adminUsername}
                                        value={courseData.adminUsername}
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Course Title</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="title"
                                        value={courseData.title}
                                        placeholder="Course Title"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Category</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="category"
                                        value={courseData.category}
                                        placeholder="Category"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Sub-Category</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="subCategory"
                                        placeholder="Sub-Category"
                                        type="text"
                                        value={courseData.subCategory}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Topic</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="topic"
                                        value={courseData.topic}
                                        placeholder="Topic"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> Description </Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="description"
                                        value={courseData.description}
                                        placeholder="Description"
                                        type="textarea" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Language</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="language"
                                        value={courseData.language}
                                        placeholder="Language"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Video Duration</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="videoDuration"
                                        value={courseData.videoDuration}
                                        placeholder="Video Duration"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Video Link</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="videoLink"
                                        value={courseData.videoLink}
                                        placeholder="Video Link"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Playlist Link</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="playlistLink"
                                        value={courseData.playlistLink}
                                        placeholder="Playlist Link"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Price</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="price"
                                        value={courseData.price}
                                        placeholder="Price"
                                        type="text" />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Syllabus</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="syllabus"
                                        type="text"
                                        // value={newSyllabusItem}
                                        placeholder='Syllabus'
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Instructor</Label>
                                <Col sm={9}>
                                    <Input
                                        disabled
                                        name="instructor"
                                        type="text"
                                        // value={newInstructorName}
                                        placeholder='Instructor'
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> Thumbnail </Label>
                                <Col sm={9}>
                                    <img src={base64Thumbnail} alt={courseData.fileName}  style={{ maxWidth: "100px", margin: "5px" }} />
                                    Selected Image: {courseData.fileName}
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='navbar-btn' onClick={toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            }
        </>
    );
};

export default ViewCourseDetails;


