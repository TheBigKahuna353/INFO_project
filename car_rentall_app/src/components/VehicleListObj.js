import { Paper, Card, CardMedia, CardActionArea } from "@mui/material"


const VehicleListObj = (vehicle) => {

    const imageURL = "http://localhost/INFO_project/Server/models/ImageModel.php?type=" + vehicle.category;

        // this function replaces '_' with ' ' and capitalizes the first letter of each word
        const capitalize = (str) => {
            return str.toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }

    return (
        <div>
            <CardActionArea href={"/vehicles/" + vehicle.rego}>
                <Paper elevation={10}> {/* the higher the elevation, the more shadow*/}
                    <Card>
                        <CardMedia
                            component="img" 
                            height="200"
                            width="200"
                            sx={{objectFit:"cover"}}
                            image={imageURL} 
                            alt="Vehicle Image" />
                    </Card>
                        <p>Rego: {vehicle.rego}</p>
                    <p>Category: {capitalize(vehicle.category)}</p>
                    <p>Odometer: {vehicle.odometer}</p>
                </Paper>
            </CardActionArea>
        </div>
    )
}

export default VehicleListObj;