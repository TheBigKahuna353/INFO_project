import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import axios from 'axios';
import TripsList from '../components/TripsList';

const defaultData = {
    "trips": [],
    "count": 0
}
// trips = [
//         {
//            'rego' 
//            'category' 
//            'distance' 
//            'origin' 
//            'destination' 
//            'start_date' 
//            'end_date',
//            'trip_id'
//         }
//     ]


const Trips = () => {

    const [data, setData] = useState(defaultData);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/TripsModel.php', {
            params: {
                //"rego": "Z"
            }
        })
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
            <h1>Trips</h1>
            <h2>{data.count} trips found</h2>
            <TripsList trips={data.trips}/>
        </div>
    )
}

export default Trips;