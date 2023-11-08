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

// importing styles
import { makeStyles } from '@mui/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import { URL } from '../../../App';


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

    console.log(userData)



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
                            <Button sx={{ border: 1, marginRight: '0.5rem', marginBottom: '0.5rem' }}>
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
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectAll}
                                                    indeterminate={selected.length > 0 && selected.length < userData.length}
                                                    onChange={handleSelectAllClick}
                                                />
                                            </TableCell>
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
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={() => handleSelectClick(row._id)}
                                                        checked={isSelected(row._id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {index + 1}
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
                                                    {row.isAdmin ? (
                                                        <Typography sx={{ color: 'green' }}>
                                                            Active
                                                        </Typography>
                                                    ) : (
                                                        <Typography sx={{ color: '#f76363' }}>Disabled</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <SearchIcon sx={{ color: '#f76363' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <EditIcon sx={{ color: '#f76363' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <DeleteIcon sx={{ color: '#f76363' }} />
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
                </Box>
            }
        </>
    );
};

export default UserProfile;