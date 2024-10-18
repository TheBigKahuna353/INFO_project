import React from 'react';
import { AppBar as Bar, Button, ButtonGroup, Toolbar, Typography, Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Link } from '@mui/material';
import axios from 'axios';
import useAllStore from '../utils/store';

const AppBar = () => {

    const loggedIn = useAllStore((state) => state.loggedIn);
    const setLoggedIn = useAllStore((state) => state.setLoggedIn);

    const setAuthToken = useAllStore((state) => state.setAuthToken);
    const authToken = useAllStore((state) => state.auth_token);

    const [imageURL, setImageURL] = React.useState(null);
    React.useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios.post('http://localhost:80/INFO_project/Server/models/UserModal.php', {
            params: {
                method: 'image',
                auth_token: authToken
            }
        }).then(function (response) {
            if (response.data.error) {
                console.log(response.data);
                return;
            }
            setImageURL(response.data.imageUrl);
        }).catch(function (error) {
            console.log(error);
        });
    }, [loggedIn, authToken]);

    const settings = ['Admin', 'Logout'];

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
        if (event.target.textContent === 'Logout') {
            axios.post('http://localhost:80/INFO_project/Server/models/UserModal.php', {
                method: 'logout',
                auth_token: authToken
            }).then(function (response) {
                setLoggedIn(false);
                setAuthToken(null);
            }).catch(function (error) {
                console.log(error);
            });
        } else if (event.target.textContent === 'Admin') {
            window.location.href = `/admin`
        }
        
    };

    return (
        <Bar position="static">
            <Toolbar>
                <Link href="/" underline='none' color='inherit'>
                    <Typography variant="h5" component="div" sx={{margin: "10px"}}>
                        Car Rentals
                    </Typography>
                </Link>
                <ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
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