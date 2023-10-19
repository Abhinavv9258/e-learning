import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';

import DashboardContent from '../components/Admin/DashboardContent'


// importing hooks
import { useUser } from '../context/AuthContext';

// importing title
import { useWebsiteTitle } from '../hooks/WebsiteTitle';

// importing server side url
import { URL } from '../App';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    // transition: theme.transitions.create('width', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.enteringScreen,
    // }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    // transition: theme.transitions.create('width', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    // }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(['width', 'margin'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    // }),
    ...(open && {
        marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        // transition: theme.transitions.create(['width', 'margin'], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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

export default function MiniDrawer() {
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = React.useState();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (text) => {
        // const url = `/admin-dashboard/${encodeURIComponent(text)}`;
        // window.history.pushState(null, '', url);
        setSelectedItem(text);
    };


    // data source

    useWebsiteTitle('E-Learn || Admin Dashboard');
    const navigate = useNavigate();
    const { user } = useUser();
    const [userData, setUserData] = React.useState();

    const dashboard = async () => {
        let token = localStorage.getItem("access_token");
        const res = await fetch(`${URL}/api/users/${user._id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Set the authorization header correctly
            },
            credentials: 'include' // Include cookies
        });
        const data = await res.json();
        // console.log('data from admin  dashboard : ',data);
    }

    React.useEffect(() => {
        // Check if the user is logged in before running the dashboard function
        if (user) {
            dashboard();
        }
        // eslint-disable-next-line
    }, [user]);

    const getUserProfile = async() => {
        let token = localStorage.getItem("access_token");
        const res = await fetch(`${URL}/api/users/${user._id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Set the authorization header correctly
            },
            credentials: 'include' // Include cookies
        });
        const data = await res.json();
        setUserData(data);
        console.log('Single User Data : ', data);
    }

    const getAllUserProfile = async () => {
        let token = localStorage.getItem("access_token");
        const res = await fetch(`${URL}/api/users`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Set the authorization header correctly
            },
            credentials: 'include' // Include cookies
        });
        const data = await res.json();
        console.log('All User Data : ', data);
    }

    function handleDefaultClick() {
        // Handle the default click behavior, or leave it empty
        // For example:
        console.log('Default click behavior');
    }
    console.log('Dash User Data : ', userData);


    return (
        <Box style={{ display: 'block' }}>
            <CssBaseline />

            <AppBar position="fixed" style={{ display: 'block' }} open={open}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ListItemButton>
                            <AccountCircleIcon style={{ marginRight: 10 }} />
                            <Typography>
                                Admin
                            </Typography>
                        </ListItemButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Dashboard', 'Admin', 'User Profile', 'Courses', 'Orders', 'Notifications'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => handleListItemClick(text)}
                                // onClick={
                                //     text === 'User Profile' ? getAllUserProfile(text)
                                //         : text === 'Admin' ? getUserProfile(text)
                                //             : handleDefaultClick(text)
                                // }
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index === 0 ? (<DashboardIcon />)
                                        : index === 1 ? (<AccountBoxIcon onClick={getUserProfile} />)
                                            : index === 2 ? (<PeopleIcon onClick={getAllUserProfile} />)
                                                : index === 3 ? (<MenuBookIcon />)
                                                    : index === 4 ? (<ListAltIcon />)
                                                        : <CircleNotificationsIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List sx={{ marginTop: 'auto' }}>
                    {['Profile', 'Settings'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                // onClick={() => handleListItemClick(text)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index === 0 ? (<AccountCircleIcon />)
                                        : <SettingsIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box
                sx={{
                    height: '80vh',
                    paddingLeft: open ? '250px' : '70px'
                }}
            >
                <DashboardContent
                    selectedItem={selectedItem}
                    DrawerHeader={DrawerHeader}
                />

            </Box>

        </Box>
    );
}
