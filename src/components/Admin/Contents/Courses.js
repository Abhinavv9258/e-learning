import React, { useState } from 'react';

import { Box, Typography, Button } from '@mui/material';

// importing icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AiOutlineFileExcel } from "react-icons/ai";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Paper,
    // Checkbox,
} from '@mui/material';

import Tooltip from '@mui/material/Tooltip';

// importing styles
import { makeStyles } from '@mui/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

// importing modals
import AddNewCourse from '../../modals/AddNewCourse';
import EditCourse from '../../modals/EditCourse';
import ConfirmDeletion from '../../modals/ConfirmDeletion';
import ViewCourseDetails from '../../modals/ViewCourseDetails';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { URL } from '../../../App';



const columns = [
    { field: 'adminUsername', headerName: 'Admin', minWidth: '50px' },
    { field: 'title', headerName: 'Title', minWidth: '50px' },
    { field: 'category', headerName: 'Category', minWidth: '50px' },
    { field: 'subCategory', headerName: 'Sub-Category', minWidth: '50px' },
    { field: 'topic', headerName: 'Topic', minWidth: '50px' },
    { field: 'price', headerName: 'Price', minWidth: '50px' },
    { field: 'language', headerName: 'Language', minWidth: '50px' },
];

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: 'rgba(17,24,39,0.1)',
    }
});

const TableCellComponent = ({ row, col }) => {
    if (col.field === 'title') {
        return (
            <TableCell>
                {row[col.field]}
            </TableCell>
        );
    }
    if (col.field === 'price') {
        return (
            <TableCell>
                Rs.{row[col.field]}
            </TableCell>
        );
    }
    return (
        <TableCell>
            {row[col.field]}
        </TableCell>
    );
};


const Courses = ({ user }) => {

    const [courseData, setCourseData] = React.useState();

    // get courses list 
    const allCourseDetails = async () => {
        const res = await fetch(`${URL}/api/courses/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setCourseData(data);
    }

    React.useEffect(() => {
        if (user) {
            allCourseDetails();
        }
        // eslint-disable-next-line
    }, [user])


    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    // const [selectAll, setSelectAll] = React.useState(false);
    // const [selected, setSelected] = React.useState([]);

    const classes = useStyles();

    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //         setSelected(courseData.map((row) => row._id));
    //         setSelectAll(true);
    //     } else {
    //         setSelected([]);
    //         setSelectAll(false);
    //     }
    // };

    // const handleSelectClick = (id) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = [...selected, id]; // Add the ID to the selection
    //     } else {
    //         newSelected = selected.filter((itemId) => itemId !== id); // Remove the ID from the selection
    //     }
    //     setSelected(newSelected);
    // };


    const [page, setPage] = React.useState(0);
    const pageSize = 4;

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page) * pageSize;
    const endIndex = startIndex + pageSize;

    const sendData = (e) => {
        setModal(true);
    }

    // handle delete
    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const handleDeleteCourse = (id) => {
        setOpenConfirmation({ open: true, courseId: id });
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleConfirmDelete = async () => {
        const { courseId } = openConfirmation;
        const token = localStorage.getItem('access_token');
        try {
            const res = await fetch(`${URL}/api/courses/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (res.status === 200) {
                const data = await res.json();
                window.location.reload();
                toast.success(data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } else {
                // Course entry failed, handle the error message from the server
                const data = await res.json();
                if (data && data.message) {
                    toast.error(`res not ok ${data.message}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error('Course deletion failed. Please try again.', {
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
    };


    // edit course functionality
    const [editCourseConfirm, setEditCourseConfirm] = React.useState(false);

    const editToggle = () => {
        setEditCourseConfirm(!editCourseConfirm);
    }

    const handleCourseEdit = async (id) => {
        const res = await fetch(`${URL}/api/courses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        const thumbnailData = JSON.parse(data.thumbnail);
        const base64Thumbnail = thumbnailData.base64;
        setEditCourseConfirm({ open: true, base64Thumbnail: base64Thumbnail, ...data });
        // setModal(true);
    };

    const [viewModal, setViewModal] = React.useState(false);
    const handleCourseView = async (id) => {
        const res = await fetch(`${URL}/api/courses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        const thumbnailData = JSON.parse(data.thumbnail);
        const base64Thumbnail = thumbnailData.base64;
        setViewModal({ open: true, base64Thumbnail: base64Thumbnail, ...data });
    }

    const editViewToggle = () => {
        setViewModal(!viewModal);
    }

    const handleChange = (e) => {
        setEditCourseConfirm({
            ...editCourseConfirm,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>

            {courseData &&

                <>
                    <Box component="main" sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        m: 1,
                        // height: '100vh',
                        overflow: 'auto',
                    }}
                    >
                        <Box>
                            <Typography paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                                Dashboard
                                <NavigateNextIcon sx={{ color: 'grey' }} />
                                Courses
                            </Typography>
                        </Box>
                        <Box sx={{ padding: '1.5rem', border: 1, borderRadius: 1 }}>
                            <Box>
                                <Typography variant='h6' sx={{ marginBottom: '1.5rem' }}>
                                    Courses
                                </Typography>
                            </Box>

                            <Box sx={{ marginBottom: '1rem' }}>
                                <Button sx={{ border: 1, marginRight: '0.5rem', marginBottom: '0.5rem' }} onClick={sendData}>
                                    <PersonAddIcon sx={{ transform: "scaleX(-1)", marginRight: '0.5rem' }} />
                                    <Typography sx={{ fontSize: '14px', textTransform: 'capitalize' }}>
                                        New
                                    </Typography>
                                </Button>
                                <Button sx={{ border: 1, marginRight: '0.5rem', marginBottom: '0.5rem' }}>
                                    <PersonRemoveIcon sx={{ marginRight: '0.5rem' }} />
                                    <Typography sx={{ fontSize: '14px', textTransform: 'capitalize' }}>
                                        Delete
                                    </Typography>
                                </Button>
                                <Button sx={{ border: 1, marginRight: '0.5rem', marginBottom: '0.5rem' }}>
                                    <AiOutlineFileExcel
                                        style={{ fontSize: '20px', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                    <Typography sx={{ fontSize: '14px', textTransform: 'capitalize' }}>
                                        Export to Excel
                                    </Typography>
                                </Button>
                            </Box>

                            {/* Table */}
                            <Box style={{ width: '100%', overflow: 'auto' }} >
                                <TableContainer style={{ width: '100%', overflow: 'auto' }} component={Paper}>
                                    <Table style={{ minWidth: '75vw' }}>
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                {/* <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectAll}
                                                        indeterminate={selected.length > 0 && selected.length < courseData.length}
                                                        onChange={handleSelectAllClick}
                                                    />
                                                </TableCell> */}
                                                <TableCell>ID</TableCell>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        sx={{
                                                            minWidth: `${column.minWidth}`,
                                                        }}
                                                        key={column.field}
                                                    >
                                                        {column.headerName}
                                                    </TableCell>
                                                ))}
                                                <TableCell />
                                                <TableCell />
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {courseData.slice(startIndex, endIndex).map((row, index) => (
                                                <TableRow key={row._id} 
                                                // selected={selected.indexOf(row._id) !== -1}
                                                >
                                                    {/* <TableCell padding="checkbox">
                                                        <Checkbox
                                                            onClick={() => handleSelectClick(row._id)}
                                                            checked={selected.indexOf(row._id) !== -1}
                                                        // checked={isSelected(row._id)}
                                                        />
                                                    </TableCell> */}
                                                    <TableCell>{startIndex + index + 1}</TableCell>
                                                    {columns.map((col) => (
                                                        <TableCellComponent key={col.field} row={row} col={col} />
                                                    ))}
                                                    <TableCell>
                                                        <Tooltip title='View'>
                                                            <SearchIcon sx={{ color: '#f76363', cursor: 'pointer' }} onClick={() => handleCourseView(row._id)} />
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title='Edit'>
                                                            <EditIcon sx={{ color: '#f76363', cursor: 'pointer' }} onClick={() => handleCourseEdit(row._id)} />
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title='Delete'>
                                                            <DeleteIcon sx={{ color: '#f76363', cursor: 'pointer' }} onClick={() => handleDeleteCourse(row._id)} />
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <TablePagination
                                component={Box}
                                count={courseData.length}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={pageSize}
                                rowsPerPageOptions={[pageSize]}
                            />
                        </Box>
                    </Box>
                    <AddNewCourse
                        toggle={toggle}
                        modal={modal}
                    />
                    <ConfirmDeletion
                        open={openConfirmation}
                        courseId={openConfirmation.courseId}
                        onConfirm={handleConfirmDelete}
                        onClose={handleCloseConfirmation}
                    />
                    <EditCourse
                        modal={editCourseConfirm}
                        toggle={editToggle}
                        handleChange={handleChange}
                        courseData={editCourseConfirm}
                        base64Thumbnail={editCourseConfirm.base64Thumbnail}
                    />
                    <ViewCourseDetails
                        modal={viewModal}
                        toggle={editViewToggle}
                        courseData={viewModal}
                        base64Thumbnail={viewModal.base64Thumbnail}
                    />
                </>
            }
        </>
    );
};


export default Courses;