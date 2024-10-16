import React from "react";
import axios from "axios";
import Map from "../components/map";
import AppBar from "../components/AppBar";


const Locations = () => {

    const [locations, setLocations] = React.useState([]);
    const [selectedLocation, setSelectedLocation] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/LocationsModel.php')
        .then(function (response) {
            setLocations(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <AppBar/>
            <h1>Locations</h1>
            <Map locations={locations}/>
        </div>
    );
}

export default Locations;