import React,{useState} from 'react';
import { Button, Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const AddNewCourse = ({modal,toggle,save,boardObj}) => {
    const [postSubject, setPostSubject] = useState('');
    const [postImage, setPostImage] = useState('');
    const [postDescription, setPostDescription] = useState('');

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);
    
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) =>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onabort = (error) => reject(error);
        })
    }

    const handleChange = (e) => {
        const {name,value} = e.target
        if(name === "postSubject"){
            setPostSubject(value);
        }
        else if(name === "postDescription"){
            setPostDescription(value);
        }
    }
    
    const handlePublish = () => {
        let postObject = {}
        postObject["Subject"] = postSubject;
        postObject["Image"] = postImage;
        postObject["Description"] = postDescription;
        postObject["BoardName"] = boardObj.Title;
        save(postObject);
        window.location.reload();
    }

    const handleImg = async (e) => {
        const file = e.target.files[0];
        const imageBase64 = await getBase64(file);
        setPostImage(imageBase64);
    }

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} aria-labelledby="contained-modal-title-vcenter" centered >
                <form className="form-control post-from">
                    <div className='head'>
                        <div className="header">
                            <h className="header-title">Create a post</h>
                            <img  className="close-icon" onClick={toggle} />
                        </div>
                        <h3 className="header-description">Write something for your post</h3>
                    </div>
                    <div className="post-subject">
                        <h className="subject">Subject</h>
                        <input className="form-control postsubject" type="text" name="postSubject" onChange={handleChange} placeholder="Post Subject" value={postSubject}/>
                    </div>
                    <div className="form-control postImage" onClick={handleClick}> 
                        <img className="add-image-icon"/> <h2 className="image-text">Add your image</h2>                     
                        <input className="form-control postImage" 
                        type="file" 
                        name={postImage} 
                        id="postImage" 
                        ref={hiddenFileInput}
                        style={{display: 'none'}}
                        // value={postImage}
                        onChange={handleImg}                         
                        />   
                    </div>
                    <hr style={{marginBottom:"31px"}}/>
                    <div className="post-description">
                        <h className="description">What’s on your mind? </h>
                        <textarea className="form-control postDescription" rows="4" cols="500" type="text" name="postDescription" onChange={handleChange} placeholder="Type Here" value={postDescription}></textarea>
                    </div>
                    <div className="create-post">
                        <Button color="primary" onClick={handlePublish}>Publish</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddNewCourse;