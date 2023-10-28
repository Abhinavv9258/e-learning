// import React,{useState,useEffect} from 'react';
// import { Button, Modal } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.css';

// const EditCourse = ({modal, toggle, updateBoard, boardObj}) => {
//     const [cardList, setCardList] = useState('');
//     const [cardHolderColor, cardColor] = useState('');

//     useEffect(() => {
//         setCardList(boardObj.Title);
//         cardColor(boardObj.Color);
//     },[])

//     const handleChange = (e) => {
//         const {name,value} = e.target
//         if(name === "cardList"){
//             setCardList(value);
//         }else{
//             cardColor(value);
//         }
//     }

//     const handleUpdate = (e) => {
//         e.preventDefault();
//         let tempObj = {}
//         tempObj['Title'] = cardList;
//         tempObj['Color'] = cardHolderColor;
//         updateBoard(tempObj);
//     }

//     const blueColor = () => {
//         cardColor("#A7F0F9");

//     }
//     const violetColor = () => {
//         cardColor("#C5C5FC");
//     }
//     const pinkColor = () => {
//         cardColor("#FFAEC0");
//     }
//     const yellowColor = () => {
//         cardColor("#FFCC66");
//     }

//     return (
//         <>
//             <Modal isOpen={modal} toggle={toggle} aria-labelledby="contained-modal-title-vcenter" centered >
//                 <form className="form-control">
//                     <div className="header">
//                         <h4 className="headTitle">Add a name for your board</h4>
//                         <button type="button" className="btn-close" aria-label="Close" onClick={toggle}></button>
//                     </div>
//                     <div className="title">
//                         <input className="form-control" type="text" name="cardList" onChange={handleChange} placeholder="Board Name" value={cardList}/>
//                     </div>
//                     <div className="templete-color">
//                         <h4 className="headTitle">Select post color</h4>
//                     </div>
//                     <h5 className="colorSet">Here are some templates to help you get started</h5>
//                     <div className="colorPick">
//                         <div onClick={blueColor} className="blueColor"></div>
//                         <div onClick={violetColor} className="violetColor"></div>
//                         <div onClick={pinkColor} className="pinkColor"></div>
//                         <div onClick={yellowColor} className="yellowColor"></div>
//                     </div>
//                     <div className="create-board">
//                         <Button color="primary" onClick={handleUpdate}>Update Board</Button>
//                     </div>
//                 </form>
//             </Modal>
//         </>
//     );
// };
// export default EditCourse;


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
    // FormText ,
} from 'reactstrap';
import { Button } from '@mui/material';

// importing styles 
import 'bootstrap/dist/css/bootstrap.css';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { URL } from '../../App';

import { useApp } from '../../context/AuthContext'


const EditCourse = ({ modal, toggle, save, courseData, base64Thumbnail }) => {
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
        videoLink: '',
        playlistLink: '',
        price: '',
        syllabus: [],
        instructors: [],
        thumbnail: '',
        fileName: '',
    });

    // function convertToBase64(e) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         courseDetails.thumbnail = reader.result;
    //     };
    //     reader.onerror = (error) => {
    //         console.log("error: ", error);
    //     };
    // }
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
            })
            // courseDetails.thumbnail = reader.result;
            // courseDetails.selectedFileName = selectedFileName;
        };
        reader.onerror = (error) => {
            console.log("error: ", error);
        };
    }

    const handleClose = () => modal(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('access_token');
        // await addCourse(courseDetails);
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
            const res = await fetch(`${URL}/api/courses/${courseData._id}`, {
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

    // return (
    //     <>
    //         {courseData &&
    //             <Modal isOpen={modal}
    //                 toggle={toggle}
    //                 scrollable
    //                 zIndex={2500}
    //                 size='lg'
    //                 onHide={handleClose}>
    //                 <ModalHeader toggle={toggle}>
    //                     Edit Course
    //                 </ModalHeader>
    //                 <ModalBody>
    //                     <Form onSubmit={handleUpdate}>
    //                         <FormGroup row>
    //                             <Label sm={3}>Admin Username</Label>
    //                             <Col sm={9}>
    //                                 <Input name="adminUsername"
    //                                     // onChange={(e) => setCourseDetails({ ...courseDetails, adminUsername: e.target.value })} 
    //                                     disabled
    //                                     placeholder={user.username}
    //                                     value={user.username}
    //                                     type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Course Title</Label>
    //                             <Col sm={9}>
    //                                 <Input name="title" value={courseData.title} onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })} placeholder="Course Title" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Category</Label>
    //                             <Col sm={9}>
    //                                 <Input name="category" value={courseData.category} onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })} placeholder="Category" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Sub-Category</Label>
    //                             <Col sm={9}>
    //                                 <Input name="subCategory" value={courseData.subCategory} onChange={(e) => setCourseDetails({ ...courseDetails, subCategory: e.target.value })} placeholder="Sub-Category" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Topic</Label>
    //                             <Col sm={9}>
    //                                 <Input name="topic" value={courseData.topic} onChange={(e) => setCourseDetails({ ...courseDetails, topic: e.target.value })} placeholder="Topic" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}> Description </Label>
    //                             <Col sm={9}>
    //                                 <Input name="description" value={courseData.description} onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })} placeholder="Description" type="textarea" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Language</Label>
    //                             <Col sm={9}>
    //                                 <Input name="language" value={courseData.language} onChange={(e) => setCourseDetails({ ...courseDetails, language: e.target.value })} placeholder="Language" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Video Duration</Label>
    //                             <Col sm={9}>
    //                                 <Input name="videoDuration" value={courseData.videoDuration} onChange={(e) => setCourseDetails({ ...courseDetails, videoDuration: e.target.value })} placeholder="Video Duration" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Video Link</Label>
    //                             <Col sm={9}>
    //                                 <Input name="videoLink" value={courseData.videoLink} onChange={(e) => setCourseDetails({ ...courseDetails, videoLink: e.target.value })} placeholder="Video Link" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Playlist Link</Label>
    //                             <Col sm={9}>
    //                                 <Input name="playlistLink" value={courseData.playlistLink} onChange={(e) => setCourseDetails({ ...courseDetails, playlistLink: e.target.value })} placeholder="Playlist Link" type="text" />
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Price</Label>
    //                             <Col sm={9}>
    //                                 <Input name="price" value={courseData.price} onChange={(e) => setCourseDetails({ ...courseDetails, price: e.target.value })} placeholder="Price" type="text" />
    //                             </Col>
    //                         </FormGroup>

    //                         <FormGroup row>
    //                             <Label sm={3}>Syllabus</Label>
    //                             <Col sm={9}>
    //                                 {syllabus.map((item, index) => (
    //                                     <li key={index}>
    //                                         {item}
    //                                         <Button onClick={() => removeSyllabusItem(index)}>Remove</Button>
    //                                     </li>
    //                                 ))}
    //                                 <Input
    //                                     name="syllabus"
    //                                     type="text"
    //                                     value={newSyllabusItem}
    //                                     placeholder='Syllabus'
    //                                     onChange={(e) => setNewSyllabusItem(e.target.value)}
    //                                 />
    //                                 <Button onClick={addSyllabusItem}>Add</Button>
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>Instructor</Label>
    //                             <Col sm={9}>
    //                                 {instructors.map((name, index) => (
    //                                     <li key={index}>
    //                                         {name}
    //                                         <Button onClick={() => removeInstructor(index)}>Remove</Button>
    //                                     </li>
    //                                 ))}
    //                                 <Input
    //                                     name="instructor"
    //                                     type="text"
    //                                     value={newInstructorName}
    //                                     placeholder='Instructor'
    //                                     onChange={(e) => setNewInstructorName(e.target.value)}
    //                                 />
    //                                 <Button onClick={addInstructor}>Add</Button>                            </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}> Thumbnail </Label>
    //                             <Col sm={9}>
    //                                 <Input id="File" name="thumbnail"
    //                                     // onChange={(e) => setCourseDetails({ ...courseDetails, thumbnail: e.target.value })} 
    //                                     onChange={convertToBase64}
    //                                     type="file"

    //                                 />
    //                                 <img src={base64Thumbnail}
    //                                     alt="Current Thumbnail"
    //                                     style={{ maxWidth: "100px", margin: "5px" }}
    //                                 />
    //                                 Selected Image : {courseData.fileName}
    //                                 {/* <FormText> This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line. </FormText> */}
    //                             </Col>
    //                         </FormGroup>
    //                         <FormGroup row>
    //                             <Label sm={3}>  </Label>
    //                             <Col sm={{ size: 9 }}>
    //                                 <FormGroup check>
    //                                     <Input id="checkbox3" type="checkbox" /> {' '}
    //                                     <Label check> Check me out </Label>
    //                                 </FormGroup>
    //                             </Col>
    //                         </FormGroup>
    //                         {/* <Button className='navbar-btn' type="submit">
    //                     Add Course
    //                 </Button> */}
    //                     </Form>
    //                 </ModalBody>
    //                 <ModalFooter>
    //                     <Button className='navbar-btn' type="submit" onClick={handleUpdate}>
    //                         Update Course
    //                     </Button>{' '}
    //                     <Button className='navbar-btn' onClick={toggle}>
    //                         Cancel
    //                     </Button>
    //                 </ModalFooter>
    //             </Modal>
    //         }
    //     </>
    // );

    const handleCourseDetailsUpdate = (fieldName, value) => {
        setCourseDetails({
            ...courseDetails,
            [fieldName]: value,
        });
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
                                        placeholder={user.username}
                                        value={user.username}
                                        type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Course Title</Label>
                                <Col sm={9}>
                                    <Input name="title"
                                        value={courseData.title}
                                        onChange={
                                            (e) => handleCourseDetailsUpdate('title', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, title: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('category', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, category: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('subCategory', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, subCategory: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('topic', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, topic: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('description', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, description: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('language', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, language: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('videoDuration', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, videoDuration: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('videoLink', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, videoLink: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('playlistLink', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, playlistLink: e.target.value })
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
                                            (e) => handleCourseDetailsUpdate('price', e.target.value)
                                            // (e) => setCourseDetails({ ...courseDetails, price: e.target.value })
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