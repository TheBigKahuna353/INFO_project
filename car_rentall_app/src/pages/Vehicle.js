import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom"
import AppBar from "../components/AppBar";
import TripsList from "../components/TripsList";
import RelocationList from "../components/RelocationList";
import { Pagination, Paper } from "@mui/material";
import MaintenanceList from "../components/MainenanceList";



const Vehicle = () => {

    const { rego } = useParams();

    const [vehicle, setVehicle] = React.useState(null);
    const [trips, setTrips] = React.useState(null);
    const [maintenance, setMaintenance] = React.useState(null);
    const [relocations, setRelocations] = React.useState(null);

    const [pages, setPages] = React.useState([1, 1, 1]);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/VehicleModel.php?rego=' + rego)
        .then(function (response) {
            setVehicle(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [rego]);
    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/TripsModel.php?rego=' + rego, {params: {num: 3, startIndex: (pages[0] - 1) * 3}})
        .then(function (response) {
            setTrips(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [rego, pages[0]]);
    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/MaintenanceModel.php?rego=' + rego, {params: {num: 3, startIndex: (pages[1] - 1) * 3}})
        .then(function (response) {
            setMaintenance(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [rego, pages[1]]);
React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/RelocationsModel.php?rego=' + rego, {params: {num: 3, startIndex: (pages[2] - 1) * 3}})
        .then(function (response) {
            setRelocations(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [rego, pages[2]]);

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

    const css = {
        width: "70%",
        margin: "auto",
        minHeight: "100px",
        marginBottom: "20px",
        padding: "20px",
    }

    const pageCSS = {
        display: "flex",
        justifyContent: "center",
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
            <Paper sx={css} elevation={11}>
                <Pagination count={Math.floor(trips.count/3)} page={pages[0]} onChange={(event, value) => setPages([value, pages[1], pages[2]])} sx={pageCSS}/>
                <TripsList trips={trips.trips}/>
            </Paper>
            <h2>Maintenance</h2>
            <Paper sx={css} elevation={11}>
                <MaintenanceList maintenance={maintenance}/>
                {maintenance.count === 0 ? <p>No relocations found</p> : null}
            </Paper>
            <h2>Relocations</h2>
            <Paper sx={css} elevation={11}>
                <RelocationList relocations={relocations}/>
                {relocations.count === 0 ? <p>No relocations found</p> : null}
            </Paper>
        </div>
    );
}

export default Vehicle;