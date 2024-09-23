import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom"
import AppBar from "../components/AppBar";


const defaultData = {
    rego: "",
    category: "",
    odometer: "",
    commissioned: 0,
    decommissioned: 0,
    trips: [],
    maintenances: [],
    relocations: []
 }

const Vehicle = () => {

    const { rego } = useParams();

    const [vehicle, setVehicle] = React.useState(defaultData);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/VehicleModel.php?rego=' + rego)
        .then(function (response) {
            console.log(response.data);
            setVehicle(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [rego]);


    return (
        <div>
            <AppBar/>
            <h1>{vehicle.rego}</h1>
            <p>Category: {vehicle.category}</p>
        </div>
    );
}

export default Vehicle;