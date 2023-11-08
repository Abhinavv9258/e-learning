import React from 'react';

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
    Checkbox,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

// importing styles
import { makeStyles } from '@mui/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { URL } from '../../../App';

import ConfirmDeletion from '../../modals/ConfirmDeletion';
import AddUserProfile from '../../modals/AddUserProfile';


const columns = [
    { field: 'avatar', headerName: 'Avatar', minWidth: '50px' },
    { field: 'email', headerName: 'Email ID', minWidth: '50px' },
    { field: 'username', headerName: 'Username', minWidth: '50px' },
    { field: 'role', headerName: 'Role', minWidth: '50px' },
    { field: 'status', headerName: 'Status', minWidth: '50px' },
];

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: 'rgba(17,24,39,0.1)',
    }
});


const UserProfile = ({ user }) => {

    const [userData, setUserData] = React.useState();
    const getAllUserProfile = async () => {
        let token = localStorage.getItem('access_token');
        const res = await fetch(`${URL}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
        });
        const data = await res.json();
        setUserData(data);
    }

    React.useEffect(() => {
        if (user) {
            getAllUserProfile();
        }
        // eslint-disable-next-line
    }, []);

    const [selectAll, setSelectAll] = React.useState(false);
    const [selected, setSelected] = React.useState([]);

    // const [selected, setSelected] = React.useState(userData.map((row) => row._id));
    const classes = useStyles();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(userData.map((row) => row._id));
            setSelectAll(true);
        } else {
            setSelected([]);
            setSelectAll(false);
        }
    };

    // const handleSelectClick = (id) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];
    //
    //     if (selectedIndex === -1) {
    //         newSelected = [...selected, id];
    //     } else {
    //         // selected.splice(selectedIndex, 1);
    //         // newSelected = [...selected];
    //         newSelected = selected.filter((itemId) => itemId !== id);
    //     }
    //
    //     setSelected(newSelected);
    // };

    const handleSelectClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id]; // Add the ID to the selection
        } else {
            newSelected = selected.filter((itemId) => itemId !== id); // Remove the ID from the selection
        }
        // console.log(selectedIndex);
        // console.log(newSelected);
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const [page, setPage] = React.useState(0);
    const pageSize = 3;

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page) * pageSize;
    const endIndex = startIndex + pageSize;


    // add user profile
    const [modal, setModal] = React.useState(false);
    const sendData = (e) => {
        setModal(true);
    }


    // edit details
    const toggle = () => {
        setModal(!modal);
    }

    // handle delete
    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const handleUserDelete = (id) => {
        setOpenConfirmation({ open: true, userId: id });
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleConfirmDelete = async () => {
        const { userId } = openConfirmation;
        const token = localStorage.getItem('access_token');
        try {
            const res = await fetch(`${URL}/api/users/${userId}`, {
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

    return (
        <>
            {userData &&
                <Box component="main" sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    // height: '100vh',
                    overflow: 'auto',
                    m: 1,
                }}
                >
                    <Box>
                        <Typography paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                            Dashboard
                            <NavigateNextIcon sx={{ color: 'grey' }} />
                            User
                        </Typography>
                    </Box>
                    <Box sx={{ padding: '1.5rem', border: 1, borderRadius: 1 }}>
                        <Box>
                            <Typography variant='h6' sx={{ marginBottom: '1.5rem' }}>
                                User
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

                        <Box style={{ width: '100%', overflow: 'auto' }} >
                            <TableContainer style={{ width: '100%', overflow: 'auto' }} component={Paper}>
                                <Table style={{ minWidth: '75vw' }}>
                                    <TableHead className={classes.tableHead}>
                                        <TableRow >
                                            {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectAll}
                                                    indeterminate={selected.length > 0 && selected.length < userData.length}
                                                    onChange={handleSelectAllClick}
                                                />
                                            </TableCell> */}
                                            <TableCell>
                                                ID
                                            </TableCell>
                                            {columns.map((column) => (
                                                <TableCell sx={{
                                                    minWidth: `${column.minWidth}`,
                                                }} key={column.field}>{column.headerName}</TableCell>
                                            ))}
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userData.slice(startIndex, endIndex).map((row, index) => (
                                            <TableRow
                                                key={row._id} selected={isSelected(row._id)}
                                            >
                                                {/* <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={() => handleSelectClick(row._id)}
                                                        checked={isSelected(row._id)}
                                                    />
                                                </TableCell> */}
                                                <TableCell>
                                                    {startIndex + index + 1}
                                                </TableCell>
                                                <TableCell>

                                                </TableCell>
                                                <TableCell>
                                                    {row.email}
                                                </TableCell>
                                                <TableCell>
                                                    {row.username}
                                                </TableCell>
                                                <TableCell>
                                                    {row.isAdmin ? (
                                                        <Typography>
                                                            Admin
                                                        </Typography>
                                                    ) : (
                                                        <Typography>User</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {row.status ? (
                                                        <Typography sx={{ color: 'green' }}>
                                                            Active
                                                        </Typography>
                                                    ) : (
                                                        <Typography sx={{ color: '#f76363' }}>Disabled</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title='View'>
                                                        <SearchIcon sx={{ color: '#f76363', cursor: 'pointer' }} />
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title='Edit'>
                                                        <EditIcon sx={{ color: '#f76363', cursor: 'pointer' }} />
                                                    </Tooltip>                                                
                                                    </TableCell>
                                                <TableCell>
                                                    <Tooltip title='Delete'>
                                                        <DeleteIcon sx={{ color: '#f76363', cursor: 'pointer' }} onClick={() => handleUserDelete(row._id)} />
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
                            count={userData.length}
                            page={page}
                            onPageChange={handlePageChange}
                            rowsPerPage={pageSize}
                            rowsPerPageOptions={[pageSize]}
                        />
                    </Box>

                    <AddUserProfile
                        modal={modal}
                        toggle={toggle}

                    />

                    <ConfirmDeletion
                        open={openConfirmation}
                        userId={openConfirmation.userId}
                        onConfirm={handleConfirmDelete}
                        onClose={handleCloseConfirmation}
                    />
                </Box>
            }
        </>
    );
};

export default UserProfile;