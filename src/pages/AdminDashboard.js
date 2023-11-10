import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import {
    Box,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Menu, MenuItem,
    Divider,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

// importing icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';

import LoadingBar from 'react-top-loading-bar'

import DashboardContent from '../components/Admin/DashboardContent'

import { useApp } from '../context/AuthContext'

import { toast } from 'react-toastify';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
    overFlow: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overFlow: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),

    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // backgroundColor: '#f76363',
    ...(open && {
        marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}),
);



const AdminDashboard = () => { 

    const navigate = useNavigate();
    const { user, setUser } = useApp();

    // for top loading bar
    const ref = React.useRef(null);

    // for side drawer
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();

    // for profile modal
    const [anchorEl, setAnchorEl] = React.useState(null);

    // for side drawer
    const handleDrawer = () => {
        setOpen(!open);
    };

    // for profile modal
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        setSelectedItem("Profile");
        localStorage.setItem("selectedItem", JSON.stringify("Profile"));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('selectedItem');
        toast.success('Successfully Logged Out');
        navigate('/');
    }

    // for drawer list option
    const renderListItemButton = (text, icon, title) => {
        return (
            <ListItemButton
                onClick={() => handleListItemClick(text)}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
            >
                {open && (
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: 3,
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                )}

                {!open && (
                    <Tooltip title={title} placement="right">
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {icon}
                        </ListItemIcon>
                    </Tooltip>

                )}

                {open && (
                    <ListItemText
                        primary={text}
                        sx={{ opacity: 1 }}
                    />
                )}
            </ListItemButton>
        );
    };

    const handleListItemClick = (text) => {
        setSelectedItem(text);
        ref.current.complete();
        localStorage.setItem("selectedItem", JSON.stringify(text));
    };

    


    return (
        <>
            {user ? (
                <>
                    <Box style={{ display: 'flex' }}>
                        <CssBaseline />
                        {/* App bar */}
                        <AppBar position='fixed' open={open}>
                            <Toolbar sx={{ justifyContent: 'space-between' }}>
                                <Box style={{ display: 'flex', flexDirection: 'row' }}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawer}
                                        edge="start"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                        Admin Dashboard
                                    </Typography>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: 'row' }}>
                                    <ListItemButton
                                        onClick={handleClick}
                                        aria-controls="user-menu"
                                        aria-haspopup="true"
                                    >
                                        <AccountCircleIcon style={{ marginRight: 10 }} />
                                        <Typography>
                                            {
                                                user.username.charAt(0).toUpperCase() + user.username.slice(1)
                                            }
                                        </Typography>
                                    </ListItemButton>
                                    <Menu
                                        id="user-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </Box>
                            </Toolbar>
                        </AppBar>

                        {/* Drawer */}
                        <Drawer variant='permanent' open={open}>
                            <DrawerHeader />
                            <List disablePadding sx={{ display: 'block' }}>
                                {renderListItemButton('Dashboard', <DashboardIcon />, 'Dashboard')}
                                {renderListItemButton('Admin', <AccountBoxIcon />, 'Admin')}
                                {renderListItemButton('User Profile', <PeopleIcon />, 'User Profile')}
                                {renderListItemButton('Courses', <MenuBookIcon />, 'Courses')}
                                {renderListItemButton('Orders', <ListAltIcon />, 'Orders')}
                                {renderListItemButton('Notifications', <CircleNotificationsIcon />, 'Notifications')}
                            </List>
                            <Divider sx={{ border: 1 }} />
                            <List sx={{ marginTop: 'auto', overflow: 'hidden' }}>
                                {renderListItemButton('Profile', <AccountCircleIcon />, 'Profile')}
                                {renderListItemButton('Settings', <SettingsIcon />, 'Settings')}
                            </List>
                        </Drawer>

                        {/* Content */}
                        <Box sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}>
                            <LoadingBar color="#f11946" ref={ref} shadow={true} />
                            <DashboardContent
                                user={user}
                                selectedItem={selectedItem}
                                DrawerHeader={DrawerHeader}
                                setSelectedItem={setSelectedItem}
                            />
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                </>
            )}

        </>
    );
};

export default AdminDashboard;