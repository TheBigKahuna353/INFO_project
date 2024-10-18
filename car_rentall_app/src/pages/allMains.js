import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import MaintenanceList from '../components/MainenanceList';



const Maintenances = () => {

    const [maintenances, setMaintenances] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/MaintenanceModel.php', {
            params: {
                startIndex: (page - 1) * 50,
                num: 50
            }
        })
        .then(function (response) {
            console.log(response.data);
            setMaintenances(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [page]);

    if (maintenances === null) {
        return (
            <div>
                <AppBar/>
                <h1>Maintenances</h1>
            </div>
        );
    }

    return (
        <div>
            <AppBar/>
            <h1>Maintenances</h1>
            <MaintenanceList maintenance={maintenances.maintenances}/>
        </div>
    );
}

export default Maintenances;