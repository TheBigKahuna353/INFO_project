import React from 'react';
import { Paper, CardActionArea } from '@mui/material';

const MaintenanceListObj = (main) => {



    return (
        <div>
            <CardActionArea href={`/maintenance/${main.id}`}>
                <Paper elevation={3}>
                    <h2>{main.rego}</h2>
                    <p>From: {main.location}</p>
                    <p>To: {main.mileage}km</p>
                    <p>Start Date: {main.start_date}</p>
                    <p>End Date: {main.end_date}</p>
                </Paper>
            </CardActionArea>
        </div>
    );
}

export default MaintenanceListObj;