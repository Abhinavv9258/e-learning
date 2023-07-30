import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import EditCourse from './modals/EditCourse'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Course = ({adminID, index, deleteCourse, updateListArray}) => {
    const [modal, setModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const navigate = useNavigate();
    const navigatePost = () => {
        navigate('/mypost',{ state: { boardObj } });
        window.location.reload();
    };
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const toggle = () => {
        setModal(!modal);
    }

    const updateBoard =(obj) => {
        updateListArray(obj,index);
    }

    const handleDelete = () => {
        deleteCourse(index);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="card">
                <div className="card-holder" style={{background:boardObj.Colour}}></div>
                <div className="card-body">
                    <h5 className="card-title" onClick={navigatePost}> {boardObj.Title}</h5>
                    {/* </NavLink>     */}
                    <div className="card-options">
                    <div
                    id="basic-button"
                    style = {{"cursor" : "pointer"}}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    ><img alt="icon" src={Union}/></div>
                    <Menu id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    >
                        <MenuItem className="menu-options edit" style = {{"cursor" : "pointer"}} onClick={()=>setModal(true)}><img alt="icon" className='edit-icon' src={PencilLineOutlined}/>Edit</MenuItem>
                        <MenuItem className="menu-options delete" style = {{"cursor" : "pointer"}} onClick={handleDelete}><img alt="icon" className='delete-icon' src={DeleteOutlined}/>Delete</MenuItem>
                    </Menu>
                    </div>
                </div>
                <EditBoard modal = {modal} toggle = {toggle} updateBoard = {updateBoard} boardObj = {boardObj}/>
            </div>
        </>
    );
};

export default Course;