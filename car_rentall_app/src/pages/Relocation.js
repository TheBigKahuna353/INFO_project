import React from "react";
import AppBar from "../components/AppBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/map";

const defaultData = {
    'rego': "",
    'category': "",
    "start_date": "",
    "end_date": "",
    "origin": "",
    "destination": "",
    "distance": ""
}

const Relocation = () => {

    const [relocation, setRelocation] = React.useState(defaultData);

    const { id } = useParams();

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project-main/Server/models/RelocationsModel.php', {
            params: {
                id: id
            }
        }
        )
        .then(function (response) {
            console.log(response.data);
            setRelocation(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [id]);

    const locations = relocation.origin !== "" ? [relocation.origin, relocation.destination] : [];

    return (
        <div>
            <AppBar/>
            <h1>Relocation</h1>
            <p>Start Date: {relocation.start_date}</p>
            <p>End Date: {relocation.end_date}</p>
            <p>Origin: {relocation.origin}</p>
            <p>Destination: {relocation.destination}</p>
            <p>Distance: {relocation.distance}km</p>

            <Map locations={locations} drawLine={true}/>
        </div>
    );
}

export default Relocation;