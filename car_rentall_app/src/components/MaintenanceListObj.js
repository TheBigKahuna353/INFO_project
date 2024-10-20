import React from 'react';
import { Paper, Card, CardMedia, CardActionArea } from '@mui/material';

const MaintenanceListObj = (main) => {
    // Construct the image URL based on the category
    const imageURL = "http://localhost/INFO_project-main/Server/models/ImageModel.php?type=" + main.category;
    const capitalize = (str) => {
        return str.toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    return (
        <div>
            <CardActionArea href={`/maintenance/${main.id}`}>
                <Paper elevation={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200" // Adjust height as needed
                            sx={{ objectFit: "cover" }}
                            image={imageURL}
                            alt={`Maintenance for ${main.rego}`}
                        />
                    </Card>
                    <h2>{main.rego}</h2>
                    <p>Category: {capitalize(main.category)}</p> {/* Added category here */}
                    <p>Location: {main.location}</p>
                    <p>Mileage: {main.mileage} km</p>
                    <p>Start Date: {main.start_date}</p>
                    <p>End Date: {main.end_date}</p>
                </Paper>
            </CardActionArea>
        </div>
    );
}

export default MaintenanceListObj;
