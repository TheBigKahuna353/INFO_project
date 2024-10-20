import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import RelocationList from '../components/RelocationList';
import { Pagination, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';

// Default data structure
const defaultData = {
    relocations: [],
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

const Relocations = () => {
    const [relocations, setRelocations] = useState(defaultData);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [rego, setRego] = useState('');
    const [cats, setCats] = useState([]);
    const [catsSelected, setCatsSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch relocations
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:80/INFO_project-main/Server/models/RelocationsModel.php', {
            params: {
                startIndex: (page - 1) * pageSize,
                num: pageSize,
                rego: rego === '' ? null : rego,
                category: catsSelected
            }
        })
        .then(response => {
            setRelocations(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            setError('Failed to fetch relocations. Please try again.');
            console.error(error);
        });
    }, [page, rego, catsSelected, pageSize]);

    // Fetch categories
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

    if (loading) {
        return (
            <div>
                <AppBar/>
                <h1>Relocations</h1>
                <p>Loading relocations...</p>
            </div>
        );
    }

    return (
        <div>
            <AppBar/>
            <h1>Relocations</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>{relocations.count} relocations found</h2>

            <div>
                {/* Rego search */}
                <FormControl sx={{ m: 1, width: 150 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Rego</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={rego}
                        onChange={(event) => setRego(event.target.value.toUpperCase())}
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
            
            {/* Pagination */}
            <Pagination 
                count={Math.ceil(relocations.count / pageSize)} 
                color="primary" 
                page={page}
                onChange={(event, value) => setPage(value)}
                style={{ margin: "auto", justifyContent: "center", display: "flex" }}
            />
            
            {/* Page size selector */}
            <FormControl sx={{ m: 1 }}>
                <InputLabel id="pageSize-label">Page</InputLabel>
                <Select
                    labelId="pageSize-label"
                    value={pageSize}
                    onChange={(event) => setPageSize(event.target.value)}
                    input={<OutlinedInput label="Page Size" />}
                    MenuProps={MenuProps}
                >
                    {pageSizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* List of relocations */}
            <RelocationList relocations={relocations.relocations}/>
        </div>
    );
}

export default Relocations;
