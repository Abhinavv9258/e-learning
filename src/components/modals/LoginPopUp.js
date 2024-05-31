import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';



const LoginPopUp = ({ open, onClose, setLoginPopUp }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoginPopUp(false);
        navigate('/user-login-page');
        window.location.reload();
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To access this feature, please log in.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogin} color="primary">
                        Login
                    </Button>
                    <Button onClick={onClose} color="error">
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LoginPopUp;