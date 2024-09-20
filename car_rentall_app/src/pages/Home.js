import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import AppBar from '../components/AppBar';

const defaultData = {
    tripsCompleted: 0,
    tripsUpgraded: 0,
    refusedBookings: 0,
    refusedWalkins: 0,
    vehiclesRelocated: 0,
    vehiclesServiced: 0,
};


const Home = () => {

    const [data, setData] = React.useState(defaultData);

    // fetch data from the server
    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/HomeModel.php')
        .then(function (response) {
            console.log(response.data);
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);


    return (
        <div>
            <AppBar/>
            <h1>Home</h1>
            <p>Trips Completed: {data.tripsCompleted}</p>
            <p>Trips Upgraded: {data.tripsUpgraded}</p>
            <p>Refused Bookings: {data.refusedBookings}</p>
            <p>Refused Walkins: {data.refusedWalkins}</p>
            <p>Vehicles Relocated: {data.vehiclesRelocated}</p>
            <p>Vehicles Serviced: {data.vehiclesServiced}</p>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </div>
    );
};

export default Home;