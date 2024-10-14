import React from "react";
import AppBar from "../components/AppBar";
import { Bar, Line } from 'react-chartjs-2';
import axios from "axios";
import { registerables , Chart } from "chart.js";
import 'chartjs-adapter-moment';

Chart.register(...registerables);


const Charts = () => {

    const [quarterlyData, setQuarterlyData] = React.useState(null);
    const [dailyLocations, setDailyLocations] = React.useState(null);
    const [cityNames, setCityNames] = React.useState(null);
    const [lifetimeData, setLifetimeData] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/ChartsModel.php')
        .then(function (response) {
            console.log(response.data);
            setQuarterlyData(response.data.quarterly);
            setDailyLocations(response.data.cityTraffic);
            setCityNames(response.data.cityNames);
            setLifetimeData(response.data.lifeTimeDuration);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    // magically create the data object for the Line component
    // loop through first element of quarterlyData to get the keys
    // then loop through the quarterlyData array to get the values
    const data = quarterlyData !== null ? {
        labels: quarterlyData.map((item) => item.period),
        datasets: Object.keys(quarterlyData[0]).filter((key) => key !== 'period').map((key) => {
            return {
                label: key,
                data: quarterlyData.map((item) => item[key])
            }
        })
      } : {};


      const data2 = dailyLocations !== null ? {
        labels: dailyLocations.map((item) => item.date),
        datasets: cityNames.map((city) => {
            return {
                label: city.place,
                data: dailyLocations.filter((item) => item.place === city.place).map((item) => item.num),
                spanGaps: true,
            }
        })
      } : {};

      // histogram data
      // data is an array of objects with rego and lifetime (in days)
      // we want to create a histogram of how many cars have been rented for how many days
      const data3 = lifetimeData !== null ? {
        labels: [...new Set(lifetimeData.map((item) => item.range))],
        datasets: [{
            label: 'Lifetime',
            data: lifetimeData.map((item) => item.num),
            spanGaps: true,
            barPercentage: 1.0,
            categoryPercentage: 1.0,
        }]
        } : {};



      const options = {
        scales: {
            xAxes: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
      }};

    return (
        <div>
            <AppBar/>
            <h1>Charts</h1>
            <h2>Quarterly Data</h2>
            {quarterlyData ? 
                <div style={{width: "40%", margin: "auto"}}>
                    <Line data={data}/> 
                </div>
            : 
                <p>loading</p>}
            <h2>Daily Locations</h2>
            {dailyLocations ? 
                <div style={{width: "40%", margin: "auto"}}>
                    <Line data={data2} options={options}/>
                </div>
            : 
                <p>loading</p>}
            <h2>Lifetime Data</h2>
            {lifetimeData ? 
                <div style={{width: "40%", margin: "auto"}}>
                    <Bar data={data3}/>
                </div>
            :
                <p>loading</p>}
        </div>
    );
}

export default Charts;