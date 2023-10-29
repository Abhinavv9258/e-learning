import React, { useState, useEffect } from 'react';
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

// Import styles and libraries
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { URL } from '../../App';
import { useApp } from '../../context/AuthContext';

const EditCourse = ({ modal, toggle, courseData, courseId }) => {
    const { user } = useApp();
    const [courseDetails, setCourseDetails] = useState({
        adminUsername: user.username,
        title: '',
        category: '',
        subCategory: '',
        topic: '',
        description: '',
        language: '',
        videoDuration: '',
        videoLink: '',
        playlistLink: '',
        price: '',
        syllabus: [],
        instructors: [],
        thumbnail: '',
        fileName: '',
    });

    const clearThumbnail = () => {
        setCourseDetails({
            ...courseDetails,
            thumbnail: null,
            fileName: null,
        });
    };

    const handleClose = () => {
        clearThumbnail();
        toggle();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('access_token');
        const {
            adminUsername,
            title,
            category,
            subCategory,
            topic,
            description,
            language,
            videoDuration,
            videoLink,
            playlistLink,
            price,
            syllabus,
            instructors,
            thumbnail,
            fileName,
        } = courseDetails;
        try {
            const res = await fetch(`${URL}/api/courses/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    adminUsername,
                    title,
                    category,
                    subCategory,
                    topic,
                    description,
                    language,
                    videoDuration,
                    videoLink,
                    playlistLink,
                    price,
                    syllabus,
                    instructors,
                    thumbnail,
                    fileName,
                }),
                credentials: 'include',
            });
            if (res.status === 200) {
                try {
                    const data = await res.json();
                    if (data) {
                        toast.success(`Course details updated successfully!`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                        toggle(); // Close the modal after successful update
                    } else {
                        console.error('Unexpected response structure:', res);
                        toast.error('An error occurred during course update. Please try again later.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                } catch (jsonError) {
                    console.error('Error parsing JSON response:', jsonError);
                    toast.error('An error occurred during course update. Please try again later.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            } else {
                const data = await res.json();
                if (data && data.message) {
                    toast.error(data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error('Course update failed. Please try again.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            }
        } catch (error) {
            console.log("Error while hitting API: ", error);
            toast.error('An error occurred while hitting API. Please try again later.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    const addSyllabusItem = () => {
        if (newSyllabusItem.trim() !== '') {
            setCourseDetails({
                ...courseDetails,
                syllabus: [...courseDetails.syllabus, newSyllabusItem],
            });
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
            setCourseDetails({
                ...courseDetails,
                instructors: [...courseDetails.instructors, newInstructorName],
            });
            setInstructors([...instructors, newInstructorName]);
            setNewInstructorName('');
        }
    };

    const removeInstructor = (index) => {
        const updatedInstructors = instructors.filter((_, i) => i !== index);
        setInstructors(updatedInstructors);
    };

    const [syllabus, setSyllabus] = useState([]);
    const [newSyllabusItem, setNewSyllabusItem] = useState();
    const [instructors, setInstructors] = useState([]);
    const [newInstructorName, setNewInstructorName] = useState();

    const updateSyllabusItem = (index, newValue) => {
        // Update the syllabus item at the specified index with the new value.
        const updatedSyllabus = [...courseDetails.syllabus];
        updatedSyllabus[index] = newValue;

        setCourseDetails({
            ...courseDetails,
            syllabus: updatedSyllabus,
        });
    };

    const updateInstructorName = (index, newName) => {
        // Update the instructor name at the specified index with the new name.
        const updatedInstructors = [...courseDetails.instructors];
        updatedInstructors[index] = newName;

        setCourseDetails({
            ...courseDetails,
            instructors: updatedInstructors,
        });
    };


    function convertToBase64(e) {
        var reader = new FileReader();
        const selectedFile = e.target.files[0];
        const selectedFileName = selectedFile.name;

        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            setCourseDetails({
                ...courseDetails,
                thumbnail: reader.result,
                fileName: selectedFileName,
            });
        };
        reader.onerror = (error) => {
            console.log("error: ", error);
        };
    }


    return (
        <>
            <Modal
                isOpen={modal}
                toggle={toggle}
                scrollable
                zIndex={2500}
                size="lg"
            >
                <ModalHeader toggle={toggle}>Edit Course</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        {/* Admin Username */}
                        <FormGroup row>
                            <Label sm={3}>Admin Username</Label>
                            <Col sm={9}>
                                <Input
                                    name="adminUsername"
                                    disabled
                                    placeholder={user.username}
                                    value={user.username}
                                    type="text"
                                />
                            </Col>
                        </FormGroup>

                        {/* Other Course Details */}
                        <FormGroup row>
                            <Label sm={3}>Course Title</Label>
                            <Col sm={9}>
                                <Input
                                    name="title"
                                    onChange={(e) =>
                                        setCourseDetails({
                                            ...courseDetails,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Course Title"
                                    type="text"
                                    value={courseData.title}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Category</Label>
                            <Col sm={9}>
                                <Input
                                    name="category"
                                    value={courseData.category}
                                    onChange={
                                        // (e) => handleCourseDetailsUpdate('category', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, category: e.target.value })
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
                                    value={courseData.subCategory}
                                    onChange={
                                        
                                        // (e) => handleCourseDetailsUpdate('subCategory', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, subCategory: e.target.value })
                                    }
                                    placeholder="Sub-Category"
                                    type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Topic</Label>
                            <Col sm={9}>
                                <Input
                                    name="topic"
                                    value={courseData.topic}
                                    onChange={
                                        // (e) => handleCourseDetailsUpdate('topic', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, topic: e.target.value })
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
                                        // (e) => handleCourseDetailsUpdate('description', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, description: e.target.value })
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
                                        // (e) => handleCourseDetailsUpdate('language', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, language: e.target.value })
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
                                        // (e) => handleCourseDetailsUpdate('videoDuration', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, videoDuration: e.target.value })
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
                                        // (e) => handleCourseDetailsUpdate('videoLink', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, videoLink: e.target.value })
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
                                        // (e) => handleCourseDetailsUpdate('playlistLink', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, playlistLink: e.target.value })
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
                                        // (e) => handleCourseDetailsUpdate('price', e.target.value)
                                        (e) => setCourseDetails({ ...courseDetails, price: e.target.value })
                                    }
                                    placeholder="Price"
                                    type="text" />
                            </Col>
                        </FormGroup>

                        {/* Syllabus */}
                        <FormGroup row>
                            <Label sm={3}>Syllabus</Label>
                            <Col sm={9}>
                                {syllabus.map((item, index) => (
                                    <div key={index}>
                                        <Input
                                            type="text"
                                            value={item}
                                            onChange={(e) =>
                                                updateSyllabusItem(index, e.target.value)
                                            }
                                        />
                                        <Button onClick={() => removeSyllabusItem(index)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Input
                                    name="syllabus"
                                    type="text"
                                    value={newSyllabusItem}
                                    placeholder="Syllabus"
                                    onChange={(e) => setNewSyllabusItem(e.target.value)}
                                />
                                <Button onClick={addSyllabusItem}>Add</Button>
                            </Col>
                        </FormGroup>

                        {/* Instructors */}
                        <FormGroup row>
                            <Label sm={3}>Instructors</Label>
                            <Col sm={9}>
                                {instructors.map((name, index) => (
                                    <div key={index}>
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                updateInstructorName(index, e.target.value)
                                            }
                                        />
                                        <Button onClick={() => removeInstructor(index)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Input
                                    name="instructor"
                                    type="text"
                                    value={newInstructorName}
                                    placeholder="Instructor"
                                    onChange={(e) => setNewInstructorName(e.target.value)}
                                />
                                <Button onClick={addInstructor}>Add</Button>
                            </Col>
                        </FormGroup>

                        {/* Thumbnail */}
                        <FormGroup row>
                            <Label sm={3}>Thumbnail</Label>
                            <Col sm={9}>
                                <Input
                                    id="File"
                                    name="thumbnail"
                                    onChange={convertToBase64}
                                    type="file"
                                />
                                {courseDetails.thumbnail && (
                                    <img
                                        src={courseDetails.thumbnail}
                                        alt={courseDetails.fileName}
                                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                                    />
                                )}
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className="navbar-btn" type="submit" onClick={handleSubmit}>
                        Save Changes
                    </Button>{' '}
                    <Button className="navbar-btn" onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default EditCourse;
