import React from 'react';

import { Link } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material';

// importing icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AiOutlineFileExcel } from "react-icons/ai";

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


const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'avatar', headerName: 'Avatar' },
    { field: 'emailId', headerName: 'Email ID', minWidth: '100px' },
    { field: 'username', headerName: 'Username', minWidth: '100px' },
    { field: 'role', headerName: 'Role', minWidth: '50px' },
    { field: 'status', headerName: 'Status', minWidth: '50px' },
    { field: 'view', headerName: 'View', minWidth: '50px' },
    { field: 'edit', headerName: 'Edit', minWidth: '50px' },
    { field: 'delete', headerName: 'Delete', minWidth: '50px' },
];

const rows = [
    { id: 1, lastName: 'Doe', username: 'John', age: 25, role: 'Admin', status: 'Active', emailId: 'abhinavv218@gmail.com' },
    { id: 2, lastName: 'Doe', username: 'John', age: 25, role: 'Admin', status: 'Active', emailId: 'abhinavv218@gmail.com' },
    { id: 3, lastName: 'Doe', username: 'John', age: 25, role: 'Admin', status: 'Active', emailId: 'abhinavv218@gmail.com' },
    { id: 4, lastName: 'Doe', username: 'John', age: 25, role: 'Admin', status: 'Active', emailId: 'abhinavv218@gmail.com' },
    // Add more rows as needed
];

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: 'rgba(17,24,39,0.1)',
    }
});


const UserProfile = () => {
    const [selectAll, setSelectAll] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const classes = useStyles();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((row) => row.id);
            setSelected(newSelected);
            setSelectAll(true);
        } else {
            setSelected([]);
            setSelectAll(false);
        }
    };

    const handleSelectClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            selected.splice(selectedIndex, 1);
            newSelected = [...selected];
        }

        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const [page, setPage] = React.useState(0);
    const pageSize = 3; // Define the page size

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page) * pageSize;
    const endIndex = startIndex + pageSize;

    const handleDashboardClick = () => {
        window.history.pushState(null, '', '/admin-dashboard');
        window.location.reload();
    };

    return (
        <>
            <Box>

                <Box>
                    <Typography paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link style={{ textDecoration: 'none', color: 'grey' }} onClick={handleDashboardClick}>Dashboard</Link>
                        <NavigateNextIcon sx={{ color: 'grey' }} />
                        User
                    </Typography>
                </Box>

                <Box sx={{ padding: '1.5rem', border: 1, borderRadius: 2 }}>

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

                    <Box style={{ width: '100%', display: 'block', overflow: 'auto' }}>
                        <Box style={{ width: '100%', overflow: 'auto' }}>
                            <Box>
                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: '85vw' }}>
                                        <TableHead className={classes.tableHead}>
                                            <TableRow >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectAll}
                                                        indeterminate={selected.length > 0 && selected.length < rows.length}
                                                        onChange={handleSelectAllClick}
                                                    />
                                                </TableCell>
                                                {columns.map((column) => (
                                                    <TableCell sx={{
                                                        minWidth: `${column.minWidth}`,
                                                    }} key={column.field}>{column.headerName}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.slice(startIndex, endIndex).map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    selected={isSelected(row.id)}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            onClick={() => handleSelectClick(row.id)}
                                                            checked={isSelected(row.id)}
                                                        />
                                                    </TableCell>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.field}>{row[column.field]}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <TablePagination
                                component={Box}
                                count={rows.length}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={pageSize}
                                rowsPerPageOptions={[pageSize]}
                            />
                        </Box>
                    </Box>




                </Box>
            </Box>
        </>
    );
};

export default UserProfile;