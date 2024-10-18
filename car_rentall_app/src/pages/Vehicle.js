import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom"
import AppBar from "../components/AppBar";
import TripsList from "../components/TripsList";
import RelocationList from "../components/RelocationList";
import { Paper } from "@mui/material";



const Vehicle = () => {

    const { rego } = useParams();

    const [vehicle, setVehicle] = React.useState(null);
    const [trips, setTrips] = React.useState(null);
    const [maintenance, setMaintenance] = React.useState(null);
    const [relocations, setRelocations] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/VehicleModel.php?rego=' + rego)
        .then(function (response) {
            setVehicle(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('http://localhost:80/INFO_project/Server/models/TripsModel.php?rego=' + rego, {num: 3})
        .then(function (response) {
            console.log(response.data);
            setTrips(response.data.trips);
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('http://localhost:80/INFO_project/Server/models/MaintenanceModel.php?rego=' + rego, {num: 3})
        .then(function (response) {
            setMaintenance(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('http://localhost:80/INFO_project/Server/models/RelocationsModel.php?rego=' + rego, {num: 3})
        .then(function (response) {
            setRelocations(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [rego]);

    if (vehicle === null || trips === null || maintenance === null || relocations === null) {
        return (
            <div>
                <AppBar/>
                <h1>{rego}</h1>
            </div>
        );
    }

    const URL = "http://localhost:80/INFO_project/Server/models/ImageModel.php?type=" + vehicle.category

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>
            <AppBar/>
            <h1>{vehicle.rego}</h1>
            <img src={URL} alt={vehicle.rego} width={600}/>
            <h2>Commisioned: {new Date(vehicle.commissioned).toDateString()}</h2>
            <h2>Decomisioned: {new Date(vehicle.decommissioned).toDateString()}</h2>
            <h2>Odometer: {numberWithCommas(vehicle.odometer)}km</h2>
            <h2>Trips</h2>
            <Paper sx={{width:"70%", margin:"auto"}} elevation={11}>
                <TripsList trips={trips}/>
            </Paper>
            <h2>Maintenance</h2>
            <Paper sx={{width:"70%", margin:"auto"}} elevation={11}>
                <p>{maintenance}</p>
            </Paper>
            <h2>Relocations</h2>
            <Paper sx={{width:"70%", margin:"auto"}} elevation={11}>
                <RelocationList relocations={relocations}/>
            </Paper>
        </div>
    );
}

export default Vehicle;