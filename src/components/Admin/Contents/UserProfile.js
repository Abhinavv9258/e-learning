import React from 'react';
import { Link } from 'react-router-dom'
import { Box, Typography, Button, Pagination } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AiOutlineFileExcel } from "react-icons/ai";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination, // Import TablePagination component
    Paper,
    Checkbox,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import 'bootstrap/dist/css/bootstrap.min.css';


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'age', headerName: 'Age' },
];

const rows = [
    { id: 1, lastName: 'Doe', firstName: 'John', age: 25 },
    { id: 2, lastName: 'Fmith', firstName: 'Jane', age: 32 },
    { id: 3, lastName: 'Gmcdytujhfxdutyikhgctdith', firstName: 'Jane', age: 32 },
    { id: 4, lastName: 'Hmith', firstName: 'Jane', age: 32 },
    { id: 5, lastName: 'Imith', firstName: 'Jane', age: 32 },
    { id: 6, lastName: 'Jmith', firstName: 'Jane', age: 32 },
    { id: 7, lastName: 'Kmith', firstName: 'Jane', age: 32 },
    { id: 8, lastName: 'Lmith', firstName: 'Jane', age: 32 },
    // Add more rows as needed
];

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: 'rgba(17,24,39,0.1)',
    }
});


const UserProfile = ({ open }) => {

    const [selectAll, setSelectAll] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const classes = useStyles();


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((row) => row.id);
            setSelected(newSelecteds);
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

    // Calculate the starting index and ending index for the current page
    const startIndex = (page) * pageSize;
    const endIndex = startIndex + pageSize;
    return (
        <>
            <Box 
                sx={open ? ({ height: '80vh', paddingLeft: '250px' }) : ({ height: '80vh', paddingLeft: '70px' })}            
            >

                <Box>
                    <Typography paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link style={{ textDecoration: 'none', color: 'grey' }} >Dashboard</Link>
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

                    <Box></Box>

                    {/* <Box>
                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                // autoHeight
                                // autoPageSize
                            />
                        </div>
                    </Box> */}

                    <Box style={{ width:'100%',display: 'block', overflow: 'auto' }}>
                        <Box style={{ width: '100%', overflow: 'auto' }}>
                            <Box>
                                <TableContainer component={Paper}>
                                    <Table style={{minWidth:'100%'}}>
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectAll}
                                                        indeterminate={selected.length > 0 && selected.length < rows.length}
                                                        onChange={handleSelectAllClick}
                                                    />
                                                </TableCell>
                                                {columns.map((column) => (
                                                    <TableCell key={column.field}>{column.headerName}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.slice(startIndex, endIndex).map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    selected={isSelected(row.id)}
                                                    onClick={() => handleSelectClick(row.id)}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isSelected(row.id)} />
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
                                component="div"
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