import React from 'react'

import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

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

    const onChangeVisibility = () => {
        props.SetVisibility(!props.visibility);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateVariation();

        if (props.selectedOption === "edit")
            props.handleEditVariation();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <TextField label="Hidden Name" type="text" value={props.variationHiddenName} onChange={onChangeHiddenName} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Display Name" type="text" value={props.variationDisplayName} onChange={onChangeDisplayName} sx={{ width: "80%", mt: "20px" }} />
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