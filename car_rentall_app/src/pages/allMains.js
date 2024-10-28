import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import MaintenanceList from '../components/MainenanceList'; // Corrected the file name
import { Pagination, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText } from '@mui/material';

const defaultData = {
    maintenances: [],
    count: 0
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const pageSizeOptions = [10, 25, 50, 100];

const Maintenances = () => {
    const [maintenances, setMaintenances] = useState(defaultData);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [rego, setRego] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cats, setCats] = useState([]); // Categories state
    const [catsSelected, setCatsSelected] = useState([]); // Selected categories

    // Fetch maintenances
    useEffect(() => {
        const fetchMaintenances = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:80/INFO_project-main/Server/models/MaintenanceModel.php', {
                    params: {
                        startIndex: (page - 1) * pageSize,
                        num: pageSize,
                        rego: rego === '' ? null : rego,
                        category: catsSelected.length > 0 ? catsSelected : null // Corrected to use 'categories'
                    }
                });
                setMaintenances(response.data);
            } catch (error) {
                setError('Failed to fetch maintenances. Please try again.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaintenances();
    }, [page, rego, pageSize, catsSelected]); // Ensure all dependencies are included

    // get categories
    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project-main/Server/models/CategoriesModel.php')
            .then(function (response) {
                setCats(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCatsSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleRegoChange = (event) => {
        setRego(event.target.value.toUpperCase());
    };

    

    return (
        <div>
            <AppBar />
            <h1>Maintenances</h1>
            {loading && <p>Loading maintenances...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>{maintenances.count} maintenances found</p>
            <div>
                <FormControl sx={{ m: 1, width: 150 }}>
                    <InputLabel htmlFor="rego-input">Rego</InputLabel>
                    <OutlinedInput
                        id="rego-input"
                        value={rego}
                        onChange={handleRegoChange}
                        label="Rego"
                    />
                </FormControl>
            </div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={catsSelected}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {cats.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={catsSelected.includes(name)} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Pagination 
                count={Math.ceil(maintenances.count / pageSize)} 
                color="primary" 
                page={page}
                onChange={(event, value) => setPage(value)}
                style={{ margin: "auto", justifyContent: "center", display: "flex" }}
            />
            <FormControl sx={{ m: 1 }}>
                <InputLabel id="pageSize-label">Page</InputLabel>
                <Select
                    labelId="pageSize-label"
                    value={pageSize}
                    onChange={(event) => setPageSize(event.target.value)}
                    input={<OutlinedInput label="Page Size" />}
                >
                    {pageSizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <MaintenanceList maintenance={maintenances.maintenances} />
        </div>
    );
}

export default Maintenances;
