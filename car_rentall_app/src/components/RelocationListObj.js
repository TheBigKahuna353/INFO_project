import React from 'react';
import { Paper } from '@mui/material';

const RelocationListObj = (relocation) => {



    return (
        <div>
            <a href={`/relocations/${relocation.id}`} style={{textDecoration: "none"}}>
                <Paper elevation={3}>
                    <h2>{relocation.rego}</h2>
                    <p>From: {relocation.origin}</p>
                    <p>To: {relocation.destination}</p>
                    <p>Distance: {relocation.distance} km</p>
                    <p>Start Date: {relocation.start_date}</p>
                    <p>End Date: {relocation.end_date}</p>
                </Paper>
            </a>
        </div>
    );
}

export default RelocationListObj;