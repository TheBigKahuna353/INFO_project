import React from "react";
import axios from "axios";
import useAllStore from "../utils/store";
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import AppBar from "../components/AppBar";



export default function Admin() {

    const auth_token = useAllStore((state) => state.auth_token);


    React.useEffect(() => {
        if (auth_token === "") {
            window.location.href = '/login';
        }
    }, [auth_token]);

    const [data, setData] = React.useState(null);
    const [cols, setCols] = React.useState(null);

    const onEditFinish = (newRow, oldRow) => {
        let changedRow = {};
        for (const key in newRow) {
            if (newRow[key] !== oldRow[key]) {
                changedRow[key] = newRow[key];
            }
        }
        axios.post('http://localhost:80/INFO_project/Server/models/AdminModel.php' , { params: {
            method: 'writeData',
            auth_token: auth_token,
            category: oldRow.vehicle_category,
            ...changedRow
        }}).then(function (response) {
            if (response.data.error) {
                console.log(response.data.error);
            }
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        }
        );
        return newRow
    }

    React.useEffect(() => {
        axios.post('http://localhost:80/INFO_project/Server/models/AdminModel.php' , { params: {
            method: 'getData',
            auth_token: auth_token
        }}
        )
        .then(function (response) {
            if (response.data.error) {
                console.log(response.data.error);
                return;
            }
            const data = response.data;
            setCols(Object.keys(data[0]).map((key, index) => {
                return { 
                    field: key,
                    headerName: key, 
                    width: 150, 
                    editable: index !== 0, 
                    type:  index === 0 ? 'string' : 'number',
                    ...(index !== 0 && {valueFormatter: (value) => {
                        return new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NZD',
                            minimumFractionDigits: 2,
                        }).format(value);
                    }})
                };
            }));
            setData(data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [auth_token]);

    return (
        <div>
            <AppBar/>
            <h1>Admin</h1>
            <Paper style={{ height: 400, width: '60%', margin: "auto"}}>
                {data && <DataGrid
                    rows={data}
                    columns={cols}
                    getRowId={(row) => row.vehicle_category}
                    editMode="row"
                    processRowUpdate={onEditFinish}
                />}
                <p>Double Click to Edit Row</p>
            </Paper>
        </div>
    );
}