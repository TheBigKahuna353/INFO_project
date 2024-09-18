import React from 'react';
import axios from 'axios';

const Home = () => {

    const [data, setData] = React.useState("");

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
        </div>
    );
};

export default Home;