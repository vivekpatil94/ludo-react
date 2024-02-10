import React from 'react'

import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import StyledModal from '../../../components/StyledModal'

const AddEditModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const onChangeHiddenName = (event) => {
        props.SetHiddenName(event.target.value);
    }

    const onChangeDisplayName = (event) => {
        props.SetDisplayName(event.target.value);
    }

    const onChangeDataType = (value) => {
        props.SetDataType(value);
    }

    const onChangeDefaultValue = (event) => {
        props.SetDefaultValue(event.target.value);
    }

    const onChangeDimension = (event) => {
        props.SetDimension(event.target.value);
    }

    const onChangeVisibility = () => {
        props.SetVisibility(!props.visibility);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateParameter();

        if (props.selectedOption === "edit")
            props.handleEditParameter();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "20px"
            }}>
                <TextField label="Hidden Name" type="text" value={props.parameterHiddenName} onChange={onChangeHiddenName} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Display Name" type="text" value={props.parameterDisplayName} onChange={onChangeDisplayName} sx={{ width: "80%", mt: "20px" }} />
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="dataType-label">Data Type</InputLabel>
                        <Select
                            labelId="dataType-label"
                            id="dataType-select"
                            value={props.dataType}
                            label="Data Type"
                        >
                            <MenuItem key="string" value="string" onClick={() => onChangeDataType("string")}>string</MenuItem>
                            <MenuItem key="integer" value="integer" onClick={() => onChangeDataType("integer")}>integer</MenuItem>
                            <MenuItem key="float" value="float" onClick={() => onChangeDataType("float")}>float</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TextField label="Default Value" type="text" value={props.defaultValue} onChange={onChangeDefaultValue} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Dimension" type="number" value={props.dimension} onChange={onChangeDimension} sx={{ width: "80%", mt: "20px" }} />
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControlLabel
                        label="Visibility"
                        control={
                            <Checkbox
                                onChange={onChangeVisibility}
                                checked={props.visibility}
                            />
                        }
                        sx={{
                            color: props.theme.palette.text.primary,
                        }}
                    />
                </Box>
            </Box>
        </StyledModal >
    )
}

export default AddEditModal