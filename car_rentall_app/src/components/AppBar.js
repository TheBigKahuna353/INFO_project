import React from 'react';
import { AppBar as Bar, Button, ButtonGroup, Toolbar, Typography, Box, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import axios from 'axios';


const AppBar = () => {

    const [loggedIn, setLoggedIn] = React.useState(sessionStorage.getItem('LoggedIn') === 'true');

    const defaultUserImageURL = 'https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png'

    const [imageURL, setImageURL] = React.useState(defaultUserImageURL);
    React.useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios.post('http://localhost:80/INFO_project/Server/models/UserModal.php', {
            params: {
                method: 'image',
                auth_token: sessionStorage.getItem('auth_token')
            }
        }).then(function (response) {
            console.log(response.data);
            setImageURL(response.data.imageUrl);
        }).catch(function (error) {
            console.log(error);
        });
    }, [loggedIn]);

    const settings = ['Settings', 'Logout'];

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
        if (event.target.textContent === 'Logout') {
            axios.post('http://localhost:80/INFO_project/Server/models/UserModal.php', {
                method: 'logout',
                auth_token: sessionStorage.getItem('auth_token')
            }).then(function (response) {
                sessionStorage.removeItem('auth_token');
                sessionStorage.removeItem('LoggedIn');
                setLoggedIn(false);
            }).catch(function (error) {
                console.log(error);
            });
        } else if (event.target.textContent === 'Settings') {
            window.location.href = `/settings`
        }
        
    };

    return (
        <Bar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{margin: "10px"}}>
                Car Rentals
                </Typography>
                <ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
                    <Button href="/">Home</Button>
                    <Button href="/vehicles">Vehicles</Button>
                    <Button href="/relocations">Relocations</Button>
                    <Button href="/trips">Trips</Button>
                    <Button href="/charts">Charts</Button>
                    <Button href="/locations">Locations</Button>
                </ButtonGroup>
                <div style={{flexGrow: 1}}></div>
                {loggedIn ?
                    <Box>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar src={imageURL} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                        ))}
                    </Menu>
                </Box>
                :
                <ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
                    <Button href="/login">Login</Button>
                    <Button href="/register">Register</Button>
                </ButtonGroup>}
            </Toolbar>
        </Bar>
    );
};

export default AppBar;