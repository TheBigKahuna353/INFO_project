import React from "react";
import AppBar from "../components/AppBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/map";


const defaultData = {
    'rego': "",
    'category': "",
    'distance': "",
    'origin': "",
    'destination': "", 
    'start_date': "",
    'end_date': "",
    'trip_id': ""
}

const Trip = () => {

    const [trip, setTrip] = React.useState(defaultData);

    const { trip_id } = useParams();

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project-main/Server/models/TripsModel.php', {
            params: {
                trip_id: trip_id
            }
        }
        )
        .then(function (response) {
            console.log(response.data);
            setTrip(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [trip_id]);

    const locations = trip.origin !== "" ? [trip.origin, trip.destination] : [];

    return (

        <div>
            <AppBar/>
            <h1>Trip</h1>
            <h2>Rego: {trip.rego}</h2>
            <p>Category: {trip.category}</p>
            <p>Distance: {trip.distance}</p>
            <p>Origin: {trip.origin}</p>
            <p>Destination: {trip.destination}</p>
            <p>Start Date: {trip.start_date}</p>
            <p>End Date: {trip.end_date}</p>

            <Map locations={locations} drawLine={true}/>

        </div>
    );
}


export default Trip;