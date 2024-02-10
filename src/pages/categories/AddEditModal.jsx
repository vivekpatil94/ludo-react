import React from 'react'

import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const onChangeCategoryName = (event) => {
        props.SetCategoryName(event.target.value);
    }

    const onChangeVisibility = () => {
        props.SetVisibility(!props.visibility);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateCategory();

        if (props.selectedOption === "edit")
            props.handleEditCategory();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <TextField label="Name" type="text" value={props.categoryName} onChange={onChangeCategoryName} sx={{ width: "80%", mt: "20px" }} />
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
        </StyledModal>
    )
}

export default AddEditModal