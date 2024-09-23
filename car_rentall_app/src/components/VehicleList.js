import React from 'react';
import VehicleListObj from './VehicleListObj';



const VehicleList = (props) => {

    if (props.vehicles.count === 0) {
        return <div>
            <h1>Vehicles</h1>
            <p>Loading...</p>
        </div>
    }

    let vehicles = props.vehicles;

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
                {vehicles.map((vehicle) => (
                    <div key={vehicle.rego} style={card}>
                        <VehicleListObj {...vehicle}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehicleList;