import React from "react";
import TripsListObj from "./TripsListObj";

const TripsList = (props) => {

    if (props.trips.count === 0) {
        return <div>
            <h1>Trips</h1>
            <p>Loading...</p>
        </div>
    }

    let trips = props.trips;

    const card = {
        padding: "10px",
        margin: "20px",
        display: "inline-grid",
        width: "fit-content",
        minWidth: "20%",
        position: "relative",
    }

    return (
        <div style={{}}>
            <div style={{}}>
                {trips.map((trip) => (
                    <div key={trip.rego+trip.start_date} style={card}>
                        <TripsListObj trip={trip}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TripsList;