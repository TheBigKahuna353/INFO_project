import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import RelocationList from '../components/RelocationList';



const Relocations = () => {

    const [relocations, setRelocations] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/RelocationsModel.php', {
            params: {
                startIndex: (page - 1) * 50,
                num: 50
            }
        })
        .then(function (response) {
            console.log("recieved");
            console.log("fetched:" + response.data);
            setRelocations(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [page]);

    return (
        <div>
            <AppBar/>
            <h1>Relocations</h1>
            <RelocationList relocations={relocations}/>
        </div>
    );
}

export default Relocations;