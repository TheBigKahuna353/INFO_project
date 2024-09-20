import { Card } from "@mui/material"


const VehicleListObj = (vehicle) => {

    return (
        <div>
            <Card>
                <h1>Vehicles</h1>
                <p>Rego: {vehicle.rego}</p>
                <p>Category: {vehicle.category}</p>
                <p>Odometer: {vehicle.odometer}</p>
            </Card>
        </div>
    )
}

export default VehicleListObj;