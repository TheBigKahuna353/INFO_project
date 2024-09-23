import { Paper } from "@mui/material"


const VehicleListObj = (vehicle) => {

    return (
        <div>
            <a href={"/vehicles/" + vehicle.rego} style={{textDecoration: "none"}}>
                <Paper elevation={10}> {/* the higher the elevation, the more shadow*/}
                    <h1>Vehicles</h1>
                    <p>Rego: {vehicle.rego}</p>
                    <p>Category: {vehicle.category}</p>
                    <p>Odometer: {vehicle.odometer}</p>
                </Paper>
            </a>
        </div>
    )
}

export default VehicleListObj;