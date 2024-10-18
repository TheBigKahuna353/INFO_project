import React from 'react';
import MaintenanceListObj from './MaintenanceListObj';


const MaintenanceList = ({maintenance}) => {

    const card = {
        padding: "10px",
        margin: "20px",
        display: "inline-grid",
        width: "fit-content",
        minWidth: "20%",
        position: "relative",
    }

    if (maintenance.count === 0) {
        return <div>
            <h1>Relocations</h1>
            <p>Loading...</p>
        </div>
    }

    return (
        <div style={{}}>
            <div style={{}}>
                {maintenance.map((main) => (
                    <div key={main.rego+main.id} style={card}>
                        <MaintenanceListObj {...main}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MaintenanceList;