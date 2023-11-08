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


const EditCourse = ({ modal, toggle, courseData, base64Thumbnail, handleChange }) => {

    const [thumbnailConvert, setThumbnailConvert] = useState();
    const [fileNameConvert, setFileNameConvert] = useState();

    function convertToBase64(e) {
        var reader = new FileReader();
        const selectedFile = e.target.files[0];
        const selectedFileName = selectedFile.name;

        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            setThumbnailConvert(reader.result);
            setFileNameConvert(selectedFileName);
        };
        reader.onerror = (error) => {
            console.log("error: ", error);
        };
    }

    const handleClose = () => modal(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('access_token');
        try {
            const res = await fetch(`${URL}/api/courses/${courseData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    adminUsername: courseData.adminUsername,
                    title: courseData.title,
                    category: courseData.category,
                    subCategory: courseData.subCategory,
                    topic: courseData.topic,
                    description: courseData.description,
                    language: courseData.language,
                    videoDuration: courseData.videoDuration,
                    videoLink: courseData.videoLink,
                    playlistLink: courseData.playlistLink,
                    price: courseData.price,
                    syllabus: courseData.syllabus,
                    instructors: courseData.instructors,
                    thumbnail: thumbnailConvert,
                    fileName: fileNameConvert,
                }),
                credentials: 'include',
            });
            if (res.status === 200) {
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

    const [syllabus, setSyllabus] = useState([]);
    const [newSyllabusItem, setNewSyllabusItem] = useState();
    const [instructors, setInstructors] = useState([]);
    const [newInstructorName, setNewInstructorName] = useState();

    const addSyllabusItem = () => {
        if (newSyllabusItem.trim() !== '') {
            setSyllabus([...syllabus, newSyllabusItem]);
            setNewSyllabusItem('');
        }
    };

    const removeSyllabusItem = (index) => {
        const updatedSyllabus = syllabus.filter((_, i) => i !== index);
        setSyllabus(updatedSyllabus);
    };

    const addInstructor = () => {
        if (newInstructorName.trim() !== '') {
            setInstructors([...instructors, newInstructorName]);
            setNewInstructorName('');
        }
    };

    const removeInstructor = (index) => {
        const updatedInstructors = instructors.filter((_, i) => i !== index);
        setInstructors(updatedInstructors);
    };

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
                        Edit Course
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleUpdate}>
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
                                        name="title"
                                        value={courseData.title}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Course Title"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Category</Label>
                                <Col sm={9}>
                                    <Input
                                        name="category"
                                        value={courseData.category}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Category"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Sub-Category</Label>
                                <Col sm={9}>
                                    <Input
                                        name="subCategory"
                                        onChange={
                                                (e) => handleChange(e)

                                        }
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
                                        name="topic"
                                        value={courseData.topic}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Topic"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> Description </Label>
                                <Col sm={9}>
                                    <Input
                                        name="description"
                                        value={courseData.description}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Description"
                                        type="textarea" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Language</Label>
                                <Col sm={9}>
                                    <Input
                                        name="language"
                                        value={courseData.language}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Language"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Video Duration</Label>
                                <Col sm={9}>
                                    <Input
                                        name="videoDuration"
                                        value={courseData.videoDuration}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Video Duration"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Video Link</Label>
                                <Col sm={9}>
                                    <Input
                                        name="videoLink"
                                        value={courseData.videoLink}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Video Link"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Playlist Link</Label>
                                <Col sm={9}>
                                    <Input
                                        name="playlistLink"
                                        value={courseData.playlistLink}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Playlist Link"
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Price</Label>
                                <Col sm={9}>
                                    <Input
                                        name="price"
                                        value={courseData.price}
                                        onChange={
                                            (e) => handleChange(e)
                                        }
                                        placeholder="Price"
                                        type="text" />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Syllabus</Label>
                                <Col sm={9}>
                                    {syllabus.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                            <Button onClick={
                                                () => removeSyllabusItem(index)
                                            }>
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                    <Input
                                        name="syllabus"
                                        type="text"
                                        value={newSyllabusItem}
                                        placeholder='Syllabus'
                                        onChange={
                                            (e) => setNewSyllabusItem(e.target.value)
                                        }
                                    />
                                    <Button onClick={addSyllabusItem}>Add</Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Instructor</Label>
                                <Col sm={9}>
                                    {instructors.map((name, index) => (
                                        <li key={index}>
                                            {name}
                                            <Button onClick={
                                                () => removeInstructor(index)
                                            }>
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                    <Input
                                        name="instructor"
                                        type="text"
                                        value={newInstructorName}
                                        placeholder='Instructor'
                                        onChange={
                                            (e) => setNewInstructorName(e.target.value)
                                        }
                                    />
                                    <Button onClick={addInstructor}>Add</Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> Thumbnail </Label>
                                <Col sm={9}>
                                    <Input id="File" name="thumbnail"
                                        onChange={convertToBase64}
                                        type="file"
                                    />
                                    <img src={base64Thumbnail} alt="Current Thumbnail" style={{ maxWidth: "100px", margin: "5px" }} />
                                    Selected Image: {courseData.fileName}
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='navbar-btn' type="submit" onClick={handleUpdate}>
                            Update Course
                        </Button>{' '}
                        <Button className='navbar-btn' onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            }
        </>
    );
};

export default EditCourse;


