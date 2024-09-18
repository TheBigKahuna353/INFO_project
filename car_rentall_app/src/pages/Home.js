import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const Home = () => {

    const [data, setData] = React.useState("");

    // fetch data from the server
    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/test.php')
        .then(function (response) {
            console.log(response.data);
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);


    return (
        <div>
            <h1>Home</h1>
            <h2>{data}</h2>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </div>
    );
};

export default Home;