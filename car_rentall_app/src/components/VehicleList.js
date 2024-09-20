import React from 'react';
import VehicleListObj from './VehicleListObj';



const VehicleList = (vehicles) => {

    if (vehicles.count === 0) {
        return <div>
            <h1>Vehicles</h1>
            <p>Loading...</p>
        </div>
    }

    console.log(vehicles);
    vehicles = vehicles.vehicles;

    return (
        <div>
            <h1>Vehicles</h1>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {vehicles.map((vehicle) => (
                    <div key={vehicle.rego} style={{margin: "10px"}}>
                        <VehicleListObj {...vehicle}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehicleList;