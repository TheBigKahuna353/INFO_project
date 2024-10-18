import React from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import VehicleList from '../components/VehicleList';
import { Pagination, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Slider } from '@mui/material';
import useAllStore from '../utils/store';

const defaultData = {
    vehicles: [],
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

const Vehicles = () => {

    const [vehicles, setVehicles] = React.useState(defaultData);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(50);
    const [cats, setCats] = React.useState([]);

    const [catsSelected, setCatsSelected] = React.useState([]);
    const [odoRange, setOdoRange] = React.useState([0, 70000]);
    const [rego, setRego] = React.useState('');

    const cat = useAllStore((state) => state.category);
    const setCat = useAllStore((state) => state.setCategory);
    if (cat) {
        setCat(null);
        setCatsSelected([cat]);
    }

    // get vehicles
    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/VehiclesModel.php', {
            params: {
                startIndex: (page - 1) * pageSize,
                num: pageSize,
                cats: catsSelected,
                minOdo: odoRange[0],
                maxOdo: odoRange[1],
                rego: rego === '' ? null : rego
            }
        })
        .then(function (response) {
            setVehicles(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [page, catsSelected, odoRange, rego, pageSize]);

    // get categories
    React.useEffect(() => {
        axios.get('http://localhost:80/INFO_project/Server/models/CategoriesModel.php')
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
            // On autofill we get the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleOdoChange = (event, newValue) => {
        if (newValue[1] - newValue[0] < 1000) {
            if (newValue[0] === odoRange[0]) {
                setOdoRange([newValue[0], newValue[0] + 1000]);
            } else {
                setOdoRange([newValue[1] - 1000, newValue[1]]);
            }
        } else {
            setOdoRange(newValue);
        }
    }

    return (
        <div>
            <AppBar/>
            <h1>Vehicles</h1>
            <p>{vehicles.count} vehicles found</p>
            <div>
                <FormControl sx={{ m: 1, width: 150}}>
                    <InputLabel htmlFor="outlined-adornment-amount">Rego</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={rego}
                        onChange={(event) => setRego(event.target.value.toUpperCase())}
                        label="Rego"
                    />
                </FormControl>
            </div>
            <FormControl sx={{ m: 1, width: 300}}>
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
                count={Math.ceil(vehicles.count/pageSize)} 
                color="primary" 
                page={page}
                onChange={(event, value) => setPage(value)}
                style={{margin: "auto", justifyContent: "center", display: "flex"}}
                />
            <FormControl sx={{ m: 1}}>
                <InputLabel id="pageSize-label">Page</InputLabel>
                <Select
                    input={<OutlinedInput label="Tag" />}
                    labelId="pageSize-label"
                    value={pageSize}
                    onChange={(event) => setPageSize(event.target.value)}
                    MenuProps={MenuProps}
                    >
                    {pageSizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                        {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <VehicleList vehicles={vehicles.vehicles}/>
        </div>
    );
}

export default Vehicles;