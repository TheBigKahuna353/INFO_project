import { Paper } from "@mui/material";


// trip =  {
//            'rego' 
//            'category' 
//            'distance' 
//            'origin' 
//            'destination' 
//            'start_date' 
//            'end_date',
//            'trip_id'
//         }

const TripsListObj = (props) => {


    let trip = props.trip;

    return (
        <div>
            <a href={`/trips/${trip.trip_id}`} style={{textDecoration: "none"}}>
                <Paper elevation={10}> {/* the higher the elevation, the more shadow*/}
                    <h1>Rego: {trip.rego}</h1>
                    <p>Category: {trip.category}</p>
                    <p>Distance: {trip.distance}</p>
                    <p>Origin: {trip.origin}</p>
                    <p>Destination: {trip.destination}</p>
                    <p>Start Date: {trip.start_date}</p>
                    <p>End Date: {trip.end_date}</p>
                </Paper>
            </a>
        </div>
    )
}

export default TripsListObj;