import React from 'react';
import { AppBar as Bar, Button, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';



const AppBar = () => {

    const loc = useLocation();

    const page = loc.pathname;

    let getColor = (button) => {
        if (page === button) return 'secondary';
        return 'primary';
    }

    return (
        <Bar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{margin: "10px"}}>
                Car Rentals
                </Typography>
                <Button 
                    variant="contained" 
                    color={getColor("/")} 
                    sx={{margin: "10px"}}   
                    href="/">
                        Home
                </Button>
                <Button variant="contained" color={getColor("/vehicles")} href="/vehicles">Vehicles</Button>
            </Toolbar>
        </Bar>
    );
};

export default AppBar;