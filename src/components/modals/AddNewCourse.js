import React,{useState} from 'react';
import {  Modal,ModalBody,ModalFooter,ModalHeader,Form,Label,Col,Input,FormGroup,FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from '@mui/material';
import {addCourse} from '../../service/api'

const AddNewCourse = ({modal,toggle,save}) => {

    const [inputData, setInputData] = React.useState({ 
        adminUsername:'',
        title:'',
        category:'',
        subCategory:'',
        topic:'',
        description:'',
        language:'',
        videoDuration:'',
        price:'',
        thumbnail:''
    });

    function convertToBase64(e){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            inputData.thumbnail = reader.result;
        };
        reader.onerror = (error) => {
            console.log("error: ",error);
        };
    }

    const handleClose = () => modal(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        await addCourse(inputData);
        alert('Data added successfully');
        // navigate('/');
    }

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} 
            scrollable 
            size='lg' onHide={handleClose}>
                <ModalHeader toggle={toggle}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label sm={3}>Admin Username</Label>
                        <Col sm={9}>
                        <Input name="adminUsername" onChange={(e) => setInputData({ ...inputData, adminUsername: e.target.value })} placeholder="Admin Username" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Course Title</Label>
                        <Col sm={9}>
                        <Input name="title" onChange={(e) => setInputData({ ...inputData, title: e.target.value })} placeholder="Course Title" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Category</Label>
                        <Col sm={9}>
                        <Input name="category" onChange={(e) => setInputData({ ...inputData, category: e.target.value })} placeholder="Category" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Sub-Category</Label>
                        <Col sm={9}>
                        <Input name="subCategory" onChange={(e) => setInputData({ ...inputData, subCategory: e.target.value })} placeholder="Sub-Category" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Topic</Label>
                        <Col sm={9}>
                        <Input name="topic" onChange={(e) => setInputData({ ...inputData, topic: e.target.value })} placeholder="Topic" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}> Description </Label>
                        <Col sm={9}>
                        <Input name="description" onChange={(e) => setInputData({ ...inputData, description: e.target.value })} placeholder="Description" type="textarea" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Language</Label>
                        <Col sm={9}>
                        <Input name="language" onChange={(e) => setInputData({ ...inputData, language: e.target.value })} placeholder="Language" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Video Duration</Label>
                        <Col sm={9}>
                        <Input name="videoDuration" onChange={(e) => setInputData({ ...inputData, videoDuration: e.target.value })} placeholder="Video Duration" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Price</Label>
                        <Col sm={9}>
                        <Input name="price" onChange={(e) => setInputData({ ...inputData, price: e.target.value })} placeholder="Price" type="text"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}> Thumbnail </Label>
                        <Col sm={9}>
                        <Input id="File" name="thumbnail" 
                        // onChange={(e) => setInputData({ ...inputData, thumbnail: e.target.value })} 
                        onChange={convertToBase64}
                        type="file" />
                        <FormText> This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line. </FormText>
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