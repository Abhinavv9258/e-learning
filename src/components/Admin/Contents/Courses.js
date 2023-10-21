import React,{useState} from 'react';

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

// importing modals
import AddNewCourse from '../../modals/AddNewCourse';

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { URL } from '../../App';

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


const Courses = ({ save, user, courseTableData,  tableData }) => {
    const [modal, setModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const toggle = () => {
        setModal(!modal);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [selectAll, setSelectAll] = React.useState(false);
    const [selected, setSelected] = React.useState([]);

    // const [selected, setSelected] = React.useState(tableData.map((row) => row._id));
    const classes = useStyles();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(courseTableData.map((row) => row._id));
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
    const pageSize = 5;

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page) * pageSize;
    const endIndex = startIndex + pageSize;

    const sendData = (e) => {
        setModal(true)
    }

    const handleDelete = async (id) => {
        let token = localStorage.getItem('access_token');
        try{
            const res = await fetch(`${URL}/api/courses/{courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
        }catch(error){
            console.log("error while hitting Api: ", error);
            toast.error('An error occurred while hitting Api. Please try again later.', {
                position: 'top-center'
            });
        }
    };

    return (
        <>
            <Box component="main" sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
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
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectAll}
                                                indeterminate={selected.length > 0 && selected.length < courseTableData.length}
                                                onChange={handleSelectAllClick}
                                            />
                                        </TableCell>
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
                                    {courseTableData.slice(startIndex, endIndex).map((row, index) => (
                                        <TableRow key={row._id} selected={selected.indexOf(row._id) !== -1}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={() => handleSelectClick(row._id)}
                                                    checked={selected.indexOf(row._id) !== -1}
                                                    // checked={isSelected(row._id)}
                                                />
                                            </TableCell>
                                            <TableCell>{index + 1}</TableCell>
                                            {columns.map((col) => (
                                                <TableCellComponent key={col.field} row={row} col={col} />
                                            ))}
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
                        count={courseTableData.length}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={pageSize}
                        rowsPerPageOptions={[pageSize]}
                    />
                </Box>
            </Box>
            <AddNewCourse toggle={toggle} modal={modal} />
        </>
    );
};


export default Courses;