import { Paper, Card, CardMedia } from "@mui/material"


const VehicleListObj = (vehicle) => {

    const imageURL = "http://localhost/INFO_project/Server/models/ImageModel.php?type=" + vehicle.category;

    return (
        <div>
            <a href={"/vehicles/" + vehicle.rego} style={{textDecoration: "none"}}>
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
                    <p>Category: {vehicle.category}</p>
                    <p>Odometer: {vehicle.odometer}</p>
                </Paper>
            </a>
        </div>
    )
}

export default VehicleListObj;