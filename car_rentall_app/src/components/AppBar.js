import React from 'react';
import { AppBar as Bar, Button, ButtonGroup, Toolbar, Typography } from '@mui/material';



const AppBar = () => {

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
                </ButtonGroup>
                <ButtonGroup variant="text" color="inherit" aria-label="text primary button group" sx={{marginRight:"20px"}}>
                    <Button href="/login">Login</Button>
                    <Button href="/register">Register</Button>
                </ButtonGroup>
            </Toolbar>
        </Bar>
    );
};

export default AppBar;