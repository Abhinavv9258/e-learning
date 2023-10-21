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
    // FormText ,
} from 'reactstrap';
import { Button } from '@mui/material';

// importing styles 
import 'bootstrap/dist/css/bootstrap.css';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { URL } from '../../App';

import {useApp} from '../../context/AuthContext'


const AddNewCourse = ({ modal, toggle, save }) => {
    const { user } = useApp();

    const [courseDetails, setCourseDetails] = React.useState({
        adminUsername: user.username,
        title: '',
        category: '',
        subCategory: '',
        topic: '',
        description: '',
        language: '',
        videoDuration: '',
        videoLink:'',
        price: '',
        thumbnail: ''
    });

    function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            courseDetails.thumbnail = reader.result;
        };
        reader.onerror = (error) => {
            console.log("error: ", error);
        };
    }

    const handleClose = () => modal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('access_token');
        // await addCourse(courseDetails);
        const { adminUsername, title, category, subCategory, topic, description, language, videoDuration, videoLink, price, thumbnail } = courseDetails;
        try{
            const res = await fetch(`${URL}/api/courses`, {
                method:'POST',
                headers:{
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
                    price, 
                    thumbnail
                }),
                credentials: 'include',
            });
            if (res.status === 200){
                try{
                    const data = await res.json();
                    if (data){
                        toast.success(`Successfully Added Course 😃!`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                        // window.location.reload();
                    }else{
                        console.error('Unexpected response structure:', res);
                        console.log('Unexpected response structure:', res);                        
                        toast.error('An error occurred during Course Entry. Please try again later.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }
                } catch (jsonError){
                    console.error('Error parsing JSON response:', jsonError);
                    console.log('Error parsing JSON response:', jsonError);
                    toast.error('An error occurred during Course Entry. Please try again later.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            }else{
                // Course entry failed, handle the error message from the server
                const data = await res.json();
                if (data && data.message) {
                    toast.error(data.message, {
                        position: 'top-center'
                    });
                } else {
                    toast.error('Course entry failed. Please try again.', {
                        position: 'top-center'
                    });
                }
            }
        }catch(error){
            console.log("error while hitting Api: ", error);
            toast.error('An error occurred while hitting Api. Please try again later.', {
                position: 'top-center'
            });
        }
    }

    return (
        <>
            <Modal isOpen={modal} 
            toggle={toggle}
                scrollable
                zIndex={2500} 
                size='lg' 
                onHide={handleClose}>
                <ModalHeader toggle={toggle}>
                    Add Course
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label sm={3}>Admin Username</Label>
                            <Col sm={9}>
                                <Input name="adminUsername" 
                                // onChange={(e) => setCourseDetails({ ...courseDetails, adminUsername: e.target.value })} 
                                disabled 
                                placeholder={user.username} 
                                value={user.username} 
                                type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Course Title</Label>
                            <Col sm={9}>
                                <Input name="title" onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })} placeholder="Course Title" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Category</Label>
                            <Col sm={9}>
                                <Input name="category" onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })} placeholder="Category" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Sub-Category</Label>
                            <Col sm={9}>
                                <Input name="subCategory" onChange={(e) => setCourseDetails({ ...courseDetails, subCategory: e.target.value })} placeholder="Sub-Category" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Topic</Label>
                            <Col sm={9}>
                                <Input name="topic" onChange={(e) => setCourseDetails({ ...courseDetails, topic: e.target.value })} placeholder="Topic" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}> Description </Label>
                            <Col sm={9}>
                                <Input name="description" onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })} placeholder="Description" type="textarea" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Language</Label>
                            <Col sm={9}>
                                <Input name="language" onChange={(e) => setCourseDetails({ ...courseDetails, language: e.target.value })} placeholder="Language" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Video Duration</Label>
                            <Col sm={9}>
                                <Input name="videoDuration" onChange={(e) => setCourseDetails({ ...courseDetails, videoDuration: e.target.value })} placeholder="Video Duration" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Video Link</Label>
                            <Col sm={9}>
                                <Input name="videoLink" onChange={(e) => setCourseDetails({ ...courseDetails, videoLink: e.target.value })} placeholder="Video Link" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Price</Label>
                            <Col sm={9}>
                                <Input name="price" onChange={(e) => setCourseDetails({ ...courseDetails, price: e.target.value })} placeholder="Price" type="text" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}> Thumbnail </Label>
                            <Col sm={9}>
                                <Input id="File" name="thumbnail"
                                    // onChange={(e) => setCourseDetails({ ...courseDetails, thumbnail: e.target.value })} 
                                    onChange={convertToBase64}
                                    type="file" />
                                {/* <FormText> This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line. </FormText> */}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>  </Label>
                            <Col sm={{ size: 9 }}>
                                <FormGroup check>
                                    <Input id="checkbox3" type="checkbox" /> {' '}
                                    <Label check> Check me out </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        {/* <Button className='navbar-btn' type="submit">
                        Add Course
                    </Button> */}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className='navbar-btn' type="submit" onClick={handleSubmit}>
                        Add Course
                    </Button>{' '}
                    <Button className='navbar-btn' onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default AddNewCourse;