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
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import Tooltip from '@mui/material/Tooltip';


import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import DashboardContent from '../components/Admin/DashboardContent'

import { useApp } from '../context/AuthContext'
import { toast } from 'react-toastify';

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
    // necessary for content to be below app bar
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
    backgroundColor: '#f76363',
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
    const { user } = useApp();
    const { setUser } = useApp();
    // const isToastVisible = React.useRef(false);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('selectedItem');
        toast.success('Successfully Logged Out');
        navigate('/');
    }

    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();

    const handleListItemClick = (text) => {
        setSelectedItem(text);
        // window.location.reload();
        localStorage.setItem("selectedItem", JSON.stringify(text));
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // // for user-logged-in users || direct them to home page
    // React.useEffect(() => {
    //     if (!user && !isToastVisible.current) {
    //         isToastVisible.current = true
    //         toast.error('Login required', {
    //             autoClose: 3000,
    //             onClose: () => {
    //                 isToastVisible.current = false;
    //                 navigate('/');
    //             },
    //         });
    //     }
    // }, [user, navigate]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        setSelectedItem("Profile");
        localStorage.setItem("selectedItem", JSON.stringify("Profile"));
    }

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
                                    {!open ? (
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={handleDrawerOpen}
                                            edge="start"
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            edge="start"
                                            onClick={handleDrawerClose}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    )}
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
                            <List>
                                <ListItem disablePadding sx={{ display: 'block' }}>

                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                        onClick={() => handleListItemClick('Dashboard')}
                                    >
                                        <Tooltip title='Dashboard'>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <DashboardIcon />
                                            </ListItemIcon>
                                        </Tooltip>
   
                                        {open && (
                                            <ListItemText
                                                primary='Dashboard'
                                                sx={{ opacity: 1 }}
                                            />
                                        )}
                                    </ListItemButton>

                                    <ListItemButton
                                        onClick={() => handleListItemClick('Admin')}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <Tooltip title='Admin'>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <AccountBoxIcon />
                                            </ListItemIcon>
                                        </Tooltip>

                                        {open && (
                                            <ListItemText
                                                primary='Admin'
                                                sx={{ opacity: 1 }}
                                            />
                                        )}
                                    </ListItemButton>
                                    <ListItemButton
                                        onClick={() => handleListItemClick('User Profile')}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <Tooltip title='User Profile'>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <PeopleIcon />
                                            </ListItemIcon>
                                        </Tooltip>

                                        {open && (
                                            <ListItemText
                                                primary='User Profile'
                                                sx={{ opacity: 1 }}
                                            />
                                        )}
                                    </ListItemButton>
                                    <ListItemButton
                                        onClick={() => handleListItemClick('Courses')}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <Tooltip title='Courses'>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <MenuBookIcon />
                                            </ListItemIcon>
                                        </Tooltip>

                                        {open && (
                                            <ListItemText
                                                primary='Courses'
                                                sx={{ opacity: 1 }}
                                            />
                                        )}
                                    </ListItemButton>
                                    <ListItemButton
                                        onClick={() => handleListItemClick('Orders')}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <Tooltip title='Orders'>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <ListAltIcon />
                                            </ListItemIcon>
                                        </Tooltip>

                                        {open && (
                                            <ListItemText
                                                primary='Orders'
                                                sx={{ opacity: 1 }}
                                            />
                                        )}
                                    </ListItemButton>
                                    <ListItemButton
                                        onClick={() => handleListItemClick('Notifications')}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <Tooltip title='Notifications'>
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <CircleNotificationsIcon />
                                            </ListItemIcon>
                                        </Tooltip>

                                        {open && (
                                            <ListItemText
                                                primary='Notifications'
                                                sx={{ opacity: 1 }}
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <Divider sx={{ border: 1 }} />
                            <List sx={{ marginTop: 'auto', overflow: 'hidden' }}>
                                <ListItemButton
                                    onClick={() => handleListItemClick('Profile')}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <Tooltip title='Profile'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <AccountCircleIcon />
                                        </ListItemIcon>
                                    </Tooltip>

                                    {open && (
                                        <ListItemText
                                            primary='Profile'
                                            sx={{ opacity: 1 }}
                                        />
                                    )}
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => handleListItemClick('Settings')}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <Tooltip title='Settings'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <SettingsIcon />
                                        </ListItemIcon>
                                    </Tooltip>

                                    {open && (
                                        <ListItemText
                                            primary='Settings'
                                            sx={{ opacity: 1 }}
                                        />
                                    )}
                                </ListItemButton>
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