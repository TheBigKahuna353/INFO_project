import { Paper, Card, CardMedia, CardActionArea } from "@mui/material";

// trip =  {
//            'rego' 
//            'category' 
//            'distance' 
//            'origin' 
//            'destination' 
//            'start_date' 
//            'end_date',
//            'trip_id'
//         }

const TripsListObj = (props) => {
    let trip = props.trip;

    // Define the image URL based on the trip category or any other criteria
    const imageURL = `http://localhost/INFO_project-main/Server/models/ImageModel.php?type=${trip.category}`;

    const capitalize = (str) => {
        return str.toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return (
        <div>
            <CardActionArea href={`/trips/${trip.trip_id}`}>
                <Paper elevation={10}> {/* the higher the elevation, the more shadow*/}
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            width="200"
                            sx={{ objectFit: "cover" }}
                            image={imageURL}
                            alt="Trip Image" 
                        />
                    </Card>
                    <h1>Rego: {trip.rego}</h1>
                    <p>Category: {capitalize(trip.category)}</p>
                    <p>Distance: {trip.distance}</p>
                    <p>Origin: {trip.origin}</p>
                    <p>Destination: {trip.destination}</p>
                    <p>Start Date: {trip.start_date}</p>
                    <p>End Date: {trip.end_date}</p>
                </Paper>
            </CardActionArea>
        </div>
    );
};

export default TripsListObj;
