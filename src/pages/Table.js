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

const JSTable = () => {
    return (
        <>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                                <TableCell> Hello </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default JSTable;