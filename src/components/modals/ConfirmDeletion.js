import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';

const ConfirmDeletion = ({ open, onClose, courseId, userId, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete {' '}
                    {courseId && !userId ? (
                        <>this course</>
                    ) : userId && !courseId ? (
                        <>this user</>
                    ) : (
                        <>it</>
                    )}
                    ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    No
                </Button>
                <Button onClick={onConfirm} color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeletion;
