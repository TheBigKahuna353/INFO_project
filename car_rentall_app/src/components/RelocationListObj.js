import React from 'react';
import { Paper, Card, CardMedia, CardActionArea } from '@mui/material';

const RelocationListObj = (relocation) => {
    // Construct the image URL based on the category
    const imageURL = "http://localhost/INFO_project-main/Server/models/ImageModel.php?type=" + relocation.category;

    const capitalize = (str) => {
        return str.toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return (
        <div>
            <CardActionArea href={`/relocations/${relocation.id}`}>
                <Paper elevation={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200" // Adjust height as needed
                            sx={{ objectFit: "cover" }}
                            image={imageURL}
                            alt={`Relocation for ${relocation.rego}`}
                        />
                    </Card>
                    <h2>{relocation.rego}</h2>
                    <p>Category: {capitalize(relocation.category)}</p> {/* Added category here */}
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
