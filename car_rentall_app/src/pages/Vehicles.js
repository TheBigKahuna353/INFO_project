import React from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import VehicleList from '../components/VehicleList';

const defaultData = {
    vehicles: [],
    count: 0
};


const Vehicles = () => {

    const [vehicles, setVehicles] = React.useState(defaultData);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/VehiclesModel.php')
        .then(function (response) {
            console.log("recieved");
            console.log("fetched:" + response.data);
            setVehicles(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);


    return (
        <div>
            <AppBar/>
            <h1>Vehicles</h1>
            <VehicleList vehicles={vehicles.vehicles}/>
        </div>
    );
}

export default Vehicles;