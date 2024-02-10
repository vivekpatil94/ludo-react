import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

export default function SearchBox(props) {

    const [selectedSearchParameter, SetSelectedSearchParameter] = useState("");
    const [searchValue, SetSearchValue] = useState("");

    const handleSearchParameter = (parameter) => {
        SetSelectedSearchParameter(parameter);
    };

    const handleSearch = () => {
        SetSearchValue(searchValue);
    };

    const handleClear = () => {
        SetSearchValue("");
        props.SetSearchValue("");
    }

    return (
        <div>
            <Box sx={{ display: "flex", gap: "25px" }}>
                <FormControl sx={{ width: "200px", minWidth: "100px" }}>
                    <InputLabel id="parameter-label">Parameters</InputLabel>
                    <Select
                        labelId="parameter-label"
                        id="parameter-select"
                        value={selectedSearchParameter}
                        label="Parameters"
                    >
                        {
                            props.searchParameters.map((parameter) => {
                                return (
                                    <MenuItem key={parameter} value={parameter} onClick={() => handleSearchParameter(parameter)}>{parameter}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <TextField label="Search Text" type="text" value={searchValue} onChange={(event) => SetSearchValue(event.target.value)} />
                <Button variant='contained' onClick={() => handleSearch()} sx={{
                    fontWeight: 600,
                    p: "10px",
                }}>
                    Search
                </Button>
                {
                    props.searchValue !== "" &&
                    <Button variant='contained' onClick={() => handleClear()} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        Clear
                    </Button>
                }
            </Box>
        </div>
    );
}