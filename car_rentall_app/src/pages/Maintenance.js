import React from "react";
import AppBar from "../components/AppBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/map";

const defaultData = {
    'rego': "",
    'category': "",
    "start_date": "",
    "end_date": "",
    "origin": "",
    "destination": "",
    "distance": ""
}

const Maintenance = () => {

    const [maintenance, setMaintenance] = React.useState(defaultData);

    const { id } = useParams();

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/MaintenanceModel.php', {
            params: {
                id: id
            }
        }
        )
        .then(function (response) {
            console.log(response.data);
            setMaintenance(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [id]);

    const locations = maintenance.location ? [maintenance.location] : [];

    return (
        <div>
            <AppBar/>
            <h1>Maintenance</h1>
            <h2>Rego: {maintenance.rego}</h2>
            <p>Start Date: {maintenance.start_date}</p>
            <p>End Date: {maintenance.end_date}</p>
            <p>Mileage: {maintenance.mileage}</p>

            <Map locations={locations} drawLine={true}/>
        </div>
    );
}

export default Maintenance;