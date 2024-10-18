import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import axios from 'axios';
import TripsList from '../components/TripsList';
import { Pagination, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Slider } from '@mui/material';

const defaultData = {
    "trips": [],
    "count": 0
}
const pageSize = 50; // need to change to dynamic
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
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/TripsModel.php', {
            params: {
                startIndex: (page - 1) * pageSize,
                num: pageSize,
            }
        })
        .then(function (response) {
            console.log(response.data);
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [page]);


    return (
        <div>
            <AppBar/>
            <h1>Trips</h1>
            <h2>{data.count} trips found</h2>
            <Pagination 
                count={Math.ceil(data.count/pageSize)} 
                color="primary" 
                page={page}
                onChange={(event, value) => setPage(value)}
                style={{margin: "auto", justifyContent: "center", display: "flex"}}
                />
        
            <TripsList trips={data.trips}/>
            
        </div>


    )
}

export default Trips;
