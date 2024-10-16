import React from 'react';
import { Paper, CardActionArea } from '@mui/material';

const RelocationListObj = (relocation) => {



    return (
        <div>
            <CardActionArea href={`/relocations/${relocation.id}`}>
                <Paper elevation={3}>
                    <h2>{relocation.rego}</h2>
                    <p>From: {relocation.origin}</p>
                    <p>To: {relocation.destination}</p>
                    <p>Distance: {relocation.distance} km</p>
                    <p>Start Date: {relocation.start_date}</p>
                    <p>End Date: {relocation.end_date}</p>
                </Paper>
            </CardActionArea>
        </div>
    );
}

export default RelocationListObj;