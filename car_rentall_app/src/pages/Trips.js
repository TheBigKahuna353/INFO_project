import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import axios from 'axios';
import TripsList from '../components/TripsList';
import { Pagination, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Slider } from '@mui/material';

const defaultData = {
    trips: [],
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

const Trips = () => {
    const [data, setData] = useState(defaultData);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [rego, setRego] = useState('');
    const [cats, setCats] = useState([]);
    const [catsSelected, setCatsSelected] = useState([]);
    const [odoRange, setOdoRange] = useState([0, 70000]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch trips
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:80/INFO_project-main/Server/models/TripsModel.php', {
            params: {
                startIndex: (page - 1) * pageSize,
                num: pageSize,
                rego: rego === '' ? null : rego,
                categories: catsSelected,
                minOdo: odoRange[0],
                maxOdo: odoRange[1]
            }
        })
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            setError('Failed to fetch trips. Please try again.');
            console.error(error);
        });
    }, [page, rego, catsSelected, odoRange, pageSize]);

    // Fetch categories
    useEffect(() => {
        axios.get('http://localhost:80/INFO_project-main/Server/models/CategoriesModel.php')
            .then(response => {
                setCats(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch categories:', error);
            });
    }, []);

    const handleCategoryChange = (event) => {
        const {
            target: { value },
        } = event;
        setCatsSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleOdoChange = (event, newValue) => {
        if (newValue[1] - newValue[0] >= 0) {
            setOdoRange(newValue);
        }
    };

    return (
        <div>
            <AppBar />
            <h1>Trips</h1>
            {loading && <p>Loading trips...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>{data.count} trips found</h2>
            <div>
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
                    onChange={handleCategoryChange}
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
            <InputLabel id="range-slider" sx={{}}>Odometer range</InputLabel>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={odoRange}
                onChange={handleOdoChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                disableSwap
                getAriaValueText={(value) => `${value}km`}
                sx={{width: 300}}
                max={70000}
                step={1000}
                marks={[{value: 0, label: '0km'}, {value: 70000, label: '70000km'}]}
            />
            <Pagination 
                count={Math.ceil(data.count / pageSize)} 
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
                    MenuProps={MenuProps}
                >
                    {pageSizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TripsList trips={data.trips} />
        </div>
    );
}

export default Trips;

