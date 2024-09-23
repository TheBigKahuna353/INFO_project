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
                    <Button 
                        href="/">
                            Home
                    </Button>
                    <Button href="/vehicles">Vehicles</Button>
                </ButtonGroup>
            </Toolbar>
        </Bar>
    );
};

export default AppBar;