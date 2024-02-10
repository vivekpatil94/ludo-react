import React from 'react'

import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import StyledModal from '../../../components/StyledModal'

const AddEditModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const onChangeRoomParameter = (event, index, parameter) => {
        parameter.value = event.target.value;

        let parameters = props.roomParameters;
        parameters.splice(index, 1, parameter);

        props.SetRoomParameters(parameters);
        props.ForceRender();
    }

    const onChangeVisibility = () => {
        props.SetVisibility(!props.visibility);
    }

    const onChangeName = (event) => {
        props.SetName(event.target.value);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateRoom();

        if (props.selectedOption === "edit")
            props.handleEditRoom();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                height: "50vh",
                flexDirection: "column",
                alignItems: "center",
                mt: "20px",
                overflowY: "auto"
            }}>
                <TextField label="Name" type="text" value={props.name} onChange={onChangeName} sx={{ width: "80%", mt: "20px" }} />

                {
                    props.roomParameters.map((parameter, index) => {
                        return (
                            <TextField label={parameter.label} type="text" value={parameter.value} onChange={(event) => onChangeRoomParameter(event, index, parameter)} sx={{ width: "80%", mt: "20px" }} />
                        )
                    })
                }

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