import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import {
    TextField, Paper, Typography, Select, MenuItem, InputAdornment, IconButton, FormHelperText,
    FormControl, InputLabel
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: 120,
    },
    selectwidth: {
        width: "300px"
    },
}));

export default function SmartDropDown(props) {
    const classes = useStyles();
    const [country, setCountry] = React.useState('');
    let countries = props.countries;
 
    const handleChange = (event) => {
        setCountry(event.target.value);
    };
    const [searchTerm, setSearch] = React.useState('');

    const handleSearchTextChange = (e) => {
        setSearch(e.target.value);
    }
    let [searchResults, setsearchResults] = React.useState([]);
    useEffect(() => {
        let results = [];
        if (searchTerm != "") {
            results = props.countries.filter(country =>
                (country.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        setsearchResults(results);
        countries = searchResults;
    }, [searchTerm]);

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Select Country</InputLabel>
                <Select
                    className={classes.selectwidth}
                    //labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={country}
                    onChange={handleChange}
                    label="Select Country"
                >
                    <MenuItem>
                        <TextField
                            value={searchTerm}
                            type="search"
                            variant="outlined"
                            margin="normal"
                            placeholder="Search"
                            onChange={(e) => handleSearchTextChange(e)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </MenuItem>
                    {countries.map((item, index) => (
                        <MenuItem key={item.code} value={item}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}