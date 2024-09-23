import React from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import VehicleList from '../components/VehicleList';
import { Pagination } from '@mui/material';

const defaultData = {
    vehicles: [],
    count: 0
};

const pageSize = 50; // need to change to dynamic

const Vehicles = () => {

    const [vehicles, setVehicles] = React.useState(defaultData);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/VehiclesModel.php', {
            params: {
                startIndex: (page - 1) * pageSize,
                num: pageSize
            }
        })
        .then(function (response) {
            console.log("recieved");
            console.log("fetched:" + response.data);
            setVehicles(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [page]);


    return (
        <div>
            <AppBar/>
            <h1>Vehicles</h1>
            <p>{vehicles.count} vehicles found</p>
            <Pagination 
                count={Math.ceil(vehicles.count/pageSize)} 
                color="primary" 
                page={page}
                onChange={(event, value) => setPage(value)}
                />
            <VehicleList vehicles={vehicles.vehicles}/>
        </div>
    );
}

export default Vehicles;